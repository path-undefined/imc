export type AstNodeRuleDefinition = {
  type: string;
  rule: string[][];
}

export const ruleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "global_statements",
    rule: [
      ["global_statement", "global_statements"],
      ["global_statement"],
    ],
  },
  {
    type: "global_statement",
    rule: [
      ["import_statement"],
      ["export_statement"],
      ["definition_statement"],
    ],
  },

  {
    type: "import_statement",
    rule: [
      ["keyword_import", "identifier", "alias_phrase", "symbol_;"],
      ["keyword_import", "identifier", "symbol_;"],
    ],
  },
  {
    type: "export_statement",
    rule: [
      ["keyword_export", "identifier", "alias_phrase", "symbol_;"],
      ["keyword_export", "identifier", "symbol_;"],
    ],
  },
  {
    type: "alias_phrase",
    rule: [
      ["keyword_as", "identifier"],
    ],
  },

  {
    type: "definition_statement",
    rule: [
      ["expression", "symbol_;"],
    ],
  },

  {
    type: "expression",
    rule: [
      ["dash_op_expression"],
    ],
  },
  {
    type: "dash_op_expression",
    rule: [
      ["dash_op_expression", "symbol_+", "dot_op_expression"],
      ["dash_op_expression", "symbol_-", "dot_op_expression"],
      ["dot_op_expression"]
    ],
  },
  {
    type: "dot_op_expression",
    rule: [
      ["dot_op_expression", "symbol_*", "literal_integer"],
      ["dot_op_expression", "symbol_/", "literal_integer"],
      ["dot_op_expression", "symbol_%", "literal_integer"],
      ["literal_integer"]
    ],
  },
];
