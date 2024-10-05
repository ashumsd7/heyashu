---
title: "e6 installing node js "
name: Node JS ki muh dikhaayi 👰
episode: 6
publishedOn: 09-09-2024
updatedOn: 09-09-2024
thumbnail: https://i.ibb.co/hBGN8Cw/HWOOTINS.png
author: Ashutosh Anand Tiwari
tags: nodejs , nodejs, javascript
profilePic: https://avatars.githubusercontent.com/u/40313523?v=4
followLink: https://github.com/ashumsd7
metaName: Read Procodrr Node JS Digital Notes
metaContent: Get all digital notes here
---



Agar aapke system mein Node.js installed hai toh bhi is article ko skip mat kariye, kyunki yeh kaafi helpful ho sakta hai seekhne ke liye. Aapko bas apne VS Code editor mein ek `script.js` file banani hai aur usme yeh code likhna hai jo maine neeche diya hai.



```jsx
//script.js  (included in index.html) 
 
console.log("Sanjana Air lines");
let a=5;
let b=4;
console.log(a+b)
```


Aapko pata hoga ki hum `index.html` ya `live server` ka use karke `script.js` ko attach karte hain aur fir Chrome ya kisi aur browser ke DevTools mein check karte hain ki sab sahi se kaam kar raha hai ya nahi. Neeche diye gaye screenshot mein aap dekh sakte hain ki kaise hota hai. Toh sabse pehle aap apni `index.html` file mein `script.js` ko attach karke `live server` ke through `5500` port par run kar lijiye: `http://localhost:5500/index.html`. Isse aapko kuch aisa interface dikhega console me.


