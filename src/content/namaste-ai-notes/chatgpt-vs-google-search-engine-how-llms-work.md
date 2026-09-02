---
title: chatgpt-vs-google-search-engine-how-llms-work
name: "ChatGPT vs Google: How LLMs Actually Work — Training, Inference,
  Hallucinations & RAG"
episode: 3
episodeTitle: " Does ChatGPT Know or Does It Guess?"
seasonNumber: 1
publishedOn: 08-19-2026
updatedOn: 08-19-2026
thumbnail: /images/namaste-ai/banner-0-e3.jpg
author: Ashutosh Anand Tiwari
tags: "#ChatGPT #LLM #GenerativeAI #AI #GoogleSearch #MachineLearning
  #ArtificialIntelligence #RAG #AIExplained #LLMs"
profilePic: /images/blogs/pfp2.png
followLink: https://www.instagram.com/javascripterrr
---
Have you ever thought about where ChatGPT gets answers for us? Let’s do an operation of ChatGPT and LLM. Let’s see whether ChatGPT knows everything, does it live search, or is it just a guess? Is it artificial or synthetic? Now people are moving from Google Search to ChatGPT. Is there any chance of misinformation? What’s the difference between Google Search and ChatGPT? We will explore everything here. Here we go.

In ChatGPT, nowadays people are using it more than Google because it gives us direct answers without going to separate pages, where our tab was getting filled and the computer was getting slowed. We remember those Stack Overflow days.

Okay, back to ChatGPT. You can ask anything to ChatGPT, and it will answer if that question does exist. If suppose anything doesn’t exist, it will simulate that thing exists somewhere. You will not get proof of that. The same question, if asked in Google Search, See the image for reference.

![](/images/namaste-ai/naie3img2.png)

Now the question is, Google Search is kind of filtered results, but GPT is giving us a ready-made answer created by itself. The question is why and how this happens. We will discuss it all.

### When we search on Google

When we search on Google, Google takes the question, searches in its index, and ranks relevant documents and returns the result.

Now the question comes, what is an index? Index is nothing, just a book content list. When you want to read something, you go and search in the index instead of going through the entire pages. So index is just a reference of webpages.

This is how Google works normally when you search.

### When we prompt on ChatGPT

So when we put a prompt in ChatGPT input, ChatGPT has an encyclopedia of knowledge. It has learned patterns and knows all that the content contains, and based on the prompt, it will provide a response that is developed by some other pattern. No, ChatGPT will provide you its own version of the answer, with reference if needed. But it is something like if you have read your book or you watched the movie Bahubali, if someone asks why Katappa killed Bahubali, you will go and remember the movie content and you will give your generated answer, not exactly what happened at that time.

So summary is, ChatGPT has learned some pattern, and it generates an answer for you. Google, whereas, searches on the index and retrieves the answer.

I think informally it’s clear now. It’s all about Retrieval vs Generation. Having an answer as “I don’t have this answer” is possible for Google to answer, but ChatGPT will not do this. It can generate some random thing.

### What is Google  indexing

![](/images/namaste-ai/gogoel-index-3.png)

Google indexing is **the process where Google stores and organizes data from web pages into a massive digital database**. When you look for something online, Google searches this database instead of the live internet. But how does Google manage things with the vast amount of internet data? So Google has a concept of crawlers or spiders. Actually, this is with all search engines, and it keeps searching all databases across the internet and keeps the index list updated. So if something we search for has just happened 1 min ago, we will get the result on Google because Google spiders have already crawled it in seconds, and that index is top-ranked, and that’s why we get the result in Google Search.

Now the question is, does the crawler rank everything? The answer is no, because there are various rules for crawlers to identify a webpage, like Domain Authority, page speed, keywords, average time spent (retention), backlinks (other sites giving a reference to your website), meta tags, date, and SEO things. Google’s algorithm for this task is not open source; that’s private, and these regular best practices are used to make that possible.

Let’s discuss some more facts about Google vs LLMs.

