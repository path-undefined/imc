root
  = imports:import_statements
    definitions:definition_statements
    exports:export_statements { return { type: "root", imports, definitions, exports } }

//// import statements ////
import_statements
  = imports:import_statement* { return imports.filter((n) => n.type !== "comment") }

import_statement "import statement"
  = _ "import" __ modulePath:module_path_literal _ end_of_statement _ { return { type: "import_statement", modulePath, aliasName: null } }
  / _ "import" __ modulePath:module_path_literal __ "as" __ aliasName:identifier _ end_of_statement _ { return { type: "import_statement", modulePath, aliasName } }
  / comment

module_path_literal "module path literal"
  = $( identifier|1.., "/"| ) { return text() }

//// definition statements ////
definition_statements
  = definitions:definition_statement* { return definitions.filter((n) => n.type !== "comment") }

definition_statement
  = type_definition_statement
  / struct_definition_statement
  / enum_definition_statement
  / function_definition_statement
  / variable_definition_statement
  / comment

//// type definition statement ////
type_definition_statement "type definition statement"
  = _ "type" _ end_of_statement _

//// struct definition statement ////
struct_definition_statement "struct definition statement"
  = _ "struct" _ end_of_statement _

//// enum definition statement ////
enum_definition_statement "enum definition statement"
  = _ "enum" _ end_of_statement _

//// enum definition statement ////
function_definition_statement "function definition statement"
  = _ "fn" _ end_of_statement _

//// variable definition statement ////
variable_definition_statement "variable definition statement"
  = _ "var" _ end_of_statement _

//// export statements ////
export_statements
  = exports:export_statement* { return exports.filter((n) => n.type !== "comment") }

export_statement "export statement"
  = _ "export" __ exportedName:identifier _ end_of_statement _ { return { type: "export_statement", exportedName, aliasName: null } }
  / _ "export" __ exportedName:identifier __ "as" __ aliasName:identifier _ end_of_statement _ { return { type: "export_statement", exportedName, aliasName } }
  / comment

//// reusable statements ////
identifier "identifier"
  = $( [a-zA-Z_] [0-9a-zA-Z_]* )

end_of_statement "end of statement"
  = ";"

comment "comment"
  = _ "//" (!"\n" .)* { return { type: "comment" } }
  / _ "/*" (!"*/" .)* "*/" { return { type: "comment" } }

_ "whitespaces"
  = [ \t\r\n]*

__ "whitespaces"
  = [ \t\r\n]+
