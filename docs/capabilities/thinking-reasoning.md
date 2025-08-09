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

* [anthropic/claude-3.7-sonnet](../api-references/text-models-llm/anthropic/claude-3.7-sonnet.md)
* [anthropic/claude-opus-4](../api-references/text-models-llm/anthropic/claude-4-opus.md)
* [anthropic/claude-sonnet-4](../api-references/text-models-llm/anthropic/claude-4-sonnet.md)
* [anthropic/claude-opus-4.1\
  claude-opus-4-1\
  claude-opus-4-1-20250805](../api-references/text-models-llm/anthropic/claude-opus-4.1.md)

### Google

Google's policy regarding reasoning models is not to provide parameters for explicitly controlling the model's reasoning activity during invocation. However, this activity does occur, and you can even inspect how many tokens it consumed by checking the `reasoning_tokens` field in the response.

<details>

<summary>Example of the "usage" section in a Gemini model response</summary>

```json
  "usage": {
    "prompt_tokens": 6,
    "completion_tokens": 3050,
    "completion_tokens_details": {
      "reasoning_tokens": 1097
    },
    "total_tokens": 3056
```

</details>

Supported models:

* [google/gemini-2.5-flash-lite-preview](../api-references/text-models-llm/google/gemini-2.5-flash-lite-preview.md)
* [google/gemini-2.5-flash](../api-references/text-models-llm/google/gemini-2.5-flash.md)
* [google/gemini-2.5-pro](../api-references/text-models-llm/google/gemini-2.5-pro.md)

### OpenAI and other vendors

The standard way to control reasoning behavior in OpenAI models—and in some models from other providers—is through the `reasoning_effort` parameter, which tells the model how much internal reasoning it should perform before responding to the prompt.

Accepted values are `low`, `medium`, and `high`. Lower levels prioritize speed and efficiency, while higher levels provide deeper reasoning at the cost of increased token usage and latency. The default is `medium`, offering a balance between performance and quality.&#x20;

Supported models:

* [o1](../api-references/text-models-llm/OpenAI/o1.md)
* [o3-mini](../api-references/text-models-llm/OpenAI/o3-mini.md)
* [openai/gpt-4.1-mini-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1-mini.md)
* [openai/gpt-4.1-nano-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1-nano.md)
* [openai/o3-2025-04-16](../api-references/text-models-llm/openai/o3.md)
* [openai/o4-mini-2025-04-16](../api-references/text-models-llm/openai/o4-mini.md)
* [openai/gpt-oss-20b](../api-references/text-models-llm/openai/gpt-oss-20b.md)
* [openai/gpt-oss-120b](../api-references/text-models-llm/openai/gpt-oss-120b.md)
* [openai/gpt-5](../api-references/text-models-llm/openai/gpt-5.md)
* [openai/gpt-5-mini](../api-references/text-models-llm/openai/gpt-5-mini.md)
* [openai/gpt-5-nano](../api-references/text-models-llm/openai/gpt-5-nano.md)

***

* [alibaba/qwen3-32b](../api-references/text-models-llm/alibaba-cloud/qwen3-32b.md)
* [alibaba/qwen3-coder-480b-a35b-instruct](../api-references/text-models-llm/alibaba-cloud/qwen3-coder-480b-a35b-instruct.md)
* [alibaba/qwen3-235b-a22b-thinking-2507](../api-references/text-models-llm/alibaba-cloud/qwen3-235b-a22b-thinking-2507.md)

***

* [x-ai/grok-3-mini-beta](../api-references/text-models-llm/xai/grok-3-mini-beta.md)
* [x-ai/grok-4-07-09](../api-references/text-models-llm/xai/grok-4.md)

***

* [zhipu/glm-4.5-air](../api-references/text-models-llm/zhipu/glm-4.5-air.md)
* [zhipu/glm-4.5](../api-references/text-models-llm/zhipu/glm-4.5.md)
