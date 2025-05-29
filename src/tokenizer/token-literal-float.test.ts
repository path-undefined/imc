import { tokenize } from "./tokenizer";

describe("token:literal_*_float", () => {
  it("should be tokenized correctly (decimal)", () => {
    const examples = [
      "0.9",
      "0.99",
      "00.9",
      "00.99",
      "0_1.9",
      "1.0_9",
      "1_0.0_9",
      "0.9e3",
      "0.9e-3",
      "1_0.9e3",
      "1_0.9e-3",
      "1.0_9e3",
      "1.0_9e-3",
      "1_0.0_9e3",
      "1_0.0_9e-3",
      "1_0.0_9e-3f16",
      "1_0.0_9e-3f32",
      "1_0.0_9e-3f64",
      "1_0.0_9e-3f128",
    ];

    const tokens = tokenize(examples.join("\n"));

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_dec_float");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });

  it("should be tokenized correctly (hexadecimal)", () => {
    const examples = [
      "0x0.Fp3",
      "0x0.Fp-3",
      "0x00.Fp3",
      "0x00.Fp-3",
      "0x0.FFp3",
      "0x0.FFp-3",
      "0x00.FFp3",
      "0x00.FFp-3",
      "0x1_0.Fp3",
      "0x1_0.Fp-3",
      "0x1.0_Fp3",
      "0x1.0_Fp-3",
      "0x1_0.0_Fp3",
      "0x1_0.0_Fp-3",
      "0x1_0.0_Fp-3f16",
      "0x1_0.0_Fp-3f32",
      "0x1_0.0_Fp-3f64",
      "0x1_0.0_Fp-3f128",
    ];

    const tokens = tokenize(examples.join("\n"));

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_hex_float");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });
});
