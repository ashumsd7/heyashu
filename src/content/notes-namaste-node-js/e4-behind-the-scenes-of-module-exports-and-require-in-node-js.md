---
title: "e4: Behind the scenes of Module exports and require in node js"
name: Module.exports & require
episode: 4
publishedOn: 08-26-2024
updatedOn: 03-09-2024
thumbnail: https://i.ibb.co/800M4Jz/image.jpg
author: Ashutosh Anand Tiwari
tags: module and exports , require , nodejs
profilePic: /public/images/blogs/pfp2.png
followLink: https://github.com/ashumsd7
metaName: Modules and exports in node js
metaContent: Learn How node modules and exports works in node js
---
As you saw in the last episode, we wrote our first line of code in Node.js. Now, we could just keep adding whatever we want to `app.js`, and technically, it would work. But that's not the best way to do things because the file would get cluttered and hard to manage. Instead, we need multiple files. Basically, there should be one main entry file that runs the code, and other files will be connected to it. So, you'll use `require` to include different modules into your main file.

![image.png](https://i.ibb.co/s567zyG/11.jpg)

### require

So, when you use `require` to include a new module into another module, the code in the required module runs first, and then the rest of the code in your file executes. You can use the `require` keyword anywhere in your Node.js code.

**Note:** You can’t directly access variables and functions from one module in another module just by using `require`. Even if the code runs, you can't directly access the code. For example, if a module `sum.js` has a function `getSum()`, and you import `sum.js`, you still can't access `getSum()` in your entry file. But why is that?

The reason is that Node.js modules are encapsulated, which means each module has its own scope. To access variables or functions from another module, you need to explicitly export them using `module.exports` or `exports`.

Modules protect their code by default. that one module be like: 

![image.png](https://i.ibb.co/j4bYskd/Capture.jpg)

Arey aise kaise nahi btayega, So to know variable and functions of that module, you have to export and import in the file you  want to import.

sum module

```jsx
console.log('I am sum module');

 function calculateSum(a,b){
  console.log("Sum is", a+b);
}

module.exports =calculateSum  // the way you export  ( remember its export+s not export )
```

app..js ( entry file )

```jsx
const calculateSum= require('./sum.js')  // the way you import
console.log("I am entry files");

calculateSum(4,5)   // 9 is the output
```

Now app.js be like

![image.png](https://i.ibb.co/gtXGg9j/2.jpg)

### How to export multiple data from a module

To export multiple things from a module in Node.js, you need to use an object to bundle them together and then import them as an object in another file. Here’s how you can do it with your `multipleExport.js` file:

```jsx
var name ='Mohan'

function sayHello(name){
    console.log(`Hello ${`name`}!`);
}

module.exports= {               // this is the way you export multiple things
  sayHello,
  name,
}
```

and this is the way you import in app.js

```jsx
// destructured : learn Destructuring
const {sayHello, name} = require('./multipleExport..js')   // this is the way you imported

sayHello('Ashutosh')    // Hello Ashutosh
console.log("Exported name is", name);   // Mohan

// what will you get if you print modile
console.log(module.export) // {}  emoty object 
```

### Common Js and ES Modules

What we've learned so far with **require** and **module.exports** is called **CommonJS Modules** or **CJS**. This is the traditional module system used in Node.js. But there's another module system called **ES Modules** (or **ESM**, **`mjs`**), which is the standard for JavaScript modules in modern web development.

To use ES Modules in Node.js, you need to set your project to use modules. Create a `package.json` file and include `"type": "module"` in it. This tells Node.js to use the ES Module system for your project.

```json
// package.json
{
  "type" : "module"
}
```

and now you can generally import and export as your front end projects

```jsx
// in sum js
export function calculateSum(){....}

// in app js
import {calculateSum) from './sum.js'  or './sum'
```

Remember: By default, Node.js uses the CommonJS (CJS) module pattern, which is the older way of handling modules. According to the JavaScript foundation, the future will favor ES Modules (ESM), but currently, most of the industry still uses CJS. CJS is synchronous, meaning it requires all files before running the next line of code, whereas ES6 Modules can be asynchronous, offering better performance. CJS runs in a non-strict mode, while ESM runs in strict mode. ES6/ESM is the default in React and new libraries. Printing `module.exports` in CJS returns an empty object by default.

![image.png](https://i.ibb.co/Ypv7mBL/3.jpg)

Node.js also comes with built-in modules that you can require and import directly into your code. These modules are pre-installed with Node.js and provide various functionalities like file handling, HTTP requests, and more. 

### Definition of Module

A module is essentially a collection of code that remains private unless explicitly exported. This means you can organize your code into different modules, keeping them isolated and secure, only sharing what's necessary by using the `exports` or `module.exports` keywords to make functions or variables accessible to other modules.

- - -

### Keys to learn

1. Object destructuring
2. Modules in JS
3. Strict mode
4. Difference between ES6 modules and CJS
5. In-built Modules

### Question to search

1. Reasons why modules are protected by default ?
2. Whats the difference between require and import and export vs module.exports

### Key findings

* Modules are protected by default after requiring it will run bu can't be access until you export
* These are protected to avoid conflicts from other modules
* Common Js, EJS  / ESModule , ESM,  MJS ES6 Modules are two module patterns to access data within modules
* In CJS code runs in non strict mode, but in ESM pattern code runs in strict mode

![image.png](https://i.ibb.co/DYZvYqP/5.jpg)

And thats all for this episode knowing modules and require

My name is Ashutosh Anand Tiwari, and I am writing digital notes on node js, if you like the notes please share with you friends if anything wrong in the notes feel free to contribute and fork the repo right now. if you want to write next epidote note please [fork the repo and contribute](https://github.com/ashumsd7/heyashu/tree/main/src/data) to it lets write and learn together, and In last I am just requesting to give a star 🌟 to [this repo](https://github.com/ashumsd7/heyashu/tree/main/src/data), for any other query click here to contact [lets connect here.](https://topmate.io/aat/1148709/pay)

Take care, Good Bye :) [](https://topmate.io/aat/1148709/pay)
