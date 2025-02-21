---
title: Web Routing & Protected Routes
name: Web Routing & Protected Routes
episode: 20
seasonNumber: ""
publishedOn: 02-21-2025
updatedOn: 02-21-2025
thumbnail: /public/images/blogs/router_1.png
author: Ashutosh Anand Tiwari
tags: front-end-design-system
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
URL is the most important part of any web app. Changing it after production is not a good idea from both a user perspective and a developer perspective. Changing it later affects the entire file structure, which is not good. Changing routes is also not good for SEO and your website ranking.

So, we need to choose routes carefully and protect them wherever required.

We will discuss all of that.

A best practice, if you are changing routes, is to redirect from the old to the new route. However, users may not have a good experience with this approach, but there is no better solution than redirection.

### A Bit About History

There used to be multiple-page applications (MPAs) with files like `index.html`, `about.html`, `contact.html`, etc. When new frameworks emerged, they started following the SPA (Single Page Application) approach. Technically, everything happens on a single page, but users see different routes without page reloads. In traditional MPAs, switching pages caused a full reload, which was not the best user experience.

Over time, frameworks evolved, and they introduced routing packages, either developed by them or third-party libraries.

**Libraries:**

- For Angular, there is a different library.
- For Vue.js, there is another one.
- For React, the widely used library is `react-router-dom`.

### Interview Perspective

If asked about routing in an interview, you should be able to talk for about five minutes on how you manage routes and their best practices.

### Protected Routes

In any web app, some routes are accessible to all users, while others are restricted. For example:

- `/about` and `/terms` can be accessed by everyone.
- `/billing` should be restricted because it contains user-specific billing details.

These restricted routes fall under **protected routes**, so during route design, you need to ensure they are not visible to unauthorized users.

To handle protected routes, we create a wrapper in code that restricts access to non-public routes, ensuring only logged-in users can visit them.

I will soon share the code and a GitHub repo link. Stay tuned!
