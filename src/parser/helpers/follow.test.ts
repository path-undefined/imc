import { TokenDefinition } from "../../lexer/token-definitions";
import { AstNodeRuleDefinition } from "../rule-definitions";
import { buildFollow } from "./follow";

describe("follow", () => {
  it("should be able to find the following characters", () => {
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
        [ "a" ],
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

    const follow = buildFollow(tokenDefinitions, ruleDefinitions);

    const examples = [
      { input: "S", output: ["_END_", "b", "c"] },
      { input: "C", output: ["_END_", "a", "b", "c"] },
      { input: "B", output: ["d"] },
    ];

    for (const example of examples) {
      const actualOutput = follow(example.input);
      expect(actualOutput.length).toEqual(example.output.length);
      expect(actualOutput).toEqual(expect.arrayContaining(example.output));
    }
  });
});
