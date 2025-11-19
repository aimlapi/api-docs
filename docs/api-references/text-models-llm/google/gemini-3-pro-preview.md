# gemini-3-pro-preview

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following list of our models:</p><ul><li><code>google/gemini-3-pro-preview</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=google/gemini-3-pro-preview&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

This model is optimized for advanced agentic tasks, featuring strong reasoning, coding skills, and superior multimodal understanding. It notably improves on [Gemini 2.5 Pro](gemini-2.5-pro.md) in complex instruction following and output efficiency.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](gemini-3-pro-preview.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gemini-3-pro-preview.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
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
