import { AstNode } from "../parser/types";

export function forEachChild(node: AstNode, cb: (node: AstNode) => void) {
  node.children.forEach(cb);
}

export function mapEachChild<T>(node: AstNode, cb: (node: AstNode) => T): T[] {
  return node.children.map(cb);
}

export function findChildOfType(node: AstNode, child: string): AstNode | null {
  return node.children.find((c) => c.type === child) ?? null;
}

export function filterChildOfType(node: AstNode, child: string): AstNode[] {
  return node.children.filter((c) => c.type === child);
}
