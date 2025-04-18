import { AstNode } from "../../parser/types";

export type DiscoveringConfig = {
  modulePaths: string[];
};

export type DiscoveredModule = {
  name: string;
  sourceFilePath: string;
  ast: AstNode[];
};

export type DiscoveredExport = {
  name: string;
  exports: ExportedItem[];
};

export type ExportedItem = {
  type: "type" | "var" | "function";
  exportedName: string;
  // TODO: ...
};
