---
title: YDKJS What is Scope
name: "Chapter 1 : What is Scope?"
episode: 2
seasonNumber: ""
publishedOn: 03-07-2025
updatedOn: 03-07-2025
thumbnail: /public/images/blogs/scopes_ydkjs.png
author: Ashutosh Anand Tiwari
tags: ydkjs, scopes
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
The most common feature in almost all programming languages is storing values in variables and retrieving them when needed. This gives a program "a state."

Key questions about variables:

- Where do these variables live?
- Where are they stored?
- How does the program find them when needed?

These questions highlight the need for a well-defined set of rules for storing and finding variables later. This set of rules is called "scope."

### JavaScript and Scope

JavaScript is a dynamic & interpreted language. It is a compiled language, but not compiled well in advance like many traditional compiled languages.

### Traditional Compilation Process

In traditionally compiled languages, a program goes through three steps before execution:

1. Tokenizing / Lexing
2. Parsing
3. Code Generation

These steps are roughly called "compilation."
Abbreviation: **TPC (Tokenizing, Parsing, Code Generation).**

### Tokenizing | Lexing

Breaking up a string of characters into meaningful chunks called tokens.

Example:

```
var a = 2;
```

Tokens: `var`, `a`, `=`, `2`, `;`

### Parsing

Taking an array of tokens and turning it into a tree of nested elements that represents the grammatical structure of the program. This tree is called an **Abstract Syntax Tree (AST).**

### Code Generation

The process of taking an AST and turning it into executable code (reserving memory).

### JavaScript Compilation

Unlike traditional compiled languages, the JS engine doesn’t get much time to compile the code. JS compilation happens in microseconds or less before the code gets executed.

### JavaScript Compilation Techniques

JS uses tricks like:

- **JIT (Just-In-Time) Compilation**
- **Lazy Compilation**
- **Hot Recompilation**

Example:

```
var a = 2;
```

JavaScript will compile it first and then make it ready for execution immediately.

### Three Main Components of JS Execution

1. **Engine** - Responsible for compiling & executing JavaScript code from start to finish.
2. **Compiler** - Handles parsing & code generation. Ensures JS code is compiled before execution.
3. **Scope** - The engine maintains & collects a list of all variables. Enforces rules on how variables are accessible to executing code.

### Execution Flow for `var a = 2;`

- Compiler handles compilation.
- Engine takes care of execution.

### JavaScript Compilation Process

### Wrong Assumption

```
var a = 2;
```

1. Compiler will perform lexing.
2. Compiler allocates memory for the variable.
3. Then, compiler sticks value `2` to that variable.

✖ **This is Wrong!** ✖

### Correct Compilation Process

```
var a = 2;
```

1. **Compiler asks Scope** → Does `a` exist in the scope collection?
    - If Yes, compiler ignores the declaration and moves on.
    - If No, compiler tells scope to declare the variable.
    - Then, compiler produces code for execution.
2. **Engine sees (`a = 2`)** → It asks Scope:
    - Does variable `a` exist in the current scope?
    - If Yes, Engine assigns the value.
    - If No, Engine checks the nested scope.

If variable `a` is not found anywhere, an **Error is thrown.**

### Final Understanding

✔ **The code compiles like this!**

### JavaScript: LHS & RHS Lookups

### Terminology: LHS & RHS

- **LHS (Left-Hand Side) Lookup** → Find the variable's location (where it’s stored).
- **RHS (Right-Hand Side) Lookup** → Retrieve the value of the variable.

Example:

```
var a = 2;
console.log(a);
```

LHS: `var a = 2;` → Find `a` & assign value `2`.
RHS: `console.log(a);` → Go and fetch the value of `a`.

### Scope & Variable Lookup

Scope is a set of rules for finding variables by their names (identifiers). If a variable is not found in the current scope, the Engine checks outer scopes, moving outward until the global scope is reached. If the variable is not found anywhere, a **Reference Error is thrown.**

### Lexical Scope Hierarchy

```
Global Scope ├── F4 ├── F3 ├── F2 ├── F1 │   ├── Current Scope
```

- If a variable is not found → The lookup moves up through these scopes.
- If still not found → Throws **Reference Error.**

### Strict Mode & Implicit Variable Creation in JavaScript

### Without Strict Mode (`"use strict"`)

- If a variable **is not found in any scope**, JavaScript **automatically creates it** in the **global scope**.
- This can lead to unexpected behavior and bugs.

### With Strict Mode (`"use strict"`)

- If a variable **is not declared**, JavaScript **throws a Reference Error** instead of creating it globally.

### Example:

```
// Without strict mode
a = 2;
console.log(a); // No error, 'a' is implicitly created in global scope

// With strict mode
"use strict";
b = 2;
console.log(b); // ReferenceError: b is not defined
```

### Errors in JavaScript:

1. **Reference Error** → When a variable **is not found** in any scope.
2. **Type Error** → When trying to perform an **invalid operation** on a value.

### Common Issues:

- **Scope Issues** → Accessing a variable outside its defined scope.
- **Format Issues** → Incorrect syntax or missing declarations.
