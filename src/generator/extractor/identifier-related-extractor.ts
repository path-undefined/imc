import { AstNode } from "../../parser/types";
import { getChildrenOfType, getChild } from "../ast-utils";

export function extractGlobalIdentifier(node: AstNode): string[] {
  const identifiers = getChildrenOfType(node, "identifier");
  return identifiers.map((i) => i.token!.raw);
}

export function extractLocalIdentifier(node: AstNode): string {
  const identifier = getChild(node, "identifier");
  return identifier.token!.raw;
}
