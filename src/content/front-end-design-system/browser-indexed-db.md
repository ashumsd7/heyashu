---
title: Browser Indexed DB
name: Browser Indexed DB
episode: 37
seasonNumber: ""
publishedOn: 03-02-2025
updatedOn: 03-02-2025
thumbnail: /public/images/blogs/indexed_db_00.png
author: Ashutosh Anand Tiwari
tags: fsd, database, indexedb
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
IndexedDB is a large-scale, NoSQL storage system that allows storage of just about anything in the user's browser. In addition to the usual search, get, and put actions, IndexedDB also supports transactions, and it's well suited for storing large amounts of structured data.

IndexedDB is a large-scale NoSQL storage system that allows storing almost anything in the user's browser.

* Supports **search, get, put, and transactions.**
* Ideal for **storing large structured data** like Google Docs and Teams messages.
* **Asynchronous operations** (non-blocking).
* **Persists across browser sessions.**
* **Stores data as key-value pairs** and maintains indexes for faster lookups.

### When to Use

* Large data caching
* History storage
* Handling a large dataset

### When Not to Use

* Sensitive and secure data
* Small database operations
* Complex data structures (use only for caching)

**Security Considerations**

* Use authentication and encryption
* Avoid storing sensitive data

### Third-Party Library for IndexedDB

There is a third-party library that makes IndexedDB usage easier:

🔹 **Dexie.js** - A Minimalistic Wrapper for IndexedDB

🔗 [Dexie.org](https://dexie.org/)

It simplifies working with IndexedDB by providing a **Promise-based API, better error handling, and easy queries.**

### Code

```jsx
<script>
    document.addEventListener('DOMContentLoaded', function () {
      const db = new Dexie('todoDB');
      db.version(1).stores({ todos: '++id,task' });

      const todoForm = document.getElementById('todoForm');
      const todoInput = document.getElementById('todoInput');
      const todoList = document.getElementById('todoList');

      function addTodo() {
        db.todos.add({ task: todoInput.value }).then(displayTodos);
        todoInput.value = '';
      }

      function displayTodos() {
        db.todos.toArray().then(todos => {
          while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
          }

          todos.forEach(todo => {
            const listItem = document.createElement('li');
            listItem.textContent = todo.task;
            todoList.appendChild(listItem);
          });
        });
      }

      todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTodo();
      });

      // Initial display
      displayTodos();
    });
  </script>
```

[NFSD Github repo](https://github.com/namastedev/namaste-frontend-system-design/blob/master/Databases%26Caching/indexedDb/index.html) 

A live app : https://mdn.github.io/dom-examples/to-do-notifications/
