import { parse } from "./source-parser";

describe("export_statement", () => {
  it("should generate correct AST", () => {
    const ast = parse("export my_identifier;");

    expect(ast.exports[0].type).toEqual("export_statement");
    expect(ast.exports[0].exportedName).toEqual("my_identifier");
    expect(ast.exports[0].aliasName).toBe(null);
  });

  it("should generate correct AST with name alias", () => {
    const ast = parse(`
      export  __something    as  something ;
      export  __something_2  as  somethingElse ;
    `);

    expect(ast.exports[0].type).toEqual("export_statement");
    expect(ast.exports[0].exportedName).toEqual("__something");
    expect(ast.exports[0].aliasName).toEqual("something");

    expect(ast.exports[1].type).toEqual("export_statement");
    expect(ast.exports[1].exportedName).toEqual("__something_2");
    expect(ast.exports[1].aliasName).toEqual("somethingElse");
  });
});
