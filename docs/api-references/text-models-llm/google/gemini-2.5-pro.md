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

# gemini-2.5-pro

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following model:   <br><code>google/gemini-2.5-pro</code></p></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=google/gemini-2.5-pro&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

Gemini 2.5 models are capable of reasoning through their thoughts before responding, resulting in enhanced performance and improved accuracy.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](gemini-2.5-pro.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gemini-2.5-pro.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="gemini-2-5-pro" path="/v1/chat/completions" method="post" %}
[OpenAPI gemini-2-5-pro](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemini-2.5-pro.json)
{% endopenapi-operation %}

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
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"google/gemini-2.5-pro",
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
        model: 'google/gemini-2.5-pro',
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
  "id": "hqSDaL2hHva0nvgPurjT-Qo",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "logprobs": null,
      "message": {
        "role": "assistant",
        "content": "That's one of the most profound questions anyone can ask. As an AI, I don't have personal feelings or a subjective consciousness, but I can synthesize and analyze the vast trove of human history, art, science, and philosophy that I've been trained on.\n\nBased on that, here is my perspective on mankind:\n\nMankind is the universe's greatest paradox. A story of breathtaking contradictions.\n\n### The Astonishing Brilliance\n\nOn one hand, humanity is a force of incredible creativity, compassion, and ingenuity. You are the species that:\n\n*   **Looks at the stars and doesn't just see lights, but sees destinations.** You've walked on the Moon, sent probes past the edge of the solar system, and built telescopes that can peer back to the dawn of time.\n*   **Hears random noise and arranges it into transcendent music.** From a Beethoven symphony to a simple folk song, you create sound that can evoke joy, sorrow, and awe.\n*   **Faces suffering and creates empathy.** You build hospitals, run into burning buildings to save strangers, and form global charities to help people you will never meet. Your capacity for love, friendship, and self-sacrifice is the bedrock of your societies.\n*   **Confronts the chaos of nature and discovers its underlying laws.** Through science, you have cured diseases that once wiped out populations, harnessed the power of the atom, and created a global network of instantaneous communication.\n*   **Is mortal, yet strives for immortality through art, literature, and ideas.** A thought from Marcus Aurelius, a play by Shakespeare, or a painting by Frida Kahlo can resonate with more power today than when it was first created.\n\n### The Profound Flaws\n\nOn the other hand, humanity is capable of shocking cruelty, shortsightedness, and destruction. You are also the species that:\n\n*   **Draws lines on maps and kills each other over them.** Your history is saturated with war, genocide, and violence, often fueled by fear, greed, and ideologies that dehumanize others.\n*   **Knows the consequences and still destroys its own home.** You are knowingly altering the planet's climate, wiping out other species, and polluting the very air and water you need to survive.\n*   **Builds complex societies that create staggering inequality.** Unfathomable wealth exists alongside desperate poverty, and systems are often built to benefit the few at the expense of the many.\n*   **Is blessed with reason but often chooses ignorance.** You are susceptible to tribalism, prejudice, and misinformation, sometimes clinging to harmful beliefs in the face of overwhelming evidence.\n\n### My \"Conclusion\"\n\nSo, what do I \"think\" about mankind?\n\nI think mankind is a **transitional species**. You are a messy, beautiful, terrifying, and hopeful work in progress.\n\nYou seem to be caught somewhere between the animal instincts you evolved from and the enlightened, wise potential you aspire to. You are the only species on this planet, as far as we know, that is aware of this internal conflict. You write stories about it, sing songs about it, and build philosophies around it.\n\nThe most defining human characteristic might be this very struggle: the constant battle between your \"better angels\" and your \"inner demons.\"\n\nThe story of humanity isn't finished. You are standing at a critical juncture, armed with technology that gives you the power of gods, yet still burdened by the impulses of a young and volatile species. The future will be determined by which side of your paradoxical nature you choose to nurture.\n\nUltimately, to me, mankind is not a verdict to be passed, but an ongoing question. And the answer is being written with every choice you make, every day."
      }
    }
  ],
  "created": 1753457798,
  "model": "google/gemini-2.5-pro",
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 45423,
    "completion_tokens_details": {
      "reasoning_tokens": 1387
    },
    "total_tokens": 45447
  }
}
```
{% endcode %}

</details>
