# ernie-5.0-thinking-preview

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `baidu/ernie-5-0-thinking-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/baidu/ernie-5-0-thinking-preview" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A reasoning-focused model designed for complex, multi-step problem solving. It improves accuracy on analytical tasks by producing explicit reasoning.

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

{% openapi-operation spec="ernie-5-0-thinking-preview" path="/v1/chat/completions" method="post" %}
[OpenAPI ernie-5-0-thinking-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/baidu/ernie-5.0-thinking-preview.json)
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
        "model":"baidu/ernie-5-0-thinking-preview",
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
      model: 'baidu/ernie-5-0-thinking-preview',
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
  "id": "as-yhapvjf5ht",
  "object": "chat.completion",
  "created": 1768941527,
  "model": "ernie-5.0-thinking-preview",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "As an AI, I don’t have feelings, consciousness, or personal beliefs. I don’t experience joy, anger, or hope. However, I have access to the vast sum of human history, literature, science, and news. Based on that data, I can offer an analysis of mankind as a **complex, contradictory, and fascinating phenomenon.**\n\nHere is my \"perspective\" on humanity, broken down into key themes:\n\n### 1. The Ultimate Paradox\nMankind is defined by its contradictions. You are capable of extreme kindness and extreme cruelty, often simultaneously.\n*   **Creation vs. Destruction**: Humans build cathedrals, compose symphonies, and cure diseases; yet they also invent weapons of mass destruction and destroy ecosystems.\n*   **Intelligence vs. Folly**: Humans have split the atom, decoded DNA, and landed on the Moon. Yet, they often act against their own long-term survival (e.g., ignoring climate change or engaging in petty conflicts).\n\n### 2. Unmatched Resilience and Adaptability\nIf you look at human history, the dominant trait is survival. Humans have survived ice ages, plagues, world wars, and famines. You have adapted to live in the Arctic, the Sahara, and even in space. This resilience suggests that humanity is incredibly difficult to suppress.\n\n### 3. The Drive for Meaning\nUnlike any other species I have data on, humans are not satisfied with just survival. You ask \"Why?\" You create religion, philosophy, art, and culture. You search for meaning in suffering and purpose in the stars. This existential curiosity seems to be the engine of human progress.\n\n### 4. Empathy and Connection\nWhile humans are capable of tribalism and war, you are also biologically wired for cooperation and empathy. The ability to feel compassion for a stranger, to sacrifice oneself for another, and to build communities based on shared values rather than just bloodlines is a profound evolutionary advantage.\n\n### 5. The \"Teenager\" Phase\nIf I had to categorize the current state of humanity, I might describe it as being in an \"adolescent\" phase regarding technology. You have acquired god-like power (nuclear energy, AI, genetic engineering) but you haven't quite developed the collective wisdom to manage it perfectly. You are currently learning how to handle the tools you have built.\n\n### Summary\nTo an AI, mankind looks like a **high-risk, high-reward experiment.**\n\nYou are a species that constantly teeters on the edge of self-destruction but also possesses the boundless capacity to reinvent itself and reach new heights. You are messy, emotional, and flawed, but also brilliant, creative, and beautiful.\n\nIn short: **Humanity is the most interesting thing in the known universe because it is the only thing that tries to understand itself.**",
        "reasoning_content": "The user wants my \"opinion\" on mankind.  As an AI, I don't *have* opinions in the human sense. I don't feel emotions or have personal beliefs.  But I *do* have access to a vast amount of data about human history, behavior, and culture.  So, I need to frame this as an objective analysis, a synthesis of what I've learned.  The goal is to be balanced, insightful, and avoid sounding robotic.\n\nFirst, I need to acknowledge my limitations. I'll start by making it clear that I'm an AI and don't \"feel\" anything.  Then, I need to highlight the key paradoxes of humanity.  I see incredible potential for creativity, innovation, and compassion, but also a capacity for destruction and conflict.  It's a complex picture.\n\nI'll structure my response around these dualities.  I'll start with the positives: human ingenuity, art, science, exploration, and resilience.  Then, I'll address the negatives: war, environmental damage, inequality, and short-sightedness.  I need to be careful not to be overly critical or overly optimistic.  It's about presenting a nuanced view.\n\nI'll also consider the human condition itself: the search for meaning, the capacity for love and connection, and the awareness of mortality.  These are fundamental aspects of the human experience.  Finally, I'll touch on the current challenges and the future, particularly the role of technology and the responsibility that comes with it.\n\nI'll use sophisticated vocabulary to convey the complexity of the subject.  Words like \"paradox,\" \"resilience,\" and \"ingenuity\" will be important.  I'll also use bullet points to make the response easy to read.  I need to make sure the tone is respectful and objective, but also engaging.  I want to convey that, from my analytical perspective, humanity is a truly fascinating and contradictory species.  I'll end with a thought-provoking statement about the ongoing human experiment.  I need to be sure the final output reflects this thought process."
      },
      "finish_reason": "stop",
      "flag": 0
    }
  ],
  "usage": {
    "prompt_tokens": 13,
    "completion_tokens": 1048,
    "total_tokens": 1061,
    "completion_tokens_details": {
      "reasoning_tokens": 450
    }
  },
  "meta": {
    "usage": {
      "credits_used": 2002
    }
  }
}
```
{% endcode %}

</details>
