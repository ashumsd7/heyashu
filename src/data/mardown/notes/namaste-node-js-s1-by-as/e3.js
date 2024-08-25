export const  e3=`


# Lets Write Code

![image.png](https://i.ibb.co/vwNLtJ3/1.jpg)

### Download Node.js

Go to [Node.js](https://nodejs.org/en) website and download the latest version,
If you are struggling in installing feel free to contact me , we can [schedule a 5min meeting](https://topmate.io/aat/1148709/pay) I will help you to download Node.js in to your system , Best way to download it , Go to Prebuilt installer and download a file and install it by executing by dowland file. There might be some issues specific to your system , do not panic google or gpt the error you are getting it will get solved , or I am here [Lets connect](https://topmate.io/aat/1148709/pay) :)

### Verify your installation

If you have already installed or just installed check version of node into your system, open you command line or terminal of vs code or your favorite editor, One more thing if you have downloaded node.js NPM will get installed automatically into your system. What is NPM, it is a node package manager, to manage repository and host it, NPM took care of node in initial days you remember right ? Check out [Episode 2 Notes](http://localhost:3000/tech/notes/namaste-node-js#Introduction%20to%20NodeJS) , lets celebrate

\`\`\`jsx
node -v                //v18.12.0
\`\`\`

![image.png](https://i.ibb.co/Msd8xQH/2.jpg)

### Let’s write code !

Lets know about repl : **read-eval-print-loop.**

if you just write node into your terminal and enter you get entered some environment thats called repl, means read evaluate print and repeat it. so after writing node, you can write any code , and thats the node js runtime environment, let me bring one example with you you can see I have written node and then repl environment started and you can write JS code and its handled by v8 engines + node js and using c++ to run these 2+ 2 and other statement, Read more about [what is expression statement and syntax in JavaScript](https://heyashu.in/blogs/what-are-syntax-and-expressions-in-js), Note one more thing this repl env you see in your terminal is similar to your browsers console. both are almost same, but in browser has engine + browsers apis, terminal has engine (v8) + Node js APIs. Yeah, you have written first node js snippet, now lets move where we learn how to write node js code in repository.

![image.png](https://i.ibb.co/fDHCd6p/3.jpg)

### Open you Code Editor

Here i am using vs code and its also recommended by Akshay Saini and most of tge frontend developers use it. so lets continue with it, there is something new in the market, [neovim](https://neovim.io/) a new editor , google it. ok now open you vs code create a folder and create a file \`app.js\` and start writing JavaScript in it. After wriitng you can open termianal, there is short cut ( CTRL + \` ) \` this is character present around Esc key ~ \` and it will open vs code terminal, if terminal is open , just write , I am also giving screen shot of the terminal

\`\`\`jsx
node app.js
\`\`\`

![image.png](https://i.ibb.co/vHyGmq6/4.jpg)

### Global Object server vs client

In browsers when you type window u get access of multiple things its by browsers where u get power of fetching URL or som much things , but in server there is no browser thats why node js does not give you \`widnow\` as global object, but it has similar global object and its name is \`global\`  and this global is by node js not by v8, similer in brosers window object is from browsers not from v8 and we know \`setTimeout\` is not from v8, v8 is just engine which runs js coide thats it, other things are from either brosers or node js if JS is running on server, JS engines follows ECMAScript and there is no setTimeout in ECMAScript. its part of global or widnow object.

If you will try to access window in node js you will get an error, same you will write global in chrome’s console you will get error , here is the screenshot when you type window in node js

![image.png](https://i.ibb.co/Ykr7dy2/5.jpg)

But if you will write global you will get something like you get when you console window in browsers , I am pasting both screenshots you can visualize for you reference. the first screenshot below is from the terminal of vs code and 2nd one is from the browsers console what you get from inspect mode.

![image.png](https://i.ibb.co/5sySj04/6.jpg)

![image.png](https://i.ibb.co/47PH8Ch/7.jpg)

### this keyword in node js & globalThis

Here its remember to worth, this keyword by default in node js does not point to global object, as in browsers self, this, frame and window points to the window object, in node js by default this will point to {} and empty object. there is \`globalThis\` in ES20, is present in every browser and node js env wherever JS runs, so no confusion. So for window globalThis will point to window object, and foe node js env it will point to global obejct on node js. so now Name is similer now across all js platforms,

### Curious google these keywords.

Here are the new words and question that we can explore and these are  introduced in this episode, and some request front he creator. 

- [neovim](https://neovim.io/) Editor ( substitute of vs code by microsoft)
- repl
- what is self this frame and why its points to window object in the browsers why ?
- Web workers
- globalThis
- Object and something reference ( Google it)
- Google history of globalThis why it came ?
- read the node js code , go to github repo

---

![image.png](https://i.ibb.co/1bT9RJ4/8.jpg)

And thats all for this episode and writing first line of code in node js

My name is Ashutosh Anand Tiwari, and I am writing digital notes on node js, if you like the notes please share with you friends if anything wrong in the notes feel free to contribute and fork the repo right now. if you want to write next epidote note please [fork the repo and contribute](https://github.com/ashumsd7/heyashu/tree/main/src/data) to it lets write and learn together, and In last I am just requesting to give a star 🌟 to [this repo](https://github.com/ashumsd7/heyashu/tree/main/src/data), for any other query click here to contact [lets connect here.](https://topmate.io/aat/1148709/pay)

Take care, Good Bye :) [](https://topmate.io/aat/1148709/pay)
`