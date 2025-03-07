---
title: ydkjs chapter 4 Hoisting
name: "Chapter 4: Hoisting "
episode: 2
seasonNumber: 1
publishedOn: 03-08-2025
updatedOn: 03-08-2025
thumbnail: /public/images/blogs/hoisiting.png
author: Ashutosh Anand Tiwari
tags: ydkjs
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
📌 **Best way to think about hoisting** → All **declarations** (functions & variables) are processed **first** before any part of your code is executed.

```

console.log(a);
var a = 2;
```

  🔹 Output? **undefined**

### **Why?**

* **Compilation Phase:** `var a;` *(Declaration happens!)*
* **Execution Phase:** `a = 2;` *(Assignment happens!)*

- - -

## **Hoisting Process 🤯**

```
 
var a = 2;
```

  🔹 During **Compilation** → `var a;` *(Declaration processed!)*

  🔹 During **Execution** → `a = 2;` *(Assignment processed!)*

  👉 **Hoisting** = Variables & functions **moved** to the **top** of their scope!

  💡 **NOTE:** Hoisting is **per scope**

```
 
foo();
function foo() {
   console.log(a);
   var a = 2;
}
```

  🔹 **After Hoisting:**

```
 
function foo() {
   var a;
   console.log(a);
   a = 2;
}
foo();
```

  ✅ `var a;` is hoisted **inside `foo()`**, NOT globally!

- - -

## **Function Hoisting 🚀**

  🚀 **Function Declarations are hoisted!**

```
 
foo();
function foo() {
  console.log("Hoisted!");
}
```

  ✅ Works Fine!

  🛑 **Function Expressions are NOT hoisted!**

```
 
foo();
var foo = function() {
  console.log("Not Hoisted!");
};
```

  ❌ **ReferenceError: Cannot access 'foo' before initialization**

- - -

## **IMPORTANT ⚠️**

  1️⃣ **Functions are hoisted FIRST, then variables.**

  2️⃣ **Multiple `var` declarations are ignored**, but **functions override them!**

  3️⃣ ❌ **Avoid function declarations inside blocks!**

  🔥 **Hoisting is real, use it wisely! 🚀**

## **Function First Rule 🚀**

  If both a **function and variable** have the **same name**, the **function is hoisted first!**

  🔹 **Multiple `var` declarations are ignored, but function declarations override variables.**

  🔹 **Subsequent function declarations override previous ones.**

  💡 **Avoid function declarations inside blocks!**

```
 
if (true) {
   function test() { console.log("Hello"); }
}
```

  ❌ **Different behavior across browsers!** **Avoid this!**

  🔥 **Use function expressions inside blocks instead!** 🚀
