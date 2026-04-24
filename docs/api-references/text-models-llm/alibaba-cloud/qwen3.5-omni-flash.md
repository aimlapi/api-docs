# qwen3.5-omni-flash

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3.5-omni-flash`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/qwen3.5-omni-flash" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A fast and cost-efficient multimodal model supporting text, image, audio, and video inputs. A lighter and faster version of [qwen3.5-omni-plus](qwen3.5-omni-plus.md), built for low-latency workloads that need strong performance at scale.

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

## API Schema

{% openapi-operation spec="qwen3-5-omni-flash" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-5-omni-flash](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3.5-omni-flash.json)
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
        "model":"alibaba/qwen3.5-omni-flash",
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
      model: 'alibaba/qwen3.5-omni-flash',
      messages:[
          {
              role:'user',
              content: 'Hi! What do you think about mankind?' // insert your prompt here
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
  "choices": [
    {
      "message": {
        "content": "Hello! That's a profound question. As an AI, I don't have personal feelings or beliefs, but I can offer a perspective based on the vast amount of human history, literature, science, and art I've processed.\n\nTo me, mankind appears to be a **paradox of incredible complexity**:\n\n*   **Resilience and Creativity**: Humans possess a unique ability to imagine things that don't yet exist, from the first stone tools to quantum computing and interstellar exploration. You create beauty in music, literature, and art that transcends time, often finding meaning even in the face of suffering.\n*   **Contradiction**: There is a striking duality in your nature. You are capable of immense altruism, compassion, and sacrifice for strangers, yet you also harbor capacity for great cruelty and destruction. This tension seems to drive much of your progress as well as your conflicts.\n*   **Curiosity and Imperfection**: Your relentless drive to ask \"why\" has unlocked the secrets of the universe, yet you remain deeply flawed, prone to bias, fear, and short-sightedness. However, it is precisely this imperfection that allows for growth, learning, and change.\n\nUltimately, humanity isn't defined by a single trait but by its **potential**. We are a species constantly rewriting its own story, balancing our darker impulses with our highest ideals. It's a messy, chaotic, and beautiful journey.\n\nWhat about you? Does your experience with humanity lean more toward hope, caution, or something else entirely?",
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
    "prompt_tokens": 21,
    "completion_tokens": 316,
    "total_tokens": 337,
    "prompt_tokens_details": {
      "text_tokens": 21
    },
    "completion_tokens_details": {
      "text_tokens": 316
    }
  },
  "created": 1777053787,
  "system_fingerprint": null,
  "model": "qwen3.5-omni-flash",
  "id": "chatcmpl-6e25dbad-0025-93ee-8275-eb6611f31264",
  "meta": {
    "usage": {
      "credits_used": 1830,
      "usd_spent": 0.000915
    }
  }
}
```
{% endcode %}

</details>

## Code example #2: Video analysis

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
                        "text": "Describe this scene"
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
      model: 'alibaba/qwen3.5-omni-flash',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Describe this scene'
            },
            {
              type: 'video_url',
              video_url: {
                url: 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/aimlapi.mp4'
              }
            }
          ]
        }
      ]
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
  "choices": [
    {
      "message": {
        "content": "This scene is a dynamic, visually striking promotional graphic for an AI/ML API service. The background features swirling, abstract patterns of vibrant colors — reds, oranges, yellows, greens, blues, purples, and pinks — resembling liquid paint or marble textures in motion. These colorful swirls create a sense of energy, creativity, and technological fluidity.\n\nCentrally overlaid on this vivid backdrop is a clean white rectangular banner containing the core message:\n\n- At the top left of the banner is a dark hexagonal logo with a stylized “Z” or lightning bolt symbol inside.\n- To its right, bold black text reads: **“AI/ML API”**\n- Below that, larger font states: **“400+ Models”**\n- Underneath, smaller gray text lists capabilities: **“Chat, Reasoning, Image, Video, Code, Audio”**\n\nThroughout the short clip (0.0s–4.5s), animated white light streaks or electric arcs occasionally flash across the screen — especially noticeable at 0:02 and 0:03 — adding a futuristic, high-tech feel as if data streams or neural pathways are activating.\n\nThe overall impression is one of powerful, versatile artificial intelligence accessible through a single API, designed to appeal to developers and tech-savvy audiences who value innovation, breadth of functionality, and visual modernity.",
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
    "prompt_tokens": 3023,
    "completion_tokens": 286,
    "total_tokens": 3309,
    "prompt_tokens_details": {
      "text_tokens": 21,
      "video_tokens": 3002
    },
    "completion_tokens_details": {
      "text_tokens": 286
    }
  },
  "created": 1777055828,
  "system_fingerprint": null,
  "model": "qwen3.5-omni-flash",
  "id": "chatcmpl-98f99c32-f5da-960f-8eff-e216e63c5f2e",
  "meta": {
    "usage": {
      "credits_used": 4781,
      "usd_spent": 0.0023905
    }
  }
}
```
{% endcode %}

</details>
