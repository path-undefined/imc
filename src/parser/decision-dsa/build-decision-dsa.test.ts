import { TokenDefinition } from "../../lexer/token-definitions";
import { AstNodeRuleDefinition } from "../rule-definitions";
import { buildDecisionDsa } from "./build-decision-dsa";

describe("closure", () => {
  it ("should generate correct closure", () => {
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
        { fromState: 0, toState: 1, symbol: "c" },
        { fromState: 0, toState: 2, symbol: "d" },
        { fromState: 0, toState: 3, symbol: "S" },
        { fromState: 0, toState: 4, symbol: "C" },
        { fromState: 1, toState: 1, symbol: "c" },
        { fromState: 1, toState: 2, symbol: "d" },
        { fromState: 1, toState: 5, symbol: "C" },
        { fromState: 4, toState: 6, symbol: "c" },
        { fromState: 4, toState: 7, symbol: "d" },
        { fromState: 4, toState: 8, symbol: "C" },
        { fromState: 6, toState: 6, symbol: "c" },
        { fromState: 6, toState: 7, symbol: "d" },
        { fromState: 6, toState: 9, symbol: "C" }
      ])
    });
  });
});
