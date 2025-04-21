import * as fs from "node:fs";
import * as path from "node:path";
import { tokenize } from "../../tokenizer/tokenizer";
import { parse } from "../../parser/parser";
import { extractExportStatement, extractImportStatement } from "../extractor/module-related-extractors";
import { extractLocalIdentifier } from "../extractor/identifier-related-extractor";
import { ExportStatementInfo } from "../extractor/types";
import { getChild, forEachChild } from "../ast-utils";
import {
  DiscoveredModule,
  DiscoveredModuleExport,
  DiscoveringConfig,
} from "./types";
import { AstNode } from "../../parser/types";

export function discover(entryModuleName: string, config: DiscoveringConfig): Record<string, DiscoveredModule> {
  const modulePaths = config.modulePaths;

  function discoverRecursively(moduleName: string, discoveredModules: Record<string, DiscoveredModule>) {
    const sourceFileRelativePath = path.join(...moduleName.split("::")) + ".imc";

    let sourceFilePath: string = "";
    for (const modulePath of modulePaths) {
      const possibleSourceFilePath = path.join(modulePath, sourceFileRelativePath);

      if (fs.existsSync(possibleSourceFilePath) && fs.statSync(possibleSourceFilePath).isFile()) {
        sourceFilePath = possibleSourceFilePath;
        break;
      }
    }

    if (!sourceFilePath) {
      throw new Error("An unexpected error occurs");
    }

    const sourceCode = fs.readFileSync(sourceFilePath, { encoding: "utf8" });
    const tokens = tokenize(sourceCode);
    const ast = parse(tokens);

    const rootNode = ast[0];
    const exportStmtInfos: ExportStatementInfo[] = [];
    const declarationWithLocalName: Record<string, AstNode> = {};

    forEachChild(rootNode, (c) => {
      switch (c.type) {
        case "export_statement":
          const exportStmtInfo = extractExportStatement(c);
          exportStmtInfos.push(exportStmtInfo);
          break;

        case "import_statement":
          const importStmtInfo = extractImportStatement(c);
          const moduleName = importStmtInfo.moduleName;
          if (!discoveredModules[moduleName]) {
            discoverRecursively(moduleName, discoveredModules);
          }
          declarationWithLocalName[importStmtInfo.localName] = c;
          break;

        case "type_declaration_statement":
        case "data_declaration_statement":
        case "data_definition_statement":
          const localNameNode =
            getChild(c, "local_identifier") ||
            getChild(c, "var_declaration_statement", "local_identifier") ||
            getChild(c, "func_declaration_statement", "local_identifier") ||
            getChild(c, "var_definition_statement", "local_identifier") ||
            getChild(c, "func_definition_statement", "local_identifier");
          const localName = extractLocalIdentifier(localNameNode);
          declarationWithLocalName[localName] = c;
          break;
      }
    });

    const exports: Record<string, DiscoveredModuleExport> = {};

    for (const exportStmtInfo of exportStmtInfos) {
      const ast = exportStmtInfo.moduleLocalName
        ? declarationWithLocalName[exportStmtInfo.moduleLocalName]
        : declarationWithLocalName[exportStmtInfo.localName];

      exports[exportStmtInfo.exportName] = {
        exportName: exportStmtInfo.exportName,
        moduleLocalName: exportStmtInfo.moduleLocalName,
        localName: exportStmtInfo.localName,
        ast,
      };
    }

    discoveredModules[moduleName] = {
      moduleName,
      sourceFilePath,
      ast,
      exports,
    };
  }

  const result: Record<string, DiscoveredModule> = {};
  discoverRecursively(entryModuleName, result);

  return result;
}
