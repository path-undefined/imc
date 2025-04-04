import * as decisionDsa from "./decision-dsa.json";
import { Token } from "../lexer/types";
import { AstNode } from "./types";
import { DecisionDsa, DecisionDsaState } from "./decision-dsa/types";
import { twoSequencesAreEqual } from "./decision-dsa/utilities";
import { ruleDefinitions } from "./rule-definitions/rule-definitions";
import { log } from "../logger/logger";

function runDsa(dsa: DecisionDsa, stackSequence: string[]): DecisionDsaState {
  let currentStateIndex = 0;

  for (const symbol of stackSequence) {
    const nextStateIndex = dsa.transitions
      .find((t) => t.from === currentStateIndex && t.symbol === symbol)
      ?.to || -1;

    if (nextStateIndex < 0) {
      throw Error("An unexpected error occurs");
    }

    currentStateIndex = nextStateIndex;
  }

  return dsa.states[currentStateIndex];
}

export function parse(tokens: Token[]): AstNode[] {
  const astStack: AstNode[] = [];
  const copiedTokens: Token[] = [
    ...tokens,
    {
      type: "_END_",
      raw: "",
      start: { line: 0, char: 0 },
      end: { line: 0, char: 0 },
    },
  ];

  while (copiedTokens.length > 0) {
    const token = copiedTokens[0];
    const astStackSeq = astStack.map((n) => n.type);
    const dsaState = runDsa(decisionDsa as any, astStackSeq);

    log("debug", `Stack: ${astStackSeq.join(" ")}`);
    log("debug", `Next token: ${token.type}`);

    let operation = "";

    for (const state of dsaState) {
      log("debug", `    Attempting: ${state.type} --> ${state.sequence.join(" ")} | ${state.lookahead}`);

      if (state.sequence[state.index] === token.type) {
        astStack.push({ type: token.type, token, children: [] });
        copiedTokens.shift();
        operation = "shift";
        log("debug", "Operation: SHIFT");
        break;
      }

      if (state.sequence.length <= state.index && state.lookahead === token.type) {
        const nodesInSeq = astStack.splice(astStack.length - state.sequence.length, state.sequence.length);
        const children: AstNode[] = [];

        for (const node of nodesInSeq) {
          const ruleDef = ruleDefinitions.find((r) => r.type === node.type);
          if (ruleDef && ruleDef.transparentIf) {
            let transparent = false;
            for (const omitCondition of ruleDef.transparentIf) {
              if (omitCondition.always === true) {
                transparent = true;
                break;
              }
              if (omitCondition.parentIs && omitCondition.parentIs !== state.type) {
                transparent = transparent || false;
                continue;
              }
              if (
                omitCondition.childrenAre &&
                !twoSequencesAreEqual(omitCondition.childrenAre, node.children.map((c) => c.type))
              ) {
                transparent = transparent || false;
                continue;
              }
              transparent = true;
              break;
            }

            if (transparent) {
              children.push(...node.children);
            } else {
              children.push(node);
            }
          } else {
            children.push(node);
          }
        }

        const newNode: AstNode = {
          type: state.type,
          children,
        };
        astStack.push(newNode);
        operation = "reduce";
        log("debug", "Operation: REDUCE");
        break;
      }
    }

    log("debug", "");

    if (!operation) {
      console.error("No operation found");
      throw new Error("An unexpected error occurs");
    }
  }

  return astStack;
}
