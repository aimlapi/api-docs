# Vision in Text Models (Image-To-Text)

This article describes a specific capability of text models: vision, which enables image-to-text conversion. A list of models that support it is provided at the end of this page.

## Example

{% tabs %}
{% tab title="Python" %}
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
{% endtab %}
{% endtabs %}

## Text Models That Support Vision

* [alibaba/qwen3-vl-32b-instruct](../api-references/text-models-llm/alibaba-cloud/qwen3-vl-32b-instruct.md)
* [alibaba/qwen3-vl-32b-thinking](../api-references/text-models-llm/alibaba-cloud/qwen3-vl-32b-thinking.md)
* [alibaba/qwen3.5-plus-20260218](../api-references/text-models-llm/alibaba-cloud/qwen3.5-plus.md)
* [claude-3-haiku-20240307](../api-references/text-models-llm/Anthropic/claude-3-haiku.md)
* [claude-sonnet-4-20250514](../api-references/text-models-llm/anthropic/claude-4-sonnet.md)
* [claude-opus-4-20250514](../api-references/text-models-llm/anthropic/claude-4-opus.md)
* [anthropic/claude-opus-4.1](../api-references/text-models-llm/anthropic/claude-opus-4.1.md)
* [anthropic/claude-sonnet-4.5](../api-references/text-models-llm/anthropic/claude-4-5-sonnet.md)
* [anthropic/claude-opus-4-5](../api-references/text-models-llm/anthropic/claude-4.5-opus.md)
* [anthropic/claude-opus-4-6](../api-references/text-models-llm/anthropic/claude-4.6-opus.md)
* [anthropic/claude-sonnet-4.6](../api-references/text-models-llm/anthropic/claude-4.6-sonnet.md)
* [anthropic/claude-opus-4-7](../api-references/text-models-llm/anthropic/claude-4.7-opus.md)
* [baidu/ernie-4.5-vl-28b-a3b](../api-references/text-models-llm/baidu/ernie-4.5-vl-28b-a3b.md)
* [baidu/ernie-4.5-vl-424b-a47b](../api-references/text-models-llm/baidu/ernie-4.5-vl-424b-a47b.md)
* [baidu/ernie-4-5-turbo-vl-32k](../api-references/text-models-llm/baidu/ernie-4.5-turbo-vl-32k.md)
* [google/gemini-2.0-flash](../api-references/text-models-llm/google/gemini-2.0-flash.md)
* [google/gemini-2.5-flash](../api-references/text-models-llm/google/gemini-2.5-flash.md)
* [google/gemini-2.5-pro](../api-references/text-models-llm/google/gemini-2.5-pro.md)
* [google/gemini-3-1-pro-preview](../api-references/text-models-llm/google/gemini-3-1-pro-preview.md)
* [google/gemma-3-4b-it](../api-references/text-models-llm/google/gemma-3.md)
* [google/gemma-3-27b-it](../api-references/text-models-llm/google/gemma-3.md)
* [google/gemma-4-31b-it](../api-references/text-models-llm/google/gemma-4-31b-it.md)
* [MiniMax-Text-01](../api-references/text-models-llm/MiniMax/text-01.md)
* [minimax/m2-her](../api-references/text-models-llm/minimax/m2-her.md)
* [minimax/m2-1](../api-references/text-models-llm/minimax/m2-1.md)
* [minimax/m2-1-highspeed](../api-references/text-models-llm/minimax/m2.1-highspeed.md)
* [minimax/m2-5-20260218](../api-references/text-models-llm/minimax/m2-5.md)
* [minimax/m2-5-highspeed-20260218](../api-references/text-models-llm/minimax/m2-5-highspeed.md)
* [minimax/m2-7-20260402](../api-references/text-models-llm/minimax/m2-7.md)
* [minimax/m2-7-highspeed](../api-references/text-models-llm/minimax/m2.7-highspeed.md)
* [moonshot/kimi-k2-5](../api-references/text-models-llm/moonshot/kimi-k2-5.md)
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
* ​[openai/gpt-5-1​](../api-references/text-models-llm/openai/gpt-5-1.md)
* [​openai/gpt-5-1-chat-latest​](../api-references/text-models-llm/openai/gpt-5-1-chat-latest.md)
* [​openai/gpt-5-1-codex​](../api-references/text-models-llm/openai/gpt-5-1-codex.md)
* [​openai/gpt-5-1-codex-mini](../api-references/text-models-llm/openai/gpt-5-1-codex-mini.md)
* [openai/gpt-5-2](../api-references/text-models-llm/openai/gpt-5.2.md)
* [openai/gpt-5-2-chat-latest](../api-references/text-models-llm/openai/gpt-5.2-chat-latest.md)
* [openai/gpt-5-2-codex](../api-references/text-models-llm/openai/gpt-5.2-codex.md)
* [openai/gpt-5-4](../api-references/text-models-llm/openai/gpt-5-4.md)
* [openai/gpt-5-4-pro](../api-references/text-models-llm/openai/gpt-5-4-pro.md)
* [perplexity/sonar](../api-references/text-models-llm/perplexity/sonar.md)
* [perplexity/sonar-pro](../api-references/text-models-llm/perplexity/sonar-pro.md)
* [x-ai/grok-4-fast-non-reasoning](../api-references/text-models-llm/xai/grok-4-fast-non-reasoning.md)
* [x-ai/grok-4-fast-reasoning](../api-references/text-models-llm/xai/grok-4-fast-reasoning.md)
* [x-ai/grok-4-1-fast-non-reasoning](../api-references/text-models-llm/xai/grok-4-1-fast-non-reasoning.md)
* [x-ai/grok-4-1-fast-reasoning](../api-references/text-models-llm/xai/grok-4-1-fast-reasoning.md)
* [x-ai/grok-4-20-0309-non-reasoning](../api-references/text-models-llm/xai/grok-4-20-non-reasoning.md)
* [x-ai/grok-4-20-0309-reasoning](../api-references/text-models-llm/xai/grok-4-20-reasoning.md)
