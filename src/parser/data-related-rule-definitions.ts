import { AstNodeRuleDefinition } from "./rule-definitions";

export const dataRelatedRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "data_declaration_statement",
    rule: [
      ["var_declaration_statement"],
      ["func_declaration_statement"],
    ],
  },
  {
    type: "var_declaration_statement",
    rule: [
      ["keyword_var", "single_identifier", "symbol_:", "type_expression", "symbol_;"],
    ],
  },
  {
    type: "func_declaration_statement",
    rule: [
      ["keyword_func", "single_identifier", "symbol_(", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "symbol_;"],
      ["keyword_func", "symbol_(", "func_receiver_type", "symbol_)", "symbol_.", "single_identifier", "symbol_(", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "symbol_;"],
      ["keyword_func", "single_identifier", "symbol_<", "template_parameters", "symbol_>", "symbol_(", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "symbol_;"],
      ["keyword_func", "symbol_(", "func_receiver_type", "symbol_)", "symbol_.", "single_identifier", "symbol_<", "template_parameters", "symbol_>", "symbol_(", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "symbol_;"],
    ],
  },

  {
    type: "data_definition_statement",
    rule: [
      ["annotations", "data_definition_statement_"],
      ["data_definition_statement_"],
    ],
  },
  {
    type: "data_definition_statement_",
    rule: [
      ["var_definition_statement"],
      ["func_definition_statement"],
    ],
    omitIf: [
      { always: true },
    ],
  },
  {
    type: "annotations",
    rule: [
      ["annotations", "annotation"],
      ["annotation"]
    ],
    omitIf: [
      { parentIs: "annotations" },
    ],
  },
  {
    type: "annotation",
    rule: [
      ["annotation_inline"],
      ["annotation_register"],
      ["annotation_threadlocal"],
      ["annotation_restrict"],
      ["annotation_volatile"],
    ],
  },
  {
    type: "var_definition_statement",
    rule: [
      ["keyword_var", "single_identifier", "symbol_:", "type_expression", "symbol_=", "expression", "symbol_;"],
    ],
  },
  {
    type: "func_definition_statement",
    rule: [
      ["keyword_func", "single_identifier", "symbol_(", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "block"],
      ["keyword_func", "symbol_(", "func_receiver_type", "symbol_)", "symbol_.", "single_identifier", "symbol_(", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "block"],
      ["keyword_func", "single_identifier", "symbol_<", "template_parameters", "symbol_>", "symbol_(", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "block"],
      ["keyword_func", "symbol_(", "func_receiver_type", "symbol_)", "symbol_.", "single_identifier", "symbol_<", "template_parameters", "symbol_>", "symbol_(", "func_parameters", "symbol_)", "symbol_:", "func_return_type", "block"],
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
    omitIf: [
      { parentIs: "block_statements" },
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
    omitIf: [
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
      ["compound_identifier", "symbol_=", "expression", "symbol_;"],
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
    omitIf: [
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
    omitIf: [
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