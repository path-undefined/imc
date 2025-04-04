import { TokenDefinition } from "../../lexer/token-definitions";
import { log } from "../../logger/logger";
import { AstNodeRuleDefinition } from "../rule-definitions/rule-definitions";
import { buildClosure } from "./closure";
import { buildGoto } from "./goto";
import { DecisionDsa, DecisionDsaState, DecisionDsaTransition } from "./types";
import { twoStatesAreEqual } from "./utilities";

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
  if (t1.from !== t2.from) {
    return false;
  }
  if (t1.to !== t2.to) {
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
  log("debug", "Building closure function ...");
  const closure = buildClosure(tokenDefinitions, ruleDefinitions);

  log("debug", "Building goto function ...");
  const goto = buildGoto(tokenDefinitions, ruleDefinitions);

  const allSymbols = [
    ...tokenDefinitions.map((token) => token.type),
    ...ruleDefinitions.map((rule) => rule.type),
  ];

  const dsa: DecisionDsa = {
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

  log("debug", "Discovering states ...");

  // We don't need the outer while and the boolean flag here. Because the
  // 2nd expression in the for statement will be evaluated in each loop, which
  // means, the newly added state will be processed immediately after the old
  // states have been processed, which makes the last checking loop completely
  // useless.
  for (let i = 0; i < dsa.states.length; i++) {
    const dsaState = dsa.states[i];
    log("debug", `State analysed / discovered: ${i + 1} / ${dsa.states.length}`);

    for (const symbol of allSymbols) {
      const newDsaState = goto(dsaState, symbol);

      if (newDsaState.length === 0) {
        continue;
      }

      const index = dsa.states.findIndex((s) => twoDsaStatesAreEqual(s, newDsaState));
      if (index < 0) {
        dsa.states.push(newDsaState);
      }

      const newDsaTransition: DecisionDsaTransition = {
        from: i,
        to: index >= 0 ? index : dsa.states.length - 1,
        symbol,
      }
      if (dsa.transitions.every((t) => !twoDsaTransitionsAreEqual(t, newDsaTransition))) {
        dsa.transitions.push(newDsaTransition);
      }
    }
  }

  log("debug", "Decision DSA has been fully built ...")

  return dsa;
}
