---
title: "e2: Into JavaScript"
name: "Chapter 2: Into JavaScript "
episode: 21
seasonNumber: 1
publishedOn: 03-06-2025
updatedOn: 03-06-2025
thumbnail: /public/images/blogs/sdsd.png
author: Ashutosh Anand Tiwari
tags: ydkjs
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
So in the last chapter, we saw the basic building blocks of JavaScript and programming. Now, let's talk more about them in the context of JavaScript. Let's discuss the built-in data types in JavaScript.

### Data Types in JavaScript

* string
* number
* boolean
* null
* undefined
* object
* Symbol (new in ES6)

### `typeof` Operator

Now, the question is, in JavaScript, any variable can hold any type of value—number, string, etc. So how do we identify the type of value inside a variable?

Here, the `typeof` operator helps us. We just need to write `typeof` followed by the value or variable, and it will return one of these seven built-in types.

### typeof null

```jsx
typeof null // object
```

**Remember:** `typeof null` returns `"object"`, which is a long-standing bug in JavaScript. If someone asks why, just say it's a bug. Fixing it now would introduce more issues because the industry relies heavily on JavaScript, and a lot of existing code depends on this behavior. We will discuss this in more detail later in this series.

### Objects

Object types refer to a compound value where you can set properties (named locations), and each property holds its own value of any type.

```jsx
var obj ={
a:'hello',
b:42,
c: true,
41:'yes'
}
```

to access values we use of of JavaScript operator which dot \[.] operator and bracket noteation

```jsx
obj.a  // hello
obj['a'] // hello    
objec[40+1] // yes  [can have computed values as key] 
```

There are other value type, remeber this line those are value type : functions and arrays , bnut trather then being a built in JS types those are consdidered and are suybtypes of object, will dig deep how and why , in later chapters , so have patience.

### Arrays

Arrays are an object that holds values not in key-value pairs but in an indexed way, like the 0th index holding some value, the 1st index holding another value, and so on.

```jsx
var arr = [ 'hello', 42, true, 'yes' ]
arr.length //4
arr[0] // 'hello' 
typeof arr //object
```

### Functions

Functions, as discussed in Chapter 1, are pieces of code that run whenever they are called. In JavaScript, functions are also a subtype of objects.

```jsx
function foo(){
return 42
}
foo.bar= 'hey ashu'

typeof foo  //function
typeof foo() // number
typeof foo.bar // string
```

### Built in Type Methods

```jsx
var b ='hello'
var b =3.12159
a.length //5
a.toUpperCase() // HELLO
b.toFixed(4) // "3.1416"
```

Now, the question is: if there are primitive types like `number` and `string`, then how are you able to call methods on them? This is possible because of **Wrappers**, basically called **Natives**. When you use a primitive value like `"hello"` as an object by referencing a property or method, JavaScript automatically **"boxes"** the value into its corresponding object wrapper (hidden).

A string value can be wrapped with the `String` object, and a number with the `Number` object—these are JavaScript natives. Do not worry, we will discuss more on this in later chapters. This is just a glance.

### Comparing Values

We know that when we compare values, **coercion** takes place. In implicit coercion, which happens automatically, we sometimes get confused about whether the **left-hand side (LHS)** or **right-hand side (RHS)** will be coerced into what type. In fact, it's not confusing—we will cover this properly later.

```jsx
var a= '42'
var b a*1 //"42"   string becomes number and this is calle dimplicit coercion
```

### Truthy & Falsy

These are values that are **falsy**; all other values are **truthy**:

* `""` (empty string)
* `0`, `0`, `NaN`
* `null` and `undefined`
* `false`

Sometimes, we think that `[]` (empty array) and `{}` (empty object) are falsy values, but the answer is **no**—they are actually **truthy**.

```jsx
[] // truethy value
{} // truhty value
```

### Equality and Tricky Coercion

There are four equality operators used to check equality:

