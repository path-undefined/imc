import { AstNodeRuleDefinition, OmitRule } from "./rule-definitions";

function omitAllSingleReplacementTill(ref: string): OmitRule[] {
  const omitTable = [
    { childrenAre: ["single_value_expression"] },

    { childrenAre: ["parentheses_expression"] },

    { childrenAre: ["get_value_expression"] },
    { childrenAre: ["get_address_expression"] },
    { childrenAre: ["adderss_expression"] },

    { childrenAre: ["array_indexing_expression"] },
    { childrenAre: ["member_accessing_expression"] },
    { childrenAre: ["function_invoking_expression"] },
    { childrenAre: ["value_accessing_expression"] },

    { childrenAre: ["logical_not_expression"] },
    { childrenAre: ["bitwise_not_expression"] },
    { childrenAre: ["positive_value_expression"] },
    { childrenAre: ["negative_value_expression"] },
    { childrenAre: ["prefix_operator_expression"] },

    { childrenAre: ["multiplication_expression"] },
    { childrenAre: ["division_expression"] },
    { childrenAre: ["remainder_expression"] },
    { childrenAre: ["multiplacative_operator_expression"] },

    { childrenAre: ["addition_expression"] },
    { childrenAre: ["subtraction_expression"] },
    { childrenAre: ["additive_operator_expression"] },

    { childrenAre: ["bit_shift_left_expression"] },
    { childrenAre: ["bit_shift_right_expression"] },
    { childrenAre: ["bit_shift_expression"] },

    { childrenAre: ["less_than_expression"] },
    { childrenAre: ["less_eq_than_expression"] },
    { childrenAre: ["greater_than_expression"] },
    { childrenAre: ["greater_eq_than_expression"] },
    { childrenAre: ["relational_operator_expression"] },
    
    { childrenAre: ["equality_expression"] },
    { childrenAre: ["inequality_expression"] },
    { childrenAre: ["equality_operator_expression"] },
    
    { childrenAre: ["bit_and_expression"] },

    { childrenAre: ["bit_xor_expression"] },

    { childrenAre: ["bit_or_expression"] },

    { childrenAre: ["logical_and_expression"] },

    { childrenAre: ["logical_or_expression"] },
  ];

  const result = [];

  for (const omitItem of omitTable) {
    result.push(omitItem);

    if (omitItem.childrenAre[0] === ref) {
      break;
    }
  }

  return result;
}

