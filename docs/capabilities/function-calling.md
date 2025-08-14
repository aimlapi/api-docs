---
description: >-
  Learn how to connect large language models to external tools using function
  calls.
---

# Function Calling

This article describes a specific capability of chat models: **function calling**, or simply **functions**. \
A list of models that support this feature is provided at the end of this page.

## Introduction

When using text (chat) models via the API, you can define functions that the model can choose to call, generating a JSON object with the necessary arguments. The text model API itself does not execute these functions; instead, it outputs the JSON, which you can then use to call the function within your code.

The latest models (gpt-4o, gpt-4-turbo, and gpt-3.5-turbo) are designed to detect when a function should be called based on the input and to produce JSON that closely matches the function signature. However, this functionality comes with potential risks. We strongly recommend implementing user confirmation steps before performing actions that could impact the real world (e.g., sending an email, posting online, making a purchase).

This guide focuses on function calling with our text models API.

## Common Use Cases

Function calling allows you to obtain structured data reliably from the model. For example, you can:

* **Create assistants that answer questions by calling external APIs**
  * Example functions: `send_email(to: string, body: string)`, `get_current_weather(location: string, unit: 'celsius' | 'fahrenheit')`
* **Convert natural language into API calls**
  * Example conversion: "Who are my top customers?" to `get_customers(min_revenue: int, created_before: string, limit: int)`, then call your internal API
* **Extract structured data from text**
  * Example functions: `extract_data(name: string, birthday: string)`, `sql_query(query: string)`

## Basic Sequence of Steps for Function Calling

1. **Call the model** with the user query and a set of functions defined in the `functions` parameter.
2. **Model response**: The model may choose to call one or more functions. If so, it will output a stringified JSON object adhering to your custom schema (note: the model may hallucinate parameters).
3. **Parse the JSON**: In your code, parse the string into JSON and call the function with the provided arguments if they exist.
4. **Call the model again**: Append the function response as a new message and let the model summarize the results back to the user.

## Examples

{% code title="python" overflow="wrap" %}
```python
import os
import json
import openai

client = openai.OpenAI(
    base_url="https://api.aimlapi.com/v1",
    api_key='AI_ML_API',
)

tools = [
  {
    "type": "function",
    "function": {
      "name": "get_current_weather",
      "description": "Get the current weather in a given location",
      "parameters": {
        "type": "object",
        "properties": {
          "location": {
            "type": "string",
            "description": "The city and state, e.g. San Francisco, CA"
          },
          "unit": {
            "type": "string",
            "enum": [
              "celsius",
              "fahrenheit"
            ]
          }
        }
      }
    }
  }
]

messages = [
    {"role": "system", "content": "You are a helpful assistant that can access external functions. The responses from these function calls will be appended to this dialogue. Please provide responses based on the information from these function calls."},
    {"role": "user", "content": "What is the current temperature of New York, San Francisco, and Chicago?"}
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
    tool_choice="auto",
)

print(json.dumps(response.choices[0].message.model_dump()['tool_calls'], indent=2))
```
{% endcode %}

## Models That Support Function Calling

* [claude-3-haiku-20240307](../api-references/text-models-llm/Anthropic/claude-3-haiku.md)
* [claude-3-opus-20240229](../api-references/text-models-llm/Anthropic/claude-3-opus.md)
* [claude-3-5-haiku-20241022](../api-references/text-models-llm/anthropic/claude-3.5-haiku.md)
* [claude-3-5-sonnet-20240620](../api-references/text-models-llm/Anthropic/claude-3.5-sonnet.md)
* [claude-3-5-sonnet-20241022](../api-references/text-models-llm/Anthropic/claude-3.5-sonnet.md)
* [claude-3-7-sonnet-20250219](../api-references/text-models-llm/anthropic/claude-3.7-sonnet.md)
* [claude-opus-4-20250514](../api-references/text-models-llm/anthropic/claude-4-opus.md)
* [claude-sonnet-4-20250514](../api-references/text-models-llm/anthropic/claude-4-sonnet.md)
* [anthropic/claude-opus-4.1](../api-references/text-models-llm/anthropic/claude-opus-4.1.md)

***

* [Qwen/Qwen2.5-7B-Instruct-Turbo](../api-references/text-models-llm/Alibaba-Cloud/Qwen2.5-7B-Instruct-Turbo.md)
* [Qwen/Qwen2.5-72B-Instruct-Turbo](../api-references/text-models-llm/Alibaba-Cloud/Qwen2.5-72B-Instruct-Turbo.md)
* [Qwen/Qwen2.5-Coder-32B-Instruct](../api-references/text-models-llm/Alibaba-Cloud/Qwen2.5-Coder-32B-Instruct.md)
* [qwen-max](../api-references/text-models-llm/Alibaba-Cloud/qwen-max.md)
* [qwen-max-2025-01-25](../api-references/text-models-llm/Alibaba-Cloud/qwen-max.md)
* [qwen-plus](../api-references/text-models-llm/Alibaba-Cloud/qwen-plus.md)
* [qwen-turbo](../api-references/text-models-llm/Alibaba-Cloud/qwen-turbo.md)
* [Qwen/QwQ-32B](../api-references/text-models-llm/alibaba-cloud/qwen-qwq-32b.md)
* [Qwen/Qwen3-235B-A22B-fp8-tput](../api-references/text-models-llm/alibaba-cloud/qwen3-235b-a22b.md)
* [alibaba/qwen3-32b](../api-references/text-models-llm/alibaba-cloud/qwen3-32b.md)
* [alibaba/qwen3-coder-480b-a35b-instruct](../api-references/text-models-llm/alibaba-cloud/qwen3-coder-480b-a35b-instruct.md)
* [alibaba/qwen3-235b-a22b-thinking-2507](../api-references/text-models-llm/alibaba-cloud/qwen3-235b-a22b-thinking-2507.md)