* `==` (loose equality)
* `===` (strict equality)
* `!=` (loose inequality)
* `!==` (strict inequality)

Ohk, so many developers and blogs say that when you ask about the difference between `==` and `===`, they say one checks only value (`==`), and the strict equality operator (`===`) checks types too. But this is not the complete explanation.

The proper way to characterize it is:

* `==` checks **value equality** with **coercion allowed**.
* `===` checks **value equality** where **coercion is not allowed**.

```jsx
var a= '42'
var b=42
a==b //true
a===b // false
```

In `a == b`, the string `"42"` is converted to the number `42`, and then `42` is compared with `42`, which results in `true`.

But `a === b` returns `false` because coercion is not allowed, and the string `"42"` is not converted to a number. Learn more in Section 11.9.3 of the JS ECMA Specifications.

### Coercion of Array

Remember: By default, an array is converted to a string by joining all its values with commas.

```jsx
var a= [1,2,3]
var b =[1,2,3]
var c="1,2,3,"
a==c // true
b==c // true
a==b // false ( diff reference)
```

### Inequality

`<`, `>`, `<=`, `>=` are used to check inequality and are sometimes called relational operators.

Let's take a quick look at how coercion works here.

```jsx
var a=41;
var b ="42";
var c= "42"

a <b // true
b < c // true
```

The second one—why is it `true`?

Let's check **ES5 Specification 11.8.5**:

> If both values in a < comparison are strings, like b < c, then they are compared lexicographically (alphabetically, like in a dictionary).
>
> But if one or both values are **not** strings, as in `a < b`, then they are coerced into numbers, and typical numeric comparison happens.

The problem arises when you compare a number with a value that **cannot** be converted into a number.

```jsx
var a =42;
var b='foo'
a<b //false
a>b //false
a==b //false
```

So, as we know, `"foo"` will be coerced into a number, but since it's not a valid numeric value, it results in **NaN** (Not a Number).

Since any comparison involving **NaN** always returns **false**, this can lead to unexpected results in inequality checks.

```jsx
Number('foo') // NaN
```

so fincally it get compare dliek this 

```jsx
42 < NaN // false
```

### NaN - The Unreliable Value

Remember, **NaN** is never less than or greater than any value. Even **NaN == NaN** returns **false**.

📝 **NaN kisi ka saga nahi hai, khud ka bhi nahi!**

- - -

### Variables

A **variable** is like a box that holds a literal value. The name of a variable must be a **valid identifier**.

### **Rules for Variable Names:**

* It must start with **a-z, A-Z, `$`, or `_`**.
* It can contain numbers (`0-9`), but **cannot start with a number**.
* Certain words, like **reserved keywords** (`for, if, else, return, etc.`), **null, true, and false**, cannot be used as variable names, but they can be used as **property names**.

- - -

### Function Scope & Hoisting

Whenever a `var` appears inside a scope, its **declaration is considered to belong to the entire scope**, meaning it is accessible throughout.

This behavior is called **hoisting**, where a variable **declaration** is conceptually "moved" to the top of its enclosing scope.

```jsx
var a=2 ;
foo()   // foo is callable becaus eof hoisitng

function foo(){

a=3;
console.log(a) //3
var a; // this is not good idea but possible
}

console.log(a) //2
```

### Nested Scopes

JavaScript allows **nested scopes**, meaning an **inner scope** can access variables from an **outer scope**, but the **outer scope** cannot access variables from the **inner scope**.

If a variable is not found in any available scope, JavaScript throws a **ReferenceError**.

- - -

### Conditionals

In JavaScript, we use **`if-else`** statements and **`switch`** cases to handle conditions.

```jsx
if(condition){
}else{

}

if(){

}else if (){

}else{

}

switch(a){
case 2:
// 
break;
case 3:
// 
break;

default:
//fallback code
}

// there are possibility to have two case tonmatc

switch(a){
case 2:
case 5:
// 
break;

// Turnary operator
var b =(a>32) ? 'hey' : 'no'  // this is similer as if else
```

