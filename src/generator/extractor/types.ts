export type ImportStatementInfo = {
  moduleName: string;
  aliasName: string;
} & SourceMapInfo;

export type SourceMapInfo = {
  start: {
    line: number;
    char: number;
  };
};
