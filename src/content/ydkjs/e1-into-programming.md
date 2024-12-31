---
title: "e1: into programming"
name: "Chapter 1:  Into Programming"
episode: 1
publishedOn: 12-31-2024
updatedOn: 12-31-2024
thumbnail: /public/images/blogs/b1c1_11.jpg
author: Ashutosh Anand Tiwari
profilePic: https://avatars.githubusercontent.com/u/40313523?v=4
followLink: https://github.com/ashumsd7
metaName: Buy The Course Namaste Node JS Course
metaContent: Get all digital notes here about namaste node js
tags: Basic Programming, JavaScript
---

### Disclaimer  

First of all, I would like to thank **Kyle Simpson** for writing this amazing book in easy language. Everything I write in this series is based on his books. I may add some lines on my own to help you understand better. I will also include external links for you to refer to and read other blogs.  

If at any point you feel something is incorrect, please let me know. I am human, and mistakes can happen. This entire content is open-source and hosted on GitHub. Click the button on this page to contribute or report an issue. If you have any questions, feel free to contact me by clicking the floating button at the bottom right.  

Let’s start this beautiful journey!  

---

### A Program  

A program, often referred to as source code or just code, is a set of special instructions that tell the computer what tasks to perform.  

---

### What is Syntax?  

The rules for the valid format and combination of instructions are called **syntax** in a computer language.  

---

### What is a Statement?  

A group of words, numbers, and operators that perform a specific task is called a **statement**.  

**Example:**  
```jsx
a = b * 2; // The whole line is a statement
```  

Most statements in JavaScript end with a semicolon.  

---

### What is an Expression?  

Statements are made up of one or more **expressions**. To remember this, think of the alphabet: "E" comes before "S," so multiple Expressions create a Statement.  

**Example:**  
```jsx
a = b * 2;
// 2 is a literal value expression
// a is a variable expression
// b * 2 is an arithmetic expression (multiplication)
// a = b * 2 is an assignment expression, which has the result of b * 2
```  

---

### Executing a Program  

Computers can’t understand the code directly. A special utility on the computer (either an **interpreter** or a **compiler**) translates the code into commands that the computer can understand.  

- **Interpreted languages**: The translation happens line by line, each time the program is run.  
- **Compiled languages**: The translation happens ahead of time, creating a compiled version of the code.  

**What about JavaScript?**  
The JavaScript engine compiles the program on the fly and then immediately runs the compiled code.  

In JavaScript, we often use `console.log('Hello, Ashu')`.  

**Example:**  
```jsx
console.log() is a function call
console. is part of the object reference when log(..) is called as a method
```  

---

### Operators  

Operators are used to perform actions on variables and values. We’ve already seen `=` and `*`. Similarly, JavaScript has many operators, which we’ll discuss in later chapters:  

- Assignment operators  
- Math operators (`+`, `-`, `*`, `/`)  
- Increment and Decrement operators  
- Dot (`.`) operator  
- Equality and Comparison operators  
- Logical operators  
- Bitwise operators  

---

### Variables  

Variables are like boxes where we store data, labeled for identification.  

---

### Coercion  

Converting one type of value into another is called **coercion**.  

**Example:**  
```jsx
var a = '32';
var b = Number(a);  // typeof b is Number
// Converting explicitly using a method is called Explicit Coercion
```  

- **Explicit Coercion**: When the user does it manually (as shown above).  
- **Implicit Coercion**: When JavaScript does it automatically.  

**Example:**  
```jsx
"99.99" == 99.99;  // true
// JS automatically converts the left-side value (string) into a number
```  

---

### JavaScript is Dynamically Typed  

JavaScript is called a dynamically typed language because variables can hold any type of value at any time.  

---

### Blocks  

A series of basic statements grouped together is called a **block**.  

**Examples:**  
- Loops contain blocks  
- `if...else` contains blocks  

---

### Constants  

If a variable holds a constant value, it follows a specific naming convention.  

**Example:**  
```jsx
var TAX_RATE = 0.07;
```  

Why not use `const` here? Hold on, we’ll discuss `const` later. For now, just understand the naming convention for constants.  

---

### Functions  

A **function** is a named section of code that can be called by its name. The code inside the function runs each time the function is called. Functions can optionally take arguments (parameters).  

**Example:**  
```jsx
function foo(a) {
  // Code here
}

foo(); // Call the function
```  

---

### Scope  

Scope is also called **lexical scope**. We’ll discuss later why it’s called lexical scope and what "lexical" means.  

- Each function gets its own scope.  
- Scope is a collection of variables and rules about how those variables are accessed by name.  
- Think of scope as a range or boundary.  

**Rules:**  
- A variable must be unique within the same scope.  
- The same variable name can exist in different scopes but not in the same one.  

**Lexical scope** means code in one scope can access variables from another (outer) scope. It’s like visiting another country!  

--- 

