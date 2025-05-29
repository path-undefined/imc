# IM/C — A Slightly IMproved C Language

IM/C is a toy language based on C language. It solves severl problems of C language:

1. akward include system and non-existing namespacing support
2. non-existing project management system
3. confusing typing expression
4. relying on macro for generic programming
5. ambigious syntax

Yet still try to keep two main features of C:

1. the manual memory management
2. ability to directly manipulate the memory
3. the minimalist design

## Code Structure

Different modules are in charge of different steps in the compiling process:

* **tokenizer**:
  - Input: the source code
  - Output: an array of tokens
* **parser**:
  - Input: an array of tokens (output of the tokenizer)
  - Output: abstract syntax tree (AST)
* **discoverer**:
  - Input: AST (output of the parser)
  - Output:
    - an array of discovered source code files ...
    - along with the exported name and related type information
* **validator**:
  - Input:
    - AST (output of the parser)
    - type information (output of the discoverer)
  - Output: an array of type and/or other semantical errors
* **generator**:
  - Input:
    - AST (output of the parser)
    - type information (output of the discoverer)
  - Output:
    - a bunch of *.c and *.h code file
    - the data about which files to be compiled
* **builder**:
  - Input:
    - a bunch of *c and *.h code file
    - the data about which files to be compiled by C compiler
  - Output:
    - the compiled binary file

Utility modules:

* **logger**: simply a set of ultility functions for printing message in the console. It will also filter the messages according to the log-level.
* **ast**: a set of ultility functions for extracting data from AST in an easy way.
* **types**: a set of type definitions which are globally used.
