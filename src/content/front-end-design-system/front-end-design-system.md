---
title: Front end design system
name: Front end design system
episode: 1
publishedOn: 01-06-2025
updatedOn: 01-06-2025
thumbnail: /public/images/blogs/web_words_1.jpg
author: Ashutosh Anand Tiwari
tags: Web, Internet ,ISP
profilePic: /public/images/blogs/pfp2.png
followLink: https://github.com/ashumsd7
---
Network is a core part of software, as the frontend needs data and the backend sends it. All of this happens through the network. How is data transferred over the internet? How does it reach the client, and what protocols are required? These are essential concepts for software development.

We need to understand what happens when we type "[google.com](http://google.com/)," what DNS is, and its role in the process.

We commonly use REST APIs, but we'll also explore how the web works, including GraphQL, gRPC protocols, and more. We'll dive into networking fundamentals, how the internet works, frontend-backend interactions, REST concepts, HTTP methods, headers, CORS, and other key aspects.

### How the Web Works

To understand this, we need to know the client-server model. A client is the entity requesting information, while a server is the entity providing it. Essentially, the client asks for something, and the server serves it. This is the basic definition of client-server architecture.

[Read more about client-server](https://heyashu.in/digital-garden/notes/namaste-node-js/e2-js-on-server)

### IP Address

Each system on the internet has an IP address.

**IP Address**: An IP address is like a home address for devices on the internet. It uniquely identifies devices (like computers or phones) so they can find and communicate with each other.

Examples:

* IPv4: `192.168.1.1`
* IPv6: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`

### Domain Name

A domain is a human-readable address linked to a unique IP address.

![image.png](/public/images/blogs/web_works_2.jpg)

### Domain Name Parts

When you say `https://www.google.com`, there are specific parts, each with its own significance:

1. **Root Level Domain**:

   The last dot represents the root level domain.
2. **Top-Level Domain (TLD)**:

   Examples: `.edu`, `.org`, `.gov`, `.com`, `.au`.
3. **Second-Level Domain**:

   Examples:

   * `[openoffice.org](http://openoffice.org)`
   * `[expedia.gov](http://expedia.gov)`
   * `[microsoft.com](http://microsoft.com)`
   * `[congress.au](http://congress.au)`
4. **Third-Level Domain**:

   Examples:

   * `[www.example.com](http://www.example.com)`
   * `download.microsoft.com`
   * `sales.microsoft.com`

### Data Centers

A **data center** is a physical facility that stores computing equipment and digital data for companies. It's like a server, but without displays—only CPUs and hardware managing incoming requests.

**Where are data centers located?**

Data centers can exist in multiple physical locations worldwide, all interconnected through optical fibers. These fibers connect across oceans and land, forming a global network. (You can learn more about optical fibers later.)

![image.png](/public/images/blogs/web_works_3.jpg)

Similarly, everything is interconnected, and we get internet connectivity. Data centers provide the data we request via the internet through our browsers. In India, we use internet providers like Jio, VI, and Airtel. These are **ISPs (Internet Service Providers)**. When you relocate to a new city, you may get broadband services like "ABC Internet Broadband" offering speeds like 100 Mbps. These are also ISPs. Let’s explore more about ISPs and how they work.

### ISP (Internet Service Provider)

An **ISP (Internet Service Provider)** is **a company that provides internet access to individuals and businesses.**

ISPs connect users to the internet backbone, assign IP addresses, and route data requests to the correct servers. They manage the local infrastructure and provide bandwidth for internet use.

![image.png](/public/images/blogs/web_works_4.jpg)

So we have local ISPs connected to the internet, governed by the country’s regulatory organizations. There are local, regional, and global ISPs, and these follow specific rules and regulations.

- - -

### Summary So Far

Whenever you type [google.com](http://google.com/), the request goes through the router to the ISP via the internet. Then it hits a DNS server, which provides the IP of the domain. Using that IP, the server is contacted, and it responds with HTML, CSS, and JS files.

Now, let’s dig deeper: what happens when you hit a URL like `google.com`?

- - -

### What Happens When You Hit a URL?

When you type a URL, it doesn’t directly go to the router. First, the browser performs some internal operations:

1. **Cache Check**: The browser checks if the requested resource is available in its cache.
2. **Service Workers**: If a service worker is registered, it intercepts the request and decides how to handle it. (More on this later.)
3. **Router Communication**: After these checks, the request is sent to the router. Some smart routers may cache resources to speed up responses.

The router then communicates with the ISP, which handles the rest of the process.

To observe how service workers and network requests work:

1. Open this site in your browser: https://service-worker-stale-while-revalidate.glitch.me/.
2. Open **Inspect Mode** in the browser and go to the **Network** tab.
3. Make a request and observe the timing for responses (e.g., `200` for success, `304` for cached responses).

We will discuss HTTP status codes (`200`, `304`, etc.) and other details later, or you can explore them online.

![image.png](/public/images/blogs/web_works_5.jpg)

So, when you're getting data from the server, in some cases, the server does not serve the request directly. Instead, a **service worker** plays a role in providing the data. Let’s look at this scenario.

I reloaded the page and clicked on a request with a status code `200`. I noticed the **service worker** responded faster. It's not just about speed; the service worker also provides **caching** and **offline support** in the browser.

![image.png](/public/images/blogs/web_works_6.jpg)

### Service Workers

Service workers enhance the performance of requests made by the browser. Now we understand that before reaching the ISP, caching occurs, and service workers may play a role. Let’s now focus on the ISP layer.

- - -

### ISP Layer

What we currently know is that ISPs deal with the internet, but that’s not entirely true.

When you request data via an IP, it often passes through multiple layers of ISPs:

1. **Local ISPs**
2. **Regional ISPs**
3. **Global ISPs**

Then, it reaches the server in the respective country.

However, this is not always the case. Big companies like Netflix and Google optimize their systems by deploying **data centers** in multiple countries. This minimizes cross-region requests and ensures faster access to data. For example, Netflix stores data at the **regional ISP level**, so users experience minimal latency.

To check details related to any domain, visit https://www.whois.com/.

- - -

### ISP to Servers

Let’s discuss what happens when a request goes from the ISP to the server.

### Three-Way Handshake

If you’ve studied computer networks, you might know this already. If not, let’s review:

1. **SYN (Synchronize)**: The client sends a synchronization request to the server.
2. **ACK (Acknowledge)**: The server responds, acknowledging the request.

- - -

### Steps from ISP to Server

1. **DNS Lookup**:

   This step resolves the domain name to the correct IP address. You can learn more about DNS lookups separately. For now, think of it as finding the correct IP for the given domain name.
2. **TCP Handshake**:

   Before any data transfer, the client checks the availability of the server through a **TCP handshake** (SYN and ACK).
3. **SSL Handshake** (for HTTPS):

   If the URL uses HTTPS, an SSL handshake ensures encrypted communication between the client and server, enhancing security.
4. **HTTP GET Request**:

   After the handshake, the browser sends the HTTP GET request, and the server responds with the requested data.

This process ensures a secure and efficient connection between the client and the server.

![image.png](/public/images/blogs/we_works_7.jpg)

### SSL: **Secure Sockets Layer**

An SSL handshake is **a series of communications between a client and a server that establishes a connection and verifies the security of both parties.**

During this process:

1. **Certificate Exchange**: Certificates are exchanged to ensure that the communication is secure and cannot be hijacked.
2. **Encryption**: A secure, encrypted channel is established between the client and server.

Finally, you receive **HTML, CSS, JS**, and other resources like images, which are rendered in the browser.

![image.png](/public/images/blogs/web_works_77.jpg)

### Lets discuss how browser handles and renders

![image.png](/public/images/blogs/web_works_8.jpg)

### How the Browser Processes a Web Page

When a page is requested, we receive **HTML, CSS, and JS**.

* **HTML**: Used to build the **DOM tree** (Document Object Model).
* **CSS**: Parsed to create the **CSSOM** (CSS Object Model).

  * **Note**: CSS is **render-blocking**, which means it can delay the rendering of the page until it is fully loaded and processed.
* **JS**: JS is **parser-blocking**, meaning it pauses HTML parsing while the script is being executed.

- - -

For more detailed insights, you can refer to [this article](https://medium.com/a-layman/how-browser-works-when-rendering-a-web-page-f49c09bec475).

![image.png](/public/images/blogs/web_works_9.jpg)

### Document Object Model (DOM)

The **Document Object Model (DOM)** is a programming interface that represents the structure of a web document as objects and nodes. This allows programs to interact with and manipulate web documents dynamically.

- - -

### CSS Object Model (CSSOM)

After parsing CSS, the **CSS Object Model (CSSOM)** is created.

**CSSOM** stands for **CSS Object Model**. It is a set of APIs that enables reading and modifying a document's CSS information. While the DOM is for HTML, the CSSOM serves the same purpose for CSS.

![image.png](/public/images/blogs/web_works_10.jpg)

### Execute JS

Next comes the phase where **JS execution** takes place. The loading of the script happens, followed by **AST internalization**, **compilation**, and **bytecode conversion**. Finally, the code is executed. By now, **HTML**, **CSS**, and **JS** have been processed, and we are in the **Rendering Phase**.

- - -

### Rendering and Painting

In the **Rendering Phase**, **layouting** happens. Layouting means merging the **DOM** and **CSSOM** into the **Render Tree**. It's like creating the layout of a home and organizing the materials needed to build a villa. This process uses computer graphics and C++ code to draw the content on the browser.

### How Scripts Load

To learn more about how scripts load, check this [video](https://www.youtube.com/watch?v=IrHmpdORLu8).

### Parsing Behavior

* **CSS**: **Blocks rendering** (renders only after parsing is complete).
* **JavaScript**: **Blocks parsing** until it finishes execution.

  * **defer**: Waits until the HTML parser is finished.
  * **async**: Executes as soon as the script loads.

### DOMContentLoaded and window.load

* **DOMContentLoaded**: This event is triggered when all **synchronous** content is loaded. You can use this as a hook to interact with the page.
* **window.load**: This event is fired when **all** content, including images and other resources, has been fully loaded.

Finally, remember that the **DOM tree** and **CSSOM** get merged, and **rendering** and **layouting** occur to paint the content on the screen.

S thats all for this artical , lets meet on next ione dont thank me thnak [Chirag Goel](https://www.linkedin.com/in/engineerchirag?originalSubdomain=in)  and [\*\*Akshay Sai](https://www.linkedin.com/in/akshaymarch7/)ni\*\*  for this . take care bye bye
