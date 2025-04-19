import { AstNodeRuleDefinition } from "./rule-definitions";

export const funcRelatedRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "func_parameters",
    rule: [
      ["func_parameters_"],
      ["func_parameters_", "symbol_,"],
    ],
  },
  {
    type: "func_parameters_",
    rule: [
      ["func_parameters_", "symbol_,", "func_parameter"],
      ["func_parameter"],
    ],
    transparentIf: [
      { parentIs: "func_parameters_" },
      { parentIs: "func_parameters" },
    ],
  },
  {
    type: "func_parameter",
    rule: [
      ["local_identifier", "symbol_:", "type_expression"],
      ["symbol_..."],
    ],
    transparentIf: [
      { always: true },
    ],
  },
  {
    type: "func_arguments",
    rule: [
      ["func_arguments_"],
      ["func_arguments_", "symbol_,"],
    ],
  },
  {
    type: "func_arguments_",
    rule: [
      ["func_arguments_", "symbol_,", "func_argument"],
      ["func_argument"],
    ],
    transparentIf: [
      { parentIs: "func_arguments_" },
      { parentIs: "func_arguments" },
    ],
  },
  {
    type: "func_argument",
    rule: [
      ["expression"],
    ],
    transparentIf: [
      { always: true },
    ],
  },
  {
    type: "func_return_type",
    rule: [
      ["type_expression"],
    ],
  },
];