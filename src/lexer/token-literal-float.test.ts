import { tokenize } from "./lexer";

describe("token:literal-float", () => {
  it("should be tokenized correctly (decimal)", () => {
    const examples = [
      "1.",
      ".1",
      "1.2",
      "1`1.2",
      "1.2`2",
      "1`1.2`2",
      "1e2",
      "1e-2",
      "1.e2",
      "1.e-2",
      ".1e2",
      ".1e-2",
      "1.2e3",
      "1.2e-3",
      "1`1.2e3",
      "1`1.2e-3",
      "1.2`2e3",
      "1.2`2e-3",
      "1`1.2`2e3",
      "1`1.2`2e-3",
      "1`1.2`2e-3f",
      "1`1.2`2e-3d",
      "1`1.2`2e-3l",
    ];

    const tokens = tokenize(examples.join("\n"));

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_float");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });

  it("should be tokenized correctly (decimal)", () => {
    const examples = [
      "0xFp2",
      "0xFp-2",
      "0xF.p2",
      "0xF.p-2",
      "0x.Fp2",
      "0x.Fp-2",
      "0xA.Fp3",
      "0xA.Fp-3",
      "0x1`2.Fp3",
      "0x1`2.Fp-3",
      "0x1.E`Fp3",
      "0x1.E`Fp-3",
      "0x1`2.E`Fp3",
      "0x1`2.E`Fp-3",
      "0x1`2.E`Fp-3f",
      "0x1`2.E`Fp-3d",
      "0x1`2.E`Fp-3l",
    ];

    const tokens = tokenize(examples.join("\n"));

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_float");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });
});
