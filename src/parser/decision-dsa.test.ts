import * as fs from "node:fs";
import * as path from "node:path";
import { buildTerminalSymbolSet } from "./decision-dsa/utilities";
import { tokenDefinitions } from "../tokenizer/token-definitions";
import { DecisionDsa, RuleState } from "./decision-dsa/types";

type OperationRecord = {
  shift: RuleState[];
  reduce: RuleState[];
};

describe("decision-dsa", () => {
  it("should not be ambigious", () => {
    const decisionDsaPath = path.join(__dirname, "decision-dsa.json");

    if (!fs.existsSync(decisionDsaPath)) {
      console.warn("Decision DSA test skipped!");
      return;
    }

    const decisionDsa = JSON.parse(fs.readFileSync(decisionDsaPath, { encoding: "utf8" })) as DecisionDsa;
    const terminalSymbols = buildTerminalSymbolSet(tokenDefinitions);
    
    for (const symbol of terminalSymbols) {
      for (const dsaState of decisionDsa.states) {
        const possibleOperations: OperationRecord = {
          shift: [],
          reduce: [],
        };
        for (const state of dsaState) {
          if (state.sequence[state.index] === symbol) {
            possibleOperations.shift.push(state);
          }

          if (state.sequence.length <= state.index && state.lookahead === symbol) {
            possibleOperations.reduce.push(state);
          }
        }

        expect(
          possibleOperations.shift.length !== 0 && possibleOperations.reduce.length !== 0,
          [
            `Syntax is ambigious because multiple operations are possible`,
            `With input ${symbol}:`,
            ...possibleOperations.shift.map((s) =>
              `  ${s.type} --> ${s.sequence.join(" ")} @ ${s.index} | ${s.lookahead} [SHIFT]`
            ),
            ...possibleOperations.reduce.map((s) =>
              `  ${s.type} --> ${s.sequence.join(" ")} @ ${s.index} | ${s.lookahead} [REDUCE]`
            ),
          ].join("\n") + "\n",
        ).toEqual(false);
      }
    }
  });
});
