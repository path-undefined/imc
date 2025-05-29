import { AstNodeRuleDefinition } from "./types";

export const templateRelatedRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "template_parameters",
    rule: [
      ["template_parameters_"],
      ["template_parameters_", "symbol_,"],
    ],
  },
  {
    type: "template_parameters_",
    rule: [
      ["template_parameters_", "symbol_,", "template_parameter"],
      ["template_parameter"],
    ],
    transparentIf: [
      { parentIs: "template_parameters_" },
      { parentIs: "template_parameters" },
    ],
  },
  {
    type: "template_parameter",
    rule: [
      ["simple_template_parameter"],
      ["value_template_parameter"],
    ],
    transparentIf: [
      { always: true },
    ],
  },
  {
    type: "simple_template_parameter",
    rule: [
      ["local_identifier"],
    ],
  },
  {
    type: "value_template_parameter",
    rule: [
      ["local_identifier", "symbol_:", "type_expression"],
    ],
  },
];