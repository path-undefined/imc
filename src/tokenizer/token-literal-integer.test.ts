import { tokenize } from "./tokenizer";

describe("token:literal_*_integer", () => {
  it("should be tokenized correctly (decimal)", () => {
    const examples = [
      "1",
      "12",
      "1_2",
      "0015",
      "1_234_567_890",
      "15i8",
      "15ui8",
      "15i16",
      "15ui16",
      "15i32",
      "15ui32",
      "15i64",
      "15ui64",
      "15s",
      "15us",
    ];

    const tokens = tokenize(examples.join("\n"));

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_dec_integer");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });
  
  it("should be tokenized correctly (hexadecimal)", () => {
    const examples = [
      "0x1",
      "0x1F",
      "0xF_9",
      "0x00EF",
      "0x0123_4567_89AB_CDEF",
      "0x1Ai8",
      "0x1Aui8",
      "0x1Ai16",
      "0x1Aui16",
      "0x1Ai32",
      "0x1Aui32",
      "0x1Ai64",
      "0x1Aui64",
      "0x1As",
      "0x1Aus",
    ];

    const tokens = tokenize(examples.join("\n"));

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_hex_integer");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });

  it("should be tokenized correctly (octal)", () => {
    const examples = [
      "0o1",
      "0o17",
      "0o4_4",
      "0o002",
      "0o1_234_567",
      "0o14i8",
      "0o14ui8",
      "0o14i16",
      "0o14ui16",
      "0o14i32",
      "0o14ui32",
      "0o14i64",
      "0o14ui64",
      "0o14s",
      "0o14us",
    ];

    const tokens = tokenize(examples.join("\n"));

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_oct_integer");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });
  
  it("should be tokenized correctly (binary)", () => {
    const examples = [
      "0b0",
      "0b01",
      "0b0010_0000_0110_0000",
      "0b10i8",
      "0b10ui8",
      "0b10i16",
      "0b10ui16",
      "0b10i32",
      "0b10ui32",
      "0b10i64",
      "0b10ui64",
      "0b10s",
      "0b10us",
    ];

    const tokens = tokenize(examples.join("\n"));

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_bin_integer");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });
});
