import { AstNode } from "../../parser/types";
import { findChildOfType } from "../ast-utils";
import { extractGlobalIdentifier, extractLocalIdentifier } from "./identifier-related-extractor";
import { ImportStatementInfo } from "./types";

export function extractImportStatement(node: AstNode): ImportStatementInfo {
  const modulePathNode = findChildOfType(node, "global_identifier");
  const modulePath = extractGlobalIdentifier(modulePathNode);
  const moduleName = modulePath.join("::");
  const aliasPhraseNode = findChildOfType(node, "alias_phrase");
  const aliasIdentifierNode = aliasPhraseNode && findChildOfType(aliasPhraseNode, "local_identifier") || null;
  const aliasName = aliasIdentifierNode && extractLocalIdentifier(aliasIdentifierNode) || null;

  const start = findChildOfType(node, "keyword_import").token!.start;

  return {
    moduleName,
    aliasName,
    start,
  };
}
