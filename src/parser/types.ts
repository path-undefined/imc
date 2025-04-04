import { Token } from "../lexer/types";

export type AstNode = {
  type: string;
  children: AstNode[];
  token?: Token;
};
