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
      ["global_statement", "global_statements"],
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
      ["definition_statement"],
    ],
    omitIf: [
      { always: true },
    ],
  },

  {
    type: "import_statement",
    rule: [
      ["keyword_import", "full_identifier", "alias_phrase", "symbol_;"],
      ["keyword_import", "full_identifier", "symbol_;"],
    ],
  },
  {
    type: "export_statement",
    rule: [
      ["keyword_export", "full_identifier", "alias_phrase", "symbol_;"],
      ["keyword_export", "full_identifier", "symbol_;"],
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

  {
    type: "definition_statement",
    rule: [
      ["enum_definition_statement"],
      // ["type_definition_statement"],
      // ["struct_definition_statement"],
      // ["union_definition_statement"],
      // ["val_definition_statement"],
      // ["fn_definition_statement"],
    ],
    omitIf: [
      { always: true },
    ],
  },

  {
    type: "enum_definition_statement",
    rule: [
      [
        "keyword_enum", "single_identifier", "symbol_{",
          "enumerators",
        "symbol_}",
      ]
    ],
  },
  {
    type: "enumerators",
    rule: [
      ["enumerators", "enumerator"],
      ["enumerator"],
    ],
    omitIf: [
      { parentIs: "enumerators" },
    ],
  },
  {
    type: "enumerator",
    rule: [
      ["single_identifier", "symbol_=", "literal_integer", "symbol_;"],
      ["single_identifier", "symbol_;"],
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
    omitIf: [
      { childrenAre: ["literal_integer"] },
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
    omitIf: [
      { childrenAre: ["literal_integer"] },
    ],
  },

  {
    type: "single_identifier",
    rule: [
      [ "identifier" ],
    ]
  },
  {
    type: "full_identifier",
    rule: [
      [ "full_identifier", "symbol_::", "identifier" ],
      [ "identifier" ],
    ],
    omitIf: [
      { parentIs: "full_identifier" },
    ],
  },
];
