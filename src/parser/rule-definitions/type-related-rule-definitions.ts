import { AstNodeRuleDefinition } from "./rule-definitions";

export const typeRelatedRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "type_declaration_statement",
    rule: [
      ["keyword_type", "local_identifier", "symbol_=", "type_expression", "symbol_;"],
      ["keyword_type", "local_identifier", "symbol_<", "template_parameters", "symbol_>", "symbol_=", "type_expression", "symbol_;"],
    ],
  },
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
      ["global_identifier", "symbol_<", "type_arguments", "symbol_>"],
      ["global_identifier", "symbol_<", "type_arguments", "symbol_,", "symbol_>"],
    ],
  },
  {
    type: "type_arguments",
    rule: [
      ["type_arguments", "symbol_,", "type_argument"],
      ["type_argument"],
    ],
    transparentIf: [
      { parentIs: "type_arguments" },
    ],
  },
  {
    type: "type_argument",
    rule: [
      ["type_expression"],
      ["expression"],
    ],
  },
  {
    type: "enum_type_declaration",
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
    transparentIf: [
      { parentIs: "enum_items" },
    ],
  },
  {
    type: "enum_item",
    rule: [
      ["local_identifier", "symbol_=", "expression"],
      ["local_identifier"],
    ],
  },
  {
    type: "union_type_declaration",
    rule: [
      ["keyword_union", "symbol_{", "union_members", "symbol_}"],
      ["keyword_union", "symbol_{", "union_members", "symbol_,", "symbol_}"],
    ],
  },
  {
    type: "union_members",
    rule: [
      ["union_members", "symbol_,", "union_member"],
      ["union_member"],
    ],
    transparentIf: [
      { parentIs: "union_members" },
    ],
  },
  {
    type: "union_member",
    rule: [
      ["common_member"],
    ],
  },
  {
    type: "struct_type_declaration",
    rule: [
      ["keyword_struct", "symbol_{", "struct_members", "symbol_}"],
      ["keyword_struct", "symbol_{", "struct_members", "symbol_,", "symbol_}"],
    ],
  },
  {
    type: "struct_members",
    rule: [
      ["struct_members", "symbol_,", "struct_member"],
      ["struct_member"],
    ],
    transparentIf: [
      { parentIs: "struct_members" },
    ],
  },
  {
    type: "struct_member",
    rule: [
      ["keyword_extend", "type_expression"],
      ["keyword_friend", "global_identifier"],
      ["common_member"],
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
      ["keyword_func", "symbol_(", "func_parameters", "symbol_)", "symbol_->", "func_return_type"],
      ["keyword_func", "symbol_(", "func_parameters", "symbol_,", "symbol_)", "symbol_->", "func_return_type"],
      ["keyword_func", "symbol_(", "func_receiver_type", "symbol_)", "symbol_.", "symbol_(", "func_parameters", "symbol_)", "symbol_->", "func_return_type"],
      ["keyword_func", "symbol_(", "func_receiver_type", "symbol_)", "symbol_.", "symbol_(", "func_parameters", "symbol_,", "symbol_)", "symbol_->", "func_return_type"],
    ],
  },
];
