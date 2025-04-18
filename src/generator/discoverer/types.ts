import { AstNode } from "../../parser/types";

export type DiscoveringConfig = {
  modulePaths: string[];
};

export type DiscoveredModule = {
  name: string;
  sourceFilePath: string;
  ast: AstNode[];
};
