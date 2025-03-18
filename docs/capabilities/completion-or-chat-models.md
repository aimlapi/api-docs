---
description: An explanation of completion and chat completion terms.
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
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
```
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

* [ai21/jamba-1-5-mini](../api-references/text-models-llm/AI21-Labs/jamba-1-5-mini.md)
* [Qwen/Qwen2-72B-Instruct](../api-references/text-models-llm/Alibaba-Cloud/Qwen2-72B-Instruct.md)
* [Qwen/Qwen2.5-7B-Instruct-Turbo](../api-references/text-models-llm/Alibaba-Cloud/Qwen2.5-7B-Instruct-Turbo.md)
* [Qwen/Qwen2.5-72B-Instruct-Turbo](../api-references/text-models-llm/Alibaba-Cloud/Qwen2.5-72B-Instruct-Turbo.md)
* [Qwen/Qwen2.5-Coder-32B-Instruct](../api-references/text-models-llm/Alibaba-Cloud/Qwen2.5-Coder-32B-Instruct.md)
* [qwen-max](../api-references/text-models-llm/Alibaba-Cloud/qwen-max.md)
* [qwen-max-2025-01-25](../api-references/text-models-llm/Alibaba-Cloud/qwen-max.md)
* [qwen-plus](../api-references/text-models-llm/Alibaba-Cloud/qwen-plus.md)
* [qwen-turbo](../api-references/text-models-llm/Alibaba-Cloud/qwen-turbo.md)
* [anthracite-org/magnum-v4-72b](../api-references/text-models-llm/Anthracite/magnum-v4.md)
* [claude-3-5-haiku-20241022](../api-references/text-models-llm/anthropic/claude-3.5-haiku.md)
* [claude-3-5-sonnet-20240620](../api-references/text-models-llm/Anthropic/claude-3-5-sonnet.md)
* [claude-3-5-sonnet-20241022](../api-references/text-models-llm/Anthropic/claude-3-5-sonnet.md)
* [claude-3-haiku-20240307](../api-references/text-models-llm/Anthropic/claude-3-haiku.md)
* [claude-3-opus-20240229](../api-references/text-models-llm/Anthropic/claude-3-opus.md)
* [claude-3-sonnet-20240229](../api-references/text-models-llm/Anthropic/claude-3-sonnet.md)
* [cohere/command-r-plus](../api-references/text-models-llm/Cohere/command-r-plus.md)
* [deepseek-ai/deepseek-llm-67b-chat](../api-references/text-models-llm/DeepSeek/deepseek-chat.md)
* [gemini-1.5-flash](../api-references/text-models-llm/Google/gemini-1.5-flash.md)
* [gemini-1.5-pro](../api-references/text-models-llm/Google/gemini-1.5-pro.md)
* [gemini-2.0-flash-exp](../api-references/text-models-llm/Google/gemini-2.0-flash-exp.md)
* [gemini-pro](../api-references/text-models-llm/Google/gemini-pro.md)
* [google/gemma-2b-it](../api-references/text-models-llm/Google/gemma-2b-it.md)
* [google/gemma-2-9b-it](../api-references/text-models-llm/Google/gemma-2-9b-it.md)
* [google/gemma-2-27b-it](../api-references/text-models-llm/Google/gemma-2-27b-it.md)
* [Gryphe/MythoMax-L2-13b](../api-references/text-models-llm/Gryphe/MythoMax-L2-13b.md)
* [Gryphe/MythoMax-L2-13b-Lite](../api-references/text-models-llm/Gryphe/MythoMax-L2-13b-Lite.md)
* [meta-llama/Llama-2-13b-chat-hf](../api-references/text-models-llm/Meta/Llama-2-13b-chat-hf.md)
* [meta-llama/Llama-3-70b-chat-hf](../api-references/text-models-llm/Meta/Llama-3-chat-hf.md)
* [meta-llama/Llama-3-8b-chat-hf](../api-references/text-models-llm/Meta/Llama-3-chat-hf.md)
* [meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.2-11B-Vision-Instruct-Turbo.md)
* [meta-llama/Llama-3.2-3B-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.2-3B-Instruct-Turbo.md)
* [meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.2-90B-Vision-Instruct-Turbo.md)
* [meta-llama/Llama-3.3-70B-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.3-70B-Instruct-Turbo.md)
* [meta-llama/Llama-Guard-3-11B-Vision-Turbo](../api-references/moderation-safety-models/Meta/Llama-Guard-3-11B-Vision-Turbo.md)
* [meta-llama/Llama-Vision-Free](../api-references/text-models-llm/Meta/Llama-Vision-Free.md)
* [meta-llama/LlamaGuard-2-8b](../api-references/moderation-safety-models/Meta/LlamaGuard-2-8b.md)
* [meta-llama/Meta-Llama-3-70B-Instruct-Turbo](../api-references/text-models-llm/Meta/Meta-Llama-3-70B-Instruct-Turbo.md)
* [meta-llama/Meta-Llama-3-8B-Instruct-Lite](../api-references/text-models-llm/Meta/Meta-Llama-3-8B-Instruct-Lite.md)
* [meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo](../api-references/text-models-llm/Meta/Meta-Llama-3.1-405B-Instruct-Turbo.md)
* [meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo](../api-references/text-models-llm/Meta/Meta-Llama-3.1-70B-Instruct-Turbo.md)
* [meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo](../api-references/text-models-llm/Meta/Meta-Llama-3.1-8B-Instruct-Turbo.md)
* [meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo-128K](../api-references/text-models-llm/Meta/Meta-Llama-3.1-8B-Instruct-Turbo.md)
* [meta-llama/Meta-Llama-Guard-3-8B](../api-references/moderation-safety-models/Meta/Meta-Llama-Guard-3-8B.md)
* [microsoft/WizardLM-2-8x22B](../api-references/text-models-llm/Microsoft/WizardLM-2-8x22B.md)
* [MiniMax-Text-01](../api-references/text-models-llm/MiniMax/text-01.md)
* [abab6.5s-chat](../api-references/text-models-llm/MiniMax/abab6.5s-chat.md)
* [mistralai/Mistral-7B-Instruct-v0.1](../api-references/text-models-llm/Mistral-AI/Mistral-7B-Instruct.md)
* [mistralai/Mistral-7B-Instruct-v0.2](../api-references/text-models-llm/Mistral-AI/Mistral-7B-Instruct.md)
* [mistralai/Mistral-7B-Instruct-v0.3](../api-references/text-models-llm/Mistral-AI/Mistral-7B-Instruct.md)
* [mistralai/Mixtral-8x22B-Instruct-v0.1](../api-references/text-models-llm/Mistral-AI/Mixtral-8x22B-Instruct.md)
* [mistralai/Mixtral-8x7B-Instruct-v0.1](../api-references/text-models-llm/Mistral-AI/Mixtral-8x7B-Instruct-v0.1.md)
* [mistralai/codestral-2501](../api-references/text-models-llm/Mistral-AI/codestral-2501.md)
* [mistralai/mistral-nemo](../api-references/text-models-llm/Mistral-AI/mistral-nemo.md)
* [mistralai/mistral-tiny](../api-references/text-models-llm/Mistral-AI/mistral-tiny.md)
* [nvidia/Llama-3.1-Nemotron-70B-Instruct-HF](../api-references/text-models-llm/NVIDIA/Llama-3.1-Nemotron-70B-Instruct-HF.md)
* [nvidia/llama-3.1-nemotron-70b-instruct](../api-references/text-models-llm/NVIDIA/Llama-3.1-Nemotron-70B-Instruct-HF.md)
* [neversleep/llama-3.1-lumimaid-70b](../api-references/text-models-llm/NeverSleep/llama-3.1-lumimaid.md)
* [NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO](../api-references/text-models-llm/NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO.md)
* [chatgpt-4o-latest](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-3.5-turbo](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md)
* [gpt-3.5-turbo-0125](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md)
* [gpt-3.5-turbo-1106](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md)
* [gpt-4](../api-references/text-models-llm/OpenAI/gpt-4.md)
* [gpt-4-0125-preview](../api-references/text-models-llm/OpenAI/gpt-4-preview.md)
* [gpt-4-1106-preview](../api-references/text-models-llm/OpenAI/gpt-4-preview.md)
* [gpt-4-turbo](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md)
* [gpt-4-turbo-2024-04-09](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md)
* [gpt-4.5-preview](../api-references/text-models-llm/OpenAI/gpt-4.5-preview.md)
* [gpt-4o](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-05-13](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-08-06](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-mini](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
* [gpt-4o-mini-2024-07-18](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
* [o1](../api-references/text-models-llm/OpenAI/o1.md)
* [o1-mini](../api-references/text-models-llm/OpenAI/o1-mini.md)
* [o1-mini-2024-09-12](../api-references/text-models-llm/OpenAI/o1-mini.md)
* [o1-preview](../api-references/text-models-llm/OpenAI/o1-preview.md)
* [o1-preview-2024-09-12](../api-references/text-models-llm/OpenAI/o1-preview.md)
* [o3-mini](../api-references/text-models-llm/OpenAI/o3-mini.md)
* [upstage/SOLAR-10.7B-Instruct-v1.0](../api-references/text-models-llm/Upstage-AI/SOLAR-10.7B-Instruct.md)
* [x-ai/grok-beta](../api-references/text-models-llm/xAI/grok-beta.md)

***
