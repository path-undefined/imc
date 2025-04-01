import { AstNodeRuleDefinition } from "./rule-definitions";

export const identifierRelatedRuleDefinitions: AstNodeRuleDefinition[] = [
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
