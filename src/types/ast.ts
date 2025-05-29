import { Token } from "./token";

export type AstNode = {
  type: string;
  children: AstNode[];
  token?: Token;
};
