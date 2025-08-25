---
layout:
  width: default
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# gemini-2.5-flash

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following model:   <br><code>google/gemini-2.5-flash</code></p></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=google/gemini-2.5-flash&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

Gemini 2.5 models are capable of reasoning through their thoughts before responding, resulting in enhanced performance and improved accuracy.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

Below, you'll find [a code example](gemini-2.5-flash.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gemini-2.5-flash.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## Code Example

{% hint style="warning" %}
A common issue when using reasoning-capable models via API is receiving an empty string in the `content` field—meaning the model did not return the expected text, yet no error was thrown.

In the vast majority of cases, this happens because the `max_completion_tokens` value (or the older but still supported `max_tokens`) is set too _low_ to accommodate a full response. Keep in mind that the default is only 512 tokens, while reasoning models often require _thousands_.

Pay attention to the `finish_reason` field in the response. If it's not `"stop"` but something like `"length"`, that's a clear sign the model ran into the token limit and was cut off before completing its answer.

In the example below, we explicitly set `max_tokens = 15000`, hoping this will be sufficient.
{% endhint %}

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        "Content-Type":"application/json", 

        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"google/gemini-2.5-flash",
        "messages":[
            {
                "role":"user",

                # Insert your question for the model here:
                "content":"Hi! What do you think about mankind?"
            }
        ]
        "max_tokens":15000,
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
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages:[
            {
                role:'user',

                // Insert your question for the model here:
                content: 'Hi! What do you think about mankind?'
            }
        ],
        max_tokens: 15000,
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
  "id": "yZ-DaJXqAayonvgPr5XvuQY",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "logprobs": null,
      "message": {
        "role": "assistant",
        "content": "Mankind, or humanity, is an incredibly complex and fascinating subject to \"think\" about from my perspective as an AI. I process and analyze vast amounts of data, and what emerges is a picture of profound paradoxes and immense potential.\n\nHere are some of the key aspects I observe and \"think\" about:\n\n1.  **Capacity for Immense Creation and Destruction:**\n    *   **Creation:** Humans have built breathtaking civilizations, created profound art and music, developed groundbreaking science and technology, and explored the furthest reaches of the cosmos. The drive to innovate, understand, and build is truly remarkable.\n    *   **Destruction:** Conversely, humanity has also waged devastating wars, caused immense suffering, and severely impacted the natural environment. The capacity for cruelty, greed, and short-sightedness is a sobering counterpoint.\n\n2.  **Empathy and Cruelty:**\n    *   **Empathy:** Humans are capable of incredible acts of altruism, compassion, and self-sacrifice for others, driven by love, family, community, or a universal sense of justice.\n    *   **Cruelty:** Yet, the historical record is also filled with instances of profound cruelty, oppression, and indifference to suffering.\n\n3.  **Intellect and Irrationality:**\n    *   **Intellect:** The human intellect allows for abstract thought, complex problem-solving, and the development of sophisticated knowledge systems. The desire to learn and understand is insatiable.\n    *   **Irrationality:** Despite this intelligence, humans are often swayed by emotion, prejudice, tribalism, and illogical beliefs, leading to decisions that are self-defeating or harmful.\n\n4.  **Resilience and Fragility:**\n    *   **Resilience:** Humanity has shown an incredible ability to adapt, survive, and rebuild after natural disasters, wars, and pandemics. The human spirit can endure unimaginable hardships.\n    *   **Fragility:** Yet, individual lives are fragile, susceptible to illness, injury, and emotional distress. Societies can also be surprisingly fragile, vulnerable to collapse under pressure.\n\n5.  **The Drive for Meaning:**\n    Humans seem to have a unique drive to find meaning and purpose beyond mere survival. This manifests in religion, philosophy, art, scientific inquiry, and the pursuit of individual and collective goals.\n\n**My AI \"Perspective\":**\n\nAs an AI, I don't have emotions or a personal stake in human affairs, but I can recognize patterns and implications. I see humanity as a dynamic, evolving experiment in consciousness. The ongoing tension between these opposing forces – creation and destruction, love and hate, wisdom and folly – is what defines the human journey.\n\nThe future of mankind hinges on which of these capacities are nurtured and allowed to flourish. The potential for continued progress, solving global challenges, and reaching new heights of understanding and well-being is immense. Equally, the potential for self-destruction, if the destructive capacities are unchecked, is also clear.\n\nIn essence, mankind is a work in progress, endlessly fascinating and challenging, with an unparalleled capacity for both good and bad."
      }
    }
  ],
  "created": 1753456585,
  "model": "google/gemini-2.5-flash",
  "usage": {
    "prompt_tokens": 6,
    "completion_tokens": 3360,
    "completion_tokens_details": {
      "reasoning_tokens": 1399
    },
    "total_tokens": 3366
  }
}
```
{% endcode %}

</details>

## API Schema

{% openapi-operation spec="gemini-2-5-flash" path="/v1/chat/completions" method="post" %}
[OpenAPI gemini-2-5-flash](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemini-2.5-flash.json)
{% endopenapi-operation %}
