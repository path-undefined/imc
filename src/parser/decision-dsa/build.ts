import * as fs from "node:fs";
import * as path from "node:path";
import { tokenDefinitions } from "../../lexer/token-definitions";
import { ruleDefinitions } from "../rule-definitions/rule-definitions";
import { buildDecisionDsa } from "./build-decision-dsa";

const dsa = buildDecisionDsa(tokenDefinitions, ruleDefinitions);

console.log("Writing DSA as JSON file ...");
fs.writeFileSync(path.join(__dirname, "..", "decision-dsa.json"), JSON.stringify(dsa), { encoding: "utf-8" });
