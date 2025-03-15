import { parse } from "./source-parser";

describe("import_statement", () => {
  it("should generate correct AST", () => {
    const ast = parse("import path/to/module;");

    expect(ast.imports[0].type).toEqual("import_statement");
    expect(ast.imports[0].modulePath).toEqual("path/to/module");
    expect(ast.imports[0].aliasName).toBe(null);
  });

  it("should generate correct AST with name alias", () => {
    const ast = parse(`
      // This line is nothing
      import  path/to/module          as  mod1 ;
      import  another/path/to/module  as  mod2 ;
    `);

    expect(ast.imports[0].type).toEqual("import_statement");
    expect(ast.imports[0].modulePath).toEqual("path/to/module");
    expect(ast.imports[0].aliasName).toEqual("mod1");

    expect(ast.imports[1].type).toEqual("import_statement");
    expect(ast.imports[1].modulePath).toEqual("another/path/to/module");
    expect(ast.imports[1].aliasName).toEqual("mod2");
  });
});
