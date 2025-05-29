import { TokenDefinition } from "../../tokenizer/token-definitions/types";
import { AstNodeRuleDefinition } from "../rule-definitions/types";
import { buildClosure } from "./closure";
import { RuleState } from "./types";

export function buildGoto(
  tokenDefinitions: TokenDefinition[],
  ruleDefinitions: AstNodeRuleDefinition[],
): (states: RuleState[], symbol: string) => RuleState[] {
  return (states, symbol) => {
    const closure = buildClosure(tokenDefinitions, ruleDefinitions);
    const newStates: RuleState[] = [];
    for (const state of states) {
      if (state.sequence[state.index] === symbol) {
        newStates.push({
          ...state,
          index: state.index + 1,
        });
      }
    }

    return closure(newStates);
  };
}
