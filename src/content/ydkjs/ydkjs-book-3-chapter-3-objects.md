---
title: ydkjs book 3 chapter 3 objects
name: Chapter 3 Objects
episode: 3
seasonNumber: 1
publishedOn: 03-09-2025
updatedOn: 03-09-2025
thumbnail: /public/images/blogs/objects_ydkjs.png
author: Ashutosh Anand Tiwari
tags: ydkjs, objects
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
### **Objects**

Objects in JavaScript are essential and a general building block on which the entire language is built.

**`this`** always points to some object, and it depends on the call-site and basically follows **4 rules**. For arrow functions, `this` depends on the lexical scope.

### **Syntax:**

Objects come in two forms:

* **Literal form**
* **Constructed form**

```jsx
javascript
CopyEdit
// Literal form
var obj = { key: value };

// Constructed form
var myObj = new Object();
myObj.key = value;
```

### **Difference**

* The only difference is in **literal form**: You can add as many keys as possible at once.
* In **constructed form**, you need to add keys one by one.

- - -

### **Primitive Types vs Objects**

These are **primitive types** and not objects:

* `String`, `Number`, `Boolean`, `Null`, `Undefined`
* **`Null`** is also a primitive type, but `typeof null` returns `Object`, which is a **bug** in JavaScript.

### **Never Say:**

Everything in JavaScript is an object; this is a **misconception**!

- - -

### **Functions**

* A **function** is a subtype of an object and is technically a callable object.
* Functions can be handled like other objects.

### **Example**

```jsx
javascript
CopyEdit
function greet() {
    console.log("Hello, World!");
}

greet(); // Calls the function, which is an object.
```

- - -

### **Arrays**

Arrays are also a form of objects with some extra behaviors, where we can store structured data in it.

### **Example**

```jsx
javascript
CopyEdit
var arr = [1, 2, 3];
console.log(arr.length); // Outputs 3
```

- - -

### **Built-in Objects**

There are several other object subtypes, usually referred to as **built-in objects**. These are directly related to their primitive counterparts, and their relationship is more complex.

Some of these built-in objects include:

* **String**, **Number**, **Boolean**, **Object**, **Function**
* **Array**, **Date**, **RegExp**, **Error**

# **JavaScript Strings, Numbers & Objects**

## **Strings & Numbers in JavaScript**

Strings & Numbers in JavaScript might feel like classes, but they are actually **built-in functions** that can be called as **constructors** to create new objects.

### **Example:**

```
js
CopyEdit
var str = "Hello";
console.log(typeof str); // "string"

var str2 = new String("Hello");
console.log(typeof str2); // "object"
```

* `"Hello"` is a **primitive string**, **immutable**, and does not have object properties.
* `new String("Hello")` creates a **String object**, which has properties and methods.

## **Implicit Type Conversion (Coercion)**

JavaScript **automatically converts** primitive strings to String objects when needed.

**For Example:**

```
js
CopyEdit
var str = "Hello";
console.log(str.length); // 5
```

Here, JavaScript **temporarily converts** the primitive `"Hello"` into a **String object** to access `.length`.

- - -

## **Number Conversion & Object Wrappers**

* Similar behavior happens with **Numbers** and other types.
* `toFixed()` converts a number to a **string representation**.

**Example:**

```
js
CopyEdit
var num = 5.6789;
console.log(num.toFixed(2)); // "5.68" (String)
```

## **Important Notes**

* `null` and `undefined` **do not** have object wrappers.
* **Date objects** can only be created using the `new` keyword.
* **Errors** can also be created using `new Error()`.

- - -

# **Object Properties & Symbols**

## **Object Contents**

Objects store **references** to data, and we can access their properties using:

* **Dot notation (`obj.key`)**
* **Bracket notation (`obj["key"]`)**

### **Example:**

```
js
CopyEdit
var obj = { name: "John" };
console.log(obj.name);   // "John"
console.log(obj["name"]); // "John"
```

## **Property Names in Objects**

* Object property names are always stored as **strings**.
* If we use a non-string key, JavaScript **automatically converts** it to a string.

### **Example:**

```
js
CopyEdit
var obj = {};
obj[true] = "yes";
obj[3] = "number";
console.log(obj);
// { "true": "yes", "3": "number" }
```

Even though we assigned a `boolean` and `number` as keys, they are converted into **string keys**.

## **Using Symbols in Objects**

To prevent automatic conversion, we use **Symbols** as property keys.

### **Example:**

```
var sym = Symbol("uniqueKey");
var obj = {};
obj[sym] = "value";
console.log(obj[sym]); // "value"
```

* **Symbols do not get converted into strings**, making them unique property keys.
* They are useful for **hidden properties** or **unique identifiers** in objects.

### What is a Method?

* If a function is part of an object, it is called a **method**.
* But it is still a normal function.

### Arrays

* Different way of storing values.
* Stored values have no restrictions.
* Uses **numeric indexing** starting from **zero**.
* Arrays are **objects**, so properties can be added.

Example:

```
var myArr = ["foo", 42, "bar"];
myArr["3"] = "baz";
console.log(myArr.length); // 4
console.log(myArr[3]); // "baz"
```

* **Indexes are always numbers** in arrays.
* **Object keys are always strings**.

### Shallow Copy vs Deep Copy

* **Shallow Copy** → References the same object.
* **Deep Copy** → Exact values are copied.

