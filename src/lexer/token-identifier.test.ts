import { tokenize } from "./lexer";

describe("token:literal-string", () => {
  it("should be tokenized correctly", () => {
    const examples = [
      "variable",
      "camelCase",
      "PascalCase",
      "snake_case",
      "SCREAMING_SNAKE_CASE",
      "__variable2__",
      "_2",
      "forKeyword",
    ];

    const tokens = tokenize(examples.join("\n"));

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("identifier");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });
});
