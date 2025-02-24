---
title: "LLD Offset and Cursor Pagination "
name: "LLD:  Offset and Cursor Pagination "
episode: 27
publishedOn: 02-24-2025
updatedOn: 02-24-2025
thumbnail: /public/images/blogs/pagination_1.png
author: Ashutosh Anand Tiwari
tags: fsd, pagincation
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
### **Pagination: Offset & Cursor**

If the backend has too much data, loading everything at once is not possible. That’s why we use **pagination** or **infinite scroll** for better access.

- **Infinite Scroll:** The user doesn't know when the data will end. If data is sorted alphabetically (A to Z), you can’t directly jump to "Z." It has no footer and is best for live or addictive content.
- **Pagination:** You can go to a specific page, making it ideal for admin panels. Infinite scroll is mobile-friendly, while pagination is better for structured navigation.

### **Offset Pagination**

Pagination can be:

1. **Server-Side Pagination**
2. **Frontend Pagination**

In **server-side pagination**, data is loaded page-wise. Example: If you request `?page=1`, you get 25 records. Clicking `?page=2` fetches the next 25, and so on. This is called **offset pagination**. If `?page=2&count=20`, it skips 40 records and fetches 41-60.

- **Faster initial load** than frontend pagination.
- Each page change requires an API call.
- Example API:This fetches **10 products** while skipping the first **10 records**.
    
    ```
    https://dummyjson.com/products?limit=10&skip=10&select=title,price
    ```
    

In **frontend pagination**, API is called **once**, and data is stored locally.

- No extra API calls, faster access after load.
- Easy to implement, no backend logic needed.
- **Cons:** High initial load time, heavy on the browser.

### **Cursor Pagination**

Google introduced **cursor pagination** to solve offset pagination issues.

### **Offset Pagination Problem**

- Suppose there are **12 users**, and each page shows **4 users**.
- After fetching page **2**, new users register on page **1**.
- This shifts data, causing **missing records** or **duplicates**.

### **How Cursor Pagination Solves It**

- Instead of page numbers, it uses a **cursor** (like a timestamp or ID) to fetch data.
- Example:
    - Cursor = **7**, Limit = **4** → Fetches **4 records after 7**.
    - Cursor = **9**, Limit = **6** → Fetches **6 records after 9**.
- **Advantages:**
    - No duplicate or missing data.
    - Faster and better for real-time updates.

Use **offset pagination** for structured data and **cursor pagination** for real-time updates like social media feeds.

Cursor pagination **does not track pages**, making it a good fit for **infinite scroll**, where pages don’t matter. It is useful when sorting is **not required**. In social media feeds, for example, we don’t have the option to sort posts normally, so cursor pagination works best.

I have written a pagination component. Check it out!

[**Code Link:**](https://github.com/ashumsd7/react-playground-2025/commit/cd4ec8d8ea2c8dd33628edefc8dbd558fcf09f9e#diff-8634a1a959c7500599eed378cd04b1f9cfeacc95de0ec134bd1d1ca99b78d8d5)

[**Deployed Link:**](https://heyashu-react.netlify.app/pagination)
