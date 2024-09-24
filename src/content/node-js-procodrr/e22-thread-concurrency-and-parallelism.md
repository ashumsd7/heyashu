---
title: "e22: Thread, Concurrency, and Parallelism"
name: Duniya Threads ki !
episode: 22
publishedOn: 09-24-2024
updatedOn: 09-24-2024
thumbnail: /public/images/blogs/1thread-thumb.jpg
author: Ashutosh Anand Tiwari
tags: threads in os, Node js
profilePic: /public/images/blogs/pfp2.png
followLink: https://www.instagram.com/javascripterr/
---
### Dekh rahe ho Vinod? kaa bhaiya, kaise thread ghoom rha hai ?

Achha, hum yeh toh jaante hain ki ek process ek core par execute hota hai. Lekin kya ek process sirf ek core par hi chalta hai? Nahin! Ek process ke kai sare threads ho sakte hain. Jaise Chrome mein kai tabs hote hain—ek tab mein video chal raha hota hai, aur doosre tab mein aap email likh rahe hote ho. Dono alag-alag threads mein kaam kar rahe hote hain.

Jab koi process start hota hai, toh hum kehte hain process ko "spawn" karna. Jab ek parent process apne child process ko banata hai, toh usse "spawn" kehate hain. Ye baat toh suna hi hoga? Process kai threads create kar sakta hai. Threads ko spawn karna fast hota hai, jabki process ko spawn karna kaafi expensive (mehenga) hota hai.

Baki details aap online padh sakte ho. Socho, ek Chrome jisme do tabs hain, dono alag threads par chal rahe hain, aur yeh threads alag-alag cores par run kar sakte hain. Lekin agar CPU mein sirf ek hi core hai, toh kya fayda hoga do threads banane ka? Haan, fayda hoga! Thread banane ka fayda yeh hai ki OS (Operating System) kaam efficient banata hai.

Threads ke saath kaam karne se context switches (yaad hai?) jaldi-jaldi hote rehte hain. Matlab, ek thread ke execute hone ka intezaar nahin karna padta. Samajh rahe ho? Jaise aapke do bacche (threads) ek ke baad ek kaam kar rahe hain, bina time waste kiye.

Isliye, multi-threading single core CPU par bhi possible hoti hai. Process hi thread create karta hai, isliye ise "worker thread" kehte hain, kyunki thread process ka worker hota hai. Aise samjho, aap ek boss ho (process) aur aapke do naukar hain (threads), jo bina rukhe kaam karte ja rahe hain.

Ab aao, samajhte hain kaise system mein threads ko dekh sakte hain!

### Threads in Task Manager

Ab aap Task Manager open kar lijiye... aur "Details" section mein chale jayein. Agar aapko "Threads" column nahi mil raha hai, toh kisi bhi column ke upar right-click karke "Threads" ko select kar lijiye. Isse aap dekh sakte hain ki har process mein kitne threads chal rahe hain.

