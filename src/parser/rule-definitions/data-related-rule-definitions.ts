import { AstNodeRuleDefinition } from "./rule-definitions";

export const dataRelatedRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "data_declaration_statement",
    rule: [
      ["data_declaration_statement_"],
      ["annotations", "data_declaration_statement_"],
    ],
  },
  {
    type: "data_declaration_statement_",
    rule: [
      ["var_declaration_statement"],
      ["func_declaration_statement"],
    ],
    transparentIf: [
      { always: true },
    ],
  },
  {
    type: "var_declaration_statement",
    rule: [
      ["keyword_var", "local_identifier", "symbol_:", "type_expression", "symbol_;"],
    ],
  },
  {
    type: "func_declaration_statement",
    rule: [
      ["keyword_func", "local_identifier", "symbol_(", "symbol_)", "symbol_:", "func_return_type", "symbol_;"],
      ["keyword_func", "local_identifier", "symbol_(", "symbol_[", "template_parameters", "symbol_]", "symbol_)", "symbol_:", "func_return_type", "symbol_;"],
      ["keyword_func", "local_identifier", "symbol_(", "symbol_[", "template_parameters", "symbol_]", "symbol_;", "symbol_)", "symbol_:", "func_return_type", "symbol_;"],
      ["keyword_func", "local_identifier", "symbol_(", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "symbol_;"],
      ["keyword_func", "local_identifier", "symbol_(", "symbol_[", "template_parameters", "symbol_]", "symbol_;", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "symbol_;"],
    ],
  },

  {
    type: "data_definition_statement",
    rule: [
      ["data_definition_statement_"],
      ["annotations", "data_definition_statement_"],
    ],
  },
  {
    type: "data_definition_statement_",
    rule: [
      ["var_definition_statement"],
      ["func_definition_statement"],
    ],
    transparentIf: [
      { always: true },
    ],
  },
  {
    type: "var_definition_statement",
    rule: [
      ["keyword_var", "local_identifier", "symbol_:", "type_expression", "symbol_=", "expression", "symbol_;"],
    ],
  },
  {
    type: "func_definition_statement",
    rule: [
      ["keyword_func", "local_identifier", "symbol_(", "symbol_)", "symbol_:", "func_return_type", "block"],
      ["keyword_func", "local_identifier", "symbol_(", "symbol_[", "template_parameters", "symbol_]", "symbol_)", "symbol_:", "func_return_type", "block"],
      ["keyword_func", "local_identifier", "symbol_(", "symbol_[", "template_parameters", "symbol_]", "symbol_;", "symbol_)", "symbol_:", "func_return_type", "block"],
      ["keyword_func", "local_identifier", "symbol_(", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "block"],
      ["keyword_func", "local_identifier", "symbol_(", "symbol_[", "template_parameters", "symbol_]", "symbol_;", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "block"],
    ],
  },

  {
    type: "block",
    rule: [
      ["symbol_{", "symbol_}"],
      ["symbol_{", "block_statements", "symbol_}"],
    ],
  },
  {
    type: "block_statements",
    rule: [
      ["block_statements", "block_statement"],
      ["block_statement"],
    ],
    transparentIf: [
      { parentIs: "block_statements" },
      { parentIs: "block" },
    ],
  },
  {
    type: "block_statement",
    rule: [
      ["type_declaration_statement"],
      ["data_declaration_statement"],
      ["data_definition_statement"],
      ["expression_statement"],
      ["assignment_statement"],
      ["decision_statement"],
      ["loop_statement"],
      ["continue_statement"],
      ["break_statement"],
      ["return_statement"],
    ],
    transparentIf: [
      { always: true },
    ],
  },
  {
    type: "expression_statement",
    rule: [
      ["expression", "symbol_;"],
    ],
  },
  {
    type: "assignment_statement",
    rule: [
      ["left_value", "symbol_=", "expression", "symbol_;"],
    ],
  },
  {
    type: "left_value",
    rule: [
      ["global_identifier"],
      ["get_value_expression"],
      ["array_indexing_expression"],
      ["member_accessing_expression"],
    ],
  },
  {
    type: "decision_statement",
    rule: [
      ["keyword_decision", "if_fragments"],
      ["keyword_decision", "if_fragments", "otherwise_fragment"],
      ["keyword_decision", "about_fragment", "case_fragments"],
      ["keyword_decision", "about_fragment", "case_fragments", "otherwise_fragment"],
    ],
  },
  {
    type: "if_fragments",
    rule: [
      ["if_fragments", "if_fragment"],
      ["if_fragment"],
    ],
    transparentIf: [
      { parentIs: "if_fragments" },
    ],
  },
  {
    type: "if_fragment",
    rule: [
      ["keyword_if", "symbol_(", "expression", "symbol_)"],
      ["keyword_if", "symbol_(", "expression", "symbol_)", "block"],
    ],
  },
  {
    type: "about_fragment",
    rule: [
      ["keyword_about", "symbol_(", "expression", "symbol_)"],
    ],
  },  {
    type: "case_fragments",
    rule: [
      ["case_fragments", "case_fragment"],
      ["case_fragment"],
    ],
    transparentIf: [
      { parentIs: "case_fragments" },
    ],
  },
  {
    type: "case_fragment",
    rule: [
      ["keyword_case", "symbol_(", "expression", "symbol_)"],
      ["keyword_case", "symbol_(", "expression", "symbol_)", "block"],
    ],
  },
  {
    type: "otherwise_fragment",
    rule: [
      ["keyword_otherwise", "block"],
    ],
  },
  {
    type: "loop_statement",
    rule: [
      ["keyword_loop", "do_fragment"],

      ["keyword_loop", "while_fragment", "do_fragment"],
      ["keyword_loop", "do_fragment", "while_fragment"],
      ["keyword_loop", "with_fragment", "do_fragment"],
      ["keyword_loop", "do_fragment", "then_fragment"],

      ["keyword_loop", "with_fragment", "while_fragment", "do_fragment"],
      ["keyword_loop", "with_fragment", "do_fragment", "while_fragment"],
      ["keyword_loop", "while_fragment", "do_fragment", "then_fragment"],
      ["keyword_loop", "do_fragment", "while_fragment", "then_fragment"],
      ["keyword_loop", "with_fragment", "do_fragment", "then_fragment"],

      ["keyword_loop", "with_fragment", "while_fragment", "do_fragment", "then_fragment"],
      ["keyword_loop", "with_fragment", "do_fragment", "while_fragment", "then_fragment"],
    ],
  },
  {
    type: "do_fragment",
    rule: [
      ["keyword_do", "block"],
    ],
  },
  {
    type: "with_fragment",
    rule: [
      ["keyword_with", "block"],
    ],
  },
  {
    type: "while_fragment",
    rule: [
      ["keyword_while", "symbol_(", "expression", "symbol_)"],
    ],
  },
  {
    type: "then_fragment",
    rule: [
      ["keyword_then", "block"],
    ],
  },
  {
    type: "continue_statement",
    rule: [
      ["keyword_continue", "symbol_;"],
    ],
  },
  {
    type: "break_statement",
    rule: [
      ["keyword_break", "symbol_;"],
    ],
  },
  {
    type: "return_statement",
    rule: [
      ["keyword_return", "expression", "symbol_;"],
    ],
  },
];