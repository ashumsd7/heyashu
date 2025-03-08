---
title: ydkjs chapter 1 this all make sense now this keyword
name: "Chapter 1 & 2 This all make sense now : Deep dive This Keyword"
episode: 3
seasonNumber: 1
publishedOn: 03-08-2025
updatedOn: 03-08-2025
thumbnail: /public/images/blogs/thissss.png
author: Ashutosh Anand Tiwari
tags: ydkjs
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
### **Very important line...**

It’s a special identifier keyword that is automatically defined in the scope of every function.

### **In function, you can pass your object to do something, right?**

The `this` keyword allows functions to be flexible by referring to the object that calls them. In this example, we pass an object as a reference to a function:

```
 

function identify(context) {
    console.log(context.name);
}
var me = { name: "Ashutosh" };
identify(me); // Output: Ashutosh
```

**Explanation:**

* The function `identify(context)` takes an argument (object reference).
* We create an object `me` with a property `name: "Ashutosh"`.
* Calling `identify(me)` passes the object to the function, and `context.name` prints `"Ashutosh"`.
* This demonstrates how we can pass objects to functions to operate on their properties.

### **this → passing along an Object Reference**

`this` in JavaScript often refers to the object it is called on, but not always.

- - -

## **This never refers to the function itself generally!**

### **Named function example**

```
 
function foo() {
    foo.count = 4;
}
```

**Explanation:**

* In this case, `foo.count = 4;` works because `foo` is a named function.
* You can assign properties to the function object itself (functions in JS are objects).
* This means `foo.count` is valid and will hold the value `4`.

✅ **Possible: Functions can have properties when they are named.**

- - -

### **Anonymous function example (issue with this reference)**

```
 
setTimeout(function() {
    // X can't point to same function reference
});
```

**Explanation:**

* In an anonymous function inside `setTimeout()`, there is no function name.
* `this` does **not** refer to the function itself because it is not named.
* Unlike named functions, we cannot attach properties directly to an anonymous function.
* This can cause issues when trying to reference the function inside itself.

❌ **Not possible: Anonymous functions don’t have a direct reference to themselves.**

- - -

# **How to know? In function `this` means what?**

### **Example using `this` in a function**

```
 
function foo(num) {
    console.log(num);
    this.count++;
}
foo.count = 0;

var j;
foo.call(foo, 5);
```

**Explanation:**

* `foo(num)` is a function that logs `num` and increments `this.count`.
* `foo.count = 0;` initializes a property on `foo`.
* `foo.call(foo, 5);` explicitly sets `this` to `foo`, so `this.count++` works properly.
* This example shows how `this` can be manually controlled using `.call()`.

- - -

### **Note Again:**

✅ `this` does **not** refer to a function's lexical scope.

✅ It is **true** that scope in JavaScript is internally like an object with variables as properties.

❌ However, **this scope object is not accessible to JavaScript code directly.**

# **What is `this` then?**

### **Understanding `this` in JavaScript**

* `this` is **not** author-time binding.
* `this` is **run-time binding**.
* It is **contextual** and depends on how a function is **invoked**, not where it is declared.

### **Key Rule:**

✅ `this` is determined based on the conditions of the function's invocation.

### **Misconception:**

❌ `this` ≠ function’s lexical scope

✅ `this` = function invoked manner

- - -

### **How `this` Works – Call Site Example**

```
 
function foo() {
    console.log(this);
}

foo(); // Call site: Global scope
```

* `foo()` is called in the **global scope**, so `this` refers to the **global object** (`window` in browsers, `global` in Node.js).
* The **call site** (where a function is called) determines `this`, **not where the function is declared**.

### **Important Concept:**

* `this` binding has **nothing to do** with where the function is declared.
* Instead, it is about **where and how** the function is **called**.

## **Call Site**

To understand `this`, you have to understand the **call site**.

* The **call site** is the location in the code where a function is **invoked**, not where it is declared.
* **Finding the call site** requires tracing where the function is actually executed.
* Sometimes, coding patterns can **obscure** the true call site.

- - -

### **Example:**

```
 
function baz() {
    console.log("baz");
    bar();  // Call site of `bar`
}

function bar() {
    console.log("bar");
    foo();  // Call site of `foo`
}
```

### **Call Stack Analysis**

