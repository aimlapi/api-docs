# gpt-5-5

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-5-5`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/openai/gpt-5-5" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

One of OpenAI’s best models as of late April 2026. Delivers advanced reasoning, long-context support, and strong performance across coding and complex tasks. Supports cached input for cost-efficient workflows, with flexible pricing based on context size.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

**1️⃣ Required setup (don’t skip this)**\
▪ **Create an account:** Sign up on the AI/ML API website (if you don’t have one yet).\
▪ **Generate an API key:** In your account dashboard, create an API key and make sure it’s **enabled** in the UI.

**2️ Copy the code example**\
At the bottom of this page, pick the snippet for your preferred programming language (Python / Node.js) and copy it into your project.

**3️ Update the snippet for your use case**\
▪ **Insert your API key:** replace `<YOUR_AIMLAPI_KEY>` with your real AI/ML API key.\
▪ **Select a model:** set the `model` field to the model you want to call.\
▪ **Provide input:** fill in the request input field(s) shown in the example (for example, `messages` for chat/LLM models, or other inputs for image/video/audio models).

**4️ (Optional) Tune the request**\
Depending on the model type, you can add optional parameters to control the output (e.g., generation settings, quality, length, etc.). See the API schema below for the full list.

**5️ Run your code**\
Run the updated code in your development environment. Response time depends on the model and request size, but simple requests typically return quickly.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schemas

<details>

<summary>Chat Completions vs. Responses API</summary>

**Chat Completions**\
The _chat completions_ API is the older, chat-oriented interface where you send a list of messages (`role: user`, `role: assistant`, etc.), and the model returns a single response. It was designed specifically for conversational workflows and follows a structured chat message format. It is now considered a legacy interface.

**Responses**\
The _Responses_ API is the newer, unified interface used across OpenAI’s latest models. Instead of focusing only on chat, it supports multiple input types (text, images, audio, tools, etc.) and multiple output modalities (text, JSON, images, audio, video). It is more flexible, more consistent across models, and intended to replace chat completions entirely.

</details>

### Chat Completions Endpoint

{% openapi-operation spec="gpt-5-5" path="/v1/chat/completions" method="post" %}
[OpenAPI gpt-5-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/OpenAI/gpt-5-5.json)
{% endopenapi-operation %}

### Responses Endpoint

This endpoint is currently used _only_ with OpenAI models. Some models support both the `/chat/completions` and `/responses` endpoints, while others support only one of them.

{% openapi-operation spec="gpt-5-5-RESPONSES" path="/v1/responses" method="post" %}
[OpenAPI gpt-5-5-RESPONSES](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/OpenAI/gpt-5-5-RESPONSES.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation 

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"openai/gpt-5-5",
        "messages":[
            {
                "role":"user",
                "content":"Hi! What do you think about mankind?" # insert your prompt
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      // insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-5-5',
      messages:[
          {
              role:'user',
              content: 'Hi! What do you think about mankind?' // insert your prompt
          }
      ],
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "id": "chatcmpl-DZ42Eopzn0SePULFFgetwumpIvwHG",
  "object": "chat.completion",
  "created": 1777249362,
  "model": "gpt-5.5-2026-04-23",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I think humankind is a mix of contradictions: capable of extraordinary compassion, creativity, and courage, but also of cruelty, shortsightedness, and self-destruction.\n\nWhat stands out most is our capacity to learn and change. We build art, science, friendships, families, medicines, cities, and stories that help us understand ourselves. At the same time, we often struggle with fear, greed, tribalism, and the consequences of our own power.\n\nSo my view is: humanity is not simply “good” or “bad.” It is unfinished. Its best qualities show up when people choose empathy, curiosity, responsibility, and cooperation. Its worst qualities show up when people stop seeing others as fully human.\n\nIn that sense, mankind is both the problem and the hope.",
        "refusal": null,
        "annotations": []
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 182,
    "total_tokens": 197,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 16,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "service_tier": "default",
  "system_fingerprint": null,
  "meta": {
    "usage": {
      "credits_used": 14391,
      "usd_spent": 0.0071955
    }
  }
}
```
{% endcode %}

</details>

### Code Example #2: Using /responses Endpoint

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

response = requests.post(
    "https://api.aimlapi.com/v1/responses",
    headers={
        "Content-Type":"application/json", 

        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"openai/gpt-5-5",
        "input":"Hi! What do you think about mankind?" # insert your prompt   
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  try {
    const response = await fetch('https://api.aimlapi.com/v1/responses', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-5-5',
        input: 'Hi! What do you think about mankind?' // insert your prompt
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('Error', error);
  }
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "id": "A9shbKkug4kNjZqrfEuNm",
  "object": "response",
  "created_at": 1777249496,
  "status": "completed",
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1777249500,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": null,
  "max_tool_calls": null,
  "model": "gpt-5.5-2026-04-23",
  "moderation": null,
  "output": [
    {
      "id": "rs_054d3661172398400069eeacd92ccc8195a92e9d984391e050",
      "type": "reasoning",
      "summary": []
    },
    {
      "id": "msg_054d3661172398400069eeacda197081959150dd4ba5416cad",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "I think mankind is a remarkable mix of contradictions: capable of cruelty and short-sightedness, but also compassion, creativity, courage, and cooperation.\n\nHumans have caused enormous harm—to each other, to other species, and to the planet—but we’re also the species that writes music, builds hospitals, protects strangers, explores space, preserves memories, and keeps trying to understand ourselves. What stands out most is our ability to change: individually and collectively, we can learn, regret, improve, and imagine better ways to live.\n\nSo my view is cautiously hopeful: humanity is flawed, but not fixed. Its future depends on which parts of itself it chooses to strengthen."
        }
      ],
      "phase": "final_answer",
      "role": "assistant"
    }
  ],
  "parallel_tool_calls": true,
  "presence_penalty": 0,
  "previous_response_id": null,
  "prompt_cache_key": null,
  "prompt_cache_retention": "24h",
  "reasoning": {
    "effort": "medium",
    "summary": null
  },
  "safety_identifier": null,
  "service_tier": "default",
  "store": true,
  "temperature": 1,
  "text": {
    "format": {
      "type": "text"
    },
    "verbosity": "medium"
  },
  "tool_choice": "auto",
  "tools": [],
  "top_logprobs": 0,
  "top_p": 0.98,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 15,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens": 160,
    "output_tokens_details": {
      "reasoning_tokens": 20
    },
    "total_tokens": 175
  },
  "user": null,
  "metadata": {},
  "output_text": "I think mankind is a remarkable mix of contradictions: capable of cruelty and short-sightedness, but also compassion, creativity, courage, and cooperation.\n\nHumans have caused enormous harm—to each other, to other species, and to the planet—but we’re also the species that writes music, builds hospitals, protects strangers, explores space, preserves memories, and keeps trying to understand ourselves. What stands out most is our ability to change: individually and collectively, we can learn, regret, improve, and imagine better ways to live.\n\nSo my view is cautiously hopeful: humanity is flawed, but not fixed. Its future depends on which parts of itself it chooses to strengthen."
}
```
{% endcode %}

</details>