export const expressionRelatedRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "literal_array",
    rule: [
      ["type_expression", "symbol_{", "symbol_}"],
      ["type_expression", "symbol_{", "array_items", "symbol_}"],
    ],
  },
  {
    type: "array_items",
    rule: [
      ["array_items_"],
      ["array_items_", "symbol_,"],
    ],
  },
  {
    type: "array_items_",
    rule: [
      ["array_items_", "symbol_,", "array_item"],
      ["array_item"],
    ],
    transparentIf: [
      { parentIs: "array_items_" },
      { parentIs: "array_items" },
    ],
  },
  {
    type: "array_item",
    rule: [
      ["expression"],
    ],
    transparentIf: [
      { always: true },
    ],
  },


  {
    type: "literal_struct",
    rule: [
      ["type_expression", "symbol_{", "symbol_}"],
      ["type_expression", "symbol_{", "struct_entries", "symbol_}"],
    ],
  },
  {
    type: "struct_entries",
    rule: [
      ["struct_entries_"],
      ["struct_entries_", "symbol_,"],
    ],
  },
  {
    type: "struct_entries_",
    rule: [
      ["struct_entries_", "symbol_,", "struct_entry"],
      ["struct_entry"],
    ],
    transparentIf: [
      { parentIs: "struct_entries_" },
      { parentIs: "struct_entries" },
    ],
  },
  {
    type: "struct_entry",
    rule: [
      ["local_identifier", "symbol_:", "expression"],
    ],
    transparentIf: [
      { always: true },
    ],
  },


  {
    type: "block_evaluation",
    rule: [
      ["symbol_$", "block"],
    ],
  },


  {
    type: "single_value_expression",
    rule: [
      ["literal_string"],
      ["literal_char"],
      ["literal_integer"],
      ["literal_float"],
      ["literal_bool"],
      ["literal_null"],
      ["literal_array"],
      ["literal_struct"],
      ["global_identifier"],
      ["block_evaluation"],
    ],
  },


  {
    type: "parentheses_expression",
    rule: [
      ["symbol_(", "expression", "symbol_)"],
      ["single_value_expression"],
    ],
    transparentIf: [
      { always: true },
    ],
  },


  {
    type: "get_value_expression",
    rule: [
      ["symbol_$", "address_expression"],
    ],
  },
  {
    type: "get_address_expression",
    rule: [
      ["symbol_&", "address_expression"],
    ],
  },  {
    type: "address_expression",
    rule: [
      ["get_value_expression"],
      ["get_address_expression"],
      ["parentheses_expression"],
    ],
    transparentIf: [
      { always: true },
    ],
  },


  {
    type: "array_indexing_expression",
    rule: [
      ["value_accessing_expression", "symbol_#", "address_expression"],
    ],
  },
  {
    type: "member_accessing_expression",
    rule: [
      ["value_accessing_expression", "symbol_.", "local_identifier"],
    ],
  },
  {
    type: "function_invoking_expression",
    rule: [
      ["value_accessing_expression", "symbol_(", "symbol_)"],
      ["value_accessing_expression", "symbol_(", "symbol_[", "type_arguments", "symbol_]", "symbol_)"],
      ["value_accessing_expression", "symbol_(", "symbol_[", "type_arguments", "symbol_]", "symbol_;", "symbol_)"],
      ["value_accessing_expression", "symbol_(", "func_arguments", "symbol_)"],
      ["value_accessing_expression", "symbol_(", "symbol_[", "type_arguments", "symbol_]", "symbol_;", "func_arguments", "symbol_)"],
    ],
  },
  {
    type: "value_accessing_expression",
    rule: [
      ["array_indexing_expression"],
      ["member_accessing_expression"],
      ["function_invoking_expression"],
      ["address_expression"],
    ], 
    transparentIf: [
      { always: true },
    ],
  },


  {
    type: "logical_not_expression",
    rule: [
      ["symbol_!", "prefix_operator_expression"],
    ],
  },
  {
    type: "bitwise_not_expression",
    rule: [
      ["symbol_~", "prefix_operator_expression"],
    ],
  },
  {
    type: "positive_value_expression",
    rule: [
      ["symbol_+", "prefix_operator_expression"],
    ],
  },
  {
    type: "negative_value_expression",
    rule: [
      ["symbol_-", "prefix_operator_expression"],
    ],
  },
  {
    type: "prefix_operator_expression",
    rule: [
      ["logical_not_expression"],
      ["bitwise_not_expression"],
      ["positive_value_expression"],
      ["negative_value_expression"],
      ["value_accessing_expression"],
    ],
    transparentIf: [
      { always: true },
    ],
  },


  {
    type: "multiplication_expression",
    rule: [
      ["multiplacative_operator_expression", "symbol_*", "prefix_operator_expression"],
    ],
  },
  {
    type: "division_expression",
    rule: [
      ["multiplacative_operator_expression", "symbol_/", "prefix_operator_expression"],
    ],
  },
  {
    type: "remainder_expression",
    rule: [
      ["multiplacative_operator_expression", "symbol_%", "prefix_operator_expression"],
    ],
  },
  {
    type: "multiplacative_operator_expression",
    rule: [
      ["multiplication_expression"],
      ["division_expression"],
      ["remainder_expression"],
      ["prefix_operator_expression"],
    ],
    transparentIf: [
      { always: true },
    ],
  },


  {
    type: "addition_expression",
    rule: [
      ["additive_operator_expression", "symbol_+", "multiplacative_operator_expression"],
    ],
  },
  {
    type: "subtraction_expression",
    rule: [
      ["additive_operator_expression", "symbol_-", "multiplacative_operator_expression"],
    ],
  },
  {
    type: "additive_operator_expression",
    rule: [
      ["addition_expression"],
      ["subtraction_expression"],
      ["multiplacative_operator_expression"],
    ],
    transparentIf: [
      { always: true },
    ],
  },


  {
    type: "bit_shift_left_expression",
    rule: [
      ["bit_shift_expression", "symbol_<<", "additive_operator_expression"],
    ],
  },
  {
    type: "bit_shift_right_expression",
    rule: [
      ["bit_shift_expression", "symbol_>>", "additive_operator_expression"],
    ],
  },
  {
    type: "bit_shift_expression",
    rule: [
      ["bit_shift_left_expression"],
      ["bit_shift_right_expression"],
      ["additive_operator_expression"],
    ],
    transparentIf: [
      { always: true },
    ],
  },


  {
    type: "less_than_expression",
    rule: [
      ["relational_operator_expression", "symbol_<", "bit_shift_expression"],
    ],
  },
  {
    type: "less_eq_than_expression",
    rule: [
      ["relational_operator_expression", "symbol_<=", "bit_shift_expression"],
    ],
  },
  {
    type: "greater_than_expression",
    rule: [
      ["relational_operator_expression", "symbol_>", "bit_shift_expression"],
    ],
  },
  {
    type: "greater_eq_than_expression",
    rule: [
      ["relational_operator_expression", "symbol_>=", "bit_shift_expression"],
    ],
  },
  {
    type: "relational_operator_expression",
    rule: [
      ["less_than_expression"],
      ["less_eq_than_expression"],
      ["greater_than_expression"],
      ["greater_eq_than_expression"],
      ["bit_shift_expression"],
    ],
    transparentIf: [
      { always: true },
    ],
  },


  {
    type: "equality_expression",
    rule: [
      ["equality_operator_expression", "symbol_==", "relational_operator_expression"],
    ],
  },
  {
    type: "inequality_expression",
    rule: [
      ["equality_operator_expression", "symbol_!=", "relational_operator_expression"],
    ],
  },
  {
    type: "equality_operator_expression",
    rule: [
      ["equality_expression"],
      ["inequality_expression"],
      ["relational_operator_expression"],
    ],
    transparentIf: [
      { always: true },
    ],
  },


  {
    type: "bit_and_expression",
    rule: [
      ["bit_and_expression", "symbol_&", "equality_operator_expression"],
      ["equality_operator_expression"],
    ],
    transparentIf: omitAllSingleReplacementTill("equality_operator_expression"),
  },


  {
    type: "bit_xor_expression",
    rule: [
      ["bit_xor_expression", "symbol_^", "bit_and_expression"],
      ["bit_and_expression"],
    ],
    transparentIf: omitAllSingleReplacementTill("bit_and_expression"),
  },


  {
    type: "bit_or_expression",
    rule: [
      ["bit_or_expression", "symbol_|", "bit_xor_expression"],
      ["bit_xor_expression"],
    ],
    transparentIf: omitAllSingleReplacementTill("bit_xor_expression"),
  },


  {
    type: "logical_and_expression",
    rule: [
      ["logical_and_expression", "symbol_&&", "bit_or_expression"],
      ["bit_or_expression"],
    ],
    transparentIf: omitAllSingleReplacementTill("bit_or_expression"),
  },


  {
    type: "logical_or_expression",
    rule: [
      ["logical_or_expression", "symbol_||", "logical_and_expression"],
      ["logical_and_expression"],
    ],
    transparentIf: omitAllSingleReplacementTill("logical_and_expression"),
  },


  {
    type: "expression",
    rule: [
      ["logical_or_expression"],
    ],
  },
];
