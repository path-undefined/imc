import { Token } from "../lexer/token";

export type AstNode = {
  type: string;
  children: AstNode[];
  token?: Token;
  names?: Record<string, string>;
};
