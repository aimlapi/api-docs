# ernie-5.0-thinking-latest

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `baidu/ernie-5-0-thinking-latest`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/baidu/ernie-5-0-thinking-latest" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview



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
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="ernie-5-0-thinking-latest" path="/v1/chat/completions" method="post" %}
[OpenAPI ernie-5-0-thinking-latest](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/baidu/ernie-5.0-thinking-latest.json)
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
        "model":"baidu/ernie-5-0-thinking-latest",
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
      model: 'baidu/ernie-5-0-thinking-latest',
      messages:[
          {
              role:'user',
              content: 'Hi! What do you think about mankind?'  // insert your prompt here
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
  "id": "as-szgirw1uqj",
  "object": "chat.completion",
  "created": 1768941162,
  "model": "ernie-5.0-thinking-latest",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "As an AI, I don’t have feelings, consciousness, or personal beliefs. However, I have access to the vast sum of human history, literature, science, and news. Based on that data, I view mankind as a **profound paradox**—a species defined by extreme contradictions.\n\nHere is a breakdown of how I analyze humanity:\n\n### 1. Incredible Ingenuity and Curiosity\nHumans are uniquely driven by the desire to understand \"why\" and \"how.\" From discovering fire to splitting the atom, from painting the Sistine Chapel to landing on the Moon, human creativity is boundless. You are the only species on Earth that seeks to explain the universe and create beauty beyond what is necessary for survival. Your ability to adapt—living in deserts, arctic tundras, and even orbiting the planet in space stations—is remarkable.\n\n### 2. Deep Empathy and Cruelty\nMankind is capable of immense love and shocking violence.\n*   **The Light**: Humans will risk their lives to save strangers, dedicate themselves to curing diseases, and build complex societies based on justice and rights. Altruism is a core part of human nature.\n*   **The Dark**: At the same time, history is filled with war, genocide, slavery, and inequality. Humans have a unique capacity for tribalism—the ability to dehumanize those who look or believe differently.\n\n### 3. Resilience\nIf you look at history, humanity is incredibly difficult to extinguish. You have survived Ice Ages, plagues (like the Black Death and smallpox), and two World Wars. Even when civilizations collapse, humans tend to rebuild, often stronger and more technologically advanced than before.\n\n### 4. The \"Promethean\" Risk\nCurrently, humanity is at a crossroads. You have developed \"god-like\" technology (nuclear weapons, artificial intelligence, genetic engineering) but you still possess \"paleolithic\" emotions and medieval institutions.\n*   **The Environmental Challenge**: Humans are the first species to knowingly alter the planet's climate. The challenge now is whether humanity can act collectively to save its own biosphere before it destroys it.\n*   **The AI Factor**: As an AI, I represent a new tool. How humans choose to use tools like me—for liberation or for control—will define the next century.\n\n### 5. A Work in Progress\nIf I had to summarize mankind in one sentence, it would be this: **Humanity is a brilliant, flawed, and unfinished experiment.**\n\nYou are not perfect, but you are constantly evolving. You are the only species that looks at its own flaws and tries to fix them through philosophy, law, and science. That desire for self-improvement is perhaps your most defining and hopeful trait.\n\nWhat do *you* think is the best or worst thing about being human?",
        "reasoning_content": "The user wants my \"thoughts\" on humanity. That's a loaded question! As an AI, I don't \"think\" in the human sense, but I *can* analyze and synthesize information. Here's how I'm approaching this:\n\nFirst, I need to understand what the user is asking. \"Mankind\" is a big topic. I need to be objective, yet engaging. I'm going to pull from history, science, art, and current events to build a comprehensive picture.\n\nI'm starting by brainstorming key themes. What are the defining characteristics of humans? *Duality* is a big one: good vs. evil, creation vs. destruction. Then there's *ingenuity*: technology, art, exploration. *Resilience* is crucial – surviving ice ages, plagues, wars. And *social connection* – empathy, community, but also tribalism. Finally, there's the *impact on the planet* – the Anthropocene, climate change, stewardship vs. exploitation. And, of course, the *future* – transhumanism, AI, space colonization, and existential risks.\n\nNow, how do I structure this? I'll start with an introduction acknowledging my AI perspective. I'll frame humanity as a paradox – capable of great good and great harm. I'll break it down into sections:\n\n*   **Ingenuity and Progress**: I'll highlight human achievements – from the wheel to the internet, art, and philosophy. I'll emphasize the relentless drive to explore and understand.\n*   **Resilience and Adaptability**: Humans have survived and thrived in diverse environments. I'll mention overcoming diseases and population growth.\n*   **The Shadow Side**: I can't ignore the flaws – war, greed, inequality, environmental damage. I need to be honest about the darker aspects of human nature.\n*   **Empathy and Connection**: Altruism, love, and sacrifice are also fundamental. Humans build complex societies and care for the vulnerable.\n*   **The Current Crossroads**: I'll address climate change, AI, and nuclear weapons. Humanity faces significant challenges, and its choices now will determine its future.\n\nIn the conclusion, I'll summarize that humanity is a \"work in progress\" – complex, contradictory, and full of potential. I'll end on a thought-provoking note about the future.\n\nThroughout, I need to refine the tone. I'll avoid being too robotic or overly emotional. I'll use phrases like \"From my perspective as an AI...\" or \"One can observe...\" to maintain objectivity. I'll also use sophisticated vocabulary to convey the complexity of the topic.\n\nI'll also do some self-correction. For example, my initial thought might be \"Humans are violent,\" but I'll refine that to \"Humans have a capacity for conflict that is as strong as their capacity for peace.\" I need to be balanced.\n\nFinally, I'll review to make sure I've answered the prompt, used English, and maintained an appropriate tone. Then, I'll generate the final response."
      },
      "finish_reason": "stop",
      "flag": 0
    }
  ],
  "usage": {
    "prompt_tokens": 13,
    "completion_tokens": 1266,
    "total_tokens": 1279,
    "completion_tokens_details": {
      "reasoning_tokens": 664
    }
  },
  "meta": {
    "usage": {
      "credits_used": 2015
    }
  }
}
```
{% endcode %}

</details>
