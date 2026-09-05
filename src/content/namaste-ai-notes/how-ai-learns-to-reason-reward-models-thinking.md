---
title: how-ai-learns-to-reason-reward-models-thinking
name: "How AI Learns to Reason: Reward Models & Thinking"
episode: 9
seasonNumber: 1
publishedOn: 09-05-2026
updatedOn: 09-05-2026
thumbnail: /images/namaste-ai/thumb_ai_ep-9.jpg
author: Ashutosh Anand Tiwari
tags: "#AI, #LLM, #ReasoningAI #RewardModel #MachineLearning"
profilePic: /images/blogs/pfp2.png
followLink: https://www.instagram.com/javascripterrr
---
Do you love philosophy? If yes, all good. If not, **kursi ki peti baandh lijiye**, kyunki **AI sochne wala hai** haha! 😄

Jokes apart, till now we have seen how a model gets data, **pre-training, training, post-training**, and so much more. Now let’s discuss this part.

When you ask AI, **“Can you explain quantum physics?”**, it can do that. If we ask it to **write a book about DNA science**, it might do that too. And when you ask it to add two numbers, it can also do that.

But some old models, if you asked them something very complicated, would fail and give you the wrong answer.

So the question comes:

**Are new AI models good at reasoning or thinking?**

We need to explore that.

Does **thinking** just mean reasoning?

If I ask you, **“Where would you love to go on vacation?”**, you may search your trip history. You may choose a place you have never visited, or a place you loved the most.

So, it is all reasoning. You take a decision based on your intelligence, and then you say you are thinking.

But the question is still open:

**Can we make AI do reasoning?**

**Can an AI model do reasoning?**

Scientists have done a lot of research on this and many things are still being explored.

For example:

**“Suggest a gift for your girlfriend?”**

Now think—how will AI decide what gift to suggest? 🤔

![](/images/namaste-ai/ss1-sp-9-nai.jpeg)

You will do so much reasoning and all. You will do proper research about what to do and how to do it. You will think about the back history, what she actually likes, and what will be useful or thoughtful for her.

You will not give her scissors or a knife, correct? 😄

So here the question comes:

**Can AI make thoughtful decisions?**

Till now, AI models mostly do direct generation. Their behaviour changes through fine-tuning and post-training, but the question is:

**What about reasoning-oriented generation?**

The way we do step-by-step thinking in multiple phases, can AI do the same?

And that is called **Reasoning-Oriented Generation**.

### Reasoning Oriented geneartion

**Reasoning-oriented generation** in AI means teaching computers to **think through a problem step-by-step before giving an answer**, rather than just guessing the next word based on patterns.

Instead of instantly giving a fast response, the AI can break a complex question down into smaller pieces, weigh different options, and check its logic along the way.

It is very similar to how a human solves a difficult math problem or a riddle by working through it step by step instead of shouting out a random guess.

This approach makes AI much better at handling tricky tasks like **coding, logic puzzles, research, and complex decision-making** because it prioritizes **accuracy and reasoning over pure speed**.

For example, if you ask a standard AI, **“If John has two apples, eats one, buys four more, and gives half to Mary, how many does he have?”**, a traditional model might instantly guess an answer based on similar math riddles.

A **reasoning-oriented AI**, however, will explicitly work through the steps first:

**John starts with 2 → eats 1 (leaves 1) → buys 4 (now has 5) → gives half to Mary (5 ÷ 2 = 2.5).**

So the final answer is **2.5 apples**, based on the calculation.

Or when you ask, **“A company grows its revenue by 20% and then loses 20%. What is the final change?”**

A general model might say **0%** because it sees +20% and -20%.

But a reasoning model will think:

**20% increase means 120% → then -20% means 80% of 120 → 96%.**

So the final revenue is **96% of the original**, which means there is actually a **4% decrease**.

Something like that. I think you are getting the things.

So, in some cases, a direct answer or direct generation helps us, but in some cases, we need to have **thought and reasoning** to answer something.

And this is done by a **Reasoning Model**.

### Reasoning Model

![](/images/namaste-ai/img-2-ep-9-nai.jpeg)

For the **direct generation problem**, thinking longer provides no meaning, but for **reasoning-oriented generation**, long thinking is needed because for that we need to understand the requirements, design an algorithm, consider edge cases, implement, run tests, debug, and if anything is wrong, then try again.

