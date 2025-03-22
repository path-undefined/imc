import { Token } from "../lexer/token";
import { tokenDefinitions } from "../lexer/token-definitions";
import { AstNode } from "./ast-node";
import {
  buildDecisionDsa,
  DecisionDsa,
  DecisionDsaState,
} from "./helpers/build-decision-dsa";
import { twoSequencesAreEqual } from "./helpers/utilities";
import { ruleDefinitions } from "./rule-definitions";

function runDsa(dsa: DecisionDsa, stackSequence: string[]): DecisionDsaState {
  let currentStateIndex = 0;

  for (const symbol of stackSequence) {
    const nextStateIndex = dsa.transitions
      .find((t) => t.fromState === currentStateIndex && t.symbol === symbol)
      ?.toState || -1;

    if (nextStateIndex < 0) {
      throw Error("Unexpected input ...");
    }

    currentStateIndex = nextStateIndex;
  }

  return dsa.states[currentStateIndex];
}

export function parse(tokens: Token[]): AstNode[] {
  const dsa = buildDecisionDsa(tokenDefinitions, ruleDefinitions);

  const astStack: AstNode[] = [];
  const copiedTokens: Token[] = [...tokens];

  while (copiedTokens.length > 0) {
    const token = copiedTokens[0];
    const astStackSeq = astStack.map((n) => n.type);
    const dsaState = runDsa(dsa, astStackSeq);

    console.log("stack:", astStack.map((n) => n.type).join(" "));
    console.log("input", token.type);

    for (const state of dsaState) {
      console.log(state.type, "-->", state.sequence.join(" "), "/", state.lookahead);
      const symbolIndex = state.sequence.indexOf(token.type);
      if (
        symbolIndex >= 0 &&
        twoSequencesAreEqual(
          state.sequence.slice(0, symbolIndex),
          astStackSeq.slice(astStackSeq.length - symbolIndex),
        )
      ) {
        astStack.push({ type: token.type, token, children: [] });
        copiedTokens.shift();
        console.log("shift");
        break;
      }
      if (state.sequence.length <= state.index && state.lookahead === token.type) {
        const nodesInSeq = astStack.splice(astStack.length - state.sequence.length, state.sequence.length);
        const newNode: AstNode = {
          type: state.type,
          children: [ ...nodesInSeq ],
        };
        astStack.push(newNode);
        console.log("reduce");
        break;
      }
    }
    
    console.log();
  }

  return astStack;
}
