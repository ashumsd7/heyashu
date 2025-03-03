---
title: Polyfills in JavaScript with Code
name: Polyfills in JavaScript with Code
publishedOn: 03-03-2025
updatedOn: 03-03-2025
author: Ashutosh Anand Tiwari
tags: javascript, interview
experienceLevel: 3,4,5
profilePic: https://avatars.githubusercontent.com/u/40313523?v=4
followLink: https://www.instagram.com/javascripterrr
---
Polyfills are code snippets that fill the gap for older browsers to support modern web features.

More precisely, **a polyfill is a piece of code that enables older browsers to use modern web features.** Polyfills are often written in JavaScript but can also be implemented in other programming languages.

### How It Works?

1. A polyfill first checks if the browser supports a feature.
2. If the browser supports it, the polyfill does nothing.
3. If the browser doesn’t support it, the polyfill provides its own implementation.

Now, let's explore polyfills for some JavaScript features and learn how they work.

### Polyfill for `forEach`

```jsx
Array.prototype.myForEach=function(cb){
  console.log('this is', this)
  for(i=0;i<this.length;i++){
    cb(this[i],i,this)
  }
} 

const arr= [1,2,3,4,4,5]

arr.myForEach(function(item, index){
  console.log("Hey", index, item)
})

```

### Polyfill of Map

```jsx

Array.prototype.myMap=function(cb){
  const result=[] 
  for(i=0;i<this.length;i++){
   const val=  cb(this[i],i,this)
   result.push(val)
  }
  return result
}
const res =  arr.myMap(function(item){
  console.log("hey map", item)
  return item*2
})

console.log('res is',res)
```

### Polyfill of Filter

```jsx
const arr= [3,4,2,13,4,2]
Array.prototype.myFilter= function(cb){
    const result=[] 
  for(i=0;i<this.length;i++){
   const isTrue=  cb(this[i],i,this)
   isTrue ?   result.push(this[i]) : ''
  }

  return result
}

const filteredArr= arr.myFilter(item=>item%2==0)

console.log("filteredArr",filteredArr)

```

### Polyfill of reduce

```jsx
const arr= [3,4,2,13,4,2]
const res= arr.reduce((acc,curr)=>{
  return acc +curr
},0)

console.log("res",res) //43

Array.prototype.myReduce = function (cb, acc) {
  let result = 0 || acc;
  for (i = 0; i < this.length; i++) {
     result = result+  cb(this[i], i, this);
  }
  console.log("result",result)
  return result
};

const newReducedVal= arr.myReduce((acc, val)=>{
  return acc +val

},100)

console.log("newReducedVal",newReducedVal)  //143

```

### Polyfill for call

```jsx
const person = {
  name: "heyashu",
};
function printName(host) {
  console.log("this is ", this);
  console.log("Name of website is ", this.name, "Hosted on ", host);
}

const person2 = {
  name: "google",
};

 printName.call(person2, 'netlify')
  printName.call(person, 'aws')

Function.prototype.myCall = function (obj = {}, ...args) {
  console.log(">>>>", args);
  console.log("this is", this);
  if (typeof this !== "function") throw new Error("Not callable");
  console.log("Obj is", obj);
  obj.fn = this;
  console.log("Obj is", obj);
  obj.fn(...args);
};
printName.myCall(person, "aws");

```

### Polyfill for Apply

```jsx
Function.prototype.myApply = function (obj = {}, args) {
  if (typeof this !== "function") throw new Error("Not callable");
  if (!Array.isArray(args)) throw new Error("Arguments should be an array");
  obj.fn = this;
  obj.fn(...args);
  delete obj.fn;
};

printName.myApply(person, ['netlifyv3'])
```

### Polyfill for bind

```jsx
const newBindFn= printName.bind(person)

newBindFn('renerr')

Function.prototype.myBind = function (obj = {}, ...args1) {
  console.log("obj is", obj)
  if (typeof this !== "function") throw new Error("Not callable");
  obj.fn= this

  return function(...args2){
    obj.fn(...args1,...args2)
  }
  
};

const myNewBind= printName.myBind(person,'new host')

myNewBind("Test is test")
```

### Polyfill for Array flat

```jsx
const nestedArray= [1,2,3,4,[5,6,7],8]
console.log(nestedArray.flat(2))  //[ 1, 2, 3, 4, 5, 6, 7, 8]

//polyfill of flat

Array.prototype.myFlat= function(depth){
  if(!Array.isArray(this))
    throw new Error('Provide an array')

  let res= []
  this.forEach((el)=>{
    if(Array.isArray(el) && depth>0){
      res.push(...el.myFlat(depth-1))
    }else{
      res.push(el)
    }
  })
  console.log("res is ", res)
  return res
 
}

console.log(nestedArray.myFlat(1))
```

### Polyfill Promise.all

```jsx
//Promise.all takes an array of promises and returns a single promise. If any promise rejects, it returns the first rejected promise.
const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("I am resolved p1");
  }, 2000);
});

const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("I am rej p2");
  }, 1000);
});

const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    res("I am resolved p3");
  }, 3000);
});

Promise.all([p1, p2, p3])
  .then((res) => {
    console.log("Res is", res);
  })
  .catch((err) => {
    console.log("Err is", err);
  });

Promise.myAll = function (promiseArr) {
  let arr = [];
  let counter = 0;

  return new Promise((resolve, rej) => {
    promiseArr?.forEach((promise, index) => {
      promise
        .then((res) => {
          counter++;
          arr[index] = res;
          if (counter == promiseArr.length) {
            resolve(arr);
          }
        })
        .catch((err) => {
          rej(err);
        });
    });
  });
};

Promise.myAll([p1, p2, p3])
  .then((res) => {
    console.log("Res is", res);
  })
  .catch((err) => {
    console.log("Err is", err);
  });

```
