export type ImportStatementInfo = {
  moduleName: string;
  localName: string;
} & SourceMapInfo;

export type ExportStatementInfo = {
  moduleLocalName: string | null;
  localName: string;
  exportName: string;
} & SourceMapInfo;

export type SourceMapInfo = {
  start: {
    line: number;
    char: number;
  };
};
