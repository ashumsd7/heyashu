---
title: Chapter 2 What is lexical scope
name: "Chapter 2: What is Lexical Scope ?"
episode: 2
seasonNumber: 1
publishedOn: 03-07-2025
updatedOn: 03-07-2025
thumbnail: /public/images/blogs/lexii.png
author: Ashutosh Anand Tiwari
tags: ydkjs
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
Scope is genrally called lexical scope why lets understand it.

Lexical scope in JavaScript is **the context that defines which variables and functions are accessible within a code block**

* **Tokenizing**: Breaking code into the semantic meaning of tokens.

### **Definition of Lexical Scope**

* **"Lexical scope is scope that is defined at lexing time."**
* **"Lexical scope is based on where variables and blocks are authored by you at writing time, and thus is mostly set in stone by the time the lexer processes your code."**

**Lexical scope vs. dynamic scope**

Lexical scope is write-time, whereas dynamic scope is run-time.

### **Example: Lexical Scope in Function Nesting**

```
js
CopyEdit
function foo(a) {
    var b = a * 2;

    function bar(c) {
        console.log(a, b, c);
    }

    bar(b * 3);
}

foo(2);
```

### **Scope Bubbles in the Example**

* **Bubble 1 (Global Scope)**: The global environment where `foo(2)` is called.
* **Bubble 2 (Function foo Scope)**: The local scope where `var b = a * 2;` is defined.
* **Bubble 3 (Function bar Scope)**: The nested function `bar(c)`, which has access to `a`, `b`, and `c` due to lexical scope.

### **Shadowing in JavaScript**

* **"Scope lookup stops once it finds the first match."**
* The same name can be specified at multiple layers of nested scope, which is called **shadowing**.
* **"The innermost identifier shadows the outer identifier."**
* **Scope lookup moves upward** until it finds the first match.

### **Global Variables & Lexical Scope**

* **Global variables become part of the `window` object** in browsers.
* **"No matter where a function is invoked from, or even how it is invoked, its lexical scope is only defined where the function was declared."**

### **Cheating Lexical Scope**

Lexical scope can be manipulated using:

* `eval()`
* `with {}`
