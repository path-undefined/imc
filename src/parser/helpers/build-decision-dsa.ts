import { TokenDefinition } from "../../lexer/token-definitions";
import { AstNodeRuleDefinition } from "../rule-definitions";
import { buildClosure } from "./closure";
import { buildGoto } from "./goto";
import { State } from "./types";
import { twoStatesAreEqual } from "./utilities";

export type DecisionDsaState = State[];
export type DecisionDsaTransition = {
  fromState: number;
  toState: number;
  symbol: string;
};

export type DecisionDsa = {
  states: DecisionDsaState[];
  transitions: DecisionDsaTransition[];
};

function twoDsaStatesAreEqual(
  s1: DecisionDsaState,
  s2: DecisionDsaState,
): boolean {
  if (s1.length !== s2.length) {
    return false;
  }
  for (const stateOfS1 of s1) {
    if (s2.every((stateOfS2) => !twoStatesAreEqual(stateOfS1, stateOfS2))) {
      return false;
    }
  }

  return true;
}

function twoDsaTransitionsAreEqual(
  t1: DecisionDsaTransition,
  t2: DecisionDsaTransition,
): boolean {
  if (t1.fromState !== t2.fromState) {
    return false;
  }
  if (t1.toState !== t2.toState) {
    return false;
  }
  if (t1.symbol !== t2.symbol) {
    return false;
  }

  return true;
}

export function buildDecisionDsa(
  tokenDefinitions: TokenDefinition[],
  ruleDefinitions: AstNodeRuleDefinition[],
): DecisionDsa {
  const closure = buildClosure(tokenDefinitions, ruleDefinitions);
  const goto = buildGoto(tokenDefinitions, ruleDefinitions);

  const allSymbols = [
    ...tokenDefinitions.map((token) => token.type),
    ...ruleDefinitions.map((rule) => rule.type),
  ];

  const dsa = {
    states: [],
    transitions: [],
  };

  const firstState = closure([{
    type: "_START_",
    sequence: [ ruleDefinitions[0].type, "_END_" ],
    index: 0,
    lookahead: "",
  }]);

  dsa.states.push(firstState);

  let hasNewResult = true;
  while (hasNewResult) {
    hasNewResult = false;

    for (let i = 0; i < dsa.states.length; i++) {
      const dsaState = dsa.states[i];

      for (const symbol of allSymbols) {
        const newDsaState = goto(dsaState, symbol);

        if (newDsaState.length === 0) {
          continue;
        }

        const index = dsa.states.findIndex((s) => twoDsaStatesAreEqual(s, newDsaState));
        if (index < 0) {
          dsa.states.push(newDsaState);
          hasNewResult = true;
        }

        const newDsaTransition = {
          fromState: i,
          toState: index >= 0 ? index : dsa.states.length - 1,
          symbol,
        }
        if (dsa.transitions.every((t) => !twoDsaTransitionsAreEqual(t, newDsaTransition))) {
          dsa.transitions.push(newDsaTransition);
        }
      }
    }
  }

  return dsa;
}
