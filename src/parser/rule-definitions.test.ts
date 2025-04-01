import { tokenDefinitions } from "../lexer/token-definitions";
import { ruleDefinitions } from "./rule-definitions";

describe("rule-definitions", () => {
  let undefinedReferences: string[];
  let unusedDefinitions: string[];

  beforeAll(() => {
    undefinedReferences = [];
    unusedDefinitions = [];
    
    const usedReferences: string[] = [];

    function forEachDefinitionRecursively(ref: string, parentRef: string, rule: string[]) {
      if (usedReferences.includes(ref)) {
        return;
      }

      const ruleDef = ruleDefinitions.find((r) => r.type === ref);

      if (!ruleDef) {
        const tokenDef = tokenDefinitions.find((t) => t.type === ref);

        if (!tokenDef) {
          undefinedReferences.push(`Undefined ${ref} in ${parentRef} -> ${rule.join(" ")}`);
        } else {
          usedReferences.push(ref);
        }
      } else {
        usedReferences.push(ref);

        for (const rule of ruleDef.rule) {
          for (const r of rule) {
            forEachDefinitionRecursively(r, ruleDef.type, rule);
          }
        }
      }
    }

    forEachDefinitionRecursively("global_statements", "", []);

    unusedDefinitions = [
      ...tokenDefinitions
        .filter((t) => !["line_comment", "trash_character"].includes(t.type))
        .filter((t) => !usedReferences.includes(t.type))
        .map((t) => `    Unused token ${t.type}`),
      ...ruleDefinitions
        .filter((r) => !usedReferences.includes(r.type))
        .map((r) => `    Unused rule ${r.type}`),
    ];
  });

  it("should not contain any unknown references", () => {
    expect(undefinedReferences.length, `\nUndefined references:\n    ${undefinedReferences.join("\n    ")}\n`).toBe(0);
  });

  it("should not contain any unused definitions", () => {
    expect(unusedDefinitions.length, `\nUnused definitions:\n    ${unusedDefinitions.join("\n    ")}\n`).toBe(0);
  });
});