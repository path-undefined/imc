import { tokenize } from "./tokenizer";

describe("token:literal_float", () => {
  it("should be tokenized correctly (decimal)", () => {
    const examples = [
      "1.",
      ".1",
      "1.2",
      "1_1.2",
      "1.2_2",
      "1_1.2_2",
      "1e2",
      "1e-2",
      "1.e2",
      "1.e-2",
      ".1e2",
      ".1e-2",
      "1.2e3",
      "1.2e-3",
      "1_1.2e3",
      "1_1.2e-3",
      "1.2_2e3",
      "1.2_2e-3",
      "1_1.2_2e3",
      "1_1.2_2e-3",
      "1_1.2_2e-3f16",
      "1_1.2_2e-3f32",
      "1_1.2_2e-3f64",
      "1_1.2_2e-3f128",
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
      "0x1_2.Fp3",
      "0x1_2.Fp-3",
      "0x1.E_Fp3",
      "0x1.E_Fp-3",
      "0x1_2.E_Fp3",
      "0x1_2.E_Fp-3",
      "0x1_2.E_Fp-3f16",
      "0x1_2.E_Fp-3f32",
      "0x1_2.E_Fp-3f64",
      "0x1_2.E_Fp-3f128",
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
