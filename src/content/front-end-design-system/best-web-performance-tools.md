---
title: Best Web Performance tools
name: Best Web Performance tools
episode: 13
publishedOn: 02-13-2025
updatedOn: 02-13-2025
thumbnail: /public/images/blogs/performance-testing_1.jpg
author: Ashutosh Anand Tiwari
tags: front-end-design-system
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
**If something works on my system, it doesn't mean it's good for all. So, to know whether it's good or not up to the mark for everyone, we need some tools to test our website. So, let's talk about those.**

There are three personas while discussing web pages and their construction:

1. Developer mode
2. Simulated Environment
3. Real user data

### For Real-Time Users

For real user data, we can use **CRUX** of Chrome. Read here: **[Overview of CrUX](https://developer.chrome.com/docs/crux)**. It's basically Chrome’s user experience report, showing how real Chrome users experience a website. PageSpeed.web also comes under that, which can be used to analyze all web vitals for a web page: https://pagespeed.web.dev/.

Other tools:

* [Request Metrics](https://app.requestmetrics.com/app/) – You can use Request Metrics by injecting the script provided by them into your system to check performance.
* **Microsoft Clarity** – Another tool that can be used to check page-wise core vitals, error tracking, and much more.
* **New Relic**
* **Sentry**
* **Google Analytics**

### For Simulated Data

To test simulated data, there are many tools available to analyze your website:

* **[WebPageTest](https://www.webpagetest.org/)** – A great tool to get detailed data from different locations far from you.

![image.png](/public/images/blogs/performance-testing_2.jpg)

### For Developer mode

\-Lighthouse

![image.png](/public/images/blogs/performance-testing_3.jpg)

\-Netwrok tab
In **Dev Tools**, under the **Network** tab, you can see what is loading and when.

![image.png](/public/images/blogs/performance-testing_4.jpg)

\-Performance tab
We can also tweak the **Performance** tab to check things in detail.

![image.png](/public/images/blogs/performance-testing_5.jpg)

**Note:** Please test your web apps in **incognito mode**.

Always **dock out** your dev tools to test in full viewport.
