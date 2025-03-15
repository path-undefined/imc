# IM/C — A Slightly IMproved C Language

IM/C is a toy language based on C language. It solves severl problems of C language but still try to keep the main feature of C.

It provides a different import mechanism than C does. In C, if one wants to use a function from another module, the way to go is to use the `#include` directive. This has several problems:

1. there is a lot of boilerplate code to write because of the duplication of `.h` and `.c` file, and the duplication could also cause the declaration and definition out of sync;
2. there is no namespace or naming alias, which makes all the function names have to be prefixed. Think about `gl` prefixed functions like `glBegin` or `glColor3f` in OpenGL, or `pcre2_` prefixed functions or `PCRE2_` prefixed types in PCRE2;
3. it is hard to track whether an include of an `.h` file is necessary or not. Because there is no information about whether a method name used in a `.c` file is coming from an `.h` file, or coming from which `.h` file.

So the first goal of IM/C is to introduce a TypeScript-alike, module based import system. Where one can write code like following lines to make the import happening:

```
import printf from io;
import * as mem from memory;

fn main(argc: int, argv: arr<ptr<char>>) -> int {
  printf("hello world");

  let ptrToInteger: ptr<int> = mem::malloc(sizeof int);
  printf("%d\n", *ptrToInteger);
  mem::free(ptrToInteger);

  return 0;
}
```

The example above also shows another feature of IM/C, which is the improved typing syntax. There are several "classic" examples to show how the C typing syntax is causing confusions:

```c
const int * a;
int * const b;

float * (*(*foo())[SIZE][SIZE])();
```

This can bo replaced by a syntax far more easily to be understood:

```
var a: ptr<const int>;
var b: const ptr<int>;

fn foo() -> ptr<arr<arr<() -> ptr<float>, SIZE>, SIZE>>;
```

With the power of angle brackets, even a very complex type definition can be read intuitively without applying the "spiral rules".

Beside these two main syntax improvements, there are also several other minor syntax improvement and syntax sugars to make the code more consistent and readable:

```
import * as io from io;

struct Person {
  private name: arr<char, 128>; // <-- Here we use semi-colon instean of comma
  private age: uint;
}

fn new(name: arr<char>, age: uint) -> Person {
  return Person { name: name, age: age };
}

// This will be transpiled to:
//   char[] getName(struct Person * person) {
//     return person->name;
//   }
fn ptr<const Person>.getName() -> arr<char> {
  return (*this).name;
}

fn ptr<const Person>.getAge() -> uint {
  return (*this).age;
}

fn ptr<Person>.getOlder(years: uint) -> void {
  (*this).age += years;
}

fn main() -> int {
  var person: Person = new("John Doe", 36);
  io.printf("%s (%d)\n", person.getName(), person.getAge());

  person.getOlder(1);
  io.printf("%s (%d)\n", person.getName(), person.getAge());

  return 0;
}
```

Beside the improvements of syntax, IM/C also has a goal in mind to build the project management system for C projects.
