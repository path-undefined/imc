import { AstNode } from "../../parser/types";
import { filterChildOfType, findChildOfType } from "../ast-utils";

export function extractGlobalIdentifier(node: AstNode): string[] {
  const identifiers = filterChildOfType(node, "identifier");
  return identifiers.map((i) => i.token!.raw);
}

export function extractLocalIdentifier(node: AstNode): string {
  const identifier = findChildOfType(node, "identifier");
  return identifier.token!.raw;
}
