import { tokenDefinitions } from "./token-definitions";
import { tokenize } from "./tokenizer";

describe("token:literal_integer", () => {
  it("should be tokenized correctly (decimal)", () => {
    const examples = [
      "1",
      "12",
      "1`2",
      "0015",
      "1`234`567`890",
      "15u",
      "15c",
      "15uc",
      "15s",
      "15us",
      "15i",
      "15ui",
      "15l",
      "15ul",
      "15ll",
      "15ull",
    ];

    const tokens = tokenize(
      examples.join("\n"),
      { tokenDefinitions },
    );

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_integer");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });
  
  it("should be tokenized correctly (hexadecimal)", () => {
    const examples = [
      "0x1",
      "0x1F",
      "0xF`9",
      "0x00EF",
      "0x0123`4567`89AB`CDEF",
      "0x1Au",
      "0x1Ac",
      "0x1Auc",
      "0x1As",
      "0x1Aus",
      "0x1Ai",
      "0x1Aui",
      "0x1Al",
      "0x1Aul",
      "0x1All",
      "0x1Aull",
    ];

    const tokens = tokenize(
      examples.join("\n"),
      { tokenDefinitions },
    );

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_integer");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });

  it("should be tokenized correctly (octal)", () => {
    const examples = [
      "0o1",
      "0o17",
      "0o4`4",
      "0o002",
      "0o1`234`567",
      "0o14u",
      "0o14c",
      "0o14uc",
      "0o14s",
      "0o14us",
      "0o14i",
      "0o14ui",
      "0o14l",
      "0o14ul",
      "0o14ll",
      "0o14ull",
    ];

    const tokens = tokenize(
      examples.join("\n"),
      { tokenDefinitions },
    );

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_integer");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });
  
  it("should be tokenized correctly (binary)", () => {
    const examples = [
      "0b0",
      "0b01",
      "0b0010`0000`0110`0000",
      "0b10u",
      "0b10c",
      "0b10uc",
      "0b10s",
      "0b10us",
      "0b10i",
      "0b10ui",
      "0b10l",
      "0b10ul",
      "0b10ll",
      "0b10ull",
    ];

    const tokens = tokenize(
      examples.join("\n"),
      { tokenDefinitions },
    );

    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const token = tokens[i];

      expect(token.type).toEqual("literal_integer");
      expect(token.raw).toEqual(example);
      expect(token.start).toEqual({ line: i + 1, char: 1 });
      expect(token.end).toEqual({ line: i + 1, char: 1 + example.length });
    }
  });
});
