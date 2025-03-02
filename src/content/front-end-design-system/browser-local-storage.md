---
title: Browser Local Storage
name: Browser Local Storage
episode: 34
publishedOn: 03-02-2025
updatedOn: 03-02-2025
thumbnail: /public/images/blogs/ls_1.png
author: Ashutosh Anand Tiwari
tags: fsd, database
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
This is **storage** where we keep some data **persistently** on the user's device. **Persistent** means the data does not get erased even if the user reloads, exits the window, or closes the tab.

You can check this storage in **Inspect Mode** → Switch to the **Application** tab (next to the Network tab) to view **Local Storage**.

![image.png](/public/images/blogs/ls_2.png)

### What is allowed

```jsx
localStorage.setItem('name', 'heyahsu');  // only string allowed
localStorage.getItem('name');  // gives heyashu
localStorage.removeItem('name');
localStorage.clear();
```

* **Size Limit:** 5MB per domain (maximum data storage allowed).
* **Local Storage operations are synchronous.**
* **Persistent Storage:** Data remains even after closing the tab or window, except in **Incognito Mode**.
* **Only serialized data (strings) are allowed** in Local Storage.
* **Security Considerations:** Do not store sensitive data. Be cautious of **CORS** and **XSS attacks**.
* **Use Cases:** Store user preferences, selected themes, usernames, and basic settings—but **never passwords**.
* **Asset Storage** can also be done.
* LocalStorage is not **reactive**.
