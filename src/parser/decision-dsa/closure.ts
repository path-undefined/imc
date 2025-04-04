import { TokenDefinition } from "../../lexer/token-definitions";
import { AstNodeRuleDefinition } from "../rule-definitions/rule-definitions";
import { buildFirst } from "./first";
import { RuleState } from "./types";
import { buildGrammarRules, buildTerminalSymbolSet, twoStatesAreEqual } from "./utilities";

export function buildClosure(
  tokenDefinitions: TokenDefinition[],
  ruleDefinitions: AstNodeRuleDefinition[],
): (states: RuleState[]) => RuleState[] {
  const first = buildFirst(tokenDefinitions, ruleDefinitions);
  const terminalSymbols = buildTerminalSymbolSet(tokenDefinitions);
  const grammarRules = buildGrammarRules(ruleDefinitions);

  return (states) => {
    const copiedStates = [...states];

    let hasNewState = true;
    while (hasNewState) {
      hasNewState = false;

      for (const state of copiedStates) {
        const nextSymbol = state.sequence[state.index];
        const nextNextSymbol = state.sequence[state.index + 1];

        if (!nextSymbol) {
          continue;
        }

        if (!terminalSymbols.has(nextSymbol)) {
          const ruleDefOfSymbol = grammarRules
            .find((ruleDef) => ruleDef.type === nextSymbol);
          
          for (const sequence of ruleDefOfSymbol.rule) {
            const firstFollowingSymbols = first([nextNextSymbol || state.lookahead]);
            
            for (const firstFollowingSymbol of firstFollowingSymbols) {
              const newState: RuleState = {
                type: ruleDefOfSymbol.type,
                sequence,
                index: 0,
                lookahead: firstFollowingSymbol,
              };
            
              if (copiedStates.every((s) => !twoStatesAreEqual(s, newState))) {
                copiedStates.push(newState);
                hasNewState = true;
              }
            }
          }
        }
      }
    }

    return copiedStates;
  };
}
