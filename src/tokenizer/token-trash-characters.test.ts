import { tokenize } from "./tokenizer";

describe("token:trash_characters", () => {
  it("should not be tokenized", () => {
    const tokens = tokenize(
      " \t\r\n",
    );

    expect(tokens).toEqual([]);
  });

  it("should also work between other contents", () => {
    const tokens = tokenize(
      "1 \t 2 \r 3 \n 4 \r\n 5",
    );

    expect(tokens).toEqual([
      {
        type: "literal_dec_integer",
        raw: "1",
        start: { line: 1, char: 1 },
        end: { line: 1, char: 2 },
      },
      {
        type: "literal_dec_integer",
        raw: "2",
        start: { line: 1, char: 5 },
        end: { line: 1, char: 6 },
      },
      {
        type: "literal_dec_integer",
        raw: "3",
        start: { line: 2, char: 2 },
        end: { line: 2, char: 3 },
      },
      {
        type: "literal_dec_integer",
        raw: "4",
        start: { line: 3, char: 2 },
        end: { line: 3, char: 3 },
      },
      {
        type: "literal_dec_integer",
        raw: "5",
        start: { line: 4, char: 2 },
        end: { line: 4, char: 3 },
      },
    ]);
  });
});
