import { AstNode } from "../types/ast";

export function getChildWithPath(node: AstNode, ...childPath: string[]): AstNode | null {
  let result: AstNode | null = node;
  for (const child of childPath) {
    result = result.children.find((c) => c.type === child) || null;
    if (!result) {
      return null;
    }
  }
  return result;
}

export function getChildrenOfType(node: AstNode, child: string): AstNode[] {
  return node.children.filter((c) => c.type === child);
}
