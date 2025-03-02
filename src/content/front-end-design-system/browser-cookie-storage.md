---
title: Browser Cookie Storage
name: Browser Cookie Storage
episode: 36
publishedOn: 03-02-2025
updatedOn: 03-02-2025
thumbnail: /public/images/blogs/cookie_thu.png
author: Ashutosh Anand Tiwari
tags: fsd, database
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
Cookies are also a storage mechanism for persistent data. The data stored in cookies travels with requests from the client to the server, meaning it is automatically transferred via HTTP calls.

Whatever is saved on the client can always be read by the server. However, data set by the server is not necessarily accessible by the client.

![image.png](/public/images/blogs/cookie_2.png)

There are two types of cookies:

### **Session Cookie**

* Expires when the browser is closed.

### **Persistent Cookie**

* Remains stored until the set expiry time is reached. If no expiry time is set, it persists until the browser is closed.

**Key Points:**

* **Size Limit**: 4KB per domain. Since cookies travel with every request, excessive use can slow down performance.
* **Persistence**: Controlled by expiry date/time. It either expires when the browser closes or when the set expiry time is met.
* **Data Structure**: Stores stringified data.

Below, I have demonstrated how to save a single cookie. For multiple cookies, proper handling is required.

```jsx
// Set a cookie
document.cookie = "name=heyahsu-cookie; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
console.log("Cookie after setting:", document.cookie);

// Get a cookie
function getCookie(name) {
  const cookiePair = document.cookie.split(";").find(cookie => cookie.trim().startsWith(name + "="));
  return cookiePair ? decodeURIComponent(cookiePair.split("=")[1]) : null;
}
console.log("Retrieved cookie:", getCookie("name"));

// Update a cookie
document.cookie = "name=updated-heyahsu-cookie; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
console.log("Cookie after updating:", document.cookie);

// To delete a cookie, set its expiration date to a past date
document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
console.log("Cookie after deleting:", document.cookie);
```

Authorization purposes are served when we need to store lightweight data that the server can use.

* **Do not use it for large datasets.**
* It is mainly used to store user preferences.
* Helps customize the user experience based on previous selections.
