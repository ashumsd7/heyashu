---
title: ydksj book 4 chapter 3 Natives
name: "Chapter 3:  Natives in JavaScript"
episode: 4
seasonNumber: 1
publishedOn: 03-09-2025
updatedOn: 03-09-2025
thumbnail: /public/images/blogs/boxing-in-js.jfif
author: Ashutosh Anand Tiwari
tags: ydkjs
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
### **Types in JavaScript**

We have heard so much about:

- `String()`
- `Number()`
- `Boolean()`
- `Array()`
- `Object()`
- `Function()`
- `RegExp()`
- `Date()`
- `Error()`
- `Symbol()`

---

### **String Object & Value Creation**

```
var str = new String("Hello");

```

- **typeof str** → `object`
- **Is an instance of String?** → `true`
- **Object.prototype.toString.call(a)** → `[object String]`
- This gives **constructors form of value creation**
    
    ```
    new String("abc");
    
    ```
    
    **Output:**
    
    ```
    css
    CopyEdit
    {
      0: "a",
      1: "b",
      2: "c"
    }
    
    ```
    
    - **Depends on browser**
    - **Chrome & Firefox** handle it differently.

---

### **Internal [[Class]]**

- **Internal[[Class]]** property is tagged to values that are `typeof object` (such as arrays).
- **Don't think of it as an internal classification** related to class-based traditional OOPs.
- **This property can't be accessed directly** but can be revealed indirectly by borrowing.

```
Object.prototype.toString.call([1,2,3]); // "[object Array]"

```

- **Each of the simple primitives** are **automatically boxed** by their respective object wrapper,
which is why `"String"`, `"Number"`, and `"Boolean"` are revealed as **Internal [[Class]]** metadata.

---

### **Boxing Wrappers**

- **Primitive values have no methods** like `.length` or `.toString()`.
- A **boxing wrapper** provides these functionalities.
- **This is called Boxing** and **JS automatically does this.**

```
let str = "hello";
console.log(str.length); // 5

```

---

## **Unboxing**

- If we have a value with an object wrapper, then to get the **underlying primitive value**, we use **unboxing**.
- **Example:**

```
var a = new String("abcd");
console.log(a.valueOf()); // "abcd"

```

- **Unboxing can be implicit or explicit.Implicit:Explicit:**
    
    ```
    var a = new String("abcd");
    var b = a + ""; // unboxed automatically
    
    ```
    
    ```
    var a = new String("abcd");
    console.log(a.valueOf()); // "abcd"
    
    ```
    

---

### **Sparse Array**

- **An array with at least one "empty slot"** is called a **sparse array**.

```
const arr = new Array(2, 3); // Normal array
const sparseArr = new Array(2); // Sparse array

```

- **If you are not putting quotes**, it creates an **empty slot**.

```
console.log(sparseArr); // [empty × 2]

```

- **Important Note:**
    - `const arr = new Array(1,2,3);` → Creates an array `[1,2,3]`
    - `const arr = new Array(2);` → Creates a **sparse array** with **empty slots**
    - **New is not required!**

---

### **Don't be confused in:**

- `[ , , ]` (Sparse array with empty slots)
- `[undefined, undefined, undefined]` (Array explicitly containing `undefined` values)

### **Browser Differences**

- **Firefox:** Represents empty slots as `empty`.
- **Chrome:** Represents them as `undefined`.

```
let a = [ , , ];
console.log(a.join("-")); // Firefox: "--", Chrome: "undefined-undefined"

```

### **Objects, Functions & RegExp**

### **Objects**

```
var c = new Object();
c.foo = "bar";
c; // { foo: "bar" }

var d = { foo: "bar" };
d; // { foo: "bar" }

```

### **Functions**

```
var e = new Function("a", "return a * 2");

var f = function(a) { return a * 2 };

function g(a) { return a * 2 };

```

### **RegExp**

```
var h = new RegExp("^a*b+", "g");
var i = /^a*b+/g;

```

- **So you can define things in many ways,**
- **Don't do unnecessary things.**

---

### **Date() & Error()**

- These two are more useful natives than others.
- Because there are no natives available.

### **Creating a Date**

```
new Date();

```

- **Parens can be avoided.**

### **Creating an Error**

```
new Error();

```

- **Can be avoided.**
- **Main reason to create an error object**
    - Captures the **current execution context** into an object.
    - The execution context (EC) includes:
        - Function call start.
        - Line numbers where the error was coded.
        - **Helps in debugging.**

### **Throwing an Error**

```
throw new Error("Problem");

```

### **Common Error Types**

- EvalError()
- QrtError()
- ReferenceError()
- SyntaxError()
- URLError()

---

### **Symbol()**

- **ES6 Feature**
- **One more primitive value is added!**
- **Symbols are unique, not guaranteed.**

**Learn it!**

---

### **String Methods**

```
str.indexOf();
str.charAt();
str.substr();
str.toUpperCase();
str.trim();

```