![image.png](https://i.ibb.co/Wxzs1nb/e7p2.png)


### Debugging in VS Code (Web App)


Lekin yaha pe "Chrome" ka koi role nahi hai, kyunki hum backend seekh rahe hain, yani browser ko ab side mein rakho. Samajhiye ki ab humne browser se V8 engine ko alag kar liya hai aur usko Node.js mein use kar rahe hain. Ab baat yeh hai ki hum kaise JavaScript ko Node.js ke andar run karenge, kyunki Node.js humein JavaScript ko browser ke bahar run karne ki power deta hai.


Ab aapko VS Code mein jaana hai aur ye teen steps follow karne hain:


1. **Run and Debug** option ko kholiye ya (Ctrl + Shift + D) press kariye.
2. "Run and Debug" wale full-width button pe click kariye.
3. Ab dropdown me se Web App chrome select kariye aur aapka app chrome pe chal rha hai


![image.png](https://i.ibb.co/JccYjLf/proe7e4.png)


Jab aap debugging setup karenge aur dropdown pe click karenge, to ek file automatic generate ho jaayegi `.vscode` folder ke andar, jisme ek `launch.json` file hogi. Is file mein aap apne project ke debugging configurations ko set kar sakte hain.


Aapko port ko 5500 set karna hai, ya fir aap niche ka code `launch.json` file mein paste kar sakte hain: Dhyan rakhiye, `program` key mein jo path hai, usse aap apni main file ka path set kar sakte hain, jaise `app.js` ya `server.js` depending on aapka project structure. agar vs code folder aur aapki js file ek level pe hai to koi jarurat nahi hai.


Yeh setup karne ke baad, aap "Run and Debug" kar sakte hain apne Node.js application ko.


```jsx
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5500",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```


Ab iske baad, aap jo 1, 2, 3, 4 lines dekh rahe hain, waha cursor le jaake debugger laga sakte ho. Debugger set karne ke baad, aap apne app ko launch kar sakte ho. Neeche diye gaye screenshot mein aap dekh sakte ho kaise ye process hota hai. Phir "Launch Program" select karke, 3 number ke highlighted area se debugging kar sakte ho.


Yeh controls bilkul Chrome DevTools jaise hi hain. Agar aapko inke baare mein zyada knowledge nahi hai, toh aap YouTube videos dekh sakte ho ya koi blog padh sakte ho.


![image.png](https://i.ibb.co/MfQ2zPq/proe7p4.png)


Debugger lagane ke baad, aapko kya karna hai:


1. Niche screenshot mein diye gaye dropdown se "Node.js" select kariye.
2. Phir green play button par click kariye.
3. Jab aap next-next steps follow karenge, to green button press karte hi ek nayi window open hogi (jo Chrome environment hoga), aur waha aapka app run hoga.
4. Is waqt aapka code debugger ke point par aa ke ruk jayega, jahan aap apna code step by step debug kar sakte hain.


Yeh process aapko real-time debugging ka experience dega, aur aap asani se apne code ke flow ko samajh paenge.


![image.png](https://i.ibb.co/QJc7N5d/proe7p5.png)


Aur jab aap apne code ke upar hover karenge, to aap variables ka current value dekh paenge. Is tarah, aap apne code ko step-by-step samajh sakte hain aur debugging process ka maza le sakte hain. Debugger lagate rahiye aur apne code ke har part ko explore kariye.


![image.png](https://i.ibb.co/vzzGYdr/proe7p6.png)


### Debugging in VS Code (NodeJS Code)


To ab tak humne dekha ki kaise VS Code ka live server chalake, JavaScript jo ki `index.html` mein thi, usse humne Chrome pe debug kiya aur VS Code mein bhi debugger laga ke debugging kar li. Lekin agar `index.html` file na ho toh pure Node.js ko kaise debug karoge?


Isse pehle, do kaam kariye:


1. `.vscode` folder ko delete kar dijiye.
2. `index.html` file bhi delete kar dijiye.


Ab jab aap play button press karenge toh error aayegi, kyunki ab humare paas frontend (HTML file) nahi hai. Ab aapko **Debugging in VS Code (Web App)** section ke upar jaake screen shots follow karne honge, aur aapko error dikhegi. to ab kaise run karein , to dono fiiles ko delete krne ke baad aap kuchh krna nahi bs, same last step run and debug point ko click karke **chrome** na select krke ab nodejs/ javascript select krna hai aur Play green button par click kr dena hai, dhyaan rahe aap debug kr  rhe hain to debug mark lagana na bhuliye. see screenshot for saare steps, Output aapko down side terminal ke **Debug console** me dikhega

![image.png](https://i.ibb.co/999XTVt/eproe7last.png)


Yeh steps follow karne ke baad aap samajh payenge ki pure Node.js application ko kaise debug kiya jaata hai bina kisi HTML file ke


### Node Js code in terminal


Ab jab VS Code open hai, toh ```Ctrl + \`` ya``` Ctrl + J` press kariye, isse terminal open ho jayega. Terminal kuchh aisa dikhega, jahan aap apne Node.js commands ya scripts run kar sakte hain.


Isse aap direct terminal se apne project ko manage kar paenge aur Node.js ko run karne ke liye commands execute kar sakte hain.


![image.png](https://i.ibb.co/0FkT16k/proe7p8.png)


Lekin iske pahle aapko nodejs download krna padega


### Install node js from the website


Yaha jaiyie https://nodejs.org/en/download/prebuilt-installer aur node js dwnload kr liye 


![image.png](https://i.ibb.co/ZBx739c/proe7p9.png)


ab jaise hi terminal pe aap liklhoge node kuchh aise diekhega


```jsx
PS C:\Users\Ashutosh Tiwari\Desktop\node-test> node
Welcome to Node.js v22.2.0.       
Type ".help" for more information.
>2*6
12
```


Aur ab ye REPL environment open ho gaya hai. **[REPL kya hota hai](https://www.digitalocean.com/community/tutorials/what-is-repl)**?

### REPL : Read-Eval-Print Loop
REPL ek aisa environment hota hai jahan aap kuch bhi JavaScript code run kar sakte ho bina kisi browser ke. REPL ka full form hota hai **Read-Eval-Print Loop**, jisme code ko read, execute, aur output display kiya jata hai. Ye environment Node.js ke saath aata hai, jahan aap real-time mein apna JavaScript code run aur test kar sakte ho.


Is REPL environment ko aap `Ctrl + D` press karke band kar sakte ho, jab aapko debugging ya testing complete ho jaye.


![image.png](https://i.ibb.co/9pt1wGp/proe7p10.png)


Aur ab agar aap kisi file ko run karna chahte hain jo aapne banayi thi, jaise `script.js`, toh bas terminal mein likhiye:


```jsx
PS C:\Users\Ashutosh Tiwari\Desktop\node-test> node script.js
Sanjana Air lines
9
```


To abhi tak humne live server ke saath, `index.html` ke sath, aur bina `index.html` ke bhi JavaScript ka code kaise run kiya, yeh sab samjha. Aapne Node.js aur VS Code debugging ko efficiently use karna seekha hai.


Agle session mein milte hain. Thank you


