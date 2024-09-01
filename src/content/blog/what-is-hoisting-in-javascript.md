---
title: What is hoisting in JavaScript
date: 01-09-2024
author: Ashutosh Anand Tiwari
profilePic: chrome://favicon2/?size=24&scaleFactor=1x&showFallbackMonogram=&pageUrl=https%3A%2F%2Fwww.dream11.com%2Fleagues
followLink: chrome://favicon2/?size=24&scaleFactor=1x&showFallbackMonogram=&pageUrl=https%3A%2F%2Fwww.dream11.com%2Fleagues
metaName: Hositing in JS
---
Hoisting in JavaScript is a behavior where variable and function declarations are moved to the top of their containing scope during the compile phase before the code is executed. This means you can use variables and functions before you declare them in your code. However, only the declarations are hoisted, not the initializations. For example, a variable declared with var will be hoisted but not its assigned value. let and const variables are also hoisted but are not initialized, which leads to a "Temporal Dead Zone" error if accessed before initialization.
