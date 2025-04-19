import * as fs from "node:fs";
import * as path from "node:path";
import { tokenize } from "../../tokenizer/tokenizer";
import { parse } from "../../parser/parser";
import { extractImportStatement } from "../extractor/module-related-extractors";
import { filterChildOfType } from "../ast-utils";
import {
  DiscoveredExport,
  DiscoveredModule,
  DiscoveringConfig,
} from "./types";

export function discoverModules(entryModuleName: string, config: DiscoveringConfig): DiscoveredModule[] {
  const modulePaths = config.modulePaths;

  function discoverModulesRecursively(moduleName: string, discoveredModules: Map<string, DiscoveredModule>) {
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
    const importStmtNodes = filterChildOfType(rootNode, "import_statement");
    for (const node of importStmtNodes) {
      const importStmtInfo = extractImportStatement(node);
      const moduleName = importStmtInfo.moduleName;

      if (!discoveredModules.has(moduleName)) {
        discoverModulesRecursively(moduleName, discoveredModules);
      }
    }

    discoveredModules.set(moduleName, {
      name: moduleName,
      sourceFilePath,
      ast,
    });
  }

  const discoveredModules: Map<string, DiscoveredModule> = new Map();

  discoverModulesRecursively(entryModuleName, discoveredModules);

  return [...discoveredModules.values()];
}

export function discoverExports(modules: DiscoveredModule[]): DiscoveredExport[] {
  // TODO: ...
  return [];
}
