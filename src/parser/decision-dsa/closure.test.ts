import { TokenDefinition } from "../../tokenizer/types";
import { AstNodeRuleDefinition } from "../rule-definitions/rule-definitions";
import { buildClosure } from "./closure";

describe("closure", () => {
  it ("should generate correct closure", () => {
    const tokenDefinitions: TokenDefinition[] = [
      { type: "a", matcher: "a" },
      { type: "b", matcher: "b" },
      { type: "c", matcher: "c" },
      { type: "d", matcher: "d" },
    ];

    const ruleDefinitions: AstNodeRuleDefinition[] = [
      { type: "S", rule: [
        [ "S", "R" ],
        [ "R" ],
        [ "a" ]
      ] },
      { type: "R", rule: [
        [ "B", "D" ],
        [ "C" ],
      ] },
      { type: "B", rule: [
        [ "b" ],
        [ "C", "a" ],
      ] },
      { type: "C", rule: [
        [ "c" ],
      ] },
      { type: "D", rule: [
        [ "d" ],
      ] },
    ];

    const closure = buildClosure(
      tokenDefinitions,
      ruleDefinitions,
    );

    
    const examples = [
      {
        input: [{ type: "_START_", sequence: [ "S", "_END_" ], index: 0, lookahead: "" }],
        output: [
          { type: "_START_", sequence: [ "S", "_END_" ], index: 0, lookahead: "" },
          { type: "S", sequence: [ "S", "R" ], index: 0, lookahead: "_END_" },
          { type: "S", sequence: [ "R" ], index: 0, lookahead: "_END_" },
          { type: "S", sequence: [ "a" ], index: 0, lookahead: "_END_" },
          { type: "S", sequence: [ "S", "R" ], index: 0, lookahead: "b" },
          { type: "S", sequence: [ "R" ], index: 0, lookahead: "b" },
          { type: "S", sequence: [ "a" ], index: 0, lookahead: "b" },
          { type: "S", sequence: [ "S", "R" ], index: 0, lookahead: "c" },
          { type: "S", sequence: [ "R" ], index: 0, lookahead: "c" },
          { type: "S", sequence: [ "a" ], index: 0, lookahead: "c" },
          { type: "R", sequence: [ "B", "D" ], index: 0, lookahead: "_END_"},
          { type: "R", sequence: [ "C" ], index: 0, lookahead: "_END_" },
          { type: "R", sequence: [ "B", "D" ], index: 0, lookahead: "b"},
          { type: "R", sequence: [ "C" ], index: 0, lookahead: "b" },
          { type: "R", sequence: [ "B", "D" ], index: 0, lookahead: "c"},
          { type: "R", sequence: [ "C" ], index: 0, lookahead: "c" },
          { type: "B", sequence: [ "b" ], index: 0, lookahead: "d" },
          { type: "B", sequence: [ "C", "a" ], index: 0, lookahead: "d" },
          { type: "C", sequence: [ "c" ], index: 0, lookahead: "_END_" },
          { type: "C", sequence: [ "c" ], index: 0, lookahead: "b" },
          { type: "C", sequence: [ "c" ], index: 0, lookahead: "c" },
          { type: "C", sequence: [ "c" ], index: 0, lookahead: "a" },
        ],
      },
    ];

    for (const example of examples) {
      const actualOutput = closure(example.input);
      expect(actualOutput.length).toEqual(example.output.length);
      expect(actualOutput).toEqual(expect.arrayContaining(example.output));
    }
  });
});
