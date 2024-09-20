---
title: E19 Basic OS feat Node JS
name: Basic OS feat Node JS
episode: 19
publishedOn: 09-21-2024
updatedOn: 09-21-2024
thumbnail: /public/images/blogs/procd_os1.png
author: Ashutosh Anand Tiwari
tags: nodejs operating_systems cores
profilePic: /public/images/blogs/pfp2.png
---
Jaise hum JavaScript ko web pe run karte hain aur browser ki capabilities jaante hain, jaise document aur aur bhi cheezen, waise hi **Node.js** bhi JavaScript hai, lekin jab run hoti hai, to usko **OS** yani hardware ka access hota hai. Matlab, Node.js ko operating system ke resources tak pohoch hoti hai.

Yeh samajhna zaroori hai ki kaise yeh sab kaam karta hai, kyunki agar aapko OS basics acche se aate hain, to aap ek pro developer ban sakte ho. Isi liye OS ki understanding bahut important hai Node.js development mein.

### CPU: Central Processing Unit

Jo abhi aapke dimaag me image aa rahi hai, wo CPU nahi hai. Wo **CPU ka dabba** hota hai, jise cabinet bolte hain. CPU actually uska chhota sa hissa hota hai jo **motherboard** ke upar laga rehta hai.

![image.png](/public/images/blogs/procod_os2.png)

**Cabinet** ke andar **Motherboard** hota hai, aur Motherboard pe hi **SSD** laga hota hai. **OS** inhi cheezon pe run karta hai.

### Core kya hoti hai?

**CPU** me **cores** hoti hain, lekin unhe aankhon se nahi dekh sakte. Pehle zamane me sirf **single core** hoti thi, aur ek baar me sirf ek hi program run ho sakta tha. Aaj kal **4 cores** hoti hain, jinka matlab yeh hai ki ek baar me multiple tasks perform ho sakte hain.

### Logical Cores

Agar hamare system me 4 **logical cores** hain, to modern technology se unhe **8** cores tak badha diya jata hai. Is tarah se manage kiya jata hai ki 4 cores ka kaam **8 cores** jaisa ho jata hai. Ye sab processor ke manufacturer manage karte hain, aur **operating system** bas inhe operate karta hai. Apne system me ye information dekhne ke liye **Task Manager** open kariye, aur **CPU** tab pe jayiye — aapko sari details wahan mil jayengi.

![image.png](/public/images/blogs/prcod_os3.png)

Ab aao dekhte hain yeh sab **Node.js** se kaise pata karte hain. Apne **terminal** me jayiye, aur likhiye `node`, phir enter press karke Node.js environment me aayiye.

```jsx
🕑 23:46  heyashu ~/Desktop/ME/node-js-by-procodrr (master)
🚀 node
Welcome to Node.js v22.2.0.
Type ".help" for more information.
> os.availableParallelism()
8  // ye hai cores 
>
```

### Operating System kya hai?

**OS** bas ek software hota hai. Yeh ek special software hai jo hardware ko manage karta hai. Yeh decide karta hai kaunsi app kitne time ke liye kaunsa hardware use karegi. Basically, OS ek manager hai jo sab applications ke liye kaam karta hai.

### Kernel kya hai?

Operating System ka ek chhota sa hissa **Kernel** kehlata hai. Kernel OS ka core part hota hai, aur yeh hardware aur OS ke beech kaam karta hai.

### Single Core ka kya matlab hota hai?

Kya iska matlab sirf ek app run hoga? Agar ek **core** sirf ek hi kaam kare, to ek time pe sirf ek hi cheez process ho sakti hai. Yeh baat 100% sahi hai, lekin iska yeh matlab nahi hai ki agar 8 logical cores hain to sirf 8 hi apps open ho sakti hain. Aap 8 se zyada apps bhi khol sakte ho.

Agar aapne 10 apps kholi hain lekin sabko ek saath use nahi kar rahe, to OS kya karta hai? OS in apps ko processor se baar-baar sync karta rehta hai, mtlb update ke liye inhe core me daal ke check karta hai. Jaise **VS Code** ko OS ne pick kiya, process pe daal ke kaam kar liya aur nikaal diya. Yeh sab ek process ke cycle me hota hai.

Do processors honge to ek baar me zyada programs handle kar paayenge, lekin iska matlab yeh nahi ki sirf 2 hi apps handle kar sakte hain. Yeh sab **context switching** ke through hota hai. Waise yeh academic concept hai, lekin context switching ko dekhna hai to aap padh sakte ho.

### Ye sb Search kr skte ho

1. C Mos kya hota hai
2. GPU kya hota hai



.....baki aage mai  kal likha hu, aapko likhne ka man hai aage to likhiye.... edit page par click kr dijiye upar
