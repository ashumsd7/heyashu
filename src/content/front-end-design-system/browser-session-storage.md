---
title: Browser Session Storage
name: Browser Session Storage
episode: 35
publishedOn: 03-02-2025
updatedOn: 03-02-2025
thumbnail: /public/images/blogs/session_0.png
author: Ashutosh Anand Tiwari
tags: fsd, database
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
Session storage is similar to local storage with some basic differences, and it retains data even after a reload.

![image.png](/public/images/blogs/session_1.png)

Similarly, there are some methods we can use to perform actions and take advantage of them.

```jsx
sessionStorage.setItem('name', 'heyahsu');
sessionStorage.getItem('name');
sessionStorage.removeItem('name');
sessionStorage.clear();
```

It has the same 5MB data limit as local storage and is synchronous.

Just remember: It gets cleared when the browser session ends, such as when you close a tab or window. That’s the key difference from local storage.

Structurally, it uses serialized data for storage.

**Important:** If you switch tabs within the same domain, you won’t get the stored data. However, if you reload the same tab, the data remains. If you duplicate the tab, session storage initializes as a fresh state for that tab and does not sync with the original.

Be mindful of what to store and what not to. Avoid storing sensitive data.

Session storage is best for temporary data related to the current session.

Avoid storing large datasets, asynchronous operations (since it’s synchronous), or data that needs to persist long-term.
