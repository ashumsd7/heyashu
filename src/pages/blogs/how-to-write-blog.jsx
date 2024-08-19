import Markdown from "@/components/base/Markdown";
import BlogMetaInfo from "@/components/tech/notes-layout/BlogMetaInfo";
import Image from "next/image";
import React from "react";
// PASTE YOUR MARKDOWN HERE BELOW UNDER BACK TICKS
const markdown = `

## 🛠️ Step 1: Clone the Repository

Start by cloning this repository to create a Pull Request (PR):

🔗 [GitHub Repo](https://github.com/ashumsd7/ashu-new-portfolio-website.git)

## ✍️ Step 2: Write Your Blog in Markdown

Open [Notion](https://www.notion.so/) or your favorite markdown editor—whichever allows you to easily export markdown files.

In Notion, you can write your blog in a simple, structured way. You can add images, multiple headings, and more. Here’s a demo for reference:

🔗 [Demo Markdown](https://www.notion.so/Demo-Markdown-ba1bcecfb60149718cac95863d19789a?pvs=21)

Once you've signed up or signed in, write your title, description, and whatever content you want to include.


But if you wdont want to try Notion use one of these 🔗 [ Try these Markdown Editors](https://www.google.com/search?q=mardown+editor+.&sca_esv=95803ec0b5ee4893&sxsrf=ADLYWIJpd3ISqrMGnO36QNEyDku4j168Ag%3A1724061585348&ei=kRfDZoDmFMGZseMP4aK04Ac&ved=0ahUKEwjA8vXy5YCIAxXBTGwGHWERDXwQ4dUDCA8&uact=5&oq=mardown+editor+.&gs_lp=Egxnd3Mtd2l6LXNlcnAiEG1hcmRvd24gZWRpdG9yIC4yBhAAGA0YHjIGEAAYDRgeMgYQABgNGB4yBhAAGA0YHjIGEAAYDRgeMgYQABgNGB4yBhAAGA0YHjIGEAAYDRgeMgYQABgNGB4yBhAAGA0YHkihElDIB1jsDnACeAGQAQCYAaQBoAGZCKoBAzAuN7gBA8gBAPgBAZgCBaAC5QPCAgcQIxiwAxgnwgIKEAAYsAMY1gQYR8ICBhAAGAoYHsICCBAAGAoYDRgewgIHECMYsAIYJ5gDAOIDBRIBMSBAiAYBkAYJkgcDMi4zoAeDRA&sclient=gws-wiz-serp)
, or what ever you want in last we need a markdown text thats it

## 🚀 Step 3: Export Your Markdown
If you want to skip step 3 Keep your markdown handy by using your favrt markdown editor or use one of  [  these Markdown Editors](https://www.google.com/search?q=mardown+editor+.&sca_esv=95803ec0b5ee4893&sxsrf=ADLYWIJpd3ISqrMGnO36QNEyDku4j168Ag%3A1724061585348&ei=kRfDZoDmFMGZseMP4aK04Ac&ved=0ahUKEwjA8vXy5YCIAxXBTGwGHWERDXwQ4dUDCA8&uact=5&oq=mardown+editor+.&gs_lp=Egxnd3Mtd2l6LXNlcnAiEG1hcmRvd24gZWRpdG9yIC4yBhAAGA0YHjIGEAAYDRgeMgYQABgNGB4yBhAAGA0YHjIGEAAYDRgeMgYQABgNGB4yBhAAGA0YHjIGEAAYDRgeMgYQABgNGB4yBhAAGA0YHkihElDIB1jsDnACeAGQAQCYAaQBoAGZCKoBAzAuN7gBA8gBAPgBAZgCBaAC5QPCAgcQIxiwAxgnwgIKEAAYsAMY1gQYR8ICBhAAGAoYHsICCBAAGAoYDRgewgIHECMYsAIYJ5gDAOIDBRIBMSBAiAYBkAYJkgcDMi4zoAeDRA&sclient=gws-wiz-serp)

If you already have your markdown content ready, you can skip this step. Otherwise, if you’re editing in Notion, click on the top-right corner (the three dots \`...\`) and select \`Export\`.

Choose "Markdown and CSV" as the export format, then click \`Export\`. Copy the markdown text (if you downloaded a ZIP file, extract it first).

![image.png](https://i.ibb.co/8PH2vzK/export.jpg)
![image.png](https://i.ibb.co/YZqrQzH/export-2.jpg)





## 🔧 Step 4: Add Your Blog to the Repo

Now, return to the cloned repository and add a new object in the \`allBlogs.js\` file with your name and blog information.

You will need to add a \`route\` key in your object, as shown in other objects:

Here is the file route ( allBlog.js)

🔗 [allBlogs.js](https://github.com/ashumsd7/ashu-new-portfolio-website/blob/main/src/data/blog/allBlogs.js)

## 📝 Step 5: Create Your Blog Component

You’ve added a \`route\` key in your object, such as:

\`route: '/blogs/what-are-syntax-and-expressions-in-js\`

Next, create a new file in the  \`/pages/blogs/what-are-syntax-and-expressions-in-js.jsx\` folder with the same name as the route:

\`what-are-syntax-and-expressions-in-js.jsx\`

 paste this file code [https://github.com/ashumsd7/ashu-new-portfolio-website/tree/main/src/pages/blogs/demo-blog.js](https://github.com/ashumsd7/ashu-new-portfolio-website/tree/main/src/pages/blogs)/in to you created file , and rename the component if you wish:

I Hope you have pasted everything in your new created file..

./pages/blogs/your-route.jsx

 Your markdown will we pasted inside : const markdown = ' '

Replace the placeholder content with your markdown inside the backticks  and update the \`blogInfo\` object with your details.

Finally, create a Pull Request (PR) and wait for approval (this may take a few hours).
Once Your PR is merged Your blog will be live and you will be informed by Whatsapp or Email.
Just Drop a message here after crating PR
[After PR Inform me  merge PR](https://topmate.io/aat/1148709/pay) **



## 🙏 Thank You!

### **If you have any questions, feel free to ask here for free: [Click to ask any question......and get reply in 5mins](https://topmate.io/aat/1148709/pay)**`;

// change your name
const blogInfo = {
  name: "Ashutosh Anand Tiwari",
  timeRead: "0",
  lastUpdated: "-",
  publishedOn: "19 Aug 2024",
  timeRead:'2',
  title: "How to Write a blog?",
  followLink: "https://github.com/ashumsd7/",
  heroImage: "",
  profilePic: "https://avatars.githubusercontent.com/u/40313523?v=4", // copy this from github or your favrt photo
};


console.log("markdown",markdown);
function HowToWrite() {
  return (
    <div className="flex flex-col gap-5 px-2">
      {/* Blog Title */}
      {blogInfo?.title && (
        <h2 className="text-black lg:text-6xl text-4xl  font-bold  lg:mb-2   mr-14">
          {blogInfo?.title}
        </h2>
      )}
      {/* Blog Hero Image */}
      {blogInfo?.heroImage && (
        <Image alt={blogInfo?.title} src={blogInfo?.heroImage} fill />
      )}
      {/* Blog Meta Info */}
      <BlogMetaInfo data={blogInfo}  />
      {/* Main Blog Content */}
      <Markdown content={markdown} />
    </div>
  );
}

export default HowToWrite;
