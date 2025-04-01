import { AstNodeRuleDefinition } from "./rule-definitions";

export const importExportRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "import_statement",
    rule: [
      ["keyword_import", "compound_identifier", "alias_phrase", "symbol_;"],
      ["keyword_import", "compound_identifier", "symbol_;"],
    ],
  },
  {
    type: "export_statement",
    rule: [
      ["keyword_export", "compound_identifier", "alias_phrase", "symbol_;"],
      ["keyword_export", "compound_identifier", "symbol_;"],
    ],
  },
  {
    type: "alias_phrase",
    rule: [
      ["keyword_as", "single_identifier"],
    ],
    omitIf: [
      { always: true },
    ],
  },
];
