---
title: "Practical Guide Long Polling "
name: "Practical Guide Long Polling "
episode: 7
publishedOn: 01-30-2025
updatedOn: 01-30-2025
thumbnail: /public/images/blogs/lp_1.png
author: Ashutosh Anand Tiwari
profilePic: /public/images/blogs/pfp2.png
---
As the name suggests, **Long Polling** means something is long, delayed, or not happening instantly.

First, if you haven't checked what **Short Polling** is, read this blog—it will take just 2 minutes to learn: **[[Read Here](https://heyashu.in/digital-garden/notes/front-end-design-system/what-is-short-polling-learn-with-example)]**

### Quick Recap of Short Polling

In **short polling**, the system checks for data at regular intervals, useful for chat notifications or small applications where data is light, and backend or database operations are minimal.

### What’s Different in Long Polling?

Everything is the same, except for one key difference—you don’t get a response immediately after one request. Instead, the server **waits** until the requested data **changes** before responding.

### What if the data never changes?

Good question! If no change happens within a set **timeout**, the server responds with whatever data is available, even if unchanged.

So, in **long polling**, the connection stays open until new data arrives or the timeout occurs. 🚀

4o

![image.png](/public/images/blogs/lp_2.png)

### Characteristics of Long Polling

* Single long-lived connection
* Connection stays open until new data arrives or a timeout occurs
* Reduces the number of API calls, lowering latency
* Puts load on the server due to persistent connections, leading to scaling issues

### Use Cases

* Real-time collaboration
* When data updates every few minutes or hours, not in seconds

### How It Works

When the frontend (client) makes a request, it also sends an identifier (like the last updated data ID). The backend checks this against the current data.

* If new data is available, the server responds immediately.
* If no change is found, the connection stays open and waits.
* When the server detects a change (from any request), it sends the updated data to all waiting clients.

### Let's Code!

Now, it's time to code! Clone this repo if you want to see it live:

**[GitHub Repo](https://github.com/ashumsd7/web-communication-techniques)** 🚀

```jsx
git clone https://github.com/ashumsd7/web-communication-techniques.git
cd web-communication-techniques
npm i
npm run long-polling
-------------------
Open browser and type
http://localhost:3000/ // Observe API Calls in network tab
```

![image.png](/public/images/blogs/lp_3.png)

### Let's Understand the Code

### 1. Server

If you look at the code below, we have an endpoint `/getData`. When someone hits **[localhost:3000/getData](http://localhost:3000/getData)**, the frontend calls this API with an **empty string** the first time.

* The server **checks for changes** and responds with `"2013 Congress Government"`.
* The frontend **receives this data**, prints it, and then **calls `fetchData` again**, sending `"2013 Congress Government"` as the last received data.
* Now, if there's **no change**, the server **holds** all new requests in a waitlist.
* Whenever new data arrives, the server **releases all waiting requests** and sends the updated data.

```markdown
// Initial data value
let data = "2013 Congress Government";

// Array to store waiting client connections
const waitingClientList = [];

/**
 * Long polling endpoint to get data
 * Clients connect and wait for data changes
 */
app.get("/getData", (req, res) => {
  console.log("\n🔄 GET /getData");
  console.log("📱 Client's last known data:", req.query.lastData);
  console.log("💾 Current server data:", data);

  // If data has changed since client's last request
  if (data !== req.query.lastData) {
    console.log("✨ Data changed - sending new data to client");
    res.send(data);
  } else {
    // If no change, hold the connection
    console.log("⏳ No data change - adding client to waiting list");
    waitingClientList.push(res);
    console.log("👥 Current waiting clients:", waitingClientList.length);
  }
});
```

Client when web page loads on [localhost:3000](http://localhost:3000) first time 

```html
 <script>
        let lastData="";
        function fetchData(lastData) {
            // first time u send the data with lastData as empty string
            fetch('http://localhost:3000/getData?lastData='+lastData)
                .then(response => response.text())
                .then(data => {
                    // serves sees the lastData is empty string and sends the data 
                    // because the data is changed and u r putting the data in lastData and polling again
                    document.getElementById('currentTime').textContent = data;
                    console.log("Got the data from server  polling again with data",data);
                    lastData=data;
                    fetchData(data);
        
                    // after getting the data polling again
               
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

        // Fetch data immediately and then every 2 seconds
        fetchData();
      
    </script>
```

### When data changes

### When Data Changes

Now, someone needs to update the data from anywhere. So, we have created an endpoint to update the data:

**http://localhost:3000/updateData?newData=BJP_GOVT_2014**

* When this request is made, the server **detects the data change**.
* It then **notifies all waiting clients**.
* Any client that previously had `"2013 Congress Government"` will now receive `"BJP_GOVT_2014"`.

This demonstrates how **long polling** works—holding requests and responding only when new data is available. 🚀

![image.png](/public/images/blogs/lp_4.png)

Server Update Data code

```jsx
 */
app.get("/updateData", (req, res) => {
  console.log("\n🔄 GET /updateData");
  const newData = req.query.newData;
  
  console.log("📝 Old data:", data);
  console.log("✨ New data:", newData);
  
  // Update the data
  data = newData;

  // Notify all waiting clients
  console.log(`📢 Notifying ${waitingClientList.length} waiting clients`);
  waitingClientList.forEach(client => {
    client.send(data);
  });

  // Clear the waiting list
  waitingClientList.length = 0;
  console.log("🧹 Waiting list cleared");

  res.send("Data updated successfully");
});
```

So, that’s all about **Long Polling**! 🎯

It was a long blog, but I wanted to make sure you understand it well.

See you in the next topic! 👋 Bye-bye! 🚀
