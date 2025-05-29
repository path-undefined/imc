import { tokenize } from "../tokenizer";

describe("token:literal_string", () => {
  it("should be tokenized correctly", () => {
    const examples = [
      "'a'",
      "'\\n'",
      "r'汉'",
      "c'e'",
    ];

    const tokens = tokenize(
      examples.join("\n"),
    );

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_char");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });
});
