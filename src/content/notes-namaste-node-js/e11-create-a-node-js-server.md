---
title: "e11: Create a node js server"
name: Create a http server using Node JS
episode: 11
publishedOn: 09-14-2024
updatedOn: 09-14-2024
thumbnail: /public/images/blogs/e11p1.png
author: Ashutosh Anand Tiwari
tags: create a server
profilePic: /public/images/blogs/pfp2.png
followLink: https://www.instagram.com/javascripterr/
---
We covered a lot of theory, investigating Node.js from its beginnings to 2025, and now it’s time to take action. But be patient — we'll start with some theory to set the context of what a server is, and then write something. Today, your VS Code or code editor won’t be alone. Node.js will be part of your code base, and we will write something. So, what are we waiting for? Let's begin! We'll read about servers, what development means, what a proxy server is, and what DNS is. Then, we’ll create a server

### What is Server?

When someone says "deploy to the server," it means we're referring to the hardware where the operating system and processors are. It means we're running our application, the one we've coded, on that machine. This hardware allows us to save something to the system and retrieve it. That’s what a server does. Deployment is all about saving and running our code on that hardware machine

### Can we use our systme as server?

The answer is yes, but the question is: will you be able to provide what a server from AWS offers? No, because you have limited RAM, limited memory, and no 24/7 access. So, while it's possible, it’s not practical. AWS and other servers run 24/7, have large-scale RAM and memory, and their processors are very powerful. Internet connection is also a concern.

### IP Address

A system can be identified by one address. For your computer, this address might change, but for servers, it does not. Servers have a dedicated IP address that never changes, which is why they are called servers. They are designed to serve, and they also have multiple hardware servers running in different locations. For example, when you create a Firebase server, it will ask where you want your server, such as Singapore. To create a real-time database server, you just click, and you’ll be asked to choose the physical location where you want to connect.

### Node Serve

What we do now and in the future is create servers that can handle requests from the outside world. That’s what Node.js is all about. Now, let’s discuss the architecture and dive deeper into it.

### Client Sevrer Acrtictire

