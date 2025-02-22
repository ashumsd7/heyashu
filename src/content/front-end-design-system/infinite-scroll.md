---
title: infinite scroll
name: "LLD: Infinite scroll"
episode: 23
publishedOn: 02-22-2025
updatedOn: 02-22-2025
author: Ashutosh Anand Tiwari
tags: front-end-design-system
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
We have seen multiple platforms like **Swiggy, Zomato, and even social media apps** with a feature where we keep scrolling, and **content never ends**, right?

That’s **infinite scroll**—instead of a scrollbar, content keeps getting added dynamically.

### How It Works

1. First, we fetch a **block of data** and render it.
2. Detect when the user has **scrolled** **80% or 100%** of the page.
3. Load and append **more data** dynamically.

### Problem

Let's identify when the **user reaches the bottom** of the screen.

```jsx
// view port height
window.innerHeight
919
// length of the rendered page ( height )
document.body.scrollHeight
5307
// scroll by : how much you have scrolled in y axis
window.scrollY
600
```

So, we need a **formula** that tells us whether we have reached the **bottom of the page** or not, correct?

If that **formula returns `true`**, it means we have reached the bottom and should **call the API** to load more data.

### **Formula to Check if We Have Reached the Bottom**

If my **window scrollY** (whatever we have scrolled) **+ window.innerHeight** is **around or equal** to the **scrollHeight** of the page:

```jsx
  useEffect(() => {
    const handleScroll = () => {
      const scrolledArea = window.scrollY;
      const pageScrollableArea = document.body.clientHeight;
      const windowSize = window.innerHeight;
      // return true or false
      console.log(scrolledArea+windowSize>=pageScrollableArea)
      // call the api and append the data  
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
```

There is one **substitute** for this, which is **pagination**, and we will discuss its implementation in the next lecture.

### 🔗 **Links**

📌 **[Component Full Code](https://github.dev/ashumsd7/react-playground-2025/blob/main/src/pages/InfiniteScroll.jsx)**

🚀 **[See App in Live Action](https://heyashu-react.netlify.app/infinite-scroll)**
