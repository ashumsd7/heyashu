---
title: ydkjs chapter 5 scope closures
name: " Chapter 5: Scope Closures"
episode: 2
seasonNumber: 1
publishedOn: 03-08-2025
updatedOn: 03-08-2025
thumbnail: /public/images/blogs/closures.jpg
author: Ashutosh Anand Tiwari
tags: ydkjs
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
### Scope & Closures

Closure is all around you in JavaScript. You just have to recognize & embrace it.

Closure is not a special opt-in tool that you must learn new syntax and patterns for.

Closure happens as the result of writing code. You don’t have to intentionally create it to take advantage of it.

---

### Closures

“when a function is able to remember and access its lexical scope even when that function is executing outside of its lexical scope”

```
 
function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
  return bar;
}
var baz = foo();
baz(); // 2

```

✔ **Closure**

bar still has a reference to that scope of foo() & this reference is called closure.

bar is running in a different lexical scope, but remembers `a` from its parent’s scope where the bar was present, called/form a closure.

---

### Closures also works with setTimeout

```
 
function wait(msg) {
  setTimeout(function () {
    console.log(msg);
  }, 2000);
}
wait("Namaste");

```

Inner function has closure over function wait.

After 2 sec prints “Namaste” because of closure.

### Not a Closure

```
 
function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
}
foo();

```

❌ **Not a closure**

Since `bar()` is never returned or executed outside `foo()`, it does not form a closure.

### **Closures in JavaScript**

In the **S.T.O (Scope)**, whatever function you write (expression or declaration) → **It will form a closure.**

### **Example:**

```
 
var a = 2;
(function IIFE() {
   console.log(a);
})();

```

❌ **Not a closure**

➡ Just RHS lookup

---

### **Loops & Closures**

```
js
CopyEdit
for (var i = 1; i <= 5; i++) {
   setTimeout(() => console.log(i), i * 1000);
}

```

**Output:**

```
CopyEdit
6
6
6
6
6

```

🡆 **Why?**

- `i` is a **shared global variable**
- **Only one `i`** is created (not a new one for each iteration).

---

### **Using IIFE to Fix Closure Issue**

```
 
function foo() {
   for (var i = 1; i <= 5; i++) {
      (function () {
         var j = i;
         setTimeout(() => console.log(j), j * 1000);
      })();
   }
}
foo();

```

**Output:**

```
 
1
2
3
4
5

```

🡆 **Why?**

- Every iteration gets a **new variable assignment (`j = i`)**
- This creates **closure** for each `setTimeout` callback over `j`.

**🔥 If you change `var` to `let`, it will auto-create closure without IIFE.**

---

### **Block Scope Revisiting**

```
js
CopyEdit
for (let i = 1; i <= 5; i++) {
   setTimeout(() => console.log(i), i * 1000);
}

```

**Output:**

```
CopyEdit
1
2
3
4
5

```

🡆 **Why?**

- `let` is **block-scoped**
- Each iteration gets a **new `i`**

✅ **Block Scoping ❤️ Closures!**

---

This version keeps the headings, descriptions, and code intact while making it clean and structured. Let me know if you need any refinements

### **Code Patterns That Use Closures**

1. **Modules** *(Learn it!)*
2. **Module-like Hooks**

---

### **Concepts Related to Closures**

- **Reveal Pattern**
- **Dynamic Scope**
- **Appendix A & B**
