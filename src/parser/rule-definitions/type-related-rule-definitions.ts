import { AstNodeRuleDefinition } from "./types";
import { listOf } from "./utilities";

export const typeRelatedRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "contract_declaration_statement",
    rule: [
      ["keyword_pact", "local_identifier", "symbol_(", "symbol_)", "symbol_=", "symbol_{", "symbol_}", "symbol_;"],
      ["keyword_pact", "local_identifier", "symbol_(", "func_parameters", "symbol_)", "symbol_=", "symbol_{", "symbol_}", "symbol_;"],
      ["keyword_pact", "local_identifier", "symbol_(", "symbol_)", "symbol_=", "symbol_{", "contract_constraints", "symbol_}", "symbol_;"],
      ["keyword_pact", "local_identifier", "symbol_(", "func_parameters", "symbol_)", "symbol_=", "symbol_{", "contract_constraints", "symbol_}", "symbol_;"],
    ],
  },
  ...listOf({
    type: "contract_constraint",
    plural: "contract_constraints",
    splitter: "symbol_,",
    rule: [
      ["expression", "keyword_is", "type_expression"],
    ]
  }),


  {
    type: "type_declaration_statement",
    rule: [
      ["type_declaration_statement_"],
      ["annotations", "type_declaration_statement_"],
    ],
  },
  {
    type: "type_declaration_statement_",
    rule: [
      ["keyword_type", "local_identifier", "symbol_;"],
      ["keyword_type", "local_identifier", "symbol_=", "type_expression", "symbol_;"],
      ["keyword_type", "local_identifier", "symbol_[", "template_parameters", "symbol_]", "symbol_=", "type_expression", "symbol_;"],
    ],
    transparentIf: [
      { always: true },
    ],
  },

  ...listOf({
    type: "template_parameter",
    plural: "template_parameters",
    splitter: "symbol_,",
    rule: [
      ["local_identifier"],
      ["local_identifier", "symbol_:", "type_expression"],
    ],
  }),


  {
    type: "type_expression",
    rule: [
      ["keyword_const", "type_expression_"],
      ["type_expression_"],
    ],
  },
  {
    type: "type_expression_",
    rule: [
      ["single_type_expression"],
      ["template_type_expression"],
      ["enum_type_declaration"],
      ["union_type_declaration"],
      ["struct_type_declaration"],
      ["func_type_declaration"],
    ],
    transparentIf: [
      { always: true },
    ],
  },

  {
    type: "single_type_expression",
    rule: [
      ["global_identifier"],
    ],
  },

  {
    type: "template_type_expression",
    rule: [
      ["global_identifier", "symbol_[", "type_arguments", "symbol_]"],
    ],
  },

  ...listOf({
    type: "type_argument",
    plural: "type_arguments",
    splitter: "symbol_,",
    rule: [
      ["type_expression"],
      ["expression"],
    ]
  }),

  {
    type: "enum_type_declaration",
    rule: [
      ["keyword_enum", "symbol_{", "enum_items", "symbol_}"],
    ],
  },
  ...listOf({
    type: "enum_item",
    plural: "enum_items",
    splitter: "symbol_,",
    rule: [
      ["local_identifier", "symbol_=", "expression"],
      ["local_identifier"],
    ]
  }),

  {
    type: "union_type_declaration",
    rule: [
      ["keyword_union", "symbol_{", "union_members", "symbol_}"],
    ],
  },
  ...listOf({
    type: "union_member",
    plural: "union_members",
    splitter: "symbol_,",
    rule: [
      ["common_member"],
    ]
  }),

  {
    type: "struct_type_declaration",
    rule: [
      ["keyword_struct", "symbol_{", "struct_members", "symbol_}"],
    ],
  },
  ...listOf({
    type: "struct_member",
    plural: "struct_members",
    splitter: "symbol_,",
    rule: [
      ["friend_member"],
      ["common_member"],
    ]
  }),
  {
    type: "friend_member",
    rule: [
      ["keyword_friend", "global_identifier"],
    ],
  },
  {
    type: "common_member",
    rule: [
      ["struct_type_declaration"],
      ["union_type_declaration"],
      ["access_modifier", "local_identifier", "symbol_:", "type_expression"],
    ],
  },
  {
    type: "access_modifier",
    rule: [
      ["keyword_public"],
      ["keyword_private"],
    ],
  },
  {
    type: "func_type_declaration",
    rule: [
      ["keyword_func", "symbol_(", "symbol_)", "symbol_->", "func_return_type"],
      ["keyword_func", "symbol_(", "func_parameters", "symbol_)", "symbol_->", "func_return_type"],
    ],
  },
];
