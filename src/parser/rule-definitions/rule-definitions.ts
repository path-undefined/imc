import { AstNodeRuleDefinition } from "./types";
import { annotationRelatedRuleDefinitions } from "./annotation-related-rule-definitions";
import { dataRelatedRuleDefinitions } from "./data-related-rule-definitions";
import { expressionRelatedRuleDefinitions } from "./expression-related-rule-definitions";
import { identifierRelatedRuleDefinitions } from "./identifier-related-rule-definitions";
import { moduleRelatedRuleDefinitions } from "./module-related-rule-definitions";
import { typeRelatedRuleDefinitions } from "./type-related-rule-definitions";

export const ruleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "global_statements",
    rule: [
      ["global_statements", "global_statement"],
      ["global_statement"],
    ],
    transparentIf: [
      { parentIs: "global_statements" },
    ],
  },
  {
    type: "global_statement",
    rule: [
      ["import_statement"],
      ["export_statement"],
      ["include_statement"],
      ["contract_declaration_statement"],
      ["type_declaration_statement"],
      ["data_declaration_statement"],
      ["data_definition_statement"],
    ],
    transparentIf: [
      { always: true },
    ],
  },

  ...moduleRelatedRuleDefinitions,
  ...typeRelatedRuleDefinitions,
  ...dataRelatedRuleDefinitions,

  ...annotationRelatedRuleDefinitions,
  ...identifierRelatedRuleDefinitions,
  ...expressionRelatedRuleDefinitions,
];
