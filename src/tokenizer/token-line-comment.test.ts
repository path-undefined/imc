import { tokenize } from "./tokenizer";

describe("token:line_comment", () => {
  it("should not be tokenized", () => {
    const tokens = tokenize(
      "// These are useless\n" +
      "  //// No use",
    );

    expect(tokens).toEqual([]);
  });

  it("should also work after other content", () => {
    const tokens = tokenize(
      "12 // This number is useless",
    );

    expect(tokens).toEqual([
      {
        type: "literal_dec_integer",
        raw: "12",
        start: { line: 1, char: 1 },
        end: { line: 1, char: 3 },
      }
    ]);
  });
});
