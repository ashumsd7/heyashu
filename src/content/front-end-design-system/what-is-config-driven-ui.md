---
title: What is Config Driven UI
name: What is Config Driven UI
episode: 18
publishedOn: 02-16-2025
updatedOn: 02-16-2025
thumbnail: /public/images/blogs/conmfig_1.png
author: Ashutosh Anand Tiwari
tags: front-end-design-system
profilePic: https://i.ibb.co/v71k25N/pfpppp.png
followLink: https://www.instagram.com/javascripterrr
---
### Config-Driven UI

If a website runs globally but needs to show an ad campaign only in India, we use **Config-Driven Design**. This approach relies on a **JSON file** that defines the page layout and elements dynamically.

When the page loads for the first time, an API call fetches the config file, which determines how the **HTML structure** and content should be displayed. The order of elements and layout is controlled by this config.

📌 **Config ⇒ Defines the webpage layout**

📌 **Also known as Dynamic UI**

For example, **Swiggy** loads content dynamically based on the user’s location.

![image.png](/public/images/blogs/confog-2.png)

So basically, when **Swiggy** loads, it calls an API that returns a **config file**. This config defines how the page should look, including the layout and content, based on the user's location.

```jsx
fetch("https://www.swiggy.com/mapi/misc_new/skeleton?lat=28.4594965&lng=77.0266383");
```

Result Config

```jsx
{
    "statusCode": 0,
    "skeleton": {
        "statusMessage": "done successfully",
        "cards": [
            {
                "card": {
                    "card": {
                        "@type": "type.googleapis.com/swiggy.gandalf.widgets.v2.SearchBar",
                        "placeholder": "Search for restaurant, item or more",
                        "cta": {
                            "link": "swiggy://explore?keyboard=true",
                            "type": "DEEPLINK"
                        },
                        "height": 56
                    }
                }
            },
          ............
```

And based on the **config**, it renders the page. This is also known as **Backend-Driven UI** or **Server-Driven UI**.

### **Importance of Config-Driven UI**

* **Customizable**
* **Multiple UI variations based on location**
* **Better UI management**
* **No frontend code changes required**

You need to answer this way and keep these points in mind for **Config-Driven UI** before designing an application.
