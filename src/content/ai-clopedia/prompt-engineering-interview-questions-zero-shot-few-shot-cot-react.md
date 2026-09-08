---
title: prompt-engineering-interview-questions-zero-shot-few-shot-cot-react
name: "Prompt Engineering Interview Questions: Zero-Shot, Few-Shot, CoT, ReAct &
  More"
episode: 1
category: Prompt Engineering
publishedOn: 09-08-2026
updatedOn: 09-08-2026
thumbnail: /images/ai-clopedia/ropmtttt.jpeg
author: Ashutosh
tags: "#PromptEngineering, #GenAI , #LLM,  #ArtificialIntelligence,
  #MachineLearning, #AITips"
followLink: http://x.com/javascripterrr
profilePic: /images/blogs/pfp2.png
featureAsBlog: true
---
### What is Prompt Engineering?

- Directly used by end users.
- If LLM understands human language, then why do we need to learn how to interact with LLM?
    - Because **best input gives best output**.
- **Prompt Engineering** is a way of guiding the LLM to respond properly.
    - It is the art and science of crafting effective inputs (called prompts) to guide an LLM or other GenAI model to produce desired, accurate, and relevant output.
    - It’s about optimizing communication between human and AI.

### Types of Prompt Engineering Techniques

1. Zero-shot prompting
2. One-shot prompting
3. Few-shot prompting
4. Role-play prompting
5. Chain of Thought (CoT) prompting
6. ReAct prompting (Advanced technique)
7. Meta prompting (Advanced technique)
    
    *(and constantly evolving...)*
    

### 1. Zero-Shot Prompting

- Direct question to a model without any example or format.
- Used when you expect a direct answer from the LLM.
- **Example:** *"Who is Modi ji?"*

### 2. One-Shot Prompting

- Where you provide both the question and answer, showing a format or pattern.
- **Example:**
    - **Q:** What is 2 + 2?
    - **A:** The answer is 4.
- So next time it will answer in the same way:
    - **Q:** 4 + 3
    - **A:** The answer is 7 *(followed the format)*.

### 3. Few-Shot Prompting

- Extension of one-shot prompting where you provide more than 1 example.
- Used when various cases need to be considered.
- **Example:**
    - *"The movie was good"* → Positive
    - *"I was sad"* → Negative
    - *"Weather?"* → Neutral

### 4. Role-Play Prompting

- Introducing the model to adopt a specific persona or role.
- Useful when the task is complex and a specific role can help.
    - Want to know about a dish → Chef persona
    - Need customer support → Customer service agent
    - Academic explanation → Professor
- **Example:**
    - *"You are a historian specialized in WWII. Explain the significance of Battle X."*
    - You could ask this directly, but adding this persona gives a much more tailored answer.

### 5. Chain of Thought (CoT) Prompting

- Encouraging the model to explain its reasoning process step by step before arriving at the final answer.
- Used for complex reasoning tasks, mathematical problems, and multi-step queries.
- **Format:**
    - **Q:** A descriptive/reasoning question
    - **A:** Step-by-step reasoning → Final answer

### 6. ReAct Prompting (Reason + Act)

- Method where the LLM performs more complex tasks by adding explicit steps through interaction with external tools and the environment.
- The LLM goes through a repeated cycle until the final result is reached:
    
    **Thinking → Action → Observation**
    
- **Example:**
    - **Q:** What is the capital of Japan and its population?
    - **Thought:** Need to find out the capital and population.
    - **Action:** Search (capital of Japan)
    - **Observation:** Tokyo
    - *(Cycle repeats for the second question)*
    - **Action:** Search (population of Tokyo)
    - **Final Answer:** The capital of Japan is Tokyo and the population is around 14 million.

### 7. Meta Prompting

- Advanced prompt engineering technique where you essentially use an LLM to generate, refine, or optimize other prompts.
- **When to use:**
    - When you have a short/rough prompt and ask the LLM to act as a prompt engineer to expand, add detail, and make it a comprehensive, high-quality prompt.

### 8. Temperature Parameter

- A parameter that controls the randomness and creativity of the model’s output.
- Normally scaled from **0 to 1** (or up to **2**).
- **Low Temperature (Closer to 0):**
    - Deterministic, conservative, predictable, and consistent.
    - **Use cases:** Summarization, code generation, translation.
- **High Temperature (Closer to 1 or above):**
    - Diverse, creative, random.
    - **Use cases:** Poetry, brainstorming, creative writing.

### 9. Top-P and Top-K Sampling

Parameters that control which tokens are considered when the model generates output, directly affecting creativity and randomness (fine-tuning beyond temperature).

- **Example sentence:** *"The cat sat on the ______"*
    - **Low Temperature:** High-probability tokens like `mat (0.53)`, `rug (0.40)`.
    - **High Temperature:** Lower-probability words like `pizza`, `aircraft`, `spacecraft` also get considered.

#### **Top-K:**

- Limits the sampling pool to strictly the top K most probable tokens.
- **Example:**
    - Word probabilities for *"The color of cloud is ______"*:
        - White (0.29)
        - Grey (0.23)
        - Yellow (0.11)
        - Orange (0.09)
        - Red (0.08)
        - Black (0.06)
    - If **Top-K = 5**, it will only consider the top 5 values (`White`, `Grey`, `Yellow`, `Orange`, `Red`) and discard the rest.

#### **Top-P (Nucleus Sampling):**

- Selects from the smallest group of tokens whose cumulative probability exceeds the threshold P.
- **Example:**
    - If **Top-P = 0.90**, it adds probabilities starting from the highest until the cumulative sum hits 90% (0.90), cutting off the long tail of unlikely words.
