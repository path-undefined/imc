import { TokenDefinition } from "../../lexer/token-definitions";
import { AstNodeRuleDefinition } from "../rule-definitions";
import { buildClosure } from "./closure";
import { State } from "./types";

export function buildGoto(
  tokenDefinitions: TokenDefinition[],
  ruleDefinitions: AstNodeRuleDefinition[],
): (states: State[], symbol: string) => State[] {
  return (states, symbol) => {
    const closure = buildClosure(tokenDefinitions, ruleDefinitions);
    const newStates: State[] = [];
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
