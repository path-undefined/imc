import { AstNodeRuleDefinition } from "./rule-definitions";

export const importExportRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "import_statement",
    rule: [
      ["keyword_import", "global_identifier", "alias_phrase", "symbol_;"],
      ["keyword_import", "global_identifier", "symbol_;"],
    ],
  },
  {
    type: "export_statement",
    rule: [
      ["keyword_export", "global_identifier", "alias_phrase", "symbol_;"],
      ["keyword_export", "global_identifier", "symbol_;"],
    ],
  },
  {
    type: "alias_phrase",
    rule: [
      ["keyword_as", "local_identifier"],
    ],
  },
];