Search engines don’t guarantee the truth. They can be outdated, and rankings can be imperfect. The relevant information can come as the 4th result, and some irrelevant results can come on top, and that leads to misinformation. But there are positives also. We can check the website from where this information came. Now suppose a new channel XYZ posted something new, and if you don’t love that website, you can ignore it, because the result which is on Google is from some website only.

Let’s discuss LLMs in a shorter time. Here we can’t see the source unless we ask. We can’t see the data or information because it’s generated, so the information can be misleading.

### How LLMs generate responses?

As we discussed before, LLMs predict and generate. So when we ask anything, it sees the possible words and content that can be replied.

So for example:

**The sun rises in...**

So what could be the next word? Like here, **the east**. So it connects the words. How is it generating? Where does it get the words?

Like **Roses are \_\_\_\__**, beautiful, red, blue, etc. Based on the training of the specific model, it will generate the word. It’s a guess based on learning from data. It’s kind of autocomplete in a smarter way, where which word will fit in automatically is all about the probability of the next word. We’ll discuss that later in depth.

To add more things, LLMs are trained with multiple languages, grammar and rules, reasoning facts, stories, associations between places, events, and ideas.

### What Knowledge Does LLM Contain?

It’s all trained on a neural network that contains a very large collection of numbers called parameters or weights. All the companies scrape internet data, they read all the data present on the internet, and that forms a pattern, and that helps us get the result.

It’s not that simple, I am saying that. A lot of patterns form, and many complicated algorithms work behind the scenes.

So when we say **Rose**, the combination of words comes as a prediction: beautiful, red, blue, etc. So it’s all based on patterns and probability scores.

### Knowledge cutoff

![](/images/namaste-ai/cutoffimg4.png)

Every LLM has a knowledge cutoff date. Now, I mean LLMs are not trained every day, so the data is trained on data that is still available up to a certain date.

The question comes: till what date is it trained? All LLM models tell that in their documentation.

But why then does it provide us with current knowledge? These open questions come to us, so we will discuss that too later.

But remember, training with data is a complex thing and is price-heavy, so that’s why it comes with a knowledge cutoff.

### Base Model

When a new model is trained to predict, a base model is created by a company. A base model is the model that predicts the next token or word.

