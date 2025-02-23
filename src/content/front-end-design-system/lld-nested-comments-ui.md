---
title: LLD Nested Comments UI
name: LLD Nested Comments UI
episode: 25
publishedOn: 02-23-2025
updatedOn: 02-23-2025
thumbnail: /public/images/blogs/nested_comm1.png
author: Ashutosh Anand Tiwari
tags: front-end-design-system
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
### **Nested Comments**

**Nested comments** are where **multiple people comment** on a comment, creating a **hierarchical structure**. This helps provide **clear context** on who is participating and in what way.

Different platforms like **Reddit, Instagram,** etc., have implemented this **deep comment UI** feature. **Reddit** is one of the best examples of this.

Some platforms, like **YouTube**, **restrict the level of replies**. On YouTube, you can only see **one level of replies**, meaning no one can reply to a **replied comment**—only the **parent comment** can have replies.

But **Reddit allows deep nesting**, so we will implement **that**.

### **Approach**

We **render a comment**, and based on its **replies**, we **call the same component recursively**. This ensures that **all comments are displayed hierarchically**, with **each level slightly indented** to indicate depth.

Let me show you how the **data structure** looks like.

```jsx
const commentsData = [
  {
    id: 1,
    user: 'Rahul Sharma',
    text: 'Exploring the beauty of nested comments!',
    replies: [
      {
        id: 1,
        user: 'Priya Verma',
        text: 'Indeed, it adds depth to discussions.',
        replies: [
          {
            id: 1,
            user: 'Amit Patel',
            text: 'Absolutely! It’s like a conversation within a conversation.',
            replies: [
              {
                id: 1,
                user: 'Sneha Kapoor',
                text: 'Nested comments are a great way to keep track of replies.',
                replies: [
                  {
                    id: 1,
                    user: 'Vikram Singh',
                    text: 'I agree, it keeps the thread organized.',
                    replies: [],
                  },
                  {
                    id: 2,
                    user: 'Anjali Mehta',
                    text: 'Yes, it’s very user-friendly.',
                    replies: [],
                  },
                ],
              },
              {
                id: 2,
                user: 'Rohit Gupta',
                text: 'It’s like a tree of thoughts!',
                replies: [],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        user: 'Neha Joshi',
        text: 'This feature is really helpful for discussions.',
        replies: [],
      },
    ],
  },
  {
    id: 4,
    user: 'Ashutosh',
    text: 'Loving the nested comment feature!',
    replies: [.......
```

[Live Deployment Link](https://heyashu-react.netlify.app/accordion)

[Code link](https://github.com/ashumsd7/react-playground-2025/blob/main/src/pages/NestedComments.jsx)
