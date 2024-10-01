---
title: "e1: Microservices vs Monolith How to Build a Project"
name: Microservices vs Monolith - How to Build a Project
episode: 1
seasonNumber: 2
publishedOn: 10-01-2024
updatedOn: 10-01-2024
thumbnail: /public/images/blogs/1micromacro.jpg
author: Ashutosh Anand Tiwari
tags: Microservices , How to build
profilePic: https://avatars.githubusercontent.com/u/40313523?v=4
followLink: instagram.com/javascripterr/
---
Do you know about SDLC, also known as the Waterfall Model? It stands for **Software Development Lifecycle,** a process that a project follows from start to finish. There are various models, and Waterfall is one of them. Here's a breakdown:

### SDLC (Waterfall Model)

1. **Requirement**: Managed by Project Managers, CTO/CEO, or senior staff in smaller companies. They collaborate with designers to define requirements.
2. **Design**: Engineers or tech leads handle high-level and low-level designs.
3. **Development**: Done by developers.
4. **Testing**: Managed by QA, with test cases sometimes written by developers.
5. **Deployment**: Managed by DevOps or senior developers.
6. **Maintenance**: Continuous process if new requirements arise, repeating the cycle.

[Read more Models Here](https://www.geeksforgeeks.org/top-8-software-development-models-used-in-industry/)

### Monolith vs. Microservices

![image.png](/public/images/blogs/2micormono.jpg)

### Monolith:

Monolith architecture is like building everything together in one big project. Imagine when you make a website; you write HTML, CSS, and JavaScript, then install packages, which brings `package.json`. You’ll add backend, database, and any services like sending emails within this same project. So, **everything is in one repo**, from frontend to backend and database. It’s like **all developers working on the same large codebase**—the **monorepo**. All functionalities are inside this one project.

### Microservices:

Now, let’s talk about microservices. First, understand that **a service** is a separate project that does a specific thing. For example, if you need to send an email, you can have a **microservice for email notifications**. This microservice will work as a standalone project, not part of the main app. So, in this approach, instead of everything living in one big project like monolith, you have **many small independent projects** (microservices) handling individual tasks. This helps when scaling or maintaining projects, and **services can run independently**.

So, whether to go for **monolith** or **microservices** depends on your project requirements.

### What to use?

Both Monolith and Microservices architectures come with their own pros and cons. I would suggest you read more about it, but here's a quick overview. First, it depends on the project requirements. Remember, in a Monolith architecture, code review and overall management become tough if you have a large codebase. Everything needs to be well-maintained, and running everything together may require a powerful system. I’ve experienced this firsthand when my system couldn't handle everything.

### What I love?

I don't have a personal laptop, so I use my company’s device, which is an Intel i5 processor. Once, I had to work on a Monolith repo on [Gluestack UI](https://gluestack.io/) that involved backend (Docker), frontend (React Native), and a component library. Believe it or not, my laptop kept freezing when I tried running both backend and frontend. That’s why **Microservices** work better for me. Debugging is smoother, and the overall experience is better. Maintenance is easier, you can independently assign work, and you can even change the tech stack for smaller services in Microservices, which is a huge plus!

[Read more differences here](https://www.simform.com/blog/monoliths-vs-microservices/)

ohk thats all about this topic, will continue with this , stay tuned, Good bye!
