---
title: "e2: Plan a project HLD LLD"
name: How to Plan a project HLD LLD
episode: 2
seasonNumber: 2
publishedOn: 10-03-2024
updatedOn: 10-03-2024
thumbnail: /public/images/blogs/1dbdes.jpg
author: Ashutosh Anand Tiwari
tags: LLD HLD
profilePic: /public/images/blogs/pfp2.png
followLink: https://www.instagram.com/javascripterrr/
---
### Planning and Designing a Project: Dev Tinder

We're going to discuss the first steps in project development—planning and design. The project is **Dev Tinder**, similar to the classic Tinder app, but here, developers swipe profiles instead of dates. It’s like a coder’s version of matchmaking!

Just like regular [Tinder](https://tinder.com/), you sign up, create a profile with preferences and photos, and then start swiping cards left and right. Instead of matching dates, though, it's all about developer profiles, chats, and collaborations. It's Tinder for coders—fun, right? Let's swipe right on code matches! 😄

![image.png](/public/images/blogs/2debdes.jpg)

If you're writing out the steps for **Dev Tinder**, here's a structured plan:

1. **Create an account** – Sign up for a new account.
2. **Login** – Access the app with your credentials.
3. **Update your profile** – Add preferences and profile photos.
4. **Explore profiles** – Browse through the feed of developer profiles.
5. **Send connection requests** – Swipe right to connect with others.
6. **Receive connection requests** – View matches from those who connected with you.
7. **See sent requests** – Check who you’ve requested connections with.
8. **Update profile and logout** – Manage settings and log out.

You can keep adding more features beyond this, including custom notifications, chat features, and developer-specific tools.

After this, the tech team steps in to plan out the technology stack for the project. We will decide whether to use **Monolithic** or **Microservices** architecture. If you don’t know what Monolithic and Microservices architecture are, check out **[Microservices vs Monolith - How to Build a Project](https://heyashu.in/digital-garden/notes/namaste-node-js/e1-microservices-vs-monolith-how-to-build-a-project)**.

### Tech Plan

We will use **Microservices architecture**, and here’s the plan:

1. **Frontend**: React.
2. **Backend**: Node.js and MongoDB.

You can list other security-related things as part of the planning process.

Once these things are done, the tech team moves in, but before that, developers work on **LLD (Low-Level Design)**. If you plan well, writing code will be a breeze.

### LLD: Low-Level Design

![image.png](/public/images/blogs/3debdes.jpg)

From the backend perspective, two major things are important:

1. **DB Design**
2. **API Design**

### DB Design

Let's talk about **DB Design**. You will create a collection called **User Collection**:

1. **User Collection**:

   1. Name
   2. Gender
   3. Address
   4. Phone number
   5. Email ID, password, and many more

Similarly, you will keep creating collections, but make sure to establish relationships between collections to avoid unnecessary work and database usage.

1. **Connection Request Collection.**

![image.png](/public/images/blogs/2adebdes.jpg)

You know that users will send requests to each other, so you will need a **Connection Collection** to track who is sending requests to whom, how many requests one person has, and the status of those requests. What are the staus can be there , Accepted Rejected Ingnored ,Blocked, Pending and what ever you need you can put that feature in. As per your requirement you can change design , not full design but slightly you can.

### API Design  ( Rest APIs)

First, let's understand **API**: It stands for **Application Programming Interface**, which is a set of rules and protocols that allow different software applications to communicate with each other. Think of it as a bridge that lets your app interact with another app or service. There are different type of requests the server and client communicate over HTTP using standard methods like **GET**, **POST**, **PUT**,  **DELETE and PATCH**

What is the difference between PUT and PATCH

\*The main difference between PUT and PATCH is that **PUT replaces an entire resource with a new one, while PATCH only updates a resource partially***

### List of APIs

Here’s the list of APIs we'll implement in our project:

1. **Signup**: `POST` – Create a new user.
2. **Login**: `POST` – Authenticate the user.
3. **Profile**:

   * `GET` – Retrieve profile information.
   * `POST` – Create a user profile.
   * `PATCH` – Update user profile.
   * `DELETE` – Remove user profile.
4. **Connection**: `GET` / `DELETE` / `POST` / `UPDATE` – Manage connection requests.

These APIs follow the basic **CRUD** operations (Create, Read, Update, Delete), which are fundamental to web development. You can explore more about CRUD [here](https://www.traceable.ai/blog-post/what-is-a-crud-api).

That's all for this topic! I hope next time, before you start your project, you'll follow this process for smoother development. Let's begin our journey—take care and goodbye for now! See you soon!
