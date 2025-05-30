import { tokenize } from "../tokenizer";

describe("token:literal_string", () => {
  it("should be tokenized correctly", () => {
    const examples = [
      `"hello world";`,
      `"hello\\tworld\\n";`,
      `r"hello world 汉字";`,
      `c"hello world";`,
    ];

    const tokens = tokenize(examples.join("\n"));

    for (let i = 0; i < examples.length; i++) {
      const rawExample = examples[i].trim();
      const example = rawExample.substring(0, rawExample.length - 1);
      const token = tokens[i * 2];

      expect(token.type).toEqual("literal_string");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });

  it("should be tokenized correctly (multi-line)", () => {
    const [ token ] = tokenize(
      [
        `"this is a"`,
        `"multi-line string.";`,
      ].join("\n"),
    );

    expect(token.type).toEqual("literal_string");
    expect(token.raw).toEqual([
      `"this is a"`,
      `"multi-line string."`,
    ].join("\n"));
    expect(token.start).toEqual({ line: 1, char: 1 });
    expect(token.end).toEqual({ line: 2, char: 21 });
  });

  it("should be tokenized correctly (multi-line, prefixed)", () => {
    const [ token ] = tokenize(
      [
        `c"this is a"`,
        ` "multi-line string.";`,
      ].join("\n"),
    );

    expect(token.type).toEqual("literal_string");
    expect(token.raw).toEqual([
      `c"this is a"`,
      ` "multi-line string."`,
    ].join("\n"));
    expect(token.start).toEqual({ line: 1, char: 1 });
    expect(token.end).toEqual({ line: 2, char: 22 });
  });
});
