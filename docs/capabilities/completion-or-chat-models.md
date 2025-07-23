---
description: An explanation of completion and chat completion terms.
---

# Completion and Chat Completion

This article describes two related capabilities of text models: **completion** and **chat completion**. The former, in its pure form, is now mostly relevant for research purposes and is not supported by our models. A list of models that support chat completion is provided at the end of this page.

## What is a Completion

At a bare minimum, a text model is a large mathematical model trained to fulfill a single task: predicting the next token or character. This process is called **completion** and you will often encounter this term throughout your journey.

For example, when using the completion text model `gpt-3.5-turbo-instruct`, you can provide an initial prompt to the model:

```
A long time ago, there were three princesses in a distant kingdom:
```

Running the model might yield the following output:

{% code overflow="wrap" %}
```
A long time ago, there were three princesses in a distant kingdom: 
Princess Narcissa, who was beautiful but vain, Princess Rosa, who was kind and gentle, 
and Princess Aurora, who was strong and brave. 
The three sisters lived in a beautiful palace with their parents, the king and queen.
```
{% endcode %}

This is a simple text completion. However, when training datasets become larger and are refined by human alignments, we can achieve truly AI-like results that even researchers did not initially anticipate.

## What is a Chat Completion

To make text models useful in code and applications beyond generating arbitrary creative information, the model needs to be pretrained to return data in a specific format. Usually, using a text model feels like a chatting experience: you ask something in a certain role, and you get your answer as if it's from someone in another role. With this in mind, model providers train their models and feed their initial training data with some metadata, such as roles. This allows the model to respond in a certain format and be used in many complex applications.

For example, the model training data might look like the following:

{% code overflow="wrap" %}
```json5
USER: What's the color of the sky?
ASSISTANT: The color of the sky can vary depending on several factors, but it is most commonly perceived as blue during the daytime.
USER: What was the theme we discussed in the previous sentence?
ASSISTANT: The theme of the previous sentence centered around the color of the sky.
```
{% endcode %}

The above data is written in a chat-like conversation format. The training dataset contains a huge amount of these conversations, and during the training process, the model learns the relationships between words and characters, enabling it to return them in the same predictable format.

After generating data, a subsystem parses this information and returns it in a format that can easily be handled by your code, such as the following JSON:

```json
[
  { "message": "Hi!", "role": "user" },
  { "message": "Hi, how can I help you?", "role": "assistant" }
]
```

### What roles exist

There are several roles frequently used in chat models. The system role usually appears once, while other roles can appear multiple times:

* **System**: The main instruction about formatting, rules, and acting.
* **Assistant**: The model's response.
* **User**: The user's content.
* **Tool**: Response for external tools that can be used by the model.

Using these roles, you can create complex behaviors and protect your AI from misleading use by user content.

## Models That Support Chat Completion

Any [text chat model](../api-references/model-database.md#text-models-llm) supports this capability.

***