Aur yeh sab aap apne third-party software mein bhi dekh sakte hain. Iske liye aap "System Informer" jaisa software download kar sakte hain. Jaise maine apne pichle blog mein bataya tha, aap yaha se bhi check kar sakte hain: [Check this](https://heyashu.in/digital-garden/notes/backend-with-nodejs-by-procoderr-notes/e21-what-is-process-in-operation-system).

![image.png](/public/images/blogs/2threas2.jpg)

### Create Thread in Node.js

Aao ab Node.js me thread create karte hain aur system me observe karte hain. Ab aap Node.js me jo bhi threads dekh rahe hain, unhe aap Task Manager ya System Informer me filter kar sakte hain. Jaise hi niche diya gaya code aap VS Code ke terminal me run karenge, aapke process ka number badh jayega. Ye isliye hoga kyunki Node.js in tino loops ko lagatar run karega, aur single thread me run karega.

```
console.time();
for (let i = 0; i < 1000000000; i++) {
  if (i % 400000000 == 0) {
    console.log("loop 1 " + i);
  }
}

for (let i = 0; i < 1000000000; i++) {
  if (i % 400000000 == 0) {
    console.log("loop 2 " + i);
  }
}
for (let i = 0; i < 1000000000; i++) {
  if (i % 400000000 == 0) {
    console.log("loop 3 " + i);
  }
}
console.timeEnd(); // 4.001s
```

### Multi-threading in Node.js

Ab socho agar CPU me bahut saari cores hain, aur hamare paas ye teen kaam hain, to ab Node.js jo ki ek process hai, kaise efficiently run karega? Kaise? Ye loop ko kaise threads me efficiently dalta hai? Agar aap ye code run karke observe karenge, to aapko threads dikhaai dengi. Aao dekhte hain kaise alag-alag threads me rakhte hain.

Aao pehle 3 files banate hain `a.js`, `b.js`, aur `c.js`, aur in teeno files me hum loops paste karenge.

```jsx
console.time();

const {Worker}= require('worker_threads')

new Worker("./a.js") // pahla thread
new Worker("./b.js")  // dosora thread
new Worker("./c.js")   // teesra thread

console.timeEnd();
```

'worker_threads' ek module hai jiska use karke humne thread create kiya hai. Ab thread count bhi 3 se badh jayega, aur CPU ka usage bhi teen guna ho jayega, kyunki CPU cores block ho jayengi ab. Ye hai multi-threading... hahahahahahaha.

Soch ke dekho, agar teeno loops ek hi thread me rakh ke run karoge to 12% CPU consume hoga kyunki mere paas total 8 cores hain, to 12% * 8 = lagbhag 100%.

Lekin abhi aapne kya kiya? 3 alag-alag threads bana diye aur teeno cores block kar diye. To ab CPU usage kitna ho jayega? 12% * 3 = lagbhag 37-38% ke aas-paas dikhai dega!

![image.png](/public/images/blogs/3thread.jpg)

Actually, teeno threads parallel run kar rahe hain… isse threads ka parallel run hona kehte hain.

### Concurrency aur Parallelism

Concurrency ka matlab hota hai ki ek thread thoda sa instance run karta hai, aur context switching hoti hai. Jaise, pehle thread 1 run hota hai, phir thread 2, aur phir thread 3. Matlab, multiple threads create karke hum experience smooth karte hain. Concurrency ka matlab hai sabko ek-ek karke chance milta hai, sabka time aata hai — jaise ek-ek turn lena.

Lekin Parallelism ka matlab hota hai concurrency ke saath, lekin teeno threads ek saath parallel run honge, mtlb sabka time aayega, lekin sab sath-sath run karenge. Toh threads se cheeje to concurrent hoti hain, lekin wo parallel hongi ya non-parallel, ye depend karta hai. Lekin context switching apni jagah hoti hai.

Dekh lo bhai, mai fir bol raha hoon, ye koi academic class nahi hai, aap isko achhe se padh sakte ho aur apko maza aa raha hoga yaha... hai ki nahi? Jao aur repo ko star do... hahaha, arey yaar, parallelly!

![image.png](/public/images/blogs/4-thread.jpg)

### Node.js single-threaded hai ya multi-threaded?

Node.js bhai saab, multi-threaded hai, lekin default mein yeh single-threaded environment mein kaam karta hai. Haan, agar aap chaho to multi-threading bhi use kar sakte ho with the help of modules like `worker_threads`. Matlab, marzi aapki hai—chahe to single-threaded mein kaam karo ya multi-threading ka maza lo. Jaise ke kehna ho, "Mere account mein ek crore rupaye hain, lekin aap bol rahe ho ki main sirf ek rupaya hi kharch karun!"

![image.png](/public/images/blogs/5threadgareeb.jpg)

Haan, bilkul sahi kaha! Node.js ke version 10 ke pehle multi-threading ka support nahi tha, isliye log ise single-threaded hi maante the. 2019 ke baad `worker_threads` module ke aane se multi-threading possible ho gayi. Matlab, ab developer bhi khud se multiple threads create kar sakte hain aur unhe efficiently manage kar sakte hain. Pehle sirf asynchronous model tha, lekin ab hum real multi-threading ka faayda utha sakte hain.

Dekha na, ab aap multiple threads easily create kar pa rahe ho aur system ka full utilization bhi kar sakte ho!

![image.png](/public/images/blogs/6trhead.jpg)

Haan, bilkul! Ab ek kaam karo, jo loop abhi humne create kiya tha, usse ek alag file me paste karke run karo. Phir dekho CPU usage kaise badhta hai aur single-thread ke comparison me multi-thread ke andar CPU ka usage zyada hota hai, lekin time kam lagta hai.

Ye hi hai multi-threading ka faayda, thread banaiye aur efficiently kaam complete kariye. Aur dekho bhai, mera CPU to ab ghoom gaya hai, raat ke 3 baj rahe hain aur ab sone ka mann bhi kar raha hai 😅.

To chalo, milte hain next blog me, tab tak ke liye Dhanyawaad! Keep experimenting and exploring!
