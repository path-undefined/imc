import { Token } from "../tokenizer/types";

export type AstNode = {
  type: string;
  children: AstNode[];
  token?: Token;
};