***

* [google/gemini-2.0-flash](../api-references/text-models-llm/google/gemini-2.0-flash.md)
* [google/gemini-2.5-flash-lite-preview](../api-references/text-models-llm/google/gemini-2.5-flash-lite-preview.md)
* [google/gemini-2.5-flash](../api-references/text-models-llm/google/gemini-2.5-flash.md)
* [google/gemini-2.5-pro](../api-references/text-models-llm/google/gemini-2.5-pro.md)

***

* [meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo](../api-references/text-models-llm/Meta/Meta-Llama-3.1-8B-Instruct-Turbo.md)
* [meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo](../api-references/text-models-llm/Meta/Meta-Llama-3.1-70B-Instruct-Turbo.md)
* [meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo](../api-references/text-models-llm/Meta/Meta-Llama-3.1-405B-Instruct-Turbo.md)
* [meta-llama/Llama-3.2-3B-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.2-3B-Instruct-Turbo.md)
* [meta-llama/Llama-3.3-70B-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.3-70B-Instruct-Turbo.md)
* [meta-llama/LlamaGuard-2-8b](../api-references/moderation-safety-models/Meta/Meta-Llama-Guard-3-8B.md)
* [meta-llama/llama-4-scout](../api-references/text-models-llm/meta/llama-4-maverick.md)
* [meta-llama/llama-4-maverick](../api-references/text-models-llm/meta/llama-4-maverick.md)

***

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
* [chatgpt-4o-latest](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-mini](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
* [gpt-4o-mini-2024-07-18](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
* [gpt-4o-audio-preview](../api-references/text-models-llm/openai/gpt-4o-audio-preview.md)
* [gpt-4o-mini-audio-preview](../api-references/text-models-llm/openai/gpt-4o-mini-audio-preview.md)
* [o1](../api-references/text-models-llm/OpenAI/o1.md)
* [o3-mini](../api-references/text-models-llm/OpenAI/o3-mini.md)
* [openai/o3-2025-04-16](../api-references/text-models-llm/openai/o3.md)
* [openai/gpt-4.1-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1.md)
* [openai/gpt-4.1-mini-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1-mini.md)
* [openai/gpt-4.1-nano-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1-nano.md)
* [openai/o4-mini-2025-04-16](../api-references/text-models-llm/openai/o4-mini.md)
* [openai/gpt-oss-20b](../api-references/text-models-llm/openai/gpt-oss-20b.md)
* [openai/gpt-oss-120b](../api-references/text-models-llm/openai/gpt-oss-120b.md)
* [openai/gpt-5-2025-08-07](../api-references/text-models-llm/openai/gpt-5.md)
* [openai/gpt-5-mini-2025-08-07](../api-references/text-models-llm/openai/gpt-5-mini.md)
* [openai/gpt-5-nano-2025-08-07](../api-references/text-models-llm/openai/gpt-5-nano.md)

***

* [nvidia/Llama-3.1-Nemotron-70B-Instruct-HF](../api-references/text-models-llm/NVIDIA/Llama-3.1-Nemotron-70B-Instruct-HF.md)
* [nvidia/llama-3.1-nemotron-70b-instruct](../api-references/text-models-llm/NVIDIA/Llama-3.1-Nemotron-70B-Instruct-HF.md)
* [deepseek/deepseek-r1](../api-references/text-models-llm/DeepSeek/deepseek-r1.md)
* [mistralai/mistral-tiny](../api-references/text-models-llm/Mistral-AI/mistral-tiny.md)
* [mistralai/mistral-nemo](../api-references/text-models-llm/Mistral-AI/mistral-nemo.md)
* [mistralai/codestral-2501](../api-references/text-models-llm/Mistral-AI/codestral-2501.md)
* [x-ai/grok-3-beta](../api-references/text-models-llm/xai/grok-3-beta.md)
* [x-ai/grok-3-mini-beta](../api-references/text-models-llm/xai/grok-3-mini-beta.md)
* [x-ai/grok-4-07-09](../api-references/text-models-llm/xai/grok-4.md)
* [MiniMax-Text-01](../api-references/text-models-llm/MiniMax/text-01.md)
* [minimax/m1](../api-references/text-models-llm/minimax/m1.md)
* [moonshot/kimi-k2-preview](../api-references/text-models-llm/moonshot/kimi-k2-preview.md)
* [zhipu/glm-4.5-air](../api-references/text-models-llm/zhipu/glm-4.5-air.md)
* [zhipu/glm-4.5](../api-references/text-models-llm/zhipu/glm-4.5.md)
