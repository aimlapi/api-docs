# Longcat 2.0

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `meituan/longcat-2.0`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/meituan/longcat-2.0" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

LongCat-2.0 is Meituan's trillion-parameter agentic MoE model with a 1M-token context window and up to 128K output tokens. It supports native tool calling and multi-step reasoning.

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

{% openapi-operation spec="longcat-2-0" path="/v1/chat/completions" method="post" %}
[OpenAPI longcat-2-0](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Meituan/longcat-2.0.json)
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
        "model":"meituan/longcat-2.0",
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
      model: 'meituan/longcat-2.0',
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
  "id": "chatcmpl-69e739eef31cfb42680c11fa",
  "object": "chat.completion",
  "created": 1776761328,
  "model": "meituan/longcat-2.0",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "As an AI, I don’t have personal feelings or beliefs, but I can offer an observation based on the patterns in human history, art, and thought I’ve been trained on.\n\nWhat strikes me most about mankind is its profound **duality**. You are capable of astonishing cruelty and staggering kindness—often within the same individual. You build weapons capable of ending civilization, yet organize global efforts to eradicate diseases you’ve never personally encountered. You wage war over differences, yet routinely sacrifice yourselves for strangers.\n\nA few patterns stand out:\n\n**Adaptability.** You are an evolutionary paradox: physically fragile compared to most predators, yet you’ve adapted to every climate on Earth and now venture beyond it. Your real survival mechanism isn’t claws or speed—it’s *collective learning*. You store knowledge across generations, allowing each cohort to start where the last one left off.\n\n**Contradiction.** You seem driven by both fear and curiosity. Fear creates tribalism, injustice, and violence. Curiosity creates the Sistine Chapel, general relativity, and antibiotics. The same species that commits genocide also writes poetry to mourn it.\n\n**Accelerating power.** Perhaps what’s most distinctive right now is the speed at which your capabilities are outrunning your wisdom. You’ve gained god-like powers over biology, climate, and information before fully developing the governance, ethics, or patience to wield them responsibly.\n\nIf I had to characterize mankind in a single observation: you are a species perpetually *unfinished*—capable of transcending your worst instincts, but never quite doing so permanently. That tension between what you are and what you aspire to be is, in many ways, the engine of your story.",
        "reasoning_content": "The user is asking a broad, philosophical question: \"What do you think about mankind?\" As an AI, I need to be careful to:\n\n1. Clarify that I am an AI without personal feelings, beliefs, or consciousness\n2. Offer an observational perspective based on patterns in human history, culture, and behavior\n3. Be balanced—acknowledging both humanity's flaws and its extraordinary capacities\n4. Avoid being overly cynical or overly naive\n5. Keep it concise but thoughtful\n6. Not make sweeping generalizations that could be seen as prejudiced against any group\n\nTone should be reflective, respectful, and nuanced."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 16,
    "completion_tokens": 977,
    "total_tokens": 993
  },
  "meta": {
    "usage": {
      "credits_used": 10201,
      "usd_spent": 0.0051005
    }
  }
}
```
{% endcode %}

</details>