### Solution:

```
var newObj = JSON.parse(JSON.stringify(obj));
```

### Property Descriptor

Before **ES5**, there was no way to check the characteristics of properties (whether they were readable or not).

### In **ES5**:

* All properties of an object are described using a **property descriptor**.

Example:

```
var myObj = { a: 2 };
Object.getOwnPropertyDescriptor(myObj, "a");
```

Returns:

```
{
  value: 2,
  writable: true,
  enumerable: true,
  configurable: true
}
```

### Object Properties

Objects have these properties:

* **value**
* **writable**
* **enumerable**
* **configurable**

We can use `Object.defineProperty()` to add or modify a property.

### Writable Property

* Controls whether a value can be changed.
* If **writable is false**, re-assigning a value won't work.
* In **strict mode**, trying to change a non-writable value throws a **TypeError**.

Example:

```
var myObj = {};
Object.defineProperty(myObj, "x", {
  value: 2,
  writable: false
});
myObj.x = 10;
console.log(myObj.x); // 2, not 10
```

* In **strict mode**, the line `myObj.x = 10;` throws a **TypeError**.

### **\[[Get]]**

```
var myObj = { a: 2 };
console.log(myObj.a); // 2
```

* **Internally** it calls `[[Get]]` kind of function call on it.
* If it finds, it will return the value accordingly.
* If not able to find out → it goes to `[[Prototype]]`.
* If it doesn't get, it gives `undefined`.

- - -

### **\[[Put]]**

* It does same to write value, but **before that it checks**:

  * If `writable: true`, then it assigns value.
  * If not able to find out property to keep that value, then it goes to `[[Prototype]]`.

- - -

### **Getters & Setters**

* **ES5 introduced a way** to override part of these default operators, **not on an object** but **at per property level**, through the use of **getters and setters**.
* **Getters** are the property that actually call a **hidden function** to retrieve a value.
* **Setters** are properties that are **called a value function to set a value**.

```
js
CopyEdit
var myObj = {
    get a() { return 2; }
};
console.log(myObj.a); // 2
```

```
js
CopyEdit
Object.defineProperty(myObj, "b", {
    get: function () {
        return this.a * 2;
    }
});
console.log(myObj.b); // 4
```

* Even if you re-define:

```
js
CopyEdit
myObj.b = 10;
console.log(myObj.b); // 4
```

**Because of setter, `b` value doesn’t change.**

- - -

### **Conclusion**

* **It means `get` can override** `[[Get]]`.
* **Same way `set` also override `[[Put]]`.**

## **Existence**

There is a way to check if an object has some **value or not**.

### **Example:**

```
js
CopyEdit
var myobj = { a: 2 };

console.log("a" in myobj); // true
console.log("b" in myobj); // false
```

* `myobj.hasOwnProperty("a")` → **true**
* `myobj.hasOwnProperty("b")` → **false**

> Note: "in" consults \[Prototype] chain.
>
> `hasOwnProperty()` does **not** consult `[Prototype]` chain.

- - -

## **Enumeration**

### **Example:**

```
js
CopyEdit
var myobj = {};
Object.defineProperty(myobj, "a", {
  enumerable: true,
  value: 2
});
Object.defineProperty(myobj, "b", {
  enumerable: false,
  value: 3
});

for (var k in myobj) {
  console.log(k, myobj[k]);
}
```

* **Output:** `a: 2`
* `b` **is not displayed** because it is **not enumerable**.

> This does not consult \[Prototype] chain.
>
> Here in for...in you will not get b because enumerable false.

- - -

## **Iteration**

* `for...in` loop iterates over **the list of enumerable properties** of an object.
* But what if we want to iterate **over values**?
* **ES5 has given `forEach`, `some`, `every`.**

### **Example:**

```
js
CopyEdit
let arr = [1, 2, 3];

for (let i in arr) {
  console.log(i);
}
// Output: 0, 1, 2 (index)

for (let i of arr) {
  console.log(i);
}
// Output: 1, 2, 3 (values)
```

* `for in` → **gives index**.
* `for of` → **gives value**.

```
js
CopyEdit
let obj = { a: 1, b: 2 };

for (let i of obj) {
  console.log(i);
}
```

> Error aayega → "obj is not iterable"

- - -

## **Iterators**

* `for of` loop **jo hai, vo** `@@iterator` function ko **dhoondta hai internally**.
* **Arrays me ye hota hai by default**, but **objects me nahi hota**.
* **Isliye `for of` object pe error dega.**

### **Example:**

```
js
CopyEdit
var myArr = [11, 22, 33, 44];
var it = myArr[Symbol.iterator]();

console.log(it.next()); // { value: 11, done: false }
console.log(it.next()); // { value: 22, done: false }
console.log(it.next()); // { value: 33, done: false }
console.log(it.next()); // { value: 44, done: false }
console.log(it.next()); // { value: undefined, done: true }
```

> Regular objects do not have built-in @@iterator.
>
> You can define @@iterator on an object, then we can iterate over it.

- - -

## **Why `for...of` fails for objects?**

Objects do not have **built-in `@@iterator`**, so **`for...of` loop fails**.

- - -

## **Next Topics:**

> I am pausing ready #Book 3 after Chapter #3.
>
> **Class & Other Chapters like `[Prototype]` will check later!**
