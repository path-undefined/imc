import { AstNodeRuleDefinition } from "./rule-definitions";

export const expressionRelatedRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "single_value_expression",
    rule: [
      ["literal_integer"],
      ["compound_identifier"],
    ],
  },
  {
    type: "parentheses_expression",
    rule: [
      ["symbol_(", "expression", "symbol_)"],
      ["single_value_expression"],
    ],
    omitIf: [
      { childrenAre: ["single_value_expression"] },
    ],
  },
  {
    type: "value_accessing_expression",
    rule: [
      ["array_indexing_expression"],
      ["member_accessing_expression"],
      ["function_invoking_expression"],
      ["parentheses_expression"],
    ],
    omitIf: [
      { always: true },
    ],
  },
  {
    type: "array_indexing_expression",
    rule: [
      ["value_accessing_expression", "symbol_[", "expression", "symbol_]"],
    ],
  },
  {
    type: "member_accessing_expression",
    rule: [
      ["value_accessing_expression", "symbol_.", "single_identifier"],
    ],
  },
  {
    type: "function_invoking_expression",
    rule: [
      ["value_accessing_expression", "symbol_(", "func_arguments", "symbol_)"],
      ["value_accessing_expression", "symbol_<", "type_arguments", "symbol_>", "symbol_(", "func_arguments", "symbol_)"],
    ],
  },
  {
    type: "expression",
    rule: [
      ["value_accessing_expression"],
    ],
    omitIf: [
      { childrenAre: ["single_value_expression"] },
      { childrenAre: ["parentheses_expression"] },
      { childrenAre: ["value_accessing_expression"] },
      { childrenAre: ["array_indexing_expression"], },
      { childrenAre: ["member_accessing_expression"], },
      { childrenAre: ["function_invoking_expression"], },
    ],
  },
];
