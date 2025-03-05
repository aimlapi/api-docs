---
icon: code
---

# Vision in Text Models (Image-To-Text)

This article describes a specific capability of chat models: vision, which enables image-to-text conversion. A list of models that support it is provided at the end of this page.

## Vision Tasks

**Example Request: Image Analysis**

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
  'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.post(url, headers=headers, data=payload)
print(response.json())

```
{% endcode %}

## Text Models That Support Vision

* [claude-3-5-sonnet-20240620](../api-references/text-models-llm/Anthropic/claude-3-5-sonnet.md)
* [claude-3-5-sonnet-20241022](../api-references/text-models-llm/Anthropic/claude-3-5-sonnet.md)
* [claude-3-haiku-20240307](../api-references/text-models-llm/Anthropic/claude-3-haiku.md)
* [claude-3-opus-20240229](../api-references/text-models-llm/Anthropic/claude-3-opus.md)
* [claude-3-sonnet-20240229](../api-references/text-models-llm/Anthropic/claude-3-sonnet.md)
* [gemini-1.5-flash](../api-references/text-models-llm/Google/gemini-1.5-flash.md)
* [gemini-1.5-pro](../api-references/text-models-llm/Google/gemini-1.5-pro.md)
* [gemini-2.0-flash-exp](../api-references/text-models-llm/Google/gemini-2.0-flash-exp.md)
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
