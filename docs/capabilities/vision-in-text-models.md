# Vision in Text Models

This article describes a specific capability of text models: vision, which enables image-to-text and video-to-text conversion. With vision support, models can interpret visual content and return structured or natural-language responses based on what they see.

Common use cases include describing images, analyzing screenshots, extracting text, understanding charts and documents, identifying objects, summarizing scenes, and processing video frames or clips.

The sections below explain how to work with image and video inputs, along with request examples and supported models.

## :island: Image analysis

<details>

<summary>Supported Model List</summary>

* [alibaba/qwen3-vl-32b-instruct](../api-references/text-models-llm/alibaba-cloud/qwen3-vl-32b-instruct.md)
* [alibaba/qwen3-vl-32b-thinking](../api-references/text-models-llm/alibaba-cloud/qwen3-vl-32b-thinking.md)
* [alibaba/qwen3.5-plus-20260218](../api-references/text-models-llm/alibaba-cloud/qwen3.5-plus.md)
* [alibaba/qwen3.5-omni-plus](../api-references/text-models-llm/alibaba-cloud/qwen3.5-omni-plus.md)
* [alibaba/qwen3.5-omni-flash](../api-references/text-models-llm/alibaba-cloud/qwen3.5-omni-flash.md)
* [alibaba/qwen3.6-27b](../api-references/text-models-llm/alibaba-cloud/qwen3.6-27b.md)
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
* [google/gemma-3-4b-it](../api-references/text-models-llm/google/gemma-3.md)
* [google/gemma-3-27b-it](../api-references/text-models-llm/google/gemma-3.md)
* [google/gemini-3-1-pro-preview](../api-references/text-models-llm/google/gemini-3-1-pro-preview.md)
* [google/gemini-3-1-flash-lite-preview](../api-references/text-models-llm/google/gemini-3-1-flash-lite-preview.md)
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
* [moonshot/kimi-k2-6](../api-references/text-models-llm/moonshot/kimi-k2-6.md)
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

</details>

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

response = requests.post(
    url = "https://api.aimlapi.com/v1/chat/completions",
    headers = {
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:  
        "Authorization": "Bearer d09bc3015a66486e9bd4e6d1942934e1",
        "Content-Type": "application/json"
    },

    json = {
        "model": "alibaba/qwen3.5-omni-flash",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Describe the content of this image."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/handwriting.jpg"
                        }
                    }
                ]
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json
{
  "choices": [
    {
      "message": {
        "content": "This image shows a piece of lined notebook paper with handwritten text in black ink. The handwriting is neat, flowing, and appears to be written with a fountain pen — as noted in the text itself.\n\nThe content reads:\n\n> This is a handwriting test to see how it looks on lined paper. For the past two weeks I have been trying to improve my writing along with learning how to write with fountain pens. If you have any suggestions, tips or free resources I would love to check it out. Hope everyone is having a good day. :)\n\nAt the end, there’s a simple smiley face drawn with two dots for eyes and a curved line for a mouth.\n\nThe writer is sharing their progress in improving their handwriting while also learning to use fountain pens, and they’re politely asking for advice or recommendations from others. The tone is friendly and open-ended, inviting interaction.\n\nOverall, it’s a casual, personal note — likely shared online (perhaps on social media or a forum) as part of a “handwriting challenge” or community engagement around calligraphy or penmanship.",
        "reasoning_content": "",
        "role": "assistant"
      },
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null
    }
  ],
  "object": "chat.completion",
  "usage": {
    "prompt_tokens": 1253,
    "completion_tokens": 222,
    "total_tokens": 1475,
    "prompt_tokens_details": {
      "image_tokens": 1234,
      "text_tokens": 19
    },
    "completion_tokens_details": {
      "text_tokens": 222
    }
  },
  "created": 1777062253,
  "system_fingerprint": null,
  "model": "qwen3.5-omni-flash",
  "id": "chatcmpl-f7bde975-e2d2-9609-b890-bb1eb983f853",
  "meta": {
    "usage": {
      "credits_used": 2574,
      "usd_spent": 0.001287
    }
  }
}
```
{% endcode %}

</details>

***

## :cinema: Video analysis

<details>

<summary>Supported Model List</summary>

* [alibaba/qwen3.5-omni-plus](../api-references/text-models-llm/alibaba-cloud/qwen3.5-omni-plus.md)
* [alibaba/qwen3.5-omni-flash](../api-references/text-models-llm/alibaba-cloud/qwen3.5-omni-flash.md)

</details>

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

response = requests.post(
    url = "https://api.aimlapi.com/v1/chat/completions",
    headers = {
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:  
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json"
    },

    json = {
        "model": "alibaba/qwen3.5-omni-flash",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Describe this scene:"
                    },
                    {
                        "type": "video_url",
                        "video_url": {
                            "url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/aimlapi.mp4"
                        }
                    }
                ]
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json
{
  "choices": [
    {
      "message": {
        "content": "This image shows a piece of lined notebook paper with handwritten text in black ink. The handwriting is neat, flowing, and appears to be written with a fountain pen — as noted in the text itself.\n\nThe content reads:\n\n> This is a handwriting test to see how it looks on lined paper. For the past two weeks I have been trying to improve my writing along with learning how to write with fountain pens. If you have any suggestions, tips or free resources I would love to check it out. Hope everyone is having a good day. :)\n\nAt the end, there’s a simple smiley face drawn with two dots for eyes and a curved line for a mouth.\n\nThe writer is sharing their progress in improving their handwriting while also learning to use fountain pens, and they’re politely asking for advice or recommendations from others. The tone is friendly and open-ended, inviting interaction.\n\nOverall, it’s a casual, personal note — likely shared online (perhaps on social media or a forum) as part of a “handwriting challenge” or community engagement around calligraphy or penmanship.",
        "reasoning_content": "",
        "role": "assistant"
      },
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null
    }
  ],
  "object": "chat.completion",
  "usage": {
    "prompt_tokens": 1253,
    "completion_tokens": 222,
    "total_tokens": 1475,
    "prompt_tokens_details": {
      "image_tokens": 1234,
      "text_tokens": 19
    },
    "completion_tokens_details": {
      "text_tokens": 222
    }
  },
  "created": 1777062253,
  "system_fingerprint": null,
  "model": "qwen3.5-omni-flash",
  "id": "chatcmpl-f7bde975-e2d2-9609-b890-bb1eb983f853",
  "meta": {
    "usage": {
      "credits_used": 2574,
      "usd_spent": 0.001287
    }
  }
}
```
{% endcode %}

</details>
