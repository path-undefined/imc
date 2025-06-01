import { AstNodeRuleDefinition } from "./types";
import { listOf } from "./utilities";

export const annotationRelatedRuleDefinitions: AstNodeRuleDefinition[] = [
  {
    type: "annotations",
    rule: [
      ["annotations", "annotation"],
      ["annotation"]
    ],
    transparentIf: [
      { parentIs: "annotations" },
    ],
  },
  {
    type: "annotation",
    rule: [
      ["symbol_#", "local_identifier"],
      ["symbol_#", "local_identifier", "symbol_{", "annotation_entries", "symbol_}"],
    ],
    transparentIf: [
      { always: true },
    ],
  },
  ...listOf({
    type: "annotation_entry",
    plural: "annotation_entries",
    splitter: "symbol_,",
    rule: [
      ["local_identifier", "symbol_:", "annotation_value"],
    ],
  }),
  {
    type: "annotation_value",
    rule: [
      ["literal_string"],
      ["literal_integer"],
      ["literal_bool"],
    ],
    transparentIf: [
      { always: true },
    ],
  },
];
