---
title: how-llms-work-transformers-attention
name: "How LLMs Work: Neural Networks, Transformers & Attention Explained"
episode: 6
seasonNumber: 1
publishedOn: 08-25-2026
updatedOn: 08-25-2026
thumbnail: /images/namaste-ai/banner-e-6.jpg
author: Ashutosh Anand Tiwari
tags: "#LLM #Transformers #Attention #GenerativeAI #AI"
profilePic: /images/blogs/pfp2.png
followLink: https://www.instagram.com/javascripterrr
---
So as we know, we are very smart, haha. Humans are smart, right? But how do we do things smartly? What do we use? Our mind, correct?

Correct. Now the question comes: machines are also becoming smart, isn’t it? And so, it’s all possible because of the computational mind of the machine or computer, and that is the **Neural Network**.

Now let’s understand with an example: **The Pizza is \_\_\_\__**. So the next words can be anything: **hot, cold, delicious, round, tasty**, etc. So which next word should come? That the neural network decides, and it’s the responsibility of the neural network. The way our brain decides, in the same way the AI model's neural network decides the next word.

So when a sentence comes as input, that is broken into tokens, and those tokens are converted into embeddings. That array of embeddings is input into the neural network to get the next word.

 

![](/images/namaste-ai/img-1-ep-6.png)

As you can see in the above, all embeddings go as input into the neural network, and the next word is decided by the brain-like neural network. But how is the word decided? It’s all the work of the neural network. Let’s dig deep now into how words are decided.

 

![](/images/namaste-ai/imag-2-ep-6.png)

Image ref: <https://www.orangecyberdefense.com/global/blog/innovation/3-of-5-forging-forward-with-genai>

So, the next generated word, including the sentence, is input into the neural network again as embeddings, so it guesses the next word. And it keeps going until it finishes. But when it ends, it all depends on the termination logic written in the LLM. A special end-of-sequence token can be used to stop generation; there can also be other stopping conditions. This is how, on top of the definition and explanation, the neural network is like a brain that decides the next word.

## GPT in ChatGPT

The full form of GPT is **Generative Pre-trained Transformer**. What is this? So remember, it is always **Generative Pre-trained Transformer**.

What is Generative? It generates, it does not do retrieval. I mean, based on its knowledge, it generates. Ye ratta nahi marta, wo rattu tota nahi hai, ye sab samajh ke hume jawab deta hai.

Pre-trained means it is already trained, but what is this Transformer? And this is what is the real hero.

So, the Transformer is the main architecture that runs behind the neural network. Before it, different types of algorithms were being used, but after 2017, Google introduced the Transformer architecture through the research paper **`Attention Is All You Need`**, and that transformed everything.

> A Transformer in artificial intelligence is 
>
> **a type of neural network design that reads entire sentences or blocks of data all at once instead of word by word**
>
> . It powers modern AI tools like ChatGPT, Claude, and Gemini.

A Transformer is a type of architecture designed to process sequences of information using attention. It was introduced in 2017. Before Transformers, RNNs and LSTMs were being used.

The heart of the neural network is the **Transformer**, and the heart of the Transformer is **Attention**.

Attention Is All You Need PDF link:

<https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf>

By the end of all our learning, I hope we will be able to understand whatever is written in the Transformer architecture research paper, so fingers crossed. :)

Down, I have listed the author names of this paper.

**Ashish Vaswani**<https://www.linkedin.com/in/ashish-vaswani-99892181>
[avaswani@google.com](mailto:avaswani@google.com)

**Noam Shazeer**<https://www.linkedin.com/in/noam-shazeer-73238914>
[noam@google.com](mailto:noam@google.com)

**Niki Parmar**<https://www.linkedin.com/in/nikiparmar>
[nikip@google.com](mailto:nikip@google.com)

**Jakob Uszkoreit**<https://www.linkedin.com/in/jakob-uszkoreit-6b586071>
[usz@google.com](mailto:usz@google.com)

