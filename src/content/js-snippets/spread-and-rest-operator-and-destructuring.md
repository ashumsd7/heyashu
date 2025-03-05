---
title: Spread and Rest Operator and Destructuring
name: Spread and Rest Operator and Destructuring
publishedOn: 03-05-2025
updatedOn: 03-05-2025
author: Ashutosh Anand Tiwari
tags: javascript, interview
experienceLevel: 0,1,2,3,4,5
profilePic: https://avatars.githubusercontent.com/u/40313523?v=4
followLink: https://www.instagram.com/javascripterrr
---
This is ES6 feature

### Spread Operator

The spread operator is used to expand elements of an iterable, such as an array, object, or string, into individual elements.

It is used for:

* Copying arrays
* Merging arrays and objects
* Passing arguments to functions

```jsx
let arr1= [1,2,3]
// copy an array
let arr2 =[...arr1]
// merge an array
let mergedArray=[...arr1,...arr2]
// same goes for object
let obj1={
  name:"heyashu",
  year: 2025

}
// copy an obj 
let newObj= {...obj1}

let obj2={
 city: 'Ayodhya'

}
// merge two objects
let mergedObj= {...obj1,...obj2}

function sum(a,b){
  console.log("a is ",a)
  console.log("b is ", b)
  console.log("Sum is ",a+b)
}

const numbers=[1,3]
// passing arguments 
sum(...numbers)

console.log(arr1)
console.log(arr2)
```

### Rest Operator

The rest operator is the opposite of the spread operator. While the spread operator expands values from an array, object, or iterable, the rest operator collects multiple values into a single data structure.

It is mainly used for receiving function arguments, array destructuring, and object destructuring.

```jsx
//Function Arguments
function sum(...args){
  console.log("arg are ", args) //[ 1, 2, 3, 4, 5, 5 ]
}

let arr= [1,2,3,4,5,5]
sum(arr)

// array Destructuring
let [a,b,c,...x] =arr

console.log(a,b,c,x) //1 2 3 [ 4, 5, 5 ]

// Object Destructuring 

let obj2={
  name:'heyashu',
 city: 'Ayodhya',
 year:2025

}

let {name, ...moreKeys }= obj2
console.log("name is ", name)  //heyashu
console.log("moreKeys",moreKeys) //{ city: 'Ayodhya', year: 2025 }
```
