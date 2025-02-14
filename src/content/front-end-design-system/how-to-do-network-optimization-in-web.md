---
title: How to do Network Optimization in web
name: "Mastering Network Optimization: A Comprehensive Guide"
episode: 14
seasonNumber: ""
publishedOn: 02-14-2025
updatedOn: 02-14-2025
thumbnail: /public/images/blogs/nw_1.png
author: Ashutosh Anand Tiwari
tags: front-end-design-system
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
As we know, we can check website performance using different tools. If you're not aware, I highly recommend checking these notes: **[Best Web Performance Tools](https://heyashu.in/digital-garden/notes/front-end-design-system/best-web-performance-tools)**.

In this blog, we will cover:

1. **Critical Rendering Path**
2. **Minimizing HTTP Requests**
3. **Sync, Async, and Defer for Loading JavaScript**
4. **Avoiding Redirections**
5. **Resource Hinting**
6. **Fetch Priority**
7. **Early Hints**
8. **HTTP Upgrades (HTTP/1.1 vs. HTTP/2 vs. HTTP/3)**
9. **Compression: Brotli/Gzip**
10. **HTTP Caching & Cache Control**
11. **Caching Using Service Workers**

### **Critical Rendering Path**

![image.png](/public/images/blogs/nw_2.png)

you know the **client-server architecture**, where the client sends a request to the server, and the server responds. Now, let’s understand how **HTML is displayed in the browser** when the server sends it.

