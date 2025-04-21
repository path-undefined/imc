import { AstNode } from "../../parser/types";

export type DiscoveringConfig = {
  modulePaths: string[];
};

export type DiscoveredModule = {
  moduleName: string;
  sourceFilePath: string;
  ast: AstNode[];
  exports: Record<string, DiscoveredModuleExport>;
};

export type DiscoveredModuleExport = {
  exportName: string;
  moduleLocalName: string | null;
  localName: string;
  ast: AstNode;
};
