import { DecisionDsa, DecisionDsaState } from "./types";

export function runDecisionDsa(dsa: DecisionDsa, stackSequence: string[]): DecisionDsaState {
  let currentStateIndex = 0;

  for (const symbol of stackSequence) {
    const nextStateIndex = dsa.transitions
      .find((t) => t.from === currentStateIndex && t.symbol === symbol)
      ?.to || -1;

    if (nextStateIndex < 0) {
      throw new Error("An unexpected error occurs");
    }

    currentStateIndex = nextStateIndex;
  }

  return dsa.states[currentStateIndex];
}
