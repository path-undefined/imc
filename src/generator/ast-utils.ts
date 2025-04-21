import { AstNode } from "../parser/types";

export function getChild(node: AstNode, ...childPath: string[]): AstNode | null {
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


export function forEachChild(node: AstNode, cb: (node: AstNode) => void) {
  node.children.forEach(cb);
}

export function mapEachChild<T>(node: AstNode, cb: (node: AstNode) => T): T[] {
  return node.children.map(cb);
}
