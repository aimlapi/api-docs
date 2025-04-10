---
description: >-
  Learn how to connect large language models to external tools using function
  calls.
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

{% code title="python" %}
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

* [claude-3-5-sonnet-20240620](../api-references/text-models-llm/Anthropic/claude-3.5-sonnet.md)
* [claude-3-5-sonnet-20241022](../api-references/text-models-llm/Anthropic/claude-3.5-sonnet.md)
* [claude-3-haiku-20240307](../api-references/text-models-llm/Anthropic/claude-3-haiku.md)
* [claude-3-opus-20240229](../api-references/text-models-llm/Anthropic/claude-3-opus.md)
* [claude-3-sonnet-20240229](../api-references/text-models-llm/Anthropic/claude-3-sonnet.md)
* [qwen-max](../api-references/text-models-llm/Alibaba-Cloud/qwen-max.md)
* [qwen-max-2025-01-25](../api-references/text-models-llm/Alibaba-Cloud/qwen-max.md)
* [qwen-plus](../api-references/text-models-llm/Alibaba-Cloud/qwen-plus.md)
* [qwen-turbo](../api-references/text-models-llm/Alibaba-Cloud/qwen-turbo.md)
* [gemini-1.5-flash](../api-references/text-models-llm/Google/gemini-1.5-flash.md)
* [gemini-1.5-pro](../api-references/text-models-llm/Google/gemini-1.5-pro.md)
* [gemini-2.0-flash-exp](../api-references/text-models-llm/Google/gemini-2.0-flash-exp.md)
* [google/gemini-2.0-flash-thinking-exp-01-21](../api-references/text-models-llm/google/gemini-2.0-flash-thinking-exp-01-21.md)
* [gemini-2.5-pro-exp-03-25](../api-references/text-models-llm/google/gemini-2.5-pro-exp.md)
* [google/gemini-2.5-pro-preview](../api-references/text-models-llm/google/gemini-2.5-pro-preview.md)
* [google/gemma-3-1b-it](../api-references/text-models-llm/google/gemma-3.md)
* [google/gemma-3-4b-it](../api-references/text-models-llm/google/gemma-3.md)
* [google/gemma-3-12b-it](../api-references/text-models-llm/google/gemma-3.md)
* [google/gemma-3-27b-it](../api-references/text-models-llm/google/gemma-3.md)
* [meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.2-11B-Vision-Instruct-Turbo.md)
* [meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.2-90B-Vision-Instruct-Turbo.md)
* [meta-llama/Llama-Guard-3-11B-Vision-Turbo](../api-references/moderation-safety-models/Meta/Llama-Guard-3-11B-Vision-Turbo.md)
* [meta-llama/Llama-Vision-Free](../api-references/text-models-llm/Meta/Llama-Vision-Free.md)
* [MiniMax-Text-01](../api-references/text-models-llm/MiniMax/text-01.md)
* [abab6.5s-chat](../api-references/text-models-llm/MiniMax/abab6.5s-chat.md)
* [chatgpt-4o-latest](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4-turbo](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md)
* [gpt-4-turbo-2024-04-09](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md)
* [gpt-4o](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-05-13](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-08-06](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-mini](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
* [gpt-4o-mini-2024-07-18](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
