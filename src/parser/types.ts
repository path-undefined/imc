import { Token } from "../tokenizer/types";
import { DecisionDsa } from "./decision-dsa/types";

export type ParsingConfig = {
  decisionDsa: DecisionDsa,
};

export type AstNode = {
  type: string;
  children: AstNode[];
  token?: Token;
};
