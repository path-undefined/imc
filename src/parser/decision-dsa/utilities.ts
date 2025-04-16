import { TokenDefinition } from "../../tokenizer/types";
import { AstNodeRuleDefinition } from "../rule-definitions/rule-definitions";
import { RuleState } from "./types";

export function twoSequencesAreEqual(seq1: string[], seq2: string[]): boolean {
  if (seq1.length !== seq2.length) {
    return false;
  }
  for (let i = 0; i < seq1.length; i++) {
    if (seq1[i] !== seq2[i]) {
      return false;
    }
  }
  return true;
}

export function twoStatesAreEqual(s1: RuleState, s2: RuleState): boolean {
  if (s1.type !== s2.type) {
    return false;
  }
  if (!twoSequencesAreEqual(s1.sequence, s2.sequence)) {
    return false;
  }
  if (s1.index !== s2.index) {
    return false;
  }
  if (s1.lookahead !== s2.lookahead) {
    return false;
  }
  return true;
}

export function buildTerminalSymbolSet(tokenDefinitions: TokenDefinition[]): Set<string> {
  return new Set([
    ...tokenDefinitions.map((token) => token.type),
    "_END_",
  ]);
}

export function buildGrammarRules(ruleDefinitions: AstNodeRuleDefinition[]): AstNodeRuleDefinition[] {
  return [
    {
      type: "_START_",
      rule: [
        [ruleDefinitions[0].type, "_END_"]
      ],
    },
    ...ruleDefinitions,
  ];
}