* `baz()` calls `bar()` → **Call site of `bar`**
* `bar()` calls `foo()` → **Call site of `foo`**

- - -

## **Understanding Call Sites & `this` Binding**

> "Take care when analyzing code to find out the actual call site (from the call stack), because call site is the only thing that matters for this binding."

* Call stack can be **observed and seen in the browser's dev tools**.
* Identifying the **real call site** helps in understanding how `this` is bound in different function calls.

# **4 Rules of `this`**

### \*\*\*\*

1️⃣ **Default Binding**

2️⃣ **Implicit Binding**

3️⃣ **Explicit Binding**

4️⃣ **New Binding**

### **1. Default Binding**

➡️ यह `this` का catch-all rule है, अगर कोई और rule apply नहीं होता।

```
 
function foo() {
   console.log(this.a);
}

var a = 2;
foo();
```

🔹 **Global Scope में declare की गई कोई भी variable (जैसे var a = 2;) global object का part होती है।**

🔹 **Function call में default binding होती है।**

➡️ **Default Binding** → `this = global object` (except `"use strict"` mode)

- - -

### **2. Implicit Binding**

➡️ **जब call site में "context object" होता है, तब implicit binding apply होती है।**

➡️ यानी जब कोई function किसी object का हिस्सा होता है और उसी object के द्वारा call किया जाता है।

```
 
function foo() {
   console.log(this.a);
}

var obj = {
   a: 2,
   foo: foo
};

obj.foo();
```

🔹 **Function "object" के अंदर है, तो function का `this` उस object को point करेगा जिसमें function है।**

🔹 **इसका मतलब `this` = object**

➡️ **Implicit Binding:**

1️⃣ **अगर "use strict" mode ON है, तो `this` undefined होगा।**

2️⃣ **Normal mode में `this` उस object को refer करेगा जिसने function को call किया है।**

### **Implicitly Lost: `this` Binding Loss in JavaScript**

जब कोई function object से bound होता है लेकिन कुछ conditions में binding खो जाती है, तो यह **default binding** या **global object binding** (या `undefined` अगर `strict mode` में हो) हो जाती है।

### **Example 1: Function Reference Assignment**

```
js
CopyEdit
function foo() {
  console.log(this.a);
}

var obj = {
  a: 10,
  foo: foo
};

var funRef = obj.foo; // Function reference assigned to a variable

funRef();  // `this` => window (or undefined in strict mode)
obj.foo(); // `this` => obj, so it prints 10
```

**Explanation:**

* `obj.foo()` में `this` `obj` को refer करता है, इसलिए `10` print होगा।
* `funRef()` में function reference एक **plain function call** की तरह हो गया, जिससे `this` global object (`window` or `undefined`) पर point करता है।

- - -

### **Example 2: Function Passed as Callback (Binding Loss)**

```
js
CopyEdit
function doSomething(fn) {
  console.log(this); // `this` depends on call site
  fn();
}

var obj = {
  a: 100,
  foo: function() {
    console.log(this.a);
  }
};

doSomething(obj.foo); // `this` => window, so `undefined`
```

**Explanation:**

* जब `obj.foo` को callback की तरह pass किया जाता है, तो उसका reference transfer हो जाता है।
* यह **plain function call** बन जाता है, जिससे `this` global scope (window) पर reset हो जाता है और binding **lost** हो जाती है।

- - -

### **Key Takeaways**

1. **Function references lose their object binding** अगर उन्हें किसी variable में assign किया जाए।
2. **Callback functions lose their `this` binding** जब उन्हें किसी दूसरे function में pass किया जाए।
3. **Use `.bind()`, `.call()`, या `.apply()`** to explicitly bind `this` to an object.

### **Solution: Using `.bind()`**

```
 
doSomething(obj.foo.bind(obj)); // Ensures `this` stays bound to obj
```

## **Understanding `call()`, `apply()`, and `bind()` in JavaScript**

These three methods allow us to control the `this` context of a function and pass arguments dynamically.

### **1. `apply()`**

`apply(object, [array as arguments])`

`apply()` is used to invoke a function with a specified `this` value. It accepts arguments in an array format.

- - -

### **2. `bind()`**

`bind()` binds a function to an object and returns a new function with the specified `this` value. It is useful in function currying.

