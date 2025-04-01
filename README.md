# IM/C — A Slightly IMproved C Language

IM/C is a toy language based on C language. It solves severl problems of C language:

1. akward include system and non-existing namespacing support
2. non-existing project management system
3. confusing typing expression
4. lack of modern syntax suggar
5. ambigious syntax

Yet still try to keep two main features of C:

1. the manual memory management
2. ability to directly manipulate the memory

## Import instead of include

IM/C provides a different import mechanism than C does. In C, if one wants to use a function from another module, the way to go is to use the `#include` directive. This has several problems:

1. there is a lot of boilerplate code to write because of the duplication of `.h` and `.c` file, and the duplication could also cause the declaration and definition out of sync;
2. there is no namespace or naming alias, which makes all the function names have to be prefixed. Think about `gl` prefixed functions like `glBegin` or `glColor3f` in OpenGL, or `pcre2_` prefixed functions or `PCRE2_` prefixed types in PCRE2;
3. it is hard to track whether an include of an `.h` file is necessary or not. Because there is no information about whether a method name used in a `.c` file is coming from an `.h` file, or coming from which `.h` file.

So the first goal of IM/C is to introduce a module based importing system. where one can write code like following lines to make the import happening:

_WIP: EXAMPLE REQUIRED_

## `<>` instead of spiral rules

The example above also shows another feature of IM/C, which is the improved typing syntax. There are several "classic" examples to show how the C typing syntax is causing confusions:

```c
const int * a;
int * const b;

float * (*(*foo())[SIZE][SIZE])();
```

This can bo replaced by a syntax far more easily to be understood:

```
var a: ptr<const int>; // A pointer to a constant integer
var b: const ptr<int>; // A constant pointer to an integer

// Declare a function foo, which takes 0 parameters, and returns a pointer to
// an array with length SIZE of arrays with length SIZE of functions return
// a pointer of a float number
func foo(): ptr<arr<arr<() -> ptr<float>, SIZE>, SIZE>>;
```

With the power of angle brackets, even a very complex type definition can be read intuitively without applying the "spiral rules".

## Enhanced `struct` and `func`

## Backported template from C++

## Simplified and unified syntax

## Project management system

Beside these two main syntax improvements, there are also several other minor syntax improvement and syntax sugars to make the code more consistent and readable:

_WIP: EXAMPLE REQUIRED_

It also "backported" template from C++ to C:

_WIP: EXAMPLE REQUIRED_

Beside the improvements of syntax, IM/C also has a goal in mind to build the project management system for C projects.
