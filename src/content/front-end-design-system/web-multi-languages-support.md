---
title: Web Multi Languages Support
name: "LLD: Multi Languages Support"
episode: 22
publishedOn: 02-22-2025
updatedOn: 02-22-2025
thumbnail: /public/images/blogs/mls_1.png
author: Ashutosh Anand Tiwari
tags: front-end-design-system
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
If we want **multi-language support** in our app, where users can select a language based on **localization**, we should load our website in the **local language**.

This is all possible based on **config-driven UI**, using:

1. A **JSON file or**
2. **Calling an API** when a language is selected from the dropdown.

### [Read: What is config driven UI](https://heyashu.in/digital-garden/notes/front-end-design-system/what-is-config-driven-ui)

A **config-driven UI** means that the UI is controlled by **configuration files** instead of hardcoded values.

![image.png](/public/images/blogs/mls_2.png)

So it's all possible because of **Config-Driven UI**.

The **JSON** is responsible for the **web page content** getting changed based on the **selected language**.

In the same way, you can use a **store** to manage data where the language is updated based on the selected language.

**For example:**

```jsx
const jsonData = {
    en: [
      { id: 1, title: 'Welcome', description: 'Welcome to our multi-language support page' },
      { id: 2, title: 'Features', description: 'Explore the features of our application' },
      { id: 3, title: 'Contact Us', description: 'Get in touch with our support team' },
      { id: 4, title: 'About Us', description: 'Learn more about our company and values' },
      { id: 5, title: 'FAQ', description: 'Frequently Asked Questions' }
    ],
    hi: [
      { id: 1, title: 'स्वागत है', description: 'हमारे बहुभाषी समर्थन पृष्ठ पर आपका स्वागत है' },
      { id: 2, title: 'विशेषताएँ', description: 'हमारे अनुप्रयोग की विशेषताओं का अन्वेषण करें' },
      { id: 3, title: 'संपर्क करें', description: 'हमारी समर्थन टीम से संपर्क करें' },
      { id: 4, title: 'हमारे बारे में', description: 'हमारी कंपनी और मूल्यों के बारे में अधिक जानें' },
      { id: 5, title: 'सामान्य प्रश्न', description: 'अक्सर पूछे जाने वाले प्रश्न' }
      //..... other lang
      ]
      }
```

Live link : https://heyashu-react.netlify.app/multi-lang-support

Code Link: https://github.dev/ashumsd7/react-playground-2025/blob/main/src/pages/MultiLangSupport.jsx
