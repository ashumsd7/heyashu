export const  e2=`#  JavaScript on Servers

![image.png](https://i.ibb.co/5chYnSQ/7.jpg)

As we know now JS can also run outside of browsers on server.

### What is server ?

JavaScript runs on a server, but what exactly is a server? A server is simply a remote computer. When you run your React app locally, you call it a "local server" because your system is serving the page. A server is just a machine that provides a service or serves a page. If the computer providing this service is in a different location, like another country, it's called a remote or cloud server. Hope that makes sense! Now, let's move on…

### Client Server Communication

Now, we know a server is just a computer located far from us that can handle requests. Suppose you're reading this blog on [heyashu.in](http://heyashu.in/). When you type this URL into your browser, your local computer sends a request. The internet processes this request and directs it to the server. Every domain is linked to an IP address through DNS because humans can't easily remember IP addresses like "54.161.234.33." DNS translates the domain name to the correct IP address, and the server serves your page. Domain name is what you buy from GoDady and Hostinger and other websites.

Running JavaScript on a server is a big advantage because it allows a single developer with JavaScript knowledge to manage both the frontend and backend. If you know JavaScript, you can become a full-stack engineer. Don't worry; you'll get there with this course or by reading the notes!

![image.png](https://i.ibb.co/brf7D7h/1.jpg)

[Image Credit](https://heyashu.in/tech/notes)

### Story about JS Engine and Node.js

You know how JavaScript runs in browsers? Guess, guess! It’s the JavaScript engine! 🧠 Every browser has its own JS engine. It takes the JS code and converts it. But wait, isn’t the JS engine also software? Yep, it’s a program! And what language is it written in? Hmm, what comes after C? D? Nope, it’s C++! 🤓. Most JS engines, like the V8 engine in Chrome, are written in C++. Check out the [GitHub repo of V8 JS engine](https://github.com/v8/v8). Over 70% of the code is in C++! 🚀
![image.png](https://i.ibb.co/w7kyPnm/2.jpg)

![image.png](https://i.ibb.co/BLNRTmS/3.jpg)

Image Credit :  [Guithub repo of v8 JS engine](https://github.com/v8/v8) 

### Story of v8 the chrome’s Engine

V8 is written in C++ and helps run JavaScript and WebAssembly. It executes JavaScript code, but it’s not the whole story! 🤔 You can learn more about WebAssembly by Googling it. V8 follows [ECMA standards](https://stackoverflow.com/questions/4269150/what-is-ecmascript) (they decide what features to add!). Every JS engine is written differently, converting JS code to machine code.

Imagine this: **Your JS code** ➡️ **V8 Engine (C++)** ➡️ **Machine Code**.

And guess what? V8 can be embedded in any C++ application. So, if your system runs C++, you can run JavaScript through V8! 🖥️ But wait, if V8 is the hero, what’s Node.js? 🤷‍♂️ Isn’t V8 enough? Well, V8 is just for JavaScript (ECMAScript) and is designed for the web. Node.js wraps around V8, giving it superpowers! Node.js adds the ability to handle HTTP requests, access databases, and more. It makes JavaScript capable of doing things beyond just running code.

And remember, Node.js is also written in... what comes after C? Yep, C++! Not D, haha! So, Node.js is built in C++, with V8 as a dependency, making it all powerful! 💥

### Node.Js Runtime

V8 + Node.js together create the **Node.js runtime** environment. This runtime allows JavaScript to run outside the browser, like on a server.

**NOTE**: Node.js isn't just C++ code. About 25% of its code is written in JavaScript, which you can see in the screenshot above. It also uses various JavaScript APIs and capabilities, combining both C++ and JavaScript to give developers the power to build versatile applications. 🚀

![image.png](https://i.ibb.co/J5M4TNX/4.jpg)

[Image Credit](https://wanganator414.github.io/2019/08/02/JSRuntime) 

### Why Node Js and v8 is written  C++ ?

As we know, computers understand only binary code—010101010! This is the language that directly talks to computer hardware. If you’re lost, just remember: binary (010101) is called a low-level or machine-level language. 🖥️

Then came middle-level languages, also called assembly languages, like \`ADD A, B\`. Now, let's talk about high-level languages—what comes after B? Tell, tell! Don’t say B++! 😂 No such language! After B, it’s C, then C++, and then Java, JavaScript, etc. These high-level languages are human-friendly.

V8 and other JS engines take JavaScript (high-level) and convert it into machine code. If you’re curious, Google assembly languages and get familiar with high, middle, and low-level languages. Enjoy learning!

![image.png](https://i.ibb.co/BCSK3VF/5.jpg)

[Image credit](https://www.cs.mtsu.edu/~xyang/2170/computerLanguages.html)

### Browsers and their engines

Here is an overview of popular browsers and their corresponding JavaScript engines:

![image.png](https://i.ibb.co/vLZWXVD/6.jpg)

[Image Credit](https://www.lambdatest.com/blog/browser-engines-the-crux-of-cross-browser-compatibility/)

### Other use full words

Remember and google these words to know more

- Web Assembly
- Crosss Platform
- ECMAScript ( ES6)
- Guthub repo of node js and v8 its dependency
- Arm Processor  and x86
- Microprocessor

---

And that's a wrap for this episode! 🎬 Now take a break, spread the word, and share this blog with your friends! Don’t forget to ⭐️ star [this repo](https://github.com/ashumsd7/heyashu/tree/main/src/data/mardown/notes/namaste-node-js-s1-by-as) if you found it helpful. And if you spot anything wrong, feel free to fork the repo and contribute!

Let's meet in the next episode! Until then, tb tak chalte hai duaao me yaad rakhna 🙏 

Goodbye from Ashu!
`