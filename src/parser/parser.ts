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
      throw Error("An unexpected error occurs");
    }

    currentStateIndex = nextStateIndex;
  }

  return dsa.states[currentStateIndex];
}

export function parse(tokens: Token[]): AstNode[] {
  const dsa = buildDecisionDsa(tokenDefinitions, ruleDefinitions);

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
    const dsaState = runDsa(dsa, astStackSeq);

    console.log("stack:", astStack.map((n) => n.type).join(" "));
    console.log("input", token.type);

    let operation = "";

    for (const state of dsaState) {
      console.log(state.type, "-->", state.sequence.join(" "), "/", state.index, "/", state.lookahead);

      if (state.sequence[state.index] === token.type) {
        astStack.push({ type: token.type, token, children: [] });
        copiedTokens.shift();
        operation = "shift";
        break;
      }

      if (state.sequence.length <= state.index && state.lookahead === token.type) {
        const nodesInSeq = astStack.splice(astStack.length - state.sequence.length, state.sequence.length);
        const children: AstNode[] = [];

        for (const node of nodesInSeq) {
          const ruleDef = ruleDefinitions.find((r) => r.type === node.type);
          if (ruleDef && ruleDef.omitIf) {
            let omitting = false;
            for (const omitCondition of ruleDef.omitIf) {
              if (omitCondition.always === true) {
                omitting = true;
                break;
              }
              if (omitCondition.parentIs && omitCondition.parentIs !== state.type) {
                omitting = omitting || false;
                continue;
              }
              if (
                omitCondition.childrenAre &&
                !twoSequencesAreEqual(omitCondition.childrenAre, node.children.map((c) => c.type))
              ) {
                omitting = omitting || false;
                continue;
              }
              omitting = true;
              break;
            }

            if (omitting) {
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
        break;
      }
    }

    if (!operation) {
      console.error("No operation found");
      throw new Error("An unexpected error occurs");
    }

    console.log(operation);
    console.log();
  }

  return astStack;
}