A client is simply a person or system trying to access your server. For example, if someone opens a browser on their laptop and tries to access a file, whenever a client hits a URL (e.g., [www.heyashu.com](http://www.heyashu.com/)), the browser (the client) wants to access files from Heyashu. A socket connection is opened, and there is something on the server side listening to these requests. An application deployed somewhere listens for these requests, and that machine or app is called the server. There might be multiple clients making similar requests to the server's assets. As we've seen with libuv and Node.js, the server handles these requests by receiving data through the socket connection and sending it back to the client. And that's the whole process.

![image.png](/public/images/blogs/e11p2.png)

### TCP IP Protocol/Web

Whenever data is sent, it uses the **Transfer Control Protocol (TCP)**. Again, this falls under the academic side of computer networking, so you can learn more about it by looking up **TCP/IP connections** on the internet. Multiple computers are connected to each other using the internet, which is why it’s called the web, and each has an address. But what does "protocol" mean? It means rules. Communication must follow some rules, that’s all. For example, if I start writing these notes in Chinese, you wouldn’t understand. By the way, I’m writing digital notes on Node.js in **Hinglish** — check here. So, rules are set, and that’s how communication works.

### Other protoals 24

HTTP, FTP, SMTP are different types of request protocols. Depending on the type of request, different rules are used to transfer data. It's like getting things from a shop — different items have different rules. For example, water needs a bottle, but vegetables need a packet. The same applies to requests in a server; the protocol defines the rules. For normal web requests, we use the **HTTP protocol** (Hypertext Transfer Protocol).

![image.png](/public/images/blogs/e11p3.png)

### How data is sent to the client? Data Transfer

Data is not sent in bulk; it is sent in chunks, which in computer network language are called **packets**.

There is also the concept of **streams** and **buffers**. A stream means a continuous connection, and a buffer means chunks of data. We will learn more about this later, but for now, just remember that **TCP/IP** is the protocol used to send data from server to client. In Node.js, the concept of **streams and buffers** is important, so go and learn it!

### Domain Name

Whenever you visit a server, you use something like a web address. For example, for these notes, you might type **[www.heyashu.in](http://www.heyashu.in/)**. You also know that the data is sent from a server because I’m not running my system 24/7 to serve these notes. I’m using a server, and that server has a unique IP address. If you type that IP address, you will get the same website. But **heyashu.in** is called a **DNS** (Domain Name System). **Google.com** is a DNS, and **namastedev** is a DNS. Got it? Now, try hitting this IP: **8.8.4.4** or this one: **142.250.217.78**. These are IP addresses, and if you hit **142.250.217.78**, you will get **google.com**.

![image.png](/public/images/blogs/e11p4.png)

It means **google.com** is mapped to this IP address. Got it? You are using domain names because it's tough for humans to remember these IP addresses. So, remember: first, the browser contacts the **DNS server**, which gives you the IP address, and then you connect to that IP. Got it?

### Can we have multiple HTTP servers?

Can we create multiple applications on the same server? Multiple servers on multiple machines? Confusing, right? Haha, I mean, is it possible to have multiple servers running to handle different things? Yes, it's possible! Now, suppose you have two HTTP servers, meaning two Node.js instances. Which server will handle the incoming request? It will be decided based on the **port**

### Ports in IP Addresses

A **port** decides which server will take the request. Now, suppose you're requesting **142.250.217.78:3000**—3000 is the port number. The server that listens on port 3000 will handle the request. The port is the decider, okay?

So, **a port is a number that identifies a specific application or service on a network-connected device and is used in conjunction with an IP address to send and receive messages.** For more, you can read up on computer networks, haha!

![image.png](/public/images/blogs/e11p5.png)

```jsx
 heyashu.in        /digital-garden 
 142.250.217.78:      3000 
  [IP Address]       [NodeJS app handling digital-garden code/ page]
```

So, actually, a proper website has different things hosted on different servers. For example, files might be hosted on one server, another server might handle images, and yet another one handles databases. You get it, right? This makes things faster, with one server dedicated to images, another for files, etc. We’ll be building all of this, so stay tuned!

### Socket vs Web Sockets

![image.png](/public/images/blogs/e11p6.png)

When we request something, a socket connection is opened, and data is received, involving the opening and closing of sockets. WebSocket connections are different—they stay open and allow two-way communication. You can explore different types of sockets. Normally, socket connections are made and closed, but WebSockets remain open, which makes them resource-heavy. Read more about it!

### Lets create a sever

Node.js has multiple built-in modules. **https** is one of them, and it's used to create a server. The **https** module has a function called `createServer`. Here’s a list of modules — whatever you see in this list are called **native modules** of Node.js. Sometimes, they are imported like `node:http` in the code. Wait and see!

```jsx
const http= require('http')
// const http= require('node:http')

// sever is an https and now can listen the requests
const sever= http.createServer(function(req,res){
  //req and res are the object you get 
  // .end to use to send the response
  res.end('You are getting this from heyashu.in')
})

// listen on post 7777
sever.listen(7777)
```

Now whe you will do `node file-name.js` in terminal then it will wait for the request. and got the browser’s url type [localhost:7777](http://localhost:7777) and you wll get this 

![image.png](/public/images/blogs/e11p7.png)

What if you need to identiy the url whatever /seed-a-plant

update the code like this

```jsx
const sever= http.createServer(function(req,res){
  //req and res are the object you get 
  // .end to use to send the response
  if(req.url ==='/seed-a-plant'){
    res.end('🌱 Plant Seeded, Wohoo  👏')
    return
  }
  res.end('You are getting this from heyashu.in')
})

// listen on post 7777
sever.listen(7777)
```

![image.png](/public/images/blogs/e11p8.png)

Creating a server using the **https** module can be tough for large-scale applications, so we’ll be using **Express.js**, a framework for Node.js, to make things simpler. Writing large-scale applications in plain JavaScript is challenging, which is why we use frameworks like **React**, **Vue**, and **Angular**. The same applies here. So let’s take a quick look at what Express.js is and the complications we might face. You can check this, or we will write more about it here in this digital garden and drop a link.

### Express JS

It’s a framework for **Node.js**. We will discuss it later.

### Things to Learn

1. **Socket connections**
2. **HTTPS vs HTTP**
3. **FTP**
4. **SMTP**
5. **TCP**
6. **Streams and buffers**
7. **Data packets**
8. **Load balancers**
