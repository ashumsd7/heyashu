---
title: Chapter 3 Functions Versus Block Scope
name: "Chapter 3: Functions Scope Versus Block Scope"
episode: 1
seasonNumber: 1
publishedOn: 03-08-2025
updatedOn: 03-08-2025
thumbnail: /public/images/blogs/scopezxz.jpg
author: Ashutosh Anand Tiwari
tags: ydkjs
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
### **Scope → Bubbles → Buckets**

* **What makes a bubble?**

  1. **A function** or **something else**
* Each time you **declare a function**, it creates a **scope**.
* Other structures **also create blocks & scopes**.

- - -

### **Scope from Functions**

* Variables inside a function body **"hide the code."**
* Example: Suppose there's a function `foo()`, and it contains variables `a`, `b`, and `c`.

  * These **cannot be accessed outside** the function.
* **Encapsulation:**

  * We can **hide variables & functions** by enclosing them **within the scope of a function**.
* **Is hiding variables a good technique?**

  * **Yes!** It helps in writing secure and efficient code.
  * **This is called "Scope-Based Hiding."**

- - -

### **Best Practices for Scope-Based Hiding**

* **Expose only what is minimal & necessary.**
* **Avoid wide visibility of variables & functions.**
* **Follows key principles:**

  * **"Principle of Least Coverage"**
  * **"Least Authority"**
  * **"Least Exposure"**

### **Hiding Variables in Enclosing Scope**

* **Why hide variables?**

  * Avoids **collision between identifiers**.
  * Prevents **accidental modifications** from external code.
* **Example:**

  ```
   
  function foo() {
      // Code inside function
  }
  ```

  * **Scope is created.**
  * **Everything inside is hidden.**
* **Variable Collision in Global Scope:**

  * When **multiple libraries** are loaded into a program, variables may conflict.
  * **Solution:**

    * Libraries use **objects with unique names** to avoid collisions.

- - -

### **Functions as Scope**

* **Encapsulation:**

  * Enclosing variables inside a function **hides them from outside access**.
* **Example of Function Scope:**

  ```
   
  function foo() {
      // Variables inside are hidden
  }
  ```

  * To use `foo()`, we **must call it explicitly**:

    ```
     
    foo();
    ```
* **Auto-Executing Functions in JavaScript**

  * **JavaScript provides a way to execute functions automatically** without calling them manually.

## **Function Expressions vs Declarations**

### **How to Distinguish Between Function Declaration and Expression?**

* If a function **starts with the `function` keyword**, it is a **Function Declaration**.
* Otherwise, it is a **Function Expression**.

### **Examples**

### **Function Declaration**

```
 
function foo() {
    // Function body
}
```

* **Named function** that can be called **before its definition** due to **hoisting**.

### **Function Expression**

```
 
var fun = function () {
    // Function body
};
```

* **Assigned to a variable** and **cannot be called before its definition**.
* This is known as an **Anonymous Function Expression** if it has **no name**.

- - -

### **IIFE (Immediately Invoked Function Expression)**

```
js
CopyEdit
(function foo() {
    // Function body
})();
```

* Instead of treating `foo()` as a **declaration**, we treat it as an **expression** by wrapping it in parentheses.
* **Executes immediately** without needing to be called separately.

- - -

### **Anonymous Functions**

```
 
setTimeout(function () {
    // Function body
}, 1000);
```

* **Function without a name**, used as an argument in another function.
* Function Expressions **can have no names**, but **Function Declarations must have names**.

## **IIFE (Immediately Invoked Function Expression)**

```
 
(function () {
    // Function body
})();
```

* This is called an **IIFE (Immediately Invoked Function Expression)**.
* Most of the time, an IIFE **has no name** and works as an **anonymous function expression**.
* You can also **pass arguments** inside an IIFE.

- - -

## **Drawbacks of Anonymous Functions**

1. **No Name, No Readability**

   * Without a name, it’s **hard to understand what the function does**.
2. **Cannot Be Tracked in Stack Trace**

   * Debugging becomes difficult because the function won’t appear in error stack traces.

- - -

## **Best Practice**

> It is best to name functions inside native functions like setTimeout().

### **Example**

**Bad Practice (Anonymous Function):**

```
 
setTimeout(function () {
    console.log("Hello!");
}, 1000);
```

**Good Practice (Named Function):**

```
 
setTimeout(function greet() {
    console.log("Hello!");
}, 1000);
```

* Naming the function helps with **readability** and **debugging**.

## Blocks as Scopes

In JavaScript, blocks `{ ... }` can create their own scope.

### Example

```
 
for (var i = 0; i < 10; ++i) {
    console.log(i);
}
```

The **intent** of `i` is to be used **only within the loop block**. However, using `var` does **not** limit `i` to the block, which can cause unintended issues.

### Block Scope (ES6 Feature: `let` & `const`)

Declaring a variable as **close as possible** to where it is used is called **"blocked scope"**.

### Before ES6 (Using `var`)

```
 
if (true) {
    var x = 10;
}
console.log(x); // ✅ Accessible (var is function-scoped)
```

`var` does **not** follow block scope—it leaks outside the block.

### After ES6 (Using `let` & `const`)

```
 
if (true) {
    let y = 20;
    const z = 30;
}
console.log(y); // ❌ Error (let is block-scoped)
console.log(z); // ❌ Error (const is block-scoped)
```

`let` and `const` **follow block scope**, meaning the variables exist **only within** the block.

### Key Differences Between `var`, `let`, and `const`

* `var`: Function-scoped, can be reassigned, hoisted without initialization (undefined).
* `let`: Block-scoped, can be reassigned, hoisted but not initialized (TDZ - Temporal Dead Zone).
* `const`: Block-scoped, cannot be reassigned, hoisted but not initialized (TDZ).

### Best Practice

Always **prefer `let` or `const`** over `var` to avoid accidental variable leakage.

### `let` in Block Scope

Using `{ ... }` creates a block. When a variable is declared with `let` inside `{ ... }`, it **exists only within that block**.

```
 
{
    console.log(bar); // ❌ ReferenceError
    let bar = 2;
}
```

* `let` does **not hoist** to the entire block.
* The variable is **not accessible** until the declaration statement is encountered.
* Accessing it before declaration results in a **ReferenceError** (due to Temporal Dead Zone, TDZ).

- - -

### `let` in Loops

```
for (let i = 0; i < 10; i++) {
    console.log(i);
}
console.log(i); // ❌ ReferenceError
```

* `i` exists **only inside the loop block**.
* Accessing it outside results in a **ReferenceError**.

### **Key Note: Rebinding in Each Iteration**

```
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
```

**Output (after 1 second):**

```
CopyEdit
0
1
2
```

* `let i` is **recreated** in each loop iteration.
* Each iteration has **a new `i`**, which prevents unexpected behavior in asynchronous code (unlike `var`).

### **Why Does Re-initialization Happen?**

* `let` **attaches to arbitrary blocks** rather than the enclosing function or global block.
* This means every time a new block is executed, a **new variable instance** is created.

- - -

### **`const` in ES6**

* `const` also **creates block scope** like `let`, but its **value is fixed**.
* **Reassignment is not allowed**—attempting to change its value will cause an **error**.

```
 
const x = 10;
x = 20; // ❌ TypeError: Assignment to constant variable.
```

* However, if `const` is an **object or array**, its **properties/elements can be modified**, but the reference itself cannot change.

```
 
const obj = { name: "Ashu" };
obj.name = "Tiwari"; // ✅ Allowed

obj = { name: "New" }; // ❌ TypeError
```
