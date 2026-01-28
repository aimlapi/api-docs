# ernie-4.5-21b-a3b-thinking

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `baidu/ernie-4.5-21b-a3b-thinking`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/baidu/ernie-4-5-21b-a3b-thinking" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A post-trained LLM with 21B total parameters and 3B activated parameters per token. \
Reasoning variant.

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

{% openapi-operation spec="ernie-4-5-21b-a3b-thinking" path="/v1/chat/completions" method="post" %}
[OpenAPI ernie-4-5-21b-a3b-thinking](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/baidu/ernie-4.5-21b-a3b-thinking.json)
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
        "model":"baidu/ernie-4.5-21b-a3b-thinking",
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
      model: 'baidu/ernie-4.5-21b-a3b-thinking',
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
  "id": "aee235c6df453eeb1c4d20a433e9348d",
  "object": "chat.completion",
  "created": 1768830316,
  "model": "baidu/ernie-4.5-21b-a3b-thinking",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "\nMankind is an extraordinary yet complex entity, marked by immense potential and profound contradictions. Here’s a snapshot of my perspective:\n\n### **1. Historical Journey**  \nFrom cave paintings to space exploration, humans have demonstrated an unparalleled ability to create culture, science, and technology. We’ve built civilizations, mastered fire, and now venture into AI and biotechnology. Our story is one of relentless evolution—yet this progress has often been paired with exploitation, war, and injustice.\n\n### **2. Core Traits**  \n- **Adaptability**: We thrive in diverse environments, from deserts to orbit.  \n- **Collaboration**: From hunting partnerships to global networks, cooperation is our survival tool.  \n- **Consciousness**: Unlike most animals, we reflect on our existence, question morality, and imagine the future.  \n\n### **3. Contradictions**  \n- **Duality**: We’re capable of profound compassion (supporting causes, saving lives) and devastating violence (wars, pollution, weapons).  \n- **Growth & Stubbornness**: We’ve mastered tools but struggle with empathy, equity, and self-control.  \n\n### **4. Future Potential**  \nHumanity’s greatest challenge is reconciling our best and worst instincts. Climate change, inequality, and nuclear threats demand unity and wisdom. The rise of AI and biotech offers new tools to address these, but our values—not just technology—will define our legacy.  \n\n### **5. Hope & Caution**  \nWe’re a work in progress. Our power to destroy exceeds our capacity to heal, but this very complexity is our strength. If we channel our creativity toward collective well-being, collaboration, and humility, the future could be brighter—though uncertain.  \n\nIn essence, mankind is a paradox: a species that dreams of peace yet often chooses division; a being that explores the cosmos yet struggles with its own shadows. Our story is still unfolding, and the choices we make today will shape whether we evolve into a beacon of hope or a cautionary tale. 🌍✨\n\n",
        "reasoning_content": "The user asked, \"Hi! What do you think about mankind?\" Hmm, that's a pretty broad question. Let me start by breaking it down. They want my perspective on humanity as a whole. Maybe they're interested in philosophy, sociology, or ethics. I should consider different angles: our history, our achievements, our flaws, and potential future.\n\nFirst, I need to acknowledge the complexity. Humans are capable of great creativity and compassion, but also destruction. I should mention both the positive and negative aspects. Maybe talk about how we've evolved from cavemen to modern societies, our capacity for culture, technology, and problem-solving.\n\nAlso, the user might be looking for a balanced view. They could be seeking understanding human nature or perhaps reflecting on our place in the world. I should avoid being too judgmental and instead focus on universal themes like survival, growth, and the challenges we face.\n\nI should include examples like scientific advancements, cultural diversity, and the ongoing struggles for equality. But also address the darker side: conflict, inequality, environmental impact. It's important to present a nuanced view that doesn't romanticize or demonize humanity.\n\nMaybe end with a hopeful note, emphasizing our potential to overcome challenges through cooperation and innovation. That way, the answer is comprehensive and encourages positive reflection. Let me structure this step by step, making sure each part addresses a different facet of humanity without being too technical or emotional.\n"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 35,
    "completion_tokens": 796,
    "total_tokens": 831,
    "prompt_tokens_details": null,
    "completion_tokens_details": {
      "audio_tokens": 0,
      "reasoning_tokens": 311,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0,
      "text_tokens": 0,
      "image_tokens": 0,
      "video_tokens": 0
    }
  },
  "system_fingerprint": "",
  "meta": {
    "usage": {
      "credits_used": 298
    }
  }
}
```
{% endcode %}

</details>
