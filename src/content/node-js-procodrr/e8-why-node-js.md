---
title: "e8: Why Node JS"
name: Why we should use Node Js
episode: 8
publishedOn: 09-11-2024
updatedOn: 09-11-2024
author: Ashutosh Anand Tiwari
profilePic: /public/images/blogs/pfp2.png
---
JS browser ke bahar bhi bahut kuchh kar sakti hai, chalo kuch examples dekhte hain.”

```jsx
const fs= require('fs');
fs.writeFileSync('hello.txt','Aur kaise ho??')
const text= fs.readFileSync('hello.txt')
console.log("text read", text);
```

FS ke bahut saare methods hain, bas itna samajh lijiye ki JavaScript Node.js me file delete, write, edit, aur create kar sakti hai. Aage hum isko detail me padhenge. Hum kisi bhi application ko bhi open kar sakte hain, jaise ab ek example dekhte hain kaise Chrome ko open karein.

```jsx
const {exec}= require('child_process')

exec('start chrome')
```

### Networking capabilities

JS Node.js me server bhi start kar sakti hai. Ek file banao aur usme likho

```jsx
const http= require('http')

const server= http.createServer((req,res)=>{
  res.end("hello world")
})

server.listen('3000')

// isko krne ke baad terminal me node script.likho 
// debugger se on kro
// browser pe jaake localhost:3000 hit kro
// browser me aisaa dikhega
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f04e628e-4c39-4f41-b348-53c143900880/78cad77f-52c8-45b2-9c60-7f859188e732/image.png)

Server ka code debug se run karne ke liye, aap left top pe green play button ko click kar sakte hain. Dhyan rahe, aapke `launch.json` file me ye code hona chahiye. Yani, `program` me aapke file ka naam hona chahiye. Mere file ka naam `script.js` hai, to maine `script` likha hai

```
  // .vscode/launch.json
  "version": "0.2.0",
  "configurations": [

    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}\\server.js"
    }
  ]
}
```

* Process management kr sakte hain
* Operating system se interact kr sakte hain node js se

aur bahut saari cheeje ….
