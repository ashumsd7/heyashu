---
title: "E12: Databases and mongoDB"
name: Databases and mongoDB
episode: 12
publishedOn: 09-15-2024
updatedOn: 09-15-2024
thumbnail: /public/images/blogs/1e12db.png
author: Ashutosh Anand Tiwari
tags: databses
profilePic: /public/images/blogs/pfp2.png
followLink: https://www.instagram.com/javascripterrr/
---
In computer science, a **database** is an organized collection of data, a structured way of collecting and storing information. It is based on the **DBMS** (Database Management System), which means you can create, delete, edit, and retrieve data. The DBMS software manages everything, including the storage.

### Types of Databases

1. Relational Databases (MySQL, PostgreSQL)
2. NoSQL Databases (MongoDB)
3. In-Memory Databases (Redis)
4. Distributed Databases (CockroachDB)
5. Time-Series Databases (InfluxDB)
6. Object-Oriented Databases (db40)
7. Graph Databases (Neo4J)
8. Hierarchical Databases (IBM IMS)
9. Network Databases (IDMS)
10. Cloud Databases (Amazon RDS)
11. Multi Model Database

I’m not diving deeper into this. You can read more by searching on the internet.

### RDBMS: Relational Databases (MySQL, PostgreSQL)

![image.png](/public/images/blogs/2e12db.png)

In 1970, **E.F. Codd** introduced Codd's 12 rules (actually 13, because they start from 0 to 12). He designed [these rules](https://prepinsta.com/dbms/codds-rules/)  to define what qualifies as a relational database. If a database follows these 12 rules, it falls into the category of a relational database. There are multiple databases that don’t strictly follow all these rules but are still called relational databases. **MySQL** and **PostgreSQL** are the most commonly used in this category.

### History of MySQL

MySQL was created by **Michael Widenius**. He has three daughters: My, Max, and Maria. **My** is the name of his eldest daughter, which is how **MySQL** got its name. Later, he created more databases, like **MaxDB** and **MariaDB**. MariaDB was a fork of MySQL. 

![image.png](/public/images/blogs/3e12db.png)

After some time, **Sun Microsystems** acquired MySQL, and later, Oracle acquired Sun Microsystems, so now Oracle manages MySQL. This isn't typically asked in interviews, but it's good to know for your curiosity! [read the full history](https://java366.wordpress.com/2018/05/22/http-www-papitv-com-mysql-mariadb-founder-michael-monty-widenius-interview-by-olga-show-chervyakova-kc-leung/)

### Postgres

Another scientist, **Michael Stonebraker**, was working on a project called **Ingres** at the University of California. 

![image.png](/public/images/blogs/4e12db.png)

He left the university around 1985 and started a new project called **Post Ingres**. This project focused on **SQL** (Structured Query Language), and eventually, it evolved into what we now know as **PostgreSQL**.

### SQL: Structured Query Language

Now that you know about different types of databases and their history, you understand they are organized and structured. To manage these databases — to create, read, update, and delete data — you need to perform operations called **queries**. For that, we use a language called **Structured Query Language (SQL)**.

![image.png](/public/images/blogs/5e12db.png)

 Don’t get confused with "sequel" or "prequel" — it's not related to movies! Some people pronounce SQL as "sequel," but it stands for **Structured Query Language**, not related to cinema, haha!

### NoSQL (MongoDB)

**Types of NoSQL:**

1. Document DB
2. Key-Value DB
3. Graph DB
4. Wide-Column DB
5. Multi-Model DB

MongoDB uses the **Document** type of NoSQL database. Some people call it "Not Only SQL" or "Non-SQL," but the naming varies. The key difference is that it doesn’t operate using **Structured Query Language (SQL)**. NoSQL databases came into existence around the 2000s.

### History of MongoDB

MongoDB was created in 2009 by a company called **10gen**. The name **Mongo** comes from the word **Gigante**, meaning "huge," because it can store a massive amount of data. Later, the company 10gen shifted its focus to MongoDB and renamed itself to **MongoDB Inc**.

![image.png](/public/images/blogs/6e12db.png)

 MongoDB quickly evolved and became popular, as it emerged around the same time as **Node.js**. It felt like Node.js and MongoDB were made for each other, which increased developer productivity. MongoDB is built using **C++** with some JavaScript code as well.

### Presentation of Database Tables

Relational databases store data in rows and columns. "Relational" means that there are relationships between different tables. For example, in a **student** table (as shown below), there might be another table called **hobbies**. The **student_id** in the hobbies table is related to the student table because each row in the hobbies table is linked to a student. The **student_id** is used as a **foreign key** to create this relationship, which is how relational databases work.

In **MongoDB**, we have **collections** that function like JavaScript objects or JSON data, but in MongoDB, they are called **Documents**. The keys in MongoDB are referred to as **fields**. In MongoDB, there is no need for **[data normalization](https://www.google.com/search?q=whatis+databse+normalization&sca_esv=0ee23696230f4fd0&sxsrf=ADLYWIJgBePNz9IXbOL4fpJ7-tgXmIkeHA%3A1726342963897&ei=M-flZt-9NsnR2roPn5nV6QM&ved=0ahUKEwifo_7YmMOIAxXJqFYBHZ9MNT0Q4dUDCA8&uact=5&oq=whatis+databse+normalization&gs_lp=Egxnd3Mtd2l6LXNlcnAiHHdoYXRpcyBkYXRhYnNlIG5vcm1hbGl6YXRpb24yBxAAGIAEGA0yBxAAGIAEGA0yBxAAGIAEGA0yBxAAGIAEGA0yBxAAGIAEGA0yBxAAGIAEGA0yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCBAAGBYYHhgPSJwqUABY3yhwAHgBkAEAmAHQA6ABjC2qAQowLjkuMTcuMC4xuAEDyAEA-AEBmAIboAKSLsICBBAjGCfCAgoQABiABBhDGIoFwgIQEAAYgAQYsQMYQxiDARiKBcICCxAAGIAEGLEDGIMBwgIIEAAYgAQYsQPCAgsQABiABBiRAhiKBcICDRAAGIAEGLEDGEMYigXCAg0QABiABBixAxjJAxgKwgIHEAAYgAQYCsICChAAGIAEGAIYywHCAgcQLhiABBgKwgIFEAAYgATCAgsQABiABBiSAxiKBcICDhAAGIAEGJECGLEDGIoFwgIKEAAYgAQYsQMYCsICChAAGIAEGLEDGA3CAgYQABgNGB6YAwDiAwUSATEgQJIHCjAuNy4xOS4wLjGgB_f2AQ&sclient=gws-wiz-serp)**  or joins, and there can be multiple collections.

### Difference between RDBMS and NoSQL

I am just pasting the image. Please Google it to learn more. To be honest, I’m tired today as I just came back from somewhere and don’t have the energy right now. Sorry this time, I’ve written quite a lot already.

![image.png](/public/images/blogs/7e12db.png)

### Queries to Query yourself

1. Why NoSQL recommended for social media Databses
2. [Read uber schemaless Databse blog](https://www.uber.com/en-IN/blog/schemaless-part-one-mysql-datastore/)