A **base model** of an LLM is **the raw, core artificial intelligence**. It has read massive amounts of text from the internet, books, and articles. Its only actual job is to guess the next word in a sentence. Think of it as a giant, highly advanced autocomplete tool, but it is not yet trained to act like a helpful chat assistant. Read this: [https://toloka.ai/blog/base-llm-vs-instruction-tuned-llm/](https://toloka.ai/blog/base-llm-vs-instruction-tuned-llm/)

So when we see modern ChatGPT, it is built on top of a base model, which has so much more access and is super-powered. So, on top of the base model, things like tool access, human feedback, security/auth, web search, guardrails, content filters, conversation management, system instructions, etc. are added, and it becomes an AI assistant like ChatGPT, Grok, Claude, and Gemini.

The job of the base model is to predict the next text, nothing more than that. So ChatGPT and all of these are built on their base models. The base model is not restricted, so you can ask anything without filters. That’s why companies never expose the base model directly. But there are some which are open source; check them, you will find some.

So, taking an example: **Car is ChatGPT and Engine is the base model.**

See the companies and their base model names:

**OpenAI:** GPT-5, GPT-4o, o1, o3 (Reasoning)

**Anthropic:** Claude 4, Claude Sonnet 4.6, Opus

**Google:** Gemini 3, Gemini 2.5 Pro, Gemma 3 (Open weights)

**Meta:** Llama 4, Llama 3.1 (Open weights)

**DeepSeek:** DeepSeek-R1, DeepSeek-V4 (Open weights)

**xAI:** Grok 3, Grok 4.3

**Alibaba:** Qwen 3.5, Qwen3

**Amazon:** Nova (Pro, Lite, Sonic)

### Inference vs Training

![](/images/namaste-ai/gogoel-index-5.png)

This is one of the more terms people use so much, and let’s see how it is different from training.

Inferencing is something that happens after training. When we ask a prompt to an LLM model, the process of giving me an answer back is called inferencing. The process of inferencing is giving you an answer.

In easy words, **training and inferencing are the two main steps in how artificial intelligence works. Training is the school phase where the AI studies huge amounts of data to learn rules and patterns. Inferencing is the working phase where the ready AI uses that knowledge to answer questions or make real-world decisions.**

### Why models are fake fluent?

Do you remember in our life we have a proverb: `Tez bolne se koi baat sahi nahi ho jati.`

Same applies here. When LLMs respond to something confidently, it does not mean it is correct. So fake fluency is not truthfulness, and this is called hallucination.

An AI hallucination is **when an artificial intelligence makes up information and presents it as a hard fact**. The AI is not trying to lie; it just guesses the next best word to complete a sentence, sounding very smart and confident even when it is totally wrong.

That’s why we say medicine and all should not ask ChatGPT and believe it. When we ask the Gemini voice agent, it says, “I’m not a doctor,” so it’s an assistant, not a doctor. Remember, language quality and factual accuracy are separate dimensions.

But why does this hallucination occur? What is the reason? That is because of insufficient knowledge. The reason can also be ambiguous information, no new data, false assumptions, unreliable patterns, and models being optimized to answer. It can create an elephant with two legs because it’s optimized to answer.

Some base models sometimes will not give me the right answer, like math problems, but ChatGPT, the instruction-tuned model, will give you the proper answer.

As we discussed, models are optimized to answer, but sometimes it will not answer you and will say, “I don’t know.” There might be questions that lead the model to answer “I don’t know.” Like if you say, “Which React course does Ram Lal from ABC District teach online?” then it will not answer you. It will say, “I don’t have reliable information about this.”

So there are different reasons: weak pattern systems, instruction, tool requirements, prompt wording, etc. These all can lead to the model not answering instead of providing an optimized answer.

### Confidence as evidence

Humans often use tone as evidence. Sometimes we say, “This answer is XYZ, not ABC,” then the answer is definitely XYZ. When someone is very rigid and confident, we think the answer is correct. Don’t connect this with any politician.

`Confidence as evidence` means an AI uses how sure it feels about an answer to decide if that answer is true. If the AI is very sure, **it treats its own guess** as proof.

How can we remove this wrong confidence? Ask for proof, ask for the source of the response, say, “Only answer if you are sure,” and ask for uncertainties. Then the LLM may say, “Yes, that was wrong,” etc. This is one way to reduce overconfident answers, but it doesn’t guarantee correctness. Using grounding and allowing web search can provide external evidence to verify the response.

### How tools extends the model?

See, tools are like **superpowers** for LLMs. They can be used for custom use cases and make all kinds of things possible, for example, tool calling, your own API, your own database, email, calendar, location, weather, code execution, internal documents, files, and many more.

Because without tools, the LLM does not have access to your files, your location, your emails, your database, etc. So, for a personal assistant to actually be useful for a particular user or group, **tools are required**, and that makes the LLM much more powerful.

So, if you see, when we mix **web search + LLM**, it becomes more powerful. Retrieval provides **external evidence**, and generation gives you a beautiful, natural-language answer. This combination is called **RAG — Retrieval-Augmented Generation**.

So this is one of the most important concepts for personal work and real-world AI applications.

### Does the mode have self awareness?

Yes, some information you can get: number of parameters it is trained on, knowledge cutoff, where it is deployed, who owns it, and all the other information we should know can be answered by ChatGPT or any LLM.

But it’s not fully self-aware, so when you ask anything, there are a few sources it can have:

1. Training dataContextSystem prompt / instructionsTools

So the source can be training data, on which it is already trained; context, which is what we are discussing; system prompt, which tells it what we ask and how it should behave; and tools, which are like superpowers.

These are what can turn an LLM into a more capable, instruction-tuned assistant instead of just a base model. The model itself generates based on the information available in its current context; tools and external data can provide information or actions that are not inside the model's training data.

Okay, that’s all about the basic terminology and how LLMs are different from Google and Search. We will also go deep and learn more about this.

So, stay with me. Have a good learning. Signing off. Bye-bye. Share with your friends. Thank you
