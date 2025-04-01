import * as fs from "node:fs";
import { buildDecisionDsa } from "./build-decision-dsa";
import { tokenDefinitions } from "../../lexer/token-definitions";
import { ruleDefinitions } from "../rule-definitions";
import * as path from "node:path";

const dsa = buildDecisionDsa(tokenDefinitions, ruleDefinitions);

fs.writeFileSync(path.join(__dirname, "dsa.json"), JSON.stringify(dsa), { encoding: "utf-8" });
