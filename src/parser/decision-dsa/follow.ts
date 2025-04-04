import { TokenDefinition } from "../../lexer/token-definitions";
import { AstNodeRuleDefinition } from "../rule-definitions/rule-definitions";
import { buildGrammarRules, buildTerminalSymbolSet } from "./utilities";

export function buildFollow(
  tokenDefinitions: TokenDefinition[],
  ruleDefinitions: AstNodeRuleDefinition[],
): (symbol: string) => string[] {
  const terminalSymbols = buildTerminalSymbolSet(tokenDefinitions);
  const grammarRules = buildGrammarRules(ruleDefinitions);
  const canBeFollowedBy: Record<string, string[]> = {};

  for (const currRuleDef of grammarRules) {
    const atTheEndOf: Set<string> = new Set([currRuleDef.type]);
    let hasNewItem: boolean = true;
    while (hasNewItem) {
      hasNewItem = false;
      const copied = [...atTheEndOf.values()];
      for (const ruleType of copied) {
        for (const anotherRuleDef of grammarRules) {
          if (anotherRuleDef.rule.some((seq) => seq[seq.length - 1] === ruleType)) {
            if (!atTheEndOf.has(anotherRuleDef.type)) {
              atTheEndOf.add(anotherRuleDef.type);
              hasNewItem = true;
            }
          }
        }
      }
    }
    
    const followingTypes: Set<string> = new Set();
    for (const endType of atTheEndOf) {
      for (const anotherRuleDef of grammarRules) {
        for (const seq of anotherRuleDef.rule) {
          for (let i = 0; i < seq.length - 1; i++) {
            if (seq[i] === endType) {
              followingTypes.add(seq[i + 1]);
            }
          }
        }
      }
    }

    let followingTokenTypes: Set<string> = followingTypes;
    hasNewItem = true;
    while (hasNewItem) {
      hasNewItem = false;
      const newlyFiltered: Set<string> = new Set();
      const copied = [...followingTokenTypes.values()];

      for (const followingType of copied) {
        if (!terminalSymbols.has(followingType)) {
          const anotherRuleDef = grammarRules.find((ruleDef) => ruleDef.type === followingType);
          const derivedTypes = anotherRuleDef.rule
            .map((seq) => seq[0])
            .filter((ruleType) => ruleType !== followingType);
          for (const derivedType of derivedTypes) {
            if (!followingTokenTypes.has(derivedType)) {
              newlyFiltered.add(derivedType);
              hasNewItem = true;
            }
          }
        } else {
          newlyFiltered.add(followingType);
        }
      }

      followingTokenTypes = newlyFiltered;
    }

    canBeFollowedBy[currRuleDef.type] = [...followingTokenTypes.values()];
  }

  return (symbol: string) => canBeFollowedBy[symbol];
}

