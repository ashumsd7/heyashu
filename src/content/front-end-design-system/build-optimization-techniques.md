---
title: Build Optimization Techniques
name: Build Optimization Techniques
episode: 16
seasonNumber: ""
publishedOn: 02-14-2025
updatedOn: 02-14-2025
thumbnail: /public/images/blogs/bund_0.png
author: Ashutosh Anand Tiwari
tags: front-end-design-system
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
Build optimization comes into the picture when we develop our app. To deploy our app, we build it, and the building process is done by a bundler. So, we'll talk about different bundling techniques here.

We develop in different files like TypeScript, CSS, Tailwind, React, Angular, Vue.js, but at the end, the browser needs a file that it can understand. That’s the work of the bundler. A bundler is a tool that takes input and gives an optimized and compatible output that the browser can understand.

For example, browsers can’t understand SCSS, but we write SCSS code. The bundler converts SCSS and bundles it into CSS.

The responsibilities of a bundler include:

* Module management
* Optimization
* Development enhancement (HMR)
* Cross-browser compatibility
* Asset management

There are multiple bundlers in the market.

![image.png](/public/images/blogs/bund_1.png)

When comparing bundlers, you can use a site like [npmtrends.com](https://npmtrends.com/) to analyze and choose trendy bundlers. But before selecting one, let's first understand the core bundlers and how they optimize the build process.

Build time optimization impacts two aspects:

* **Customer Experience** (faster page loads, reduced waiting times)
* **Developer Experience** (faster build times, better tools)

### Code Splitting

Bundlers typically deliver code in a single final JS file. However, web apps often have dynamic features and page-specific code. To improve performance, bundlers can split the code into multiple smaller JavaScript files, which is known as **code splitting**. This approach allows only the necessary code for a specific page or feature to load, improving load times and performance.

Code splitting enables a more efficient delivery of content, as the browser only fetches the code it needs for the page being visited, instead of loading everything upfront.

![image.png](/public/images/blogs/bund2.png)

### Tree Shaking

Tree Shaking is a technique used to eliminate dead code from the final bundle. It removes unused code from the application, helping reduce the size of the JavaScript bundle. This technique is helpful when there are libraries or functions not used in the app. The bundler shakes the tree and removes the branches (unused code), ensuring that only the necessary code is included.

![image.png](/public/images/blogs/bund_3.png)

### Minification

Minification is the process of removing unnecessary spaces, line breaks, comments, and other non-essential parts of the code that are not required for execution. This reduces the file size, making it faster to load and improving performance. Minification helps in optimizing JavaScript, CSS, and HTML files.

4o mini

![image.png](/public/images/blogs/bund_4.png)

### Code Obfuscation

Code obfuscation is a technique used to make the source code difficult to understand and reverse engineer. This is done by altering the code's structure and naming conventions, making it harder for someone to decipher the logic, especially in the browser. The goal is to protect the code from tampering or copying by obscuring its real meaning.

![image.png](/public/images/blogs/bund_5.png)

### Pruning & Optimizing CSS

Pruning and optimizing CSS involves removing unnecessary CSS rules and selectors that are not used in the final rendered page, reducing the overall size of the CSS file.

### Compression

Compression is a technique that reduces the size of code using algorithms, ensuring quicker loading times and better performance by decreasing the size of JavaScript, CSS, or HTML files.

### Optimizing Images & Assets

Optimizing images and assets involves converting them into the best possible formats to reduce their size while maintaining quality. This happens during the build process to improve performance.

### Remove Source Maps

Removing source maps from the production build reduces the file size and ensures that the source code is not exposed to the public, making it more secure.

### Profiling and Analyzing Bundles

Profiling and analyzing bundles involves measuring and evaluating the size and performance of bundled files to ensure efficient and optimized builds. It helps identify unnecessary dependencies and large files.

### Pre-rendering SSG

In Static Site Generation (SSG), pages are pre-rendered at build time, so the content is ready to be served directly to the client without additional computation on the server, improving speed.

### Cache Using Asset Hashing

Asset hashing refers to adding unique hashes to filenames (e.g., chunk.js, bundle.js) to ensure that the browser caches files efficiently and re-fetches them only when the file has changed.

### Vendor Chunk Splitting

In applications, third-party libraries are often used only on specific pages. Vendor chunk splitting helps isolate these libraries into separate bundles, ensuring they are only loaded when needed, optimizing loading time.

### Faster Builds

Faster builds allow developers to iterate and test changes quickly, reducing the time spent waiting for the build process and enhancing the development experience.

### Parallelization

Parallelization is the process of running multiple tasks or processes simultaneously during the build, which speeds up the overall process and improves development efficiency.

### Cache Management

Cache management ensures that previously built assets or modules are stored in the cache and reused when possible, reducing build time and improving performance.

### Incremental Compilation

Incremental compilation is a technique where only the parts of the code that have changed are recompiled, rather than recompiling the entire project. This speeds up the build process.

### Hot Module Replacement (HMR)

Hot Module Replacement (HMR) allows developers to see changes in the application immediately without a full reload. When a code change is made, only the modified parts are reloaded, making development faster and more efficient.

### Mono Repo with Tools like Lerna or NX

Mono repo is a project structure where multiple related projects are stored in a single repository. Tools like Lerna or NX help manage dependencies, automate tasks, and improve the development process in large-scale projects.