### **Example: Currying with `bind()`**

```
 
function multiply(x, y) {
  console.log(x * y);
}

// Partially applying the function using bind
const multiplyByTwo = multiply.bind(this, 2);

multiplyByTwo(3); // Output: 6
multiplyByTwo(4); // Output: 8
```

- - -

### **Key Differences**

* `call()` executes the function immediately and requires arguments to be passed individually.
* `apply()` also executes the function immediately but requires arguments in an array format.
* `bind()` does not execute the function immediately; instead, it returns a new function with the `this` value permanently set.

### **New Binding in JavaScript**

In other programming languages, constructors are special methods attached to classes. When a class is instantiated using the `new` operator, the constructor of that class is called.

```
 
something = new MyClass();
```

The `new` in JavaScript is different from other OOPLs.

### **New in JavaScript**

* Constructors are just functions that happen to be called with the `new` operator.
* They are not directly related to classes or instantiating them.
* They are just regular functions with a special behavior.

### **When we do this:**

```
 
let num = new Number();
```

* It initializes a newly created object.

### **Function call with `new` operator**

```
 
functionCall()  →  Constructor Call (with `new` operator)
```

Whenever a function is invoked with `new` in front of it, the constructor call happens automatically.

- - -

### **How `new` Works**

1. A brand new object is created.
2. The newly created object is linked to its prototype.
3. The object is set as the `this` binding for that function call.
4. If the function does not explicitly return an object, the newly created object is returned.

### **Example**

```
 
function Foo() {
  this.a = 10;
}

const myObj = new Foo();
console.log(myObj); // { a: 10 }
```

- - -

### **Binding Priorities**

1. **Default Binding**
2. **Implicit Binding**
3. **Explicit Binding**
4. **New Binding** (Highest Priority)

**Priority Order:**

Explicit > New > Implicit > Default

> You need to know the call site of the function call to determine which rule applies.

- - -

### **Binding Rule Precedence**

* **Default Binding** acts as a fallback.
* **Implicit vs Explicit Binding:** Explicit binding has more precedence.
* **`new` has the highest priority**, but it is used before explicit binding.

### **Not Allowed**

```
 
new foo.call(obj); // ❌ Not allowed
```

- - -

### **Exceptions**

* If `null` or `undefined` is passed in `.call()`, **default binding** applies.
* Sometimes, using `bind()` and `apply()`, users can pass `null` or `undefined` as the first parameter.

- - -

### **DMZ (De-Militarized Zone) Object**

* If `this` is not passed in `apply()` or `bind()`, it results in an **empty, non-delegated object**.
* This is called a **DMZ object**.

### **Creating a DMZ Object**

```
 
const dmzObj = Object.create(null);
```

* This creates an **empty object without delegation**.

### **Indirection of this**

We can also create indirect references to functions, & in those cases when that function reference is invoked, **the default binding rule applies**.

### **Example**

```jsx
 
function foo() {
    console.log(this);
}

var a = 2;
var obj = { a: 3, foo: foo };

var p = obj.foo; // Indirect reference
p();  // Default binding applies
```

### **Explanation**

* यहाँ पर **p** एक **indirect reference** बना **obj.foo** का।
* जब **p()** को call किया गया, तो default binding apply हुई।
* Default binding में **this** global object को refer करता है।

- - -

### **Lexical This**

Function declaration deals with **4 rules**, but in **ES6**, there is one more way to define functions, which **does not use these rules** → **Arrow Function**

### **Arrow Function Characteristics**

* **Arrow functions are not defined by the function keyword** but by **`=>` (arrow mark)**
* **Arrow functions adopt `this` binding from the enclosing function or global scope.**

### **Example**

```jsx
 
function foo() {
    return (a) => {
        console.log(this, a);
    }
}

var obj1 = { a: 2 };
var obj2 = { d: 9, b: 3 };

var bar = foo.call(obj1);
```

### **Explanation**

* **Arrow function अपना this नहीं लेती**, यह उस **enclosing function या global scope** से **this** लेती है।
* यहाँ **foo.call(obj1)** का **this** arrow function के अंदर **obj1** ही रहेगा।
* अगर **bar.call(obj2)** किया जाए, तब भी arrow function का **this** **obj1** ही रहेगा, क्योंकि यह lexical binding follow करता है।