📄 **Official Document:** **[Understand the Critical Path | web.dev](https://www.notion.so/14-Network-Optimization-1994a3ba7f7d807dad76d1bb8312ddb1?pvs=21)**

When the server sends HTML, the browser processes it step by step:

1. **DOM Creation** – The HTML is parsed, and a **DOM tree** is created.
2. **CSSOM Creation** – The browser checks for CSS, processes it, and builds the **CSSOM (CSS Object Model)**.
3. **JavaScript Execution** – JavaScript interacts with the page, often modifying the DOM or delaying rendering.
4. **Rendering & Painting** – The browser combines the **DOM + CSSOM**, applies styles, and renders the page.

🚨 **Important Notes:**

* **CSS is render-blocking** – It delays the page from being displayed until it's fully loaded.
* **JavaScript is parsing-blocking** – It can pause HTML processing while being executed.
* The **first packet** received from the server is **14KB** in size.

![image.png](/public/images/blogs/nw_3.png)

When someone asks **what is CRP (Critical Rendering Path)**, just say:

**The critical rendering path refers to the steps involved until a web page starts rendering in the browser.** To render pages, browsers need the **HTML document** along with all critical resources required for rendering.

For example, you can write an **HTML document** with scripts, CSS, and HTML, render it in the **Network tab**, and observe what gets loaded.

### **Minimize Network/HTTP Requests**

When we make a request from the client to the server, it takes time to resolve, affecting the web page. So, we should focus on reducing it.

### **Key Factors:**

* **Connection Time**
* **Browser Limits** (Max **6 to 10** parallel requests)

### **Solutions:**

To optimize performance:

* Keep some **inline JS and CSS** in the **first request** to render the page (LCP).
* Use **Base64 images**.
* Prefer **SVG** for images.

We wrote an **HTML code**, linked an **external CSS file**, and rendered a few cards. Images are imported from a **PNG file stored locally**.

**GitHub repo link:** [Github repo](https://github.com/ashumsd7/network-optimization-web)

![image.png](/public/images/blogs/nw_4.png)

The **Network tab** shows data where styles and images take time to load. You can check how each resource (HTML, CSS, JS, images) loads and impacts performance.

![image.png](/public/images/blogs/nw_5.png)

Now, let's change **images to SVGs** and use **internal CSS** instead of an external file.

Check the screenshots below—see how fast it loaded. If you observe in **Lighthouse**, **FCP and LCP times are the same** because everything was loaded in a single file at the same tim

![image.png](/public/images/blogs/lowww.png)

### **Loading JavaScript: Sync / Async / Defer**

Let's talk about how to load **JavaScript** in an optimized way.

JavaScript can be loaded in two ways:

1. **Inline (inside the HTML file)**
2. **External file (linked in the HTML)**

External scripts can be placed **inside** or **at the end of the body** for better performance.

![image.png](/public/images/blogs/nw_6.png)

### **Before Discussing This, Know That JavaScript is Parsing-Blocking**

### **Case 1: Default Script Loading**

* When a `<script>` tag is encountered, **HTML parsing stops**.
* The script **downloads**, then **executes**, and only after that does **HTML parsing resume**.
* This delays **FCP (First Contentful Paint) and LCP (Largest Contentful Paint)**.

### **Case 2: `async` Attribute**

* While **HTML is parsing**, the script **downloads simultaneously**.
* Once downloaded, **execution starts immediately**, **blocking further HTML parsing**.
* **FCP and LCP can be affected**, depending on the script size.

### **Case 3: `defer` Attribute**

* The script **downloads in parallel**, like `async`.
* **Execution happens only after HTML parsing is complete**.
* Unlike `async`, it **does not block HTML parsing** and ensures scripts run in order.

### **Avoid Redirection**

Sometimes, users try to load a website without the **secure protocol** (HTTP instead of HTTPS). If the site is hosted on HTTPS, it **automatically redirects** to the secure version.

When a user makes an **HTTP request**, a middleware ensures the request doesn't reach the server and **switches the protocol to HTTPS**. This happens using **HSTS Preloading**: https://hstspreload.org/.

### **What is HSTS Preloading?**

HSTS (**HTTP Strict Transport Security**) is a security mechanism that forces browsers to always use **HTTPS** instead of **HTTP** when connecting to a website.

To **avoid redirection delays**, websites should **enforce HSTS**. For example, when you type `http://google.com`, it automatically redirects to `https://google.com`. See the screenshot below.

![image.png](/public/images/blogs/nw_7.png)

### **Resource Hinting**

On a website, we load:

* **Same-origin resources** (CSS, JS)
* **Cross-origin resources** (CDN-hosted JS, fonts, images)

These resources load in different phases, often after an API response. To optimize this, we use **resource hinting** techniques like **preload, preconnect, and dns-prefetch** to fetch them earlier.

![image.png](/public/images/blogs/nw_8.png)

### **Preconnect**

When a request is made, a connection is set up, DNS lookup happens, and SSL/TLS handshake occurs. This process happens each time you load a resource from an external domain.

Using **preconnect**, we avoid making the connection repeatedly when accessing resources from the same external endpoint.

The `preconnect` hint tells the browser to open a connection to a domain or subdomain in advance. This is useful when you can’t self-host critical resources.

Example:

```jsx
 
<link rel="preconnect" href="https://xyz.com" crossorigin />
```

Check this link for more examples: [Resource Hints](https://learn-performance-resource-hints.glitch.me/)

- - -

### **DNS-prefetch**

**DNS Prefetch** checks the availability of the domain before a request is made. It performs a DNS lookup in advance, reducing latency during future requests to the same domain.

Example:

```jsx
 
<link rel="dns-prefetch" href="https://xyz.com" crossorigin />
```

- - -

### **Preload**

Preload allows the browser to download extra resources in advance before they're actually needed. It speeds up resource fetching and improves rendering time.

Example:

```jsx
 
<link rel="preload" href="image-url" as="image" crossorigin />
```

Check how preload works with images here: [Preload Example](https://learn-performance-resource-hints.glitch.me/3)

- - -

### **Prefetch**

Prefetch is used to load resources that will be needed in the near future, with low priority, to speed up future navigation.

- - -

### **Prerender**

Prerender downloads the next page and its dependencies, caching them for faster future loading. It uses a hidden frame for this technique.

- - -

### **Resource Hint Priority**

Resource hint priority helps determine which hints to use first. The `fetchpriority` attribute can be added to image tags or other resources to control loading order.

Example:

```jsx
 
<link rel="preload" href="image-url" as="image" fetchpriority="low" crossorigin />
```

Documentation: [Fetch Priority](https://web.dev/articles/fetch-priority)

- - -

### **Early Hints**

Sometimes, servers take time to give a response. **Early Hints** is an HTTP status code (`103 Early Hints`) that allows servers to send hints about critical subresources before the final response. This allows the browser to fetch these resources (like stylesheets or JavaScript) while the server is still generating the main resource.

Documentation: [Early Hints](https://developer.chrome.com/docs/web-platform/early-hints)

![image.png](/public/images/blogs/nw_9.png)

### HTTP Upgrade http1.1/  2 and 3

![image.png](/public/images/blogs/nw_10.png)

In **HTTP/1** and **HTTP/1.1**, the process started with establishing a connection, followed by **TCP** and **TLS** handshakes, and then other operations occurred. However, **HTTP/1.1** lacked **multiplexing** and **streaming capabilities**, which created issues in efficiently handling multiple requests.

**HTTP/2** introduced **multiplexing**, allowing multiple requests and responses to be sent simultaneously over a single connection. It also offered **data prioritization** and **stream control** to optimize data packet handling.

**HTTP/3** uses **UDP** instead of **TCP** and skips the traditional 3-way handshake. Instead of TLS, **HTTP/3** uses **QUIC** for encryption and transport. Both **HTTP/2** and **HTTP/3** operate over **HTTPS**, not **HTTP**.

![image.png](/public/images/blogs/nw_11.png)

So, the server can use HTTP/2, so the browser can make multiple requests, and the server can handle them to reduce LCP and FCP time.

### Copression

So server send the dat to the client but we need to send the dtaa in compressed fasion to aovid extar load to do som there are tehxniues can be sued techbnique ar eusid are brotl and gzip, brotli is mre p[owerfull ,s o severred send copressed ata amnd brwser encod the data fdrom server we can user diff packegs to do the same 

Docs: https://web.dev/articles/codelab-text-compression-brotli

### **Caching**

To optimize caching, we can use cache policies like **Cache-Control**, **Expires**, **ETag**, and **Last-Modified** headers. These can help avoid repeated requests by caching the data, thus improving performance and reducing server load. By using these headers, the server can instruct the browser to store data and reuse it for repeated requests.

Service workers do play a key role in caching and improving performance, which we’ll cover in another note.

Thank you for your time and patience! You're doing awesome. Don’t forget to attempt the quiz to check your knowledge. Take care and see you next time! Bye!
