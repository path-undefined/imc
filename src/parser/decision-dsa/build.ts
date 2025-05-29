import * as fs from "node:fs";
import * as path from "node:path";
import { log } from "../../logger/logger";
import { tokenDefinitions } from "../../tokenizer/token-definitions/token-definitions";
import { ruleDefinitions } from "../rule-definitions/rule-definitions";
import { buildDecisionDsa } from "./build-decision-dsa";

const dsa = buildDecisionDsa(tokenDefinitions, ruleDefinitions);

log("debug", "Writing DSA as JSON file ...");
fs.writeFileSync(path.join(__dirname, "decision-dsa.json"), JSON.stringify(dsa), { encoding: "utf-8" });
