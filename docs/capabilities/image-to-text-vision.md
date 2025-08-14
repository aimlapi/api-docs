# Vision in Text Models (Image-To-Text)

This article describes a specific capability of text models: vision, which enables image-to-text conversion. A list of models that support it is provided at the end of this page.

## Example

{% code overflow="wrap" %}
```python
import requests
import json

url = "https://api.aimlapi.com/chat/completions"

payload = json.dumps({
  "model": "gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What’s in this image?"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
          }
        }
      ]
    }
  ],
  "max_tokens": 300
})

headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>'
}

response = requests.post(url, headers=headers, data=payload)
print(response.json())

```
{% endcode %}

## Text Models That Support Vision

* [claude-3-haiku-20240307](../api-references/text-models-llm/Anthropic/claude-3-haiku.md)
* [claude-3-opus-20240229](../api-references/text-models-llm/Anthropic/claude-3-opus.md)
* [claude-3-5-sonnet-20240620](../api-references/text-models-llm/Anthropic/claude-3.5-sonnet.md)
* [claude-3-5-sonnet-20241022](../api-references/text-models-llm/Anthropic/claude-3.5-sonnet.md)
* [claude-3-5-haiku-20241022](../api-references/text-models-llm/anthropic/claude-3.5-haiku.md)
* [claude-3-7-sonnet-20250219](../api-references/text-models-llm/anthropic/claude-3.7-sonnet.md)
* [claude-sonnet-4-20250514](../api-references/text-models-llm/anthropic/claude-4-sonnet.md)
* [claude-opus-4-20250514](../api-references/text-models-llm/anthropic/claude-4-opus.md)
* [anthropic/claude-opus-4.1\
  claude-opus-4-1\
  claude-opus-4-1-20250805](../api-references/text-models-llm/anthropic/claude-opus-4.1.md)
* [gemini-2.0-flash-exp](../api-references/text-models-llm/Google/gemini-2.0-flash-exp.md)
* [google/gemini-2.0-flash](../api-references/text-models-llm/google/gemini-2.0-flash.md)
* [google/gemini-2.5-flash](../api-references/text-models-llm/google/gemini-2.5-flash.md)
* [google/gemini-2.5-pro](../api-references/text-models-llm/google/gemini-2.5-pro.md)
* [google/gemma-2-27b-it](../api-references/text-models-llm/Google/gemma-2-27b-it.md)
* [google/gemma-3-4b-it](../api-references/text-models-llm/google/gemma-3.md)
* [google/gemma-3-27b-it](../api-references/text-models-llm/google/gemma-3.md)
* [meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.2-11B-Vision-Instruct-Turbo.md)
* [meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo](../api-references/text-models-llm/Meta/Llama-3.2-90B-Vision-Instruct-Turbo.md)
* [meta-llama/Llama-Guard-3-11B-Vision-Turbo](../api-references/moderation-safety-models/Meta/Llama-Guard-3-11B-Vision-Turbo.md)
* [meta-llama/Llama-Vision-Free](../api-references/text-models-llm/Meta/Llama-Vision-Free.md)
* [meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo](../api-references/text-models-llm/Meta/Meta-Llama-3.1-405B-Instruct-Turbo.md)
* [meta-llama/llama-4-scout](../api-references/text-models-llm/meta/llama-4-maverick.md)
* [meta-llama/llama-4-maverick](../api-references/text-models-llm/meta/llama-4-maverick.md)
* [MiniMax-Text-01](../api-references/text-models-llm/MiniMax/text-01.md)
* [chatgpt-4o-latest](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4-turbo](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md)
* [gpt-4-turbo-2024-04-09](../api-references/text-models-llm/OpenAI/gpt-4-turbo.md)
* [gpt-4o](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-05-13](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-2024-08-06](../api-references/text-models-llm/OpenAI/gpt-4o.md)
* [gpt-4o-mini](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
* [gpt-4o-mini-2024-07-18](../api-references/text-models-llm/OpenAI/gpt-4o-mini.md)
* [openai/gpt-4.1-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1.md)
* [openai/gpt-4.1-mini-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1-mini.md)
* [openai/gpt-4.1-nano-2025-04-14](../api-references/text-models-llm/openai/gpt-4.1-nano.md)
* [openai/o4-mini-2025-04-16](../api-references/text-models-llm/openai/o4-mini.md)
* [openai/o3-2025-04-16](../api-references/text-models-llm/openai/o3.md)
* [o1](../api-references/text-models-llm/OpenAI/o1.md)
* [openai/gpt-5-2025-08-07](../api-references/text-models-llm/openai/gpt-5.md)
* [openai/gpt-5-mini-2025-08-07](../api-references/text-models-llm/openai/gpt-5-mini.md)
* [openai/gpt-5-nano-2025-08-0](../api-references/text-models-llm/openai/gpt-5-nano.md)
* [openai/gpt-5-chat-latest](../api-references/text-models-llm/openai/gpt-5-chat.md)
* [perplexity/sonar](../api-references/text-models-llm/perplexity/sonar.md)
* [perplexity/sonar-pro](../api-references/text-models-llm/perplexity/sonar-pro.md)
