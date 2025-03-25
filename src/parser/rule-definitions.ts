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
      ["definition_statement"],
    ],
    omitIf: [
      { always: true },
    ],
  },

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

  {
    type: "definition_statement",
    rule: [
      ["type_definition_statement"],
      // ["var_definition_statement"],
      // ["fn_definition_statement"],
    ],
    omitIf: [
      { always: true },
    ],
  },

  {
    type: "type_definition_statement",
    rule: [
      ["keyword_type", "single_identifier", "symbol_=", "type_expression", "symbol_;"],
      ["keyword_type", "single_identifier", "symbol_<", "type_parameters", "symbol_>", "symbol_=", "type_expression", "symbol_;"],
      ["keyword_type", "single_identifier", "symbol_<", "type_parameters", "symbol_,", "symbol_>", "symbol_=", "type_expression", "symbol_;"],
    ],
  },
  {
    type: "type_parameters",
    rule: [
      ["type_parameters", "symbol_,", "type_parameter"],
      ["type_parameter"],
    ],
    omitIf: [
      { parentIs: "type_parameters" },
    ],
  },
  {
    type: "type_parameter",
    rule: [
      ["single_identifier"],
      ["keyword_size", "single_identifier"],
    ],
  },
  {
    type: "type_expression",
    rule: [
      ["single_type_expression"],
      ["enum_definition_type_expression"],
      // ["struct_definition_type_expression"],
      // ["function_definition_type_expression"],
      ["generic_type_expression"],
    ],
  },
  {
    type: "single_type_expression",
    rule: [
      ["compound_identifier"],
    ],
  },
  {
    type: "enum_definition_type_expression",
    rule: [
      ["keyword_enum", "symbol_{", "enum_items", "symbol_}"],
      ["keyword_enum", "symbol_{", "enum_items", "symbol_,", "symbol_}"],
    ],
  },
  {
    type: "enum_items",
    rule: [
      ["enum_items", "symbol_,", "enum_item"],
      ["enum_item"],
    ],
    omitIf: [
      { parentIs: "enum_items" },
    ],
  },
  {
    type: "enum_item",
    rule: [
      ["single_identifier", "symbol_=", "const_expression"],
      ["single_identifier"],
    ],
  },
  {
    type: "generic_type_expression",
    rule: [
      ["compound_identifier", "symbol_<", "type_arguments", "symbol_>"],
      ["compound_identifier", "symbol_<", "type_arguments", "symbol_,", "symbol_>"],
    ],
  },
  {
    type: "type_arguments",
    rule: [
      ["type_arguments", "symbol_,", "type_argument"],
      ["type_argument"],
    ],
    omitIf: [
      { parentIs: "type_arguments" },
    ],
  },
  {
    type: "type_argument",
    rule: [
      ["type_expression"],
      ["size_expression"],
    ],
  },
  {
    type: "size_expression",
    rule: [
      ["const_expression"],
    ],
  },

  /*
  {
    type: "var_definition_statement",
    rule: [
      ["keyword_var", "single_identifier", "symbol_:", "type_expression", "symbol_;"],
      ["kepword_var", "single_identifier", "symbol_:", "type_expression", "symbol_=", "expression", "symbol_;"]
    ],
  },

  {
    type: "expression",
    rule: [
      ["literal_integer"],
    ],
  },
  */
  {
    type: "const_expression",
    rule: [
      ["literal_integer"],
    ],
  },

  /*
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
  */

  {
    type: "single_identifier",
    rule: [
      [ "identifier" ],
    ]
  },
  {
    type: "compound_identifier",
    rule: [
      [ "compound_identifier", "symbol_::", "identifier" ],
      [ "identifier" ],
    ],
    omitIf: [
      { parentIs: "compound_identifier" },
    ],
  },
];
