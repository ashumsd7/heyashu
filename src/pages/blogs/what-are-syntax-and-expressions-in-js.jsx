import Markdown from "@/components/base/Markdown";
import BlogMetaInfo from "@/components/tech/notes-layout/BlogMetaInfo";
import { estimateReadingTime } from "@/utils/functions";
import Image from "next/image";
import React from "react";
// PASTE YOUR MARKDOWN HERE BELOW UNDER BACK TICKS
const markdown = `

Syntax, Expression, and Statement in JavaScript
=================================
![image.png](https://i.ibb.co/SB3Ts52/ex1.jpg)
### How do we communicate?



As we know, when developing something, we write code. When we want a computer to perform a task, we give it instructions. For example, if you want to use the calculator on your computer, you open the app and type something like \`2 + 2\`, and the system will give you the output \`4\`. This means you have given an instruction to the computer, and it has provided you with the output.

Now, lets discuss more about the instructions you provide to computers or any software. Generally, we communicate with someone in a language they understand.

For instance, if you meet a Chinese person and start speaking in Tamil, will they understand? The answer is NO.

![image.png](https://i.ibb.co/WGg3T42/ex2.jpg)

Similarly, when you write \`2 + 2\` in your system, does the system understand it directly? The answer is also NO.

So, how is it possible for a Chinese person to understand Tamil or for your system to understand \`2 + 2\`?

The first thing that comes to mind is that you need some kind of mediator or translator who translates Tamil into Chinese and \`2 + 2\` into a language that the computer can understand.

Here comes the role of Compilers/Translators, which translate one type of input into another type of instruction so that the target person/system can understand.

![image.png](https://i.ibb.co/8rFR7vK/ex3.jpg)

But there's one more thing we have to notice. Guess what?

The input you are giving, whether it's Tamil or \`2 + 2\`, should follow some rules. Otherwise, your translator will be confused, right?

That's why the language you're writing or speaking should also have some rules. Isn't it?

So, you have already got the definition of syntax.

### Syntax

The rules of valid format and combination of instructions in a computer language are called syntax.

### Statement

In the English language, as you know, a statement is a group of meaningful words. Similarly, in computer language, a statement is a group of words, numbers, and operators (like \`+\`, \`-\`, \`/\`, \`*\`) that perform a specific task.

\`\`\`
a = b * 5;    // is a statement

// where = and * are operators
// a and b are variables
// 5 is a literal value or fixed value

\`\`\`

### Expression

If you want to remember this forever, here's a trick for you: "E" comes before "S" in the alphabet. So, statements are made from one or more expressions.

An expression is just a variable, a value, or a combination of both.

\`\`\`
2 is : literal value expression
b is  : variable expression
b * 2 : arithmetic expression
a = b * 2 : assignment expression

\`\`\`

We will discuss more on Function Expression and Declaration in the next blog.


Be healthy and keep smiling. Bye-bye 👋!



`;

// change your name
const blogInfo = {
  name: "Ashutosh Anand Tiwari",
  timeRead:estimateReadingTime(markdown) ,
  lastUpdated: "-",
  publishedOn: "22 Aug 2024",
  title: "Syntax, Expression, and Statements",
  followLink: "https://github.com/ashumsd7/",
  // heroImage: "https://i.ibb.co/6J0L7vT/statement.jpg",
  profilePic: "https://avatars.githubusercontent.com/u/40313523?v=4", // copy this from github or your favrt photo
};

function DemoBlog() {
  return (
    <div className="flex flex-col gap-2 px-4">
      {/* Blog Title */}
      {blogInfo?.title && (
        <h2 className="text-black lg:text-6xl text-2xl font-bold  mb-2   mr-14">
          {blogInfo?.title}
        </h2>
      )}
      {/* Blog Hero Image */}
      {blogInfo?.heroImage && (
        <Image alt={blogInfo?.title} src={blogInfo?.heroImage} fill />
      )}
      {/* Blog Meta Info */}
      <BlogMetaInfo data={blogInfo} />
      {/* Main Blog Content */}
      <Markdown content={markdown} />
    </div>
  );
}

export default DemoBlog;
