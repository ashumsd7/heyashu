---
title: e9 behind the scene libuv & Event Loop
name: libuv & Event Loop
episode: 9
publishedOn: 09-08-2024
updatedOn: 09-08-2024
thumbnail: /public/images/blogs/e9ppp000.png
author: Ashutosh Anand Tiwari
tags: e9 libuv & Event Loop
followLink: https://peerlist.io/ashumsd7
---
As we know, Node.js has two main parts, like the duo Jai and Veeru: the V8 engine and **libuv**. Let’s take a closer look at **libuv**. Just like the V8 engine has its hidden parts, you can learn more about it by [clicking here.](https://heyashu.in/digital-garden/notes/namaste-node-js/e-8-deep-dive-into-v8-js-engine) Now, let’s focus on **libuv**. Whenever V8 (Jai) can’t handle something—like file access, network calls, or timers—it gives the task to **libuv**. Also, when these tasks run, we often use callback functions, which are executed after **libuv** finishes the job.

```jsx
const fs = require('fs');

// Asynchronous file read operation using callback
fs.readFile('text.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

console.log('This will run before file reading because readFile is async');
```

Now, look at the example above where we have code that reads the content of `text.txt`. I want to emphasize that the V8 engine can't handle this because it doesn’t understand OS or file systems. The V8 engine is only responsible for running JavaScript code—nothing else. I hope that’s clear now.

So, just remember: things like file access, network calls, and timers are external tasks for V8. V8 is strictly for running JavaScript. That’s it.

In the example above, you’re reading a file, and if you look closely, there’s a callback function with `err` and `data` as arguments. This callback will only run once **libuv** completes reading the file. Then, **libuv** hands the callback function back to the V8 engine, and V8 runs it through the call stack like it would for any other function.

If you don’t know what a callback is, it’s like saying, "Call me back once the task is done." For example, "Call me back when the food is ready"—just kidding, don't get distracted!

But how does **libuv** ask the V8 engine to run this callback? That’s what we’re going to see. Because once the file is read, it’s not sent directly to V8—there’s a mechanism in place. This is where **libuv**’s other components, friends of Veeru (libuv), come into play, which Jai (V8) doesn’t know about.

![image.png](/public/images/blogs/ake9im1.png)

### Callback Quue

In **libuv**, there’s something called the callback queue (Veeru's responsibility), where all the callback functions wait in line. It’s like when the food is ready, but the food court is full, so you can’t enter directly because others are already eating. You have to wait in line—that’s the callback queue. Got it?

![image.png](/public/images/blogs/ake9im2.png)

Now, what if someone skips the line and starts eating? That would create chaos, right? So, there has to be someone to manage the queue, maintain order, decide who’s first, who’s last, and ensure everything runs smoothly.

Guess who does that? Yes, it’s **Shree Shree Event Loop ji**, one of the important friends of **libuv**, who keeps everything in line and makes sure the callbacks are executed in the right order.

### Event loop

The Event Loop’s job is to keep an eye on both the **call stack** and the **callback queue**. It ensures that no callback function can break the queue. Let’s leave the food court example for now, but imagine multiple callbacks waiting at the same time. What happens if two `setTimeout` functions finish at the same time?

![image.png](/public/images/blogs/ake9img3.png)

There’s a proper mechanism and algorithm in place to handle this situation. But remember, only when the "food court" (the V8 engine’s main thread) is empty, will the next callback from the queue get a chance to run. That means the V8 engine’s call stack needs to be empty before any callback from the queue is processed. This is exactly what the Event Loop does.

Now, let’s dive deeper into how the **Event Loop** operates!

### Outside Cycle of Event loop

The Event Loop operates in different **phases** during its cycle, each phase having a specific priority for handling tasks. Here's a simplified breakdown of the phases:

1. **Timer Phase**: This phase handles all the timers like `setTimeout` and `setInterval`. When their time expires, the corresponding callbacks are queued for execution in this phase.
2. **Poll Phase**: This is where most I/O-related callbacks (like internet requests, file system access, or crypto operations) are handled. It checks for completed I/O operations and pushes their callbacks for execution.
3. **Check Phase**: This phase deals with **setImmediate** callbacks. We'll go deeper into this later, but it’s used for immediate execution of functions once the poll phase is complete.
4. **Close Phase**: This phase manages tasks related to closing things down, like cleanup tasks or socket closures. We'll discuss more details on this later.

Each of these phases has its own role in making sure the Event Loop operates smoothly and efficiently!

### Inside Cycles of Event Loop

There are a few things we’ll cover later, but just know this: before each phase of the event loop’s outer cycle, two special tasks always run. Think of it like this—every time one person enters the "food court" (the call stack) from the queue, there's a special guest area that needs to be checked first.

These "special guests" are **process.nextTick()** and **promise callbacks**. Before moving on to the next phase of the event loop, the system checks if any of these special callbacks are waiting.

So, before checking `setTimeout` in the Timer phase, it first looks if there are any `nextTick` or promise callbacks. Before entering the Poll phase, it checks again if any of these special tasks are waiting. These tasks always happen **before** the regular phases of the event loop. Got it?

1. process.nextTick()
2. promise callabck

![image.png](/public/images/blogs/ake9im4.png)

### Callback in NodeJs

Below, I am pasting a code snippet that will show you how callbacks look in Node.js. Most of the time, they go and wait in the callback queue, get checked by the Event Loop, and are executed by the V8 engine. All callbacks wait there in the callback queue. Now, with this example, you can simply check the inner loop first, then the Timer phase, then again the inner loop (`nextTick` and promise callbacks), then the Poll phase, and then again the inner loop, followed by the Check phase, the inner loop again, then the Close phase, and then back to the inner loop. This process continues, creating an infinite loop of checks.

And here, also remember that for **nextTick** and Promises, two queues are maintained. Just think of it like two types of guests waiting in different rooms, and it's different from the callback queue, and remembers readig file might take time so order can be changed of output.

```jsx
// 1. File System Operations
fs.readFile('file.txt', 'utf8', cb);      // Reading a file asynchronously
fs.writeFile('file.txt', 'data', cb);     // Writing to a file asynchronously
fs.unlink('file.txt', cb);                // Deleting a file asynchronously

// 2. DNS Operations  ( will check later)
dns.lookup('example.com', cb);            // Resolving domain names
dns.resolve('example.com', cb);           // Resolving DNS records

// 3. Network Operations 
const server = http.createServer(cb);     // Creating a server (async)
server.listen(3000, cb);                  // Listening to a port asynchronously

// 4. Timers
setTimeout(cb, 1000);                     // Timer with a delay of 1000ms
setInterval(cb, 1000);                    // Repeated timer every 1000ms

// 5. Child Process Operations ( will check later)
const { exec } = require('child_process');
exec('ls', cb);                           // Executing a shell command asynchronously

// 6. I/O Operations
process.nextTick(cb);    
```

### Time to test what you have read till now

Below, I am pasting a snippet. Just execute it in the order you learned and write the output somewhere. Below the snippet, you'll get the answer after clicking on the link. Compare it with your expectations, and if it's wrong, ask ChatGPT what's incorrect and how it gets executed, or re-read this blog

```jsx
const fs = require('fs');
function normalFunction() {
    console.log('Normal function call executed.');
}
setImmediate(() => {
    console.log('setImmediate callback executed.');
});
fs.readFile('text.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('fs.readFile callback executed.');
});
setTimeout(() => {
    console.log('setTimeout callback executed.');
}, 0);
console.log('Normal console.log executed.');
normalFunction();
```

[Click here to check the order](https://i.ibb.co/1M59GzL/outtt.png)

### Wait Wait ! yes party is not over yet

If there is nothing in the V8 engine’s call stack, and everything has run, including the `nextTick` queue, callback queues, and all phases except the Poll phase, and if a file is still being read with an I/O callback pending execution, then the Event Loop will not keep running. It will stop and wait at the Poll phase instead of continuously running. This is an important concept to understand in Node.js, which is different from the Event Loop in web browsers

### Improtant to know

Now, as we mentioned, the Event Loop will stop at the Poll phase, checking the file and waiting to push the file read callback into the V8 engine. An important thing to note is that after the file read is complete, it will resume from the **Check Phase** (not the Timer Phase). So remember, it doesn’t restart from the beginning (Timer Phase), but continues from where it left off. Let me show you a screen to better understand this. 

![image.png](/public/images/blogs/ake9m5.png)

After waiting at the Poll phase, the callback for the file read will begin registering. This means if there is any `setImmediate` and `setTimeout` in the callback queue, the `setImmediate` will run first because the next phase is the **Check Phase**, not the Timer Phase."

This makes it clear that the Event Loop continues from the Check Phase, giving priority to `setImmediate` before timers if event loop is waiting at loop phase.

### Trick of nextTick

Remember, if there’s any `process.nextTick()` inside a callback, and that callback has another `nextTick`, the Event Loop will keep checking and executing all the `nextTick` tasks before moving to the next phase. It will only proceed when the `nextTick` queue is completely empty, and this is a very important thing to note.

```jsx
process.nextTick(function () {
  process.nextTick(function () {
    process.nextTick(function () {
      console.log("Im inner inner process.nextTick");
    });

    console.log("Im inner process.nextTick");
  });

  console.log("nextTick callback executed.");
});

//output
//nextTick callback executed.
//Im inner process.nextTick
//Im inner inner process.nextTick
```

And thats all..

### Search These Keywords

1. nextTick
2. setImmediate
3. inner loop vs outer loop
4. algo used in the event loop

### Questions

1. Get multiple questions having statement of inner and out loops and try to solve

### Tips

1. Practice output based questions
