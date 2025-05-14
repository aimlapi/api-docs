# Thinking / Reasoning

## Overview

Some text models support advanced reasoning mode, enabling them to perform multi-step problem solving, draw inferences, and follow complex instructions. This makes them well-suited for tasks like code generation, data analysis, and answering questions that require understanding context or logic.

{% hint style="warning" %}
Sometimes, if you give the model a serious and complex task, generating a response can take quite a while. In such cases, you might want to use streaming mode to receive the answer word by word as it is being generated.
{% endhint %}

## Models That Support Thinking / Reasoning Mode

### Anthropic

Special parameters, such as `thinking` in Claude models, provide transparency into the model’s step-by-step reasoning process before it gives its final answer.&#x20;

Supported models:

* [claude-3-haiku-20240307](../api-references/text-models-llm/Anthropic/claude-3-haiku.md)
* [claude-3-opus-20240229](../api-references/text-models-llm/Anthropic/claude-3-opus.md)
* [claude-3-sonnet-20240229](../api-references/text-models-llm/Anthropic/claude-3-sonnet.md)
* [claude-3-5-haiku-20241022](../api-references/text-models-llm/anthropic/claude-3.5-haiku.md)
* [claude-3-5-sonnet-20240620](../api-references/text-models-llm/Anthropic/claude-3.5-sonnet.md)
* [claude-3-5-sonnet-20241022](../api-references/text-models-llm/Anthropic/claude-3.5-sonnet.md)
* [anthropic/claude-3.7-sonnet](../api-references/text-models-llm/anthropic/claude-3.7-sonnet.md)
* [claude-3-7-sonnet-latest](../api-references/text-models-llm/anthropic/claude-3.7-sonnet.md)

### OpenAI and other vendors

The standard way to control reasoning behavior in OpenAI models—and in some models from other providers—is through the `reasoning_effort` parameter, which tells the model how much internal reasoning it should perform before responding to the prompt.

Accepted values are `low`, `medium`, and `high`. Lower levels prioritize speed and efficiency, while higher levels provide deeper reasoning at the cost of increased token usage and latency. The default is `medium`, offering a balance between performance and quality.&#x20;

Supported models:

* [o1](../api-references/text-models-llm/OpenAI/o1.md)
* [o1-mini](../api-references/text-models-llm/OpenAI/o1-mini.md)
* [o1-mini-2024-09-12](../api-references/text-models-llm/OpenAI/o1-mini.md)
* [o1-preview](../api-references/text-models-llm/OpenAI/o1-preview.md)
* [o1-preview-2024-09-12](../api-references/text-models-llm/OpenAI/o1-preview.md)
* [o3-mini](../api-references/text-models-llm/OpenAI/o3-mini.md)
* [chatgpt-4o-latest](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-3.5-turbo](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md)
* [gpt-3.5-turbo-0125](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md)
* [gpt-3.5-turbo-1106](../api-references/text-models-llm/OpenAI/gpt-3.5-turbo.md)
* [gpt-4](../api-references/text-models-llm/OpenAI/gpt-4.md)
* [gpt-4-0125-preview](../api-references/text-models-llm/OpenAI/gpt-4-preview.md)
* [gpt-4-1106-preview](../api-references/text-models-llm/OpenAI/gpt-4-preview.md)
* [gpt-4-turbo](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md)
* [gpt-4-turbo-2024-04-09](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md)
* [gpt-4o](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-05-13](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-08-06](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-mini](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
* [gpt-4o-mini-2024-07-18](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
* [gpt-4o-audio-preview](../api-references/text-models-llm/openai/gpt-4o-audio-preview.md)
* [gpt-4o-mini-audio-preview](../api-references/text-models-llm/openai/gpt-4o-mini-audio-preview.md)
* [gpt-4o-search-preview](../api-references/text-models-llm/openai/gpt-4o-search-preview.md)
* [gpt-4o-mini-search-preview](../api-references/text-models-llm/openai/gpt-4o-mini-search-preview.md)
* [gpt-4.5-preview](../api-references/text-models-llm/OpenAI/gpt-4.5-preview.md)
* [openai/gpt-4.1-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1.md)
* [openai/gpt-4.1-mini-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1-mini.md)
* [openai/gpt-4.1-nano-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1-nano.md)
* [openai/o4-mini-2025-04-16](../api-references/text-models-llm/openai/o4-mini.md)

***

* [deepseek-chat](../api-references/text-models-llm/DeepSeek/deepseek-chat.md)
* [deepseek/deepseek-chat](../api-references/text-models-llm/DeepSeek/deepseek-chat.md)
* [deepseek/deepseek-chat-v3-0324](../api-references/text-models-llm/DeepSeek/deepseek-chat.md)
* [deepseek-reasoner](../api-references/text-models-llm/DeepSeek/deepseek-r1.md)
* [deepseek/deepseek-r1](../api-references/text-models-llm/DeepSeek/deepseek-r1.md)

***

* [qwen-max](../api-references/text-models-llm/Alibaba-Cloud/qwen-max.md)
* [qwen-max-2025-01-25](../api-references/text-models-llm/Alibaba-Cloud/qwen-max.md)
* [qwen-plus](../api-references/text-models-llm/Alibaba-Cloud/qwen-plus.md)
* [qwen-turbo](../api-references/text-models-llm/Alibaba-Cloud/qwen-turbo.md)

***

* [google/gemma-3-1b-it](../api-references/text-models-llm/google/gemma-3.md)
* [google/gemma-3-4b-it](../api-references/text-models-llm/google/gemma-3.md)
* [google/gemma-3-12b-it](../api-references/text-models-llm/google/gemma-3.md)
* [google/gemma-3-27b-it](../api-references/text-models-llm/google/gemma-3.md)

***

* [mistralai/codestral-2501](../api-references/text-models-llm/Mistral-AI/codestral-2501.md)
* [mistralai/mistral-nemo](../api-references/text-models-llm/Mistral-AI/mistral-nemo.md)
* [mistralai/mistral-tiny](../api-references/text-models-llm/Mistral-AI/mistral-tiny.md)
* [cohere/command-r-plus](../api-references/text-models-llm/Cohere/command-r-plus.md)
* [anthracite-org/magnum-v4-72b](../api-references/text-models-llm/Anthracite/magnum-v4.md)
* [nvidia/llama-3.1-nemotron-70b-instruct](../api-references/text-models-llm/NVIDIA/Llama-3.1-Nemotron-70B-Instruct-HF.md)
* [neversleep/llama-3.1-lumimaid-70b](../api-references/text-models-llm/NeverSleep/llama-3.1-lumimaid.md)
* [x-ai/grok-beta](../api-references/text-models-llm/xAI/grok-beta.md)
