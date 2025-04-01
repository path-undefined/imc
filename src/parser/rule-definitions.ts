import { dataRelatedRuleDefinitions } from "./data-related-rule-definitions";
import { expressionRelatedRuleDefinitions } from "./expression-related-rule-definitions";
import { funcRelatedRuleDefinitions } from "./func-related-rule-definitions";
import { identifierRelatedRuleDefinitions } from "./identifier-related-rule-definitions";
import { importExportRuleDefinitions } from "./import-export-rule-definitions";
import { templateRelatedRuleDefinitions } from "./template-related-rule-definitions";
import { typeRelatedRuleDefinitions } from "./type-related-rule-definitions";

type OmitRule = {
  parentIs?: string;
  childrenAre?: string[];
  always?: true;
};

export type AstNodeRuleDefinition = {
  type: string;
  rule: string[][];
  omitIf?: OmitRule[];
}

export const ruleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "global_statements",
    rule: [
      ["global_statements", "global_statement"],
      ["global_statement"],
    ],
    omitIf: [
      { parentIs: "global_statements" },
    ],
  },
  {
    type: "global_statement",
    rule: [
      ["import_statement"],
      ["export_statement"],
      ["type_declaration_statement"],
      ["data_declaration_statement"],
      ["data_definition_statement"],
    ],
    omitIf: [
      { always: true },
    ],
  },

  ...importExportRuleDefinitions,
  ...typeRelatedRuleDefinitions,
  ...dataRelatedRuleDefinitions,

  ...templateRelatedRuleDefinitions,
  ...funcRelatedRuleDefinitions,
  ...identifierRelatedRuleDefinitions,
  ...expressionRelatedRuleDefinitions,
];
