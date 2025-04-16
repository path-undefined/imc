import { TokenDefinition } from "../../tokenizer/types";
import { AstNodeRuleDefinition } from "../rule-definitions/rule-definitions";
import { buildFirst } from "./first";

describe("first", () => {
  it("should be able to find first terminal characters", () => {
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

    const first = buildFirst(tokenDefinitions, ruleDefinitions);

    const examples = [
      { input: ["S"], output: ["a", "b", "c"] },
      { input: ["R"], output: ["b", "c"] },
      { input: ["C", "D"], output: ["c"] },
      { input: ["c"], output: ["c"] },
      { input: ["_END_"], output: ["_END_"] },
    ];

    for (const example of examples) {
      const actualOutput = first(example.input);
      expect(actualOutput.length).toEqual(example.output.length);
      expect(actualOutput).toEqual(expect.arrayContaining(example.output));
    }
  });
});
