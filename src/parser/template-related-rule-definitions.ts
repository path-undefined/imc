import { AstNodeRuleDefinition } from "./rule-definitions";

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
    omitIf: [
      { parentIs: "template_parameters_" },
      { parentIs: "template_parameters" },
    ],
  },
  {
    type: "template_parameter",
    rule: [
      ["simple_template_parameter"],
      ["constrained_template_parameter"],
      ["value_template_parameter"],
    ],
    omitIf: [
      { always: true },
    ],
  },
  {
    type: "simple_template_parameter",
    rule: [
      ["single_identifier"],
    ],
  },
  {
    type: "constrained_template_parameter",
    rule: [
      ["single_identifier", "symbol_:", "type_expression"],
    ],
  },
  {
    type: "value_template_parameter",
    rule: [
      ["keyword_value", "single_identifier", "symbol_:", "type_expression"],
    ],
  },
];