import { AstNodeRuleDefinition } from "./rule-definitions";

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
      ["symbol_@", "local_identifier"],
      ["symbol_@", "local_identifier", "symbol_{", "annotation_entries", "symbol_}"],
    ],
    transparentIf: [
      { always: true },
    ],
  },
  {
    type: "annotation_entries",
    rule: [
      ["annotation_entries_"],
      ["annotation_entries_", "symbol_,"],
    ],
  },
  {
    type: "annotation_entries_",
    rule: [
      ["annotation_entries_", "symbol_,", "annotation_entry"],
      ["annotation_entry"],
    ],
    transparentIf: [
      { parentIs: "annotation_entries_" },
      { parentIs: "annotation_entries" },
    ],
  },
  {
    type: "annotation_entry",
    rule: [
      ["local_identifier", "symbol_:", "annotation_value"],
    ],
  },
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