So, reasoning models attempt to bring more of this **deliberate computation into inference**.

In easy words:

**Reasoning models in artificial intelligence are advanced systems that pause to “think” and work through complex problems step-by-step before giving an answer.**

For debugging code, for example, if a line has an error, direct generation might say, **“Remove this line.”** But a reasoning model will think around that, check what is happening, consider the other parts of the code, and then tell you the answer.

Reasoning is also a form of generation, but it checks all aspects. No hurry.

There was one model launched that was a reasoning model, and a Chinese company launched **DeepSeek R1**.  [see paper here](https://arxiv.org/pdf/2501.12948)

![](/images/namaste-ai/ss-3-sp-9-nai.png)

Remember, **Reinforcement Learning is not a new concept**. It came far before and has been used in games like **AlphaGo**, and scientists were using it to explore multiple things.

And we already mentioned that in **2016, AlphaGo defeated an expert in this game**, and many more things. See, we have mentioned it here.

![](/images/namaste-ai/ss-4-alphago.png)

AlphaGo defeated him **4 times out of 5**, and AlphaGo was programmed using **Reinforcement Learning**. So, it is not a new topic.

The game was learning, and even nowadays countries are using AI in the military. See the news and research. The Chinese are developing AI robots that can take humans with some payload as well.

We were discussing the **DeepSeek reasoning model**, so a reasoning model thinks before answering directly.

See in the below screen, it is thinking and then answering.

Now you can chat with DeepSeek or any reasoning model UI, and you will feel the same.

Start [DeepSeek Chat here](https://chat.deepseek.com/)

![](/images/namaste-ai/ss-5-e-9-nai.png)

You can read this research paper as well
[Fine-Tuning Language Models from Human Preferences](https://arxiv.org/pdf/1909.08593)

[Training language models to follow instructions
with human feedback](https://arxiv.org/pdf/2203.02155)

### Google brain and Deep Mind

there are two  comanie sof google mreo focus on AI reseaches,. just remebr

**Google Brain and Google DeepMind were originally two separate, powerhouse artificial intelligence research teams owned by Google that officially merged in 2023 to form a single entity called Google DeepMind.**

Think of **Google Brain** (started in 2011) as the academic engine that focused on teaching computers how to learn like humans using massive amounts of data, which helped improve everyday products like Google Translate and Photos.

**DeepMind** (acquired by Google in 2014) was more like a grandmaster gaming lab focused on **artificial general intelligence**—creating systems that could master complex strategies and solve deep scientific problems from scratch.

### Chain of Thought

It refers to producing intermediate reasoning steps before arriving at the answer, same thing that we discussed before. It’s just a terminology, and it helps us solve complex tasks.

Read the [research paper here](https://arxiv.org/pdf/2201.11903).

Let me ask you a question:

**Q. A bat and ball together cost ₹100. The bat costs ₹100 more than the ball. Then how much does the ball cost?**

Guess the answer?

**10** is the answer?

Yes, you got it… hey, come on, man! 😄

It’s **₹5**.

Because if the ball costs ₹5, the bat costs ₹105, so together they cost **₹110**—wait, that doesn’t work.

So actually, if the total is ₹100 and the bat costs ₹100 more than the ball:

**Ball = ₹0**

**Bat = ₹100**

So the correct answer is **₹0**.

Haha, this is exactly why reasoning is important. 😄

```
Suppose the ball costs **x rupees**. 
The bat would cost **₹100 + x**, correct?
So the equation is:**x + (x + 100) = 110**
Here, **x** is the price of the ball, 
and **x + 100** is the price of the bat.
So:**x + x + 100 = 110****2x = 10****x = 5**
So the ball costs **₹5**.Maths is clear, but how is my mind still confused and giving me **₹10** only? 
```

> **Note:**
>
>  A model's intelligence is not determined only by how much computation was used during training. How much useful computation it performs while answering can matter too.

Nowadays, **post-training and reasoning models** are becoming major factors in the scaling dimension.

More tokens do not automatically mean more intelligence. For direct generation, there may be no need for long thinking, right?

But keep in mind, more thinking can increase the probability of getting the correct answer, **but it does not guarantee certainty**.

More thinking is also not infinitely useful. Recent research on reasoning models has observed **overthinking**, where increasing the reasoning budget beyond a useful point can produce diminishing returns and can even cause a model to abandon an initially correct solution.

### **Reinforcement from Verifiable Feedback/Reward (RLVF/RLVR)**

> **Note:**
>
>  Verifiable domains let us reward outcomes with much stronger signals than subjective human preference alone.

In other words:

**Reinforcement from Verifiable Feedback (RLVF)** is an AI training method where the model learns by trying to solve problems that have a clear, undeniable right or wrong answer.

Instead of relying on humans to read and judge the AI's response—which can be slow and subjective—a computer program or a strict set of rules automatically checks the AI's work.

If the AI gets the correct answer, it receives a digital **reward**, which teaches it to repeat that successful behaviour in the future. This makes the AI highly reliable for tasks that require absolute precision.

It means some results need human verification, but some do not.

For example, **5 + 5** is a verifiable task, but creating a travel itinerary is not. For verifiable tasks, humans are not required in the loop.

You remember **RLHF**, where humans give rewards and feedback. But in **RLVF/RLVR**, the result can be checked automatically.

A **chess game** is a verifiable task. Asking a **math question** is also a verifiable task. **Coding questions** can also be verifiable because we can run tests and check whether the code works.

General or subjective questions may need humans in the loop.

So remember:

**Subjective preference → Humans can evaluate → RLHF**

**Verifiable answer → Computer/rules can evaluate → RLVF/RLVR**

### Evaluators

There are three types of evaluators or judges:

**1. Deterministic Evaluator:** Gives an exact evaluation using things like an exact answer, compiler, unit tests, or schema validator. Best when possible.

**2. Human Evaluator:** A person inspects the answer. Useful when human judgment or expertise is required.

**3. Model Evaluator:** Uses another LLM to judge the output. This is called **LLM-as-a-Judge**.

**LLM-as-a-Judge** is a trending concept. You can learn more about how it works, research it, and get to know more about it.

There are also issues with using an LLM as a judge, like **biases**. For example, some models can show **position bias**, meaning the position of an answer can affect the judgment. There can also be other biases and reliability issues.

So, it has some advantages and some drawbacks as well. You can learn more online about how LLM-as-a-Judge works, what it favors, and its limitations.

### Tree of thoughst

Tree of Thoughts (ToT) is an AI problem-solving method where the artificial intelligence tests multiple reasoning paths at the same time, checks its own work, and backtracks if an idea fails—just like a human solving a hard puzzle. its just diff way of chain of thoughts, it just increase reasoning capabilties

### Graph of Thoughts (GoT)

Graph of Thoughts (GoT) is an AI reasoning method where an AI breaks down a complex problem into a network of interconnected ideas—represented as nodes and links—allowing it to mix, loop, and combine thoughts just like the human brain instead of thinking in a straight line. 

Note: Visible Reasoning is not necessarily faithfull.

### Limits of Reasoning Models

They can hallucinate, make arithmetic errors, misunderstand the problem, and make false assumptions, as we said.

And remember, **more thinking does not mean a guarantee of correctness.**

So, **Knowledge + Reasoning + Tools** are the three main factors that make everything possible.

We will learn about **Tools** very soon. 



### Before We Leave — Think About These Questions 🤔

1. Can a reasoning model still hallucinate?
2. Does more thinking always mean a better answer?
3. What is the difference between direct generation and reasoning-oriented generation?
4. What is Chain of Thought?
5. Why does a reasoning model need more computation during inference?
6. What is a Reward Model, and why is it needed?
7. What is the difference between RLHF and RLVR?
8. Why are some tasks easy to verify automatically while others need human evaluation?
9. What is LLM-as-a-Judge?What are the limitations and possible biases of using an LLM as a judge?
10. What is Reward Hacking?How is Goodhart’s Law related to Reward Over-Optimization?
11. Can an AI make a thoughtful decision without simply agreeing with the user?
12. Does reasoning mean that an AI actually “thinks” like a human?

**If more computation can improve reasoning, is there a point where thinking more actually makes the answer worse?**

Okay, that’s it for today. Keep learning, keep questioning, and keep thinking. 🧠

**See you in the next one. Bye! 👋🚀**
