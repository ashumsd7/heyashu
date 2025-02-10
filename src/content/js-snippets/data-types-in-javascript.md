---
title: Data Types in JavaScript
name: Data Types in JavaScript
episode: 1
publishedOn: 04-09-2024
updatedOn: 04-09-2024
thumbnail: https://i.ibb.co/DQf1k4k/data-types.jpg
author: Ashutosh Anand Tiwari
tags: js snippets, data types, interview
profilePic: /public/images/blogs/pfp2.png
followLink: https://github.com/ashumsd7
---
> **Interviewer :** Tell me all data types in JavaScript?

**You:** There are total **8 built** in data types in JavaScript.

1. string
2. number
3. boolean
4. null
5. undefined
6. object
7. symbol ( ES6 feature)
8. bigInt 

### typeof Operator

JavaScripts Provides typeof operator to check the value and its type

```jsx
var a;

typeof a; // undefined ( because there is no value in it)

a ='JS Snippets'
typeof a; // string

a=23;
typeof a; // number

a= undefined;
typeof a; // undefiend

a= true;
typeof a; // boolean

a= null;
typeof a; // object ( this is bug in JS, Google it to learn more about it)

a= {name:'Ashutosh'}
typeof a; // object
```
