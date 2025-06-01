import { AstNodeRuleDefinition } from "./types";

type ListOfOptions = {
  type: string;
  plural: string;
  splitter: string;
  rule: string[][];
};

export function listOf(params: ListOfOptions): AstNodeRuleDefinition[] {
  return [
    {
      type: params.plural,
      rule: [
        [`${params.plural}_`, params.splitter],
        [`${params.plural}_`],
      ],
    },
    {
      type: `${params.plural}_`,
      rule: [
        [`${params.plural}_`, params.splitter, params.type],
        [params.type],
      ],  
      transparentIf: [
        { parentIs: `${params.plural}_` },
        { parentIs: params.plural },
      ],
    },
    {
      type: params.type,
      rule: params.rule,
    }
  ]
}
