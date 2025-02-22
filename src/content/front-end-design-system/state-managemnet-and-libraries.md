---
title: State Managemnet and Libraries
name: "LLD: State Managemnet and Libraries"
episode: 21
seasonNumber: ""
publishedOn: 02-22-2025
updatedOn: 02-22-2025
thumbnail: /public/images/blogs/sm_1.png
author: Ashutosh Anand Tiwari
tags: fsd, state-management
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
In any web app, there are two types of layers:

1. **UI Layer** – This refers to any UI elements you see on the webpage.
2. **Data Layer** – This is where the data is defined. It serves as the actual data source for the UI application.

The UI layer is controlled by the data layer. The data layer is responsible for everything happening in the app, including bugs and data changes.

### Why Do We Need State?

Each UI element has some interactivity where data changes dynamically. To manage this changing data, we need a place to store and update it. This is where **state** comes in—it allows us to track and manage dynamic data in a web app.

### Local State

Suppose your UI layer has cards like this (refer to the screenshot below).

![image.png](/public/images/blogs/sm_2.png)

In a card, we need an **image source, heading, and tags**, correct? Where does this data come from? It comes from a **data source**, which is the **data layer**. In a React app, this data is usually stored in the **local state** of the file where the card is defined using HTML or JSX.

That's why **local state** is needed for UI elements—it holds the dynamic data of the app to display information in the UI layer.

### Props Drilling

Suppose you have multiple cards managed by a **parent component**, and each card (a child of the parent) has **more children**. The cards share an **identical data set** coming from a single source.

To pass data to each card, the best approach is to store the data in the **parent component** and then pass it down to all child components instead of managing data individually in each card.

This process—**passing data from parent to child to child**—is called **props drilling**. It follows a **unidirectional data flow**, which is a core concept in React.

![image.png](/public/images/blogs/sm_3.png)

### State Lifting

In React, child components **cannot communicate directly** with each other. This is a limitation.

Suppose **Child 1** has some data that affects **Child 2**. If data changes in **Child 1**, it should also update **Child 2**. But since children can’t communicate directly, how do we manage this?

This is where **state lifting** comes in. Instead of keeping the state in **Child 1**, we move it to the **parent component**. This way, both **Child 1** and **Child 2** can access and modify the state through the parent.

Moving state from a child component to the parent component is called **state lifting**.

### State Management Libraries

We manage state within local components, but **why do we need libraries for state management?**

In **large applications** with multiple pages, managing data becomes difficult due to a **complex component hierarchy**. Suppose data from **Component A (Page 1)** needs to be shared with **Component B (Page 2)**—passing it manually would be **too complicated**.

**State management libraries** solve this by creating a **centralized store** where all app data is stored. Every component reads and updates data from this store, preventing **prop drilling** issues.

And it's all **reactive**.

**Reactive** means that when the **data changes**, the **component re-renders** automatically to reflect the updated state. 

Each framework has its own state management libraries. For React, I have attached a screenshot you can refer to below.

![image.png](/public/images/blogs/sm_4.png)

### Context API

**Remember:** State management libraries are only required for **medium and large-scale projects**, not for small projects.

For **small-scale projects**, you can use **local state and props drilling**. However, React provides another built-in feature that allows you to **share data across components** without installing any third-party library—this is the **Context API**.

With **Context API**, you can define your data in the **root app** or any specific component, making it accessible to all components **page-wise or as needed**.
