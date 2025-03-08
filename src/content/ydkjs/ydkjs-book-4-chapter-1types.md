---
title: ydkjs book 4 chapter 1Types
name: "Chapter 1: Types in JavaScript"
episode: 4
seasonNumber: 1
publishedOn: 03-09-2025
updatedOn: 03-09-2025
thumbnail: /public/images/blogs/types-i-n-js.jpg
author: Ashutosh Anand Tiwari
tags: ydkjs
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
## **ECMA Language Types**

ECMA language types are:

1. undefined
2. null
3. Boolean
4. string
5. Number
6. Object

### **Built-in Types in JavaScript**

JavaScript built-in types are:

- null
- undefined
- boolean
- number
- string
- object
- Symbol (added in ES6)

> Note: Except object, all are called primitive types.
> 
> 
> Whatever value you will see in JS, if you write `typeof` before that, you will get these types.
> 

### **Examples:**

```

typeof Symbol(1) // "symbol"

typeof null == "object" // true (Bug!)

```

> Bug: It is not fixed because there are so much web context exist and rely on this bug. Fixing this will create more bugs, so they left it as it is.
> 

```
js
CopyEdit
typeof function foo(){} // "function"
typeof [1,2] // "object"

```

---

## **Functions in JavaScript**

In JS, there is no built-in type as function but it is a **subtype of object**.

Function is nothing but a **callable object**.

Internally, it uses `[[Call]]` property to invoke function.

> Note: Each function has length property attached to it that is equal to the number of params.
> 

### **Example:**

```
js
CopyEdit
function foo(a, b, c) { }
console.log(foo.length) // 3

```

> Same goes with Array!
> 

---

## **Values as Types**

In JavaScript, variables don’t have types, values have types.

Variables can hold any value at any time.

> Note: typeof always returns a string.
> 

---

## **undefined vs undeclared**

### **undefined:**

- A variable that has been declared in the accessible scope but at the moment has no other value in it.

### **Example:**

```
js
CopyEdit
var a;
console.log(typeof a); // "undefined"

```

### **undeclared:**

- If a variable is **not declared** (not defined yet), and you try to use it, you get **Reference Error!**

### **Example:**

```
js
CopyEdit
var b = 42;
console.log(typeof c); // "undefined"

console.log(b = c); // ReferenceError!

```

---

## **Type of undeclared**

If you use `typeof a` where `a` is not declared yet, you will always get `"undefined"` **without error**.

### **Learn about DEBUG keyword in JS!**