**Llion Jones**<https://www.linkedin.com/in/llion-jones-06752011>
[llion@google.com](mailto:llion@google.com)

**Aidan N. Gomez**<https://www.linkedin.com/in/aidangomez>
[aidan@cs.toronto.edu](mailto:aidan@cs.toronto.edu)

**Łukasz Kaiser**[https://www.linkedin.com/in/łukasz-kaiser-6091391](https://www.linkedin.com/in/%C5%82ukasz-kaiser-6091391)
[lukaszkaiser@google.com](mailto:lukaszkaiser@google.com)

**Illia Polosukhin**<https://www.linkedin.com/in/illia-polosukhin-77b6538>
[illia.polosukhin@gmail.com](mailto:illia.polosukhin@gmail.com)

Note: GPT is nto relate dot the chatgpt all mdoel are gpot mdpel (and hasngenertive pre tarioned trsnaformer in it, oepnAI was the firts movers sp to hat name dthoirer assiatnt as chatgpt , thats it,.

## Attention is all you need!

Let’s do some attention to the name of the research paper. What is attention here? Why was this word used?

Attention means, from the given query, which words it needs to pay more attention to and how much?

So, in easy words, **Attention** in Artificial Intelligence (AI) is **a tool that helps computer models focus on the most important parts of data while ignoring the rest**.

For example: **The cat sat on the mat because it was tired.** We will discuss this next, but let’s learn one more terminology: **Self-Attention**.

Self-attention is **a method that helps an AI understand the meaning of a word in a sentence by looking at all the other words around it at the same time**. It comes from the famous 2017 research paper titled **"Attention Is All You Need"** by Google researchers. This paper introduced the **Transformer** model, which is the foundation of modern AI tools like ChatGPT.

So, in the above example, each token in the sentence looks at the other tokens in the same sentence to understand the relationship. Like the word `it` is more related to the `cat`, and this is called self-attention.

And what is magic in this? The magic is that before this Transformer in 2017, this revolution was not there, and relationships were missed with RNNs and other methods that were used in neural networks.

I hope I’m making you understand now!

 

![](/images/namaste-ai/img-3-e6.png)

o see the above image, you can see the LLM's neural network structure. And when a token is embedded into the Transformer, before that all words are converted into tokens, and then embedding happens. After token embedding, positional embedding happens, and token embedding + positional embedding get passed to the Transformer as input to predict the next word.

**Token Embedding + Positional Embedding ⇒ goes to Transformer as input**, and all mathematics happens. So, in the Transformer, the next thing that happens is **Layer Norm**, aka **Layer Normalization**.

### Layer **Normalization**

Layer normalization (LayerNorm) is a technique used to keep the numbers flowing through a neural network at a more stable scale. So, in mathematical operations, numbers can become very large or very small, and calculations can become complex. Normalization happens to make it easier and more efficient, and this is what normalization is called **LayerNorm**.

Layer normalization is a tool in **Transformer AI** that **keeps numbers stable so the model can learn smoothly**.

**What is Layer Normalization?**

**The Problem:** As data moves through a Transformer, the numbers (called weights or activations) can become too big or too small.

**The Fix:** Layer normalization fixes this by adjusting the numbers inside each separate layer so they have a **mean (average) of 0** and a **variance (spread) of 1**.

**The Goal:** It stops the network from breaking or learning too slowly.

So the question is: **When normalization happens, does the model lose the memory?** This is an open question. Go and do the research. \[Answer you write here]

**Next step is Attention**

### Attention

Before explaining this, I will tell you that this word is also known by multiple names, like **Multi-Head Attention, Masked Attention, Causal Self-Attention, and Attention**.

We learned about self-attention. What is that? Let’s re-learn.

Self-attention is **a method that helps an AI understand the meaning of a word in a sentence by looking at all the other words around it at the same time**. It comes from the famous 2017 research paper titled **"Attention Is All You Need"** by Google researchers. This paper introduced the **Transformer** model, which is the foundation of modern AI tools like ChatGPT.

If you see the above image, below the Layer Norm, **Multi-Head Attention** and **Causal Attention** are also written. So, let’s discuss what that is.

### Masked / Causal Selft Attention

So AI checks the previous words. So, in easy words, I summarize:

**Masked** means hiding parts of the sentence.

**Causal** means causes come before effects (the past leads to the future).

Masked self-attention blocks the AI from seeing future words. The AI can only look at words that came *before* the current word.

A token can look at itself and the tokens before it, but never the future tokens. **Causal** is important because information is only allowed to flow in one direction: **past to present**.

### Multi-head

Lots of parallel processes are running to do the self-attention block or part, and this is called **Multi-Head Attention**.

**Multi-head attention** is a core part of modern **AI models** like ChatGPT that **lets the computer look at many different things in a sentence at the same time**.

Or,

**Multi-head causal self-attention** allows every token to gather information from previous tokens using multiple attention heads, while preventing it from looking into the future.

### Residual /Skip connection

Instead of completely replacing the old information with the output of a layer, we add the original input back to the layer's output. See the above image, and the `+` icon and arrow come and attach from the top.

A **residual connection** (also called a skip connection) is a direct shortcut in an AI model that lets input data bypass a processing layer and add itself to the layer's output.

So, for example, `x = [1, 2, 3]` was there, and after one layer of attention, it becomes `Attention(x) = [.2, -.5, .7]`. Now, instead of passing this forward, we add the original input:

`x + Attention(x)`

giving the result as `[1.2, 1.5, 3.7]`.

You can think of each layer as adding a useful update rather than rebuilding the entire representation from scratch.

A Transformer layer does not throw away what it already knows. It learns an update and adds that update on top of the existing representation.

And then **Layer Norm** happens, and then **FFN (Feed-Forward Network)** happens.

### Feed Forward Netword (FFN)

As we know, during self-attention, tokens interact with each other, right? Like if I’m sitting on the bank of a river, **bank** finds its meaning after looking at the other words. But during FFN, each token is processed independently.

**Attention lets tokens communicate, FFN lets each token think/process what it learned.**

A Feed-Forward Network (FFN) is **a key building block inside a Transformer AI model that processes information and helps the AI think more deeply about the meaning of words after the attention step**.

 

![](/images/namaste-ai/img-4-ffn-e6.jpg)

See the above image. The hidden layer is the FFN that tweaks the output embedding after an attention phase.

I don’t know much; I’m learning and writing these lines. Maybe in the future, I will learn more and rewrite or change it. So, dear reader, it’s your responsibility. Please be curious and edit or update the notes if required, and keep learning.

Okay, so after FFN, **normalization** happens, and then the final steps, **Linear and Softmax**, take place. Let’s learn that.

### Linear and Softmax

So what the words are likely to be as the result and prediction, those words with their embedding values get a percentage kind of probability. So suppose the new words **cat, dog, car, and pizza** are finalized, so these will get a percentage of probability. The highest one gets the entry as the result, the predicted word.

> A 
>
> **linear layer**
>
>  in a Transformer AI acts like a math machine that changes the size and shape of information, while a 
>
> **softmax layer**
>
>  acts like a referee that turns raw numbers into percentages that add up to 100%.

As a user of AI, I know this becomes complicated for you, but if you love maths and research and all, you can go and research and learn how the formulas are used to make this possible.

Now it’s time to learn and visualize these mathematics. Let’s visit this website: <https://bbycroft.net/llm>

 

![](/images/namaste-ai/img-5-e6.png)

If you open the website, you will see the same image, and you can use it to visualize each step we discussed till now. I know it’s tough, and it was tough for me too. Still, I’m not able to understand so many things, so we need to slowly adapt to these things and all.\
Read this also : https://github.com/karpathy/nanogpt

That’s all for today. Next, we will try to understand how models get trained. Happy learning! Bye-bye! 👋
