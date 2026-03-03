# gemini-3-pro-preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-3-pro-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/google/gemini-3-pro-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

This model is optimized for advanced agentic tasks, featuring strong reasoning, coding skills, and superior multimodal understanding. It notably improves on [Gemini 2.5 Pro](gemini-2.5-pro.md) in complex instruction following and output efficiency.

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

{% openapi-operation spec="gemini-3-pro-preview" path="/v1/chat/completions" method="post" %}
[OpenAPI gemini-3-pro-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemini-3-pro-preview.json)
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
        "model":"google/gemini-3-pro-preview",
        "messages":[
            {
                "role":"user",
                "content":"Hello"  # insert your prompt here, instead of Hello
            }
        ],
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
      // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-3-pro-preview',
      messages:[{
              role:'user',
              content: 'Hello'}  // Insert your question instead of Hello
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
  "id": "gen-1763566638-cisWU4XUfAZASsAfmDrg",
  "provider": "Google AI Studio",
  "model": "google/gemini-3-pro-preview",
  "object": "chat.completion",
  "created": 1763566638,
  "choices": [
    {
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "STOP",
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?",
        "refusal": null,
        "reasoning": "**Greeting Initial Response**\n\nI've analyzed the user's \"Hello\" and identified it as a greeting. My current focus is on formulating a polite and helpful response. I'm considering options like a standard \"Hello! How can I help?\" as well as more unique and relevant variations.\n\n\n**Refining the Response**\n\nI've narrowed down the potential greetings to three options. Each aims to be polite and readily offer assistance. After comparing \"Hi there! What can I do for you?\", \"Greetings. How may I assist you?\", and the standard \"Hello! How can I help you today?\", I'm leaning towards the standard option for its balance of politeness and directness. I'm focusing on the best output!\n\n\n",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "**Greeting Initial Response**\n\nI've analyzed the user's \"Hello\" and identified it as a greeting. My current focus is on formulating a polite and helpful response. I'm considering options like a standard \"Hello! How can I help?\" as well as more unique and relevant variations.\n\n\n**Refining the Response**\n\nI've narrowed down the potential greetings to three options. Each aims to be polite and readily offer assistance. After comparing \"Hi there! What can I do for you?\", \"Greetings. How may I assist you?\", and the standard \"Hello! How can I help you today?\", I'm leaning towards the standard option for its balance of politeness and directness. I'm focusing on the best output!\n\n\n",
            "format": "google-gemini-v1",
            "index": 0
          },
          {
            "type": "reasoning.encrypted",
            "data": "Eq0FCqoFAdHtim9XD7O+H/hfzapYW20BA9q/g/9dXgaX1KKQhwROsHomqV+PmfoBxqI9j82XTwWiSO10c5HzcYgkBbUAAzHb5QtjiKrwNvSCT6mA9eUbIqR5E8GC3AVSJ5mHcc3kYZF9XgpcWds9ANktELL+IegNpLrn9S4UZCT5MhRCIrG3zfIee4bwDWSmf72OU5AewTaURSfRynTRf29/0Jjd2Qvgn6/1N8lbQlGptw193mJwg7VoB34dDbSIdNNbjRcUTaGvv2Smu11Wj/tluBTXcpXzmIqJXSbzA761p5ygDDIef9hjIS1yPpUScwZEcsGnntZcifd3fT8dKn1EiYf0PTEdJ29KO4Kv4n0KWQdd71S9da49PqpJmciPQHZwXzLp/SU00tI4eizIxkMnu3uMW/bOGhRP6/xoLOipDP8lFONYbOgHOaRURfVu40mIckQ8lij/IcW/FUAce7qdVuOSdy8Jx+J11PaoIAeb9riZzccfTovTefXyGxs4cKFYvYoUfdflk92bQmDi1WqMFyWvgMJLSzvcqRAq6deV8t1BzJTrPqJVG+GzY3o+FeuZavuuVt0LfY7lfSoTpXNSXagsxwthID05M/wcRyFUHPZwQp7EIXyKhvIUCiWhtib04xKAQdVZWIKsxzZYuOG+bjlSxjnE/2uEVg6yJCFwWBaY52HovHCGrwtsScIgqUvo4WMbdgW/hohmJhh3dwco25klZjv1gkQcg2X7N+dyOBSP0keExdktk9fkDXg6b/JKhKGaiHMgmww3K9/P4kxYOE6djcoSWSm3IwJ2sMasC00iB8Y2PtxDjjeUkPhTH/DzgrzxqrJQMVw0/d3/J4rEDUk9jfH1MI3NGJanznICFPSPRnWCyGv46VnMSn5NmrGRNTjdEa1GUtMgxv5/1w==",
            "format": "google-gemini-v1",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "prompt_tokens": 2,
    "completion_tokens": 158,
    "total_tokens": 160,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 149,
      "image_tokens": 0
    }
  },
  "meta": {
    "usage": {
      "tokens_used": 4211
    }
  }
}
```
{% endcode %}

</details>
