import * as fs from "node:fs";
import { tokenize } from "../tokenizer/tokenizer";
import { parse } from "./parser";

describe("parser", () => {
  it("should parse source code, the results should match snapshots", () => {
    const sourceFilePaths = [
      "./src/examples/mod01_HelloWorld.imc",
      "./src/examples/mod02_Template.imc",
    ];

    for (const sourceFilePath of sourceFilePaths) {
      const sourceCode = fs.readFileSync(sourceFilePath, { encoding: "utf8" });
      const tokens = tokenize(sourceCode);
      const ast = parse(tokens);

      expect(JSON.stringify(ast, null, 2), `Compile result of "${sourceFilePath}" doesn't match snapshot`).toMatchSnapshot();
    }
  });
});
