import { TokenDefinition } from "../../tokenizer/types";
import { AstNodeRuleDefinition } from "../rule-definitions/rule-definitions";
import { buildDecisionDsa } from "./build-decision-dsa";

describe("decision DSA", () => {
  it ("should generate correct decision DSA", () => {
    const tokenDefinitions: TokenDefinition[] = [
      { type: "c", matcher: "c" },
      { type: "d", matcher: "d" },
    ];

    const ruleDefinitions: AstNodeRuleDefinition[] = [
      { type: "S", rule: [
        [ "C", "C" ],
      ] },
      { type: "C", rule: [
        [ "c", "C" ],
        [ "d" ],
      ] },
    ];

    const dsa = buildDecisionDsa(
      tokenDefinitions,
      ruleDefinitions,
    );

    expect(dsa).toEqual({
      states: expect.arrayContaining([
        [
          { type: "_START_", sequence: ["S","_END_"], index: 0, lookahead: "" },
          { type: "S",sequence: ["C","C"], index: 0, lookahead: "_END_" },
          { type: "C",sequence: ["c","C"], index: 0, lookahead: "c" },
          { type: "C",sequence: ["c","C"], index: 0, lookahead: "d" },
          { type: "C",sequence: ["d"], index: 0, lookahead: "c" },
          { type: "C",sequence: ["d"], index: 0, lookahead: "d" },
        ],
        [
          { type: "C",sequence: ["c","C"], index: 1, lookahead: "c" },
          { type: "C",sequence: ["c","C"], index: 1, lookahead: "d" },
          { type: "C",sequence: ["c","C"], index: 0, lookahead: "c" },
          { type: "C",sequence: ["d"], index: 0, lookahead: "c" },
          { type: "C",sequence: ["c","C"], index: 0, lookahead: "d" },
          { type: "C",sequence: ["d"], index: 0, lookahead: "d" },
        ],
        [
          { type: "C",sequence: ["d"], index: 1, lookahead: "c" },
          { type: "C",sequence: ["d"], index: 1, lookahead: "d" },
        ],
        [
          { type: "_START_",sequence: ["S","_END_"], index: 1, lookahead: "" },
        ],
        [
          { type: "S",sequence: ["C","C"], index: 1, lookahead: "_END_" },
          { type: "C",sequence: ["c","C"], index: 0, lookahead: "_END_" },
          { type: "C",sequence: ["d"], index: 0, lookahead: "_END_" },
        ],
        [
          { type: "C",sequence: ["c","C"], index: 2, lookahead: "c" },
          { type: "C",sequence: ["c","C"], index: 2, lookahead: "d" },
        ],
        [
          { type: "C",sequence: ["c","C"], index: 1, lookahead: "_END_" },
          { type: "C",sequence: ["c","C"], index: 0, lookahead: "_END_" },
          { type: "C",sequence: ["d"], index: 0, lookahead: "_END_" },
        ],
        [
          { type: "C",sequence: ["d"], index: 1, lookahead: "_END_" },
        ],
        [
          { type: "S",sequence: ["C","C"], index: 2, lookahead: "_END_" },
        ],
        [
          { type: "C",sequence: ["c","C"], index: 2, lookahead: "_END_" },
        ]
      ]),
        
      transitions: expect.arrayContaining([
        { from: 0, to: 1, symbol: "c" },
        { from: 0, to: 2, symbol: "d" },
        { from: 0, to: 3, symbol: "S" },
        { from: 0, to: 4, symbol: "C" },
        { from: 1, to: 1, symbol: "c" },
        { from: 1, to: 2, symbol: "d" },
        { from: 1, to: 5, symbol: "C" },
        { from: 4, to: 6, symbol: "c" },
        { from: 4, to: 7, symbol: "d" },
        { from: 4, to: 8, symbol: "C" },
        { from: 6, to: 6, symbol: "c" },
        { from: 6, to: 7, symbol: "d" },
        { from: 6, to: 9, symbol: "C" }
      ])
    });
  });
});
