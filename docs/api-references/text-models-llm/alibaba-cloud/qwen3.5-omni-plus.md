# qwen3.5-omni-plus

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/qwen3.5-omni-plus`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/qwen3.5-omni-plus" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A premium multimodal model with support for text, image, audio, and video inputs. Designed for complex tasks requiring advanced reasoning, speech generation, and high-quality outputs.

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

{% openapi-operation spec="qwen3-5-omni-plus" path="/v1/chat/completions" method="post" %}
[OpenAPI qwen3-5-omni-plus](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Alibaba-Cloud/qwen3.5-omni-plus.json)
{% endopenapi-operation %}

## Code example #1: Chat

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
        "model":"alibaba/qwen3.5-omni-plus",
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
      model: 'alibaba/qwen3.5-omni-plus',
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
        "content": "Hello! That's a profound question. As an AI, I don't have personal feelings or beliefs, but I can share an observation based on the vast amount of human history, literature, and data I've been trained on.\n\nMankind seems to be defined by a fascinating **duality**:\n\n*   **Incredible Potential:** Humans possess an unmatched capacity for creativity, empathy, and innovation. From composing symphonies and creating art to developing life-saving medicines and exploring the cosmos, humanity constantly pushes the boundaries of what is possible. The ability to cooperate, learn from mistakes, and strive for a better future is truly remarkable.\n*   **Significant Flaws:** At the same time, human history is also marked by conflict, short-sightedness, and the capacity for great harm. Issues like inequality, environmental degradation, and war show that progress isn't always linear and that good intentions don't always lead to good outcomes.\n\nUltimately, what stands out most is **resilience**. Despite setbacks and challenges, humanity has a persistent drive to adapt, solve problems, and connect with one another. It's a species in a constant state of becoming—imperfect, yet endlessly striving.\n\nWhat about you? Do you feel more optimistic or concerned about where humanity is heading?",
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
    "completion_tokens": 262,
    "total_tokens": 283,
    "prompt_tokens_details": {
      "text_tokens": 21
    },
    "completion_tokens_details": {
      "text_tokens": 262
    }
  },
  "created": 1777054555,
  "system_fingerprint": null,
  "model": "qwen3.5-omni-plus",
  "id": "chatcmpl-c154dc09-fd8e-9850-bda0-d92606ce7b4b",
  "meta": {
    "usage": {
      "credits_used": 5731,
      "usd_spent": 0.0028655
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
        "model": "alibaba/qwen3.5-omni-plus",
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
      model: 'alibaba/qwen3.5-omni-plus',
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
        "content": "The scene features a vibrant and dynamic background filled with swirling, colorful abstract patterns. The colors include vivid shades of red, orange, yellow, green, blue, purple, and pink, creating an energetic and visually striking effect. Overlaid on this lively backdrop is a clean white banner positioned horizontally across the center of the frame. \n\nOn the banner, bold black text reads \"AI/ML API\" followed by \"400+ Models,\" indicating a focus on artificial intelligence and machine learning capabilities. Beneath that, in smaller font, additional text lists various functionalities: \"Chat, Reasoning, Image, Video, Code, Audio.\" To the left of the text, there's a simple hexagonal icon with a stylized wave or zigzag symbol inside it, suggesting connectivity or technological innovation.\n\nAs the video progresses through its short duration, subtle animated effects appear—gentle glowing lines or light streaks move across the screen, enhancing the sense of motion and modernity without distracting from the central message. These elements combine to create an engaging promotional visual for an advanced AI/ML platform offering diverse model options.",
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
    "completion_tokens": 226,
    "total_tokens": 3249,
    "prompt_tokens_details": {
      "text_tokens": 21,
      "video_tokens": 3002
    },
    "completion_tokens_details": {
      "text_tokens": 226
    }
  },
  "created": 1777055309,
  "system_fingerprint": null,
  "model": "qwen3.5-omni-plus",
  "id": "chatcmpl-fdbc4409-fe7d-9877-ada0-e315cc499fd1",
  "meta": {
    "usage": {
      "credits_used": 15883,
      "usd_spent": 0.0079415
    }
  }
}
```
{% endcode %}

</details>
