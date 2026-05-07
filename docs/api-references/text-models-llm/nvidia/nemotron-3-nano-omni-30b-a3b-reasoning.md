# nemotron-3-nano-omni-30b-a3b-reasoning

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/nemotron-3-nano-omni-30b-a3b-reasoning" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A reasoning-focused MoE language model optimized for analytical and long-context tasks.\
Designed for AI agents, structured reasoning workflows, and applications that require enhanced reasoning capabilities.

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

{% openapi-operation spec="nemotron-3-nano-omni-30b-a3b-reasoning" path="/v1/chat/completions" method="post" %}
[OpenAPI nemotron-3-nano-omni-30b-a3b-reasoning](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/NVIDIA/nemotron-3-nano-omni-30b-a3b-reasoning.json)
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
        "model":"nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
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
      model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning',
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
  "id": "gen-1778117123-HuLtn8SZaqITVRdUs7CM",
  "object": "chat.completion",
  "created": 1778117123,
  "model": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning-20260428:free",
  "system_fingerprint": null,
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "Hello!Mankind is a fascinating and complex subject, and people have been debating its nature for centuries. From a broad perspective, many observers highlight a few key themes:\n\n| Aspect | What’s often emphasized |\n|--------|--------------------------|\n| **Ingenuity & Creativity** | Humans have built art, music, literature, science, technology, and architecture—achievements that shape cultures and push the boundaries of what’s possible. |\n| **Cooperation & Community** | We form families, nations, and global networks, collaborating to solve problems, share knowledge, and support one another. |\n| **Moral Reasoning** | Philosophers and religions have long explored concepts of justice, empathy, and responsibility, influencing laws and social norms. |\n| **Challenges & Contradictions** | At the same time, humanity grapples with conflict, inequality, environmental impact, and the capacity for self‑destruction. |\n| **Evolution & Adaptability** | Our species has shown remarkable adaptability, thriving in diverse environments and continually learning from past experiences. |\n\nOverall, mankind can be seen as both a source of great inspiration and a cause for concern. The balance between our highest aspirations (curiosity, compassion, innovation) and our darker tendencies (bias, greed, violence) shapes the trajectory of societies and the planet.\n\nIf you’re interested in a particular angle—history, philosophy, psychology, environmental impact, or something else—let me know, and I can dive deeper!",
        "refusal": null,
        "reasoning": "We need to respond: It's a user asking \"Hi! What do you think about mankind?\" The user asks for an opinion. According to policy, we can provide a balanced, neutral perspective. It's not disallowed. We should avoid personal opinions, but can give a summary of common views, acknowledging both positive and negative aspects. No disallowed content. So respond politely, maybe ask if they want a particular angle.\n",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "We need to respond: It's a user asking \"Hi! What do you think about mankind?\" The user asks for an opinion. According to policy, we can provide a balanced, neutral perspective. It's not disallowed. We should avoid personal opinions, but can give a summary of common views, acknowledging both positive and negative aspects. No disallowed content. So respond politely, maybe ask if they want a particular angle.\n",
            "format": "unknown",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "completion_tokens": 401,
    "prompt_tokens": 25,
    "total_tokens": 426,
    "completion_tokens_details": {
      "reasoning_tokens": 104,
      "image_tokens": 0,
      "audio_tokens": 0
    },
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0,
      "audio_tokens": 0,
      "video_tokens": 0
    }
  }
}
```
{% endcode %}

</details>