### Strict Mode

ES5 introduced **strict mode**, which enforces stricter rules for safer and more reliable code.

You can enable strict mode for a **function**, a **block**, or an **entire file**.

**Important:** In strict mode, **automatic global variables** are not allowed.

More details will be discussed later.

```jsx
function foo(){
"use strict"
a=1; //Reference Error  in strict mnode
}
```

### Function as Values

A function is just like any other **value** in JavaScript. It exists in the **enclosing scope** where it is declared.

Functions, like numbers (`42`) or arrays (`[1,2,3]`), can be:

* Assigned to variables
* Passed as arguments
* Returned from other functions

```jsx
var foo =function (){

}  // this is called anonyms function because it has no name

var x=  function bar(){

}  // this is called function expression
```

Note: Named function expressions are generally preferable, and anonymous functions are also commonly used.

We will study more in the Scope and Closures chapter.

### IIFE (Immediately Invoked Function Expressions)

Another way to execute a function expression is through an IIFE (Immediately Invoked Function Expression).

```jsx
(function IIFE(){
console.log('Hello')
})(); // prints Hellod
```

So the function body is surrounded by `()` and followed by `()` to execute the function immediately.

### What's the benefit?

There are many, but the main one is that an IIFE is a function, and functions create variable scope. Using an IIFE in this way helps declare variables that won’t affect the surrounding code outside the IIFE.

### Closures

We will cover this topic properly later, but you can think of closures as a way to "remember" and continue accessing a function’s scope and its variables even after the function has finished running.

```jsx
function makeAdder(x){

  function add(y){
    return x+y
  }

  return add
}

const getSum= makeAdder(3)
const result= getSum(6)   
console.log("result",result) //9
```

### Closures

The inner function returned with each call to the outer `makeAdder` function remembers the value of `x` that was passed to it.

The most common use of closures in JavaScript is the **module pattern**. We will read about it properly later, or if you want to learn more, you can search online.

### `this` Identifier

If a function has a `this` reference inside it, that `this` usually points to an object. However, which object it points to depends on **how** the function was called.

It's important to note that `this` does not refer to the function itself—this is a common misconception. We will discuss this properly later.

### Polyfilling

There are two main techniques to bring newer JavaScript features to older browsers: **Polyfilling** and **Transpiling**.

The term **Polyfill** was coined by Remy Sharp. It refers to taking the definition of a newer feature and writing equivalent code that works in older JavaScript environments.

👉 [Learn Polyfill with code](https://heyashu.in/blog/polyfills-in-javascript-with-code)

### Transpiling

There is no way to polyfill **new syntax** added to the language. New syntax will always throw an error in older JavaScript engines because it is **unrecognized** or **invalid**.

A better option is to use a tool that **converts** newer code into its older equivalent. This process is called **Transpiling** (Transform + Compiling).

For example:

* **Babel** transpiles ES6 into ES5
* **Traceur** transpiles ES6, ES7, and beyond into ES5

### Non-JavaScript

So far, we have covered JavaScript only, but there are also codes that **look like JS but are not JS**—these are **DOM APIs**.

```
js
CopyEdit
var el = document.getElementById('foo');
```

Here, `document` is a **global variable** present in the browser, but it is **not** provided by the JS engine and **not controlled** by the JS specification. It looks like a JavaScript object, but it's not exactly JS—we call it a **host object**.

Similarly, `getElementById` looks like a JavaScript function, but it is actually provided by the **browser DOM**, implemented in C/C++.

Other examples include:

* `console.log`
* `alert`
* `prompt`

- - -

### Chapter 3: Into YDKJS

This chapter is just an overview of what we will cover in this book.

Topics include:

* Object Prototypes
* Types & Grammar
* Async & Performance
* ES6 Features

Now, let's jump to **Book 2: Scope & Closures**. See you there! Take care. 😊
