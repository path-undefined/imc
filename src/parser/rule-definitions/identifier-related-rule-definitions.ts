import { AstNodeRuleDefinition } from "./types";

export const identifierRelatedRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "local_identifier",
    rule: [
      [ "identifier" ],
    ]
  },
  {
    type: "global_identifier",
    rule: [
      [ "global_identifier", "symbol_::", "identifier" ],
      [ "identifier" ],
    ],
    transparentIf: [
      { parentIs: "global_identifier" },
    ],
  },
];
