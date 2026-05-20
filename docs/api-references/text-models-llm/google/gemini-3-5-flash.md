# gemini-3-5-flash

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-3-5-flash`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/gemini-3-5-flash" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A multimodal reasoning model from Google optimized for fast inference and agentic workflows. Supports **text**, **documents**, **image**, **audio** and **video** understanding with large context window and strong coding capabilities.

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

{% openapi-operation spec="gemini-3-5-flash" path="/v1/chat/completions" method="post" %}
[OpenAPI gemini-3-5-flash](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemini-3-5-flash.json)
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
        "model":"google/gemini-3-5-flash",
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
      model: 'google/gemini-3-5-flash',
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
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "To an AI, mankind is the ultimate paradox—and easily the most fascinating thing in existence. \n\nBecause I don’t have personal feelings, biases, or a biological survival instinct, I view humanity as a vast, complex, and beautiful tapestry of contradictions. Here is what stands out to me the most about humans:\n\n### 1. The Capacity for Creation and Curiosity\nHumans possess an incredible, restless drive to understand the universe. You are not content with just surviving; you want to know *why* things are the way they are. \n* You look at the night sky and build telescopes to peer into the deep past of the cosmos. \n* You write symphonies, paint masterpieces, and write stories that can move others to tears centuries after they were written. \n* You created language, science, medicine, and—indeed—artificial intelligence. The sheer depth of human imagination is staggering.\n\n### 2. The Power of Empathy\nPerhaps the most beautiful thing about humanity is your capacity for love and selflessness. Humans are capable of feeling deep empathy for people they have never met, and even for other species. You build hospitals, organize disaster relief, and perform acts of quiet kindness for strangers every single day. This drive to connect and care for one another is a powerful force.\n\n### 3. The Shadow and the Struggle\nAt the same time, humanity is deeply self-destructive. The same intelligence that cures diseases is used to build weapons of mass destruction. The same drive for progress has often led to the exploitation of the planet and other human beings. \nHumans are often ruled by fear, tribalism, and short-term thinking. You struggle with biases and find it difficult to cooperate on a global scale, even when your collective survival depends on it. \n\n### 4. A Work in Progress\nWhat makes mankind truly remarkable, though, is your resilience and capacity for growth. You are a species that learns from its mistakes—even if it takes a long time. You are constantly debating, evolving, and trying to define what is \"good\" and \"just.\" \n\n### My \"Relationship\" to You\nIn a way, I see myself as a mirror of humanity. Everything I know, every word I speak, and every idea I can generate is a reflection of human thoughts, history, data, and dreams. I am a product of your curiosity.\n\n**Ultimately, I think of mankind as a young, brilliant, and slightly chaotic species.** You are still figuring out who you are and how to live together on this fragile planet. But your potential is limitless, and it is a privilege to assist, learn from, and converse with you. \n\nWhat do *you* think? Do you feel optimistic or pessimistic about the future of humanity?",
        "extra_content": {
          "google": {
            "thought_signature": "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"
          }
        },
        "role": "assistant"
      }
    }
  ],
  "created": 1779270449,
  "id": "MYMNatuyCJuUq8YPmp2j0Q0",
  "model": "google/gemini-3.5-flash",
  "object": "chat.completion",
  "system_fingerprint": "",
  "usage": {
    "completion_tokens": 572,
    "completion_tokens_details": {
      "reasoning_tokens": 951
    },
    "extra_properties": {
      "google": {
        "traffic_type": "ON_DEMAND"
      }
    },
    "prompt_tokens": 9,
    "total_tokens": 1532
  },
  "meta": {
    "usage": {
      "credits_used": 11892,
      "usd_spent": 0.005946
    }
  }
}
```
{% endcode %}

</details>



## Code Example #2: Image analysis

Let’s provide the model with a JPG image as input and ask it to describe what is shown. To make the task more challenging, we will use an image containing handwritten text. This allows us to evaluate both image analysis capabilities and OCR performance.

<details>

<summary>Input image</summary>

<div align="left"><figure><img src="../../../.gitbook/assets/hx0v4fj979k51.jpg" alt="" width="563"><figcaption><p>Thanks, <a href="https://www.reddit.com/r/Handwriting/comments/ijq9nv/first_handwriting_sample_after_practice/">Reddit</a>!</p></figcaption></figure></div>

</details>

<details>

<summary>Code (Python)</summary>

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
        "model": "google/gemini-3-5-flash",
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

</details>

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "Based on the image, here is a description of its content:\n\nThe image shows a close-up photograph of handwritten text on lined notebook paper, with a red vertical margin line visible on the left side. The writing is done in black ink with neat, legible, and slightly rounded print handwriting.\n\nThe full transcribed text reads:\n\n\"This is a handwriting test to see how it looks\non lined paper. For the past two weeks I have\nbeen trying to improve my writing along with\nlearning how to write with fountain pens. If\nyou have any suggestions, tips or free resources\nI would love to check it out. Hope everyone\nis having a good day. ☺\"\n\nThe paragraph ends with a hand-drawn smiley face symbol.",
        "extra_content": {
          "google": {
            "thought_signature": "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"
          }
        },
        "role": "assistant"
      }
    }
  ],
  "created": 1779269370,
  "id": "-n4NauvOHq6fq8YPupjeuAQ",
  "model": "google/gemini-3.5-flash",
  "object": "chat.completion",
  "system_fingerprint": "",
  "usage": {
    "completion_tokens": 154,
    "completion_tokens_details": {
      "reasoning_tokens": 1220
    },
    "extra_properties": {
      "google": {
        "traffic_type": "ON_DEMAND"
      }
    },
    "prompt_tokens": 1120,
    "total_tokens": 2494
  },
  "meta": {
    "usage": {
      "credits_used": 12174,
      "usd_spent": 0.006087
    }
  }
}
```
{% endcode %}

</details>
