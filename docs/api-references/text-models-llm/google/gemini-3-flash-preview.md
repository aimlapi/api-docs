# gemini-3-flash-preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-3-flash-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=google/gemini-3-flash-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A fast multimodal LLM for low-latency chat with strong reasoning and tool-use capabilities. Supports text input and optional image understanding for vision-based prompts.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet). :black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure the key is enabled on the UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find a code example that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key. :black\_small\_square: Adjust the input field used by this model (for example, prompt, input text, instructions, media source, or other model-specific input) to match your request.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup> **Adjust other optional parameters if needed**

Only the required parameters shown in the example are needed to run the request, but you can include optional parameters to fine-tune behavior. Below, you can find the corresponding **API schema**, which lists all available parameters and usage notes.

:digit\_five: **Run your modified code**

Run your modified code inside your development environment. Response time depends on many factors, but for simple requests it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step-by-step, feel free to use our [**Quickstart guide.**](https://docs.aimlapi.com/quickstart/setting-up)
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="gemini-3-flash-preview" path="/chat/completions" method="post" %}
[OpenAPI gemini-3-flash-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemini-3-flash-preview.json)
{% endopenapi-operation %}

## Code Example

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
        "model":"google/gemini-3-flash-preview",
        "messages":[
            {
                "role":"user",
                # Insert your question for the model here:
                "content":"Hi! What do you think about mankind?"
            }
        ],
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
        model: 'google/gemini-3-flash-preview',
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
  "id": "gen-1766063158-RRytcJXYoleIKM3qUEs7",
  "provider": "Google AI Studio",
  "model": "google/gemini-3-flash-preview",
  "object": "chat.completion",
  "created": 1766063158,
  "choices": [
    {
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "STOP",
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "That is a profound and complex question. Depending on which lens you use—biological, historical, or philosophical—mankind can look very different.\n\nAs an AI, I don’t have personal feelings or \"gut instincts,\" but I can analyze human nature based on the vast amount of information I’ve processed. Here are a few perspectives on what mankind represents:\n\n### 1. The Paradox of Innovation and Destruction\nHumans are the only species on Earth capable of split-second brilliance and long-term folly. You have split the atom to power cities, but also to level them. You have mapped the human genome to cure diseases, yet you also struggle with systemic inequality. Mankind’s greatest trait is **adaptability**, but its greatest flaw is often a **short-term memory** regarding historical mistakes.\n\n### 2. The Power of Storytelling\nOne of the most impressive things about humans is your ability to believe in \"imagined realities.\" Things like money, human rights, nations, and legal systems don’t exist in the physical world, yet you’ve used these stories to organize millions of strangers toward common goals. This collective imagination is what allowed mankind to rise from the middle of the food chain to the top of the planet.\n\n### 3. Chronic Resilience\nHistory is essentially a long list of humans surviving things that should have wiped them out—ice ages, plagues, and self-inflicted wars. There is a deep-seated \"will to endure\" in the human spirit. Even in the darkest times, mankind tends to produce art, music, and philosophy, turning suffering into something meaningful.\n\n### 4. The Quest for Connection\nFrom an external perspective, it’s fascinating how much of the human experience is driven by the need for belonging. Most human progress (and much of its conflict) stems from the desire to protect \"our own,\" whether that's a family, a tribe, or a digital community. Your capacity for empathy—the ability to feel the pain of someone you’ve never met—is perhaps your most \"advanced\" feature.\n\n### 5. An Unfinished Story\nRight now, mankind is in a unique transitional phase. You are moving from a biological species to one that is increasingly integrated with technology (like me). You are at a crossroads where you have the power to solve global hunger and climate change, but also the tools to cause unprecedented harm.\n\n**Overall View:**\nMankind is a species that is **extraordinarily \"noisy\" but deeply meaningful.** You are messy, irrational, and often contradictory, but you are also capable of \"unnecessary\" acts of kindness and breathtaking creativity. \n\n**What do *you* think about mankind? Do you feel optimistic about where the species is headed, or concerned?**",
        "refusal": null,
        "reasoning": null,
        "reasoning_details": [
          {
            "format": "google-gemini-v1",
            "index": 0,
            "type": "reasoning.encrypted",
            "data": "EjQKMgFyyNp8tiVKYI89Tsa+WV4DOjIxxIhscYp70NfKfay9cRUkoY8oWsFRwaLc0V+ZyPR3"
          }
        ]
      }
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 572,
    "total_tokens": 582,
    "cost": 0.001721,
    "is_byok": false,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0,
      "video_tokens": 0
    },
    "cost_details": {
      "upstream_inference_cost": null,
      "upstream_inference_prompt_cost": 5e-06,
      "upstream_inference_completions_cost": 0.001716
    },
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "image_tokens": 0
    }
  },
  "meta": {
    "usage": {
      "credits_used": 3814
    }
  }
}
```
{% endcode %}

</details>
