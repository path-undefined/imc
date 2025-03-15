export type SourceAstRootNode = {
  type: "root";
  imports: SourceAstImportStatementNode[];
  exports: SourceAstExportStatementNode[];
};

export type SourceAstImportStatementNode = {
  type: "import_statement";
  modulePath: string;
  aliasName: string | null;
};

export type SourceAstExportStatementNode = {
  type: "export_statement";
  exportedName: string;
  aliasName: string | null;
};
