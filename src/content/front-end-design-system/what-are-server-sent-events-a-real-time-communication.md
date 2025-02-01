---
title: What are Server Sent Events  A Real time communication
name: "Server Sent Events:   A Real time communication"
episode: 9
seasonNumber: -2
publishedOn: 02-01-2025
updatedOn: 02-01-2025
thumbnail: /public/images/blogs/sse_1.png
author: Ashutosh Anand Tiwari
tags: server-sent-events, web , nodejs, javascript
profilePic: /public/images/blogs/pfp2.png
followLink: https://x.com/JavaScripterrr
---
Let’s talk about a modern way of real-time communication on the web: **Server-Sent Events (SSE)**. It’s supported by most modern browsers. So, let’s understand what this is.

First, a connection is made from the client, which is basically an HTTP connection. This connection is long-lived. Whenever new data is available on the server, it is sent to the client at regular intervals.

![image.png](/public/images/blogs/sse_2.png)

But there are a few key terms we need to understand:

* **Long-lived connection**
* **Unidirectional connection**
* **Single HTTP connection**

For example, on platforms like **LinkedIn** or **Twitter (X)**, you see notifications like *"New post available"* without refreshing the page. Similarly, in monitoring dashboards or notification systems, the client doesn’t have to do anything—the server pushes the updates automatically.

![image.png](/public/images/blogs/sse_3.png)

So now you might be thinking, **how does this work?** How does the data come through, and do we need any third-party libraries? 🤔

Let’s discuss these things. We receive data in the form of **event streams**.

### 🚀 How to Achieve This?

Generally, on the **server side**, we expose an **endpoint** where we send data as a stream with the content type `text/event-stream`.

On the **frontend**, we make an HTTP API call and use the **`EventSource`** API, which is natively supported by modern browsers. This allows us to listen for events sent by the server.

For now, on the server, we’ve mimicked the process by sending data as an event stream every 5 seconds.

### 📂 GitHub Repository

I’ve added a GitHub repo where you can clone the project, follow the commands, and see it in your browser. But if you really want to understand how it works—whether you run the code or not—I’ve provided the core code below.

```jsx
git clone https://github.com/ashumsd7/web-communication-techniques.git
cd web-communication-techniques
npm i
npm run server-side-events
-------------------
Open browser and type
http://localhost:3000/ // Observe network tab
```

### 💻 Server Code

Here’s the server’s core logic:

```jsx
app.get('/sse', (req, res) => {
 // data is going  to be long live 
  // data is going to be as event stream and no cache 
 res.setHeader('Content-Type','text/event-stream')
 res.setHeader('Connection', 'keep-alive')
 res.setHeader('Cache-Control', 'no-cache')
 // logic of data is going to be here : Database call 
 res.write('data: Hello, client! This is a test message.\n\n');

// after 5 seconds it will send random number 
const intervalId = setInterval(() => {
  res.write(`data: Random number: ${Math.floor(Math.random() * 100)}\n\n`);
 }, 5000);

 req.on('close', () => {
  console.log('Client disconnected');
  clearInterval(intervalId);
  res.end();
 });

});
```

So if you see above, we have an **endpoint** that will be called by the client. We are setting headers to:

* **Keep the connection alive** for a long-lived connection.
* Set the **Content-Type** as `text/event-stream`.
* Disable caching with **no-cache**.

Then, we are **writing the stream**, and after 5 seconds, we write again. So, any client that is **listening** to this will receive the data.

In between, you can add database logic or any other operations. This is just **mimicking the functionality** of Server-Sent Events (SSE).

Now, let’s look at the **frontend code**.

### 💻 Frontend Code

Here’s a snapshot of the frontend code where we use **`EventSource`** and wait for the data.

```jsx
 const eventSource = new EventSource('/sse');

    // Listen for messages
    eventSource.onmessage = function(event) {
      console.log('Event received:', event.data);
     
      
    };
```

So, it’s **super easy**! We are just **listening** to the event and logging it to the console.

Now, you can also **display it on the DOM** of your web page.

### 🔍 Let's Inspect It

After running the server, open **[localhost:3000](http://localhost:3000/)** in your web browser.

You will see the incoming data in the **console** and, if implemented, on the **webpage** as well.

![image.png](/public/images/blogs/sse_4.png)

A **long-lived** and **no-cache** request is being made. Right after that, you can see a tab labeled **"Event Stream"**, just like we had the **"Messages"** tab in WebSocket.

If you want to explore more about WebSocket, check out this blog:

👉 **[Learn WebSocket](https://heyashu.in/blog/web-socket-lets-chat)**

Here’s a **screenshot** showing what it looks like when we switch to the **Event Stream** tab:

![image.png](/public/images/blogs/sse_5.png)

Now, if you look at the **UI**, you’ll see that the data is getting **populated in real-time**! 🚀

This happens seamlessly as the server pushes new events to the client without any need for manual refreshes. Pretty cool, right?

![image.png](/public/images/blogs/sse_6.png)

### **Challenges**

1. Browser compatibility
2. Number of connections (6-8 per domain)
3. Reconnection logic
4. Background tab behavior
5. Resource utilization
6. Sticky connections
7. Proxies and firewalls
8. Testing and load balancing
9. Efficient broadcasting

So, that’s all for this one! More topics will be discussed in upcoming blogs, including **Webhooks**. Stay tuned! 👋 Bye bye!
