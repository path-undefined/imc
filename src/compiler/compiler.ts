import * as fs from "node:fs";
import { CompilingConfig } from "./types";

import { tokenize } from "../tokenizer/tokenizer";
import { tokenDefinitions } from "../tokenizer/token-definitions";

import { parse } from "../parser/parser";
import { DecisionDsa } from "../parser/decision-dsa/types";
import * as decisionDsa from "../parser/decision-dsa.json";

export function compile(config: CompilingConfig) {
  const sourceFilePaths = config.sourceFilePaths;

  for (const sourceFilePath of sourceFilePaths) {
    const sourceFileContent = fs.readFileSync(sourceFilePath, { encoding: "utf8" });
    const tokens = tokenize(sourceFileContent, { tokenDefinitions });
    const ast = parse(tokens, { decisionDsa: decisionDsa as DecisionDsa });
  }
}
