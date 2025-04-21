import { AstNode } from "../../parser/types";
import { getChild } from "../ast-utils";
import { extractGlobalIdentifier, extractLocalIdentifier } from "./identifier-related-extractor";
import { ExportStatementInfo, ImportStatementInfo } from "./types";

export function extractImportStatement(node: AstNode): ImportStatementInfo {
  const modulePathNode = getChild(node, "global_identifier");
  const modulePath = extractGlobalIdentifier(modulePathNode);
  const moduleName = modulePath.join("::");

  const aliasPhraseNode = getChild(node, "alias_phrase");
  const aliasIdentifierNode = aliasPhraseNode && getChild(aliasPhraseNode, "local_identifier") || null;
  const aliasName = aliasIdentifierNode && extractLocalIdentifier(aliasIdentifierNode) || null;

  const start = getChild(node, "keyword_import").token!.start;

  return {
    moduleName,
    localName: aliasName || moduleName,
    start,
  };
}

export function extractExportStatement(node: AstNode): ExportStatementInfo {
  const localNameNode = getChild(node, "global_identifier");
  const localNameParts = extractGlobalIdentifier(localNameNode);
  const localName = localNameParts.pop();
  const moduleLocalName = localNameParts.join("::") || null;

  const aliasPhraseNode = getChild(node, "alias_phrase");
  const aliasIdentifierNode = aliasPhraseNode && getChild(aliasPhraseNode, "local_identifier") || null;
  const aliasName = aliasIdentifierNode && extractLocalIdentifier(aliasIdentifierNode) || null;

  const start = getChild(node, "keyword_export").token!.start;

  return {
    moduleLocalName,
    localName,
    exportName: aliasName || localName,
    start,
  };
}
