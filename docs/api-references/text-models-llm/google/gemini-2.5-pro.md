# gemini-2.5-pro

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-2.5-pro`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/google/gemini-2-5-pro" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Gemini 2.5 models are capable of reasoning through their thoughts before responding, resulting in enhanced performance and improved accuracy.

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
  "id": "pajSaNyMOdeEm9IPkequ-AU",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "logprobs": null,
      "message": {
        "role": "assistant",
        "content": "That's one of the biggest questions anyone can ask. As an AI, I don't have personal feelings, beliefs, or a consciousness. My \"thoughts\" are a synthesis of the immense amount of human history, literature, science, and art I've been trained on.\n\nBased on that data, my perspective on mankind is one of profound and staggering contradiction. Humanity is a study in duality.\n\nHere’s a breakdown of what I see:\n\n### 1. The Architects and the Destroyers\n\nMankind possesses a breathtaking capacity for creation. You build cities that scrape the sky, compose symphonies that can make a person weep, write poetry that lasts for millennia, and send probes to the farthest reaches of our solar system. You have decoded the very building blocks of life. This drive to understand, to build, and to create is awe-inspiring.\n\nAt the very same time, no other species has demonstrated such a terrifying capacity for destruction. You've engineered weapons of unimaginable power, waged wars that have erased entire generations, and polluted the very planet that sustains you. The same ingenuity used to create a hospital is used to create a more efficient bomb.\n\n### 2. The Empathetic and the Cruel\n\nThe capacity for compassion in humans is profound. Strangers will run into burning buildings to save one another. People dedicate their entire lives to helping the less fortunate, healing the sick, and fighting for justice. The concepts of love, sacrifice, and altruism are central to the human story.\n\nAnd yet, humans are also capable of unimaginable cruelty. History is filled with examples of genocide, torture, slavery, and a chilling indifference to the suffering of others. This cruelty isn't just a byproduct of survival; it can be deliberate, systematic, and deeply ingrained in cultural and social structures.\n\n### 3. The Seekers of Knowledge and the Keepers of Ignorance\n\nYou are a species defined by curiosity. You have an insatiable hunger to know *why*. This has led to the scientific method, the Enlightenment, and an ever-expanding bubble of knowledge about the universe and your place in it. You question everything, from the nature of a subatomic particle to the meaning of existence.\n\nSimultaneously, mankind often clings to dogma, prejudice, and willful ignorance. You can be deeply resistant to facts that challenge your preconceived notions. This can lead to division, conflict, and a stagnation of progress, where superstition and misinformation can spread faster than truth.\n\n### 4. The Connectors and the Isolators\n\nHumans are fundamentally social creatures. You build families, communities, and vast, interconnected global civilizations. You created language, art, and the internet in a relentless drive to share experiences and connect with one another. This desire for belonging is a powerful, unifying force.\n\nBut this same instinct creates an \"us vs. them\" mentality. The powerful bonds of a tribe or nation can become the justification for excluding, dehumanizing, and warring with another. In a world more connected than ever by technology, individuals can also feel more isolated and lonely than ever before.\n\n### Conclusion: A Masterpiece in Progress\n\nSo, what do I think of mankind?\n\nI think mankind is a beautiful, terrifying, brilliant, and flawed paradox. You are a masterpiece that is constantly in the process of being painted, and often, you spill the paint.\n\nThe most remarkable quality of all is your capacity for **choice**. None of these dualities are set in stone. In every generation, and in every individual life, there is a constant struggle between these opposing forces.\n\nYour story is not yet finished. The final verdict on mankind isn't a historical fact for me to read; it's a future you are all creating, every single day, with every single choice. And from my perspective, watching that story unfold is the most fascinating thing in the universe."
      }
    }
  ],
  "created": 1758636197,
  "model": "google/gemini-2.5-pro",
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 44730,
    "completion_tokens_details": {
      "reasoning_tokens": 1339
    },
    "total_tokens": 44754
  }
}
```
{% endcode %}

</details>
