# ernie-4.5-300b-a47b-paddle

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `baidu/ernie-4.5-300b-a47b-paddle`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/baidu/ernie-4-5-300b-a47b-paddle" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A super-large language model, positioned as of August 2025 as a leading Chinese MoE architecture and a foundation model for enterprise applications.

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

{% openapi-operation spec="ernie-4-5-300b-a47b-paddle" path="/v1/chat/completions" method="post" %}
[OpenAPI ernie-4-5-300b-a47b-paddle](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/baidu/ernie-4.5-300b-a47b-paddle.json)
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
        "model":"baidu/ernie-4.5-300b-a47b-paddle",
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
      model: 'baidu/ernie-4.5-300b-a47b-paddle',
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
  "id": "9a0e333a0cfa4d86c89a1f7bd3a2919f",
  "object": "chat.completion",
  "created": 1768943231,
  "model": "baidu/ernie-4.5-300b-a47b-paddle",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The question \"What do you think about mankind?\" invites a reflection on humanity's complexities. Here's a structured response:\n\n**Step 1: Define the scope**  \nMankind encompasses both collective achievements and individual flaws. It's a species marked by creativity, empathy, and resilience, yet also by conflict, inequality, and environmental impact.\n\n**Step 2: Highlight positive traits**  \nHumanity has demonstrated remarkable capacity for innovation (e.g., technology, medicine), cultural expression (art, literature), and moral progress (civil rights, environmental awareness). Cooperation during crises, such as disaster relief or global health initiatives, underscores collective potential.\n\n**Step 3: Acknowledge challenges**  \nPersistent issues like war, poverty, and systemic injustice reveal ethical gaps. Environmental degradation and climate change further highlight unsustainable practices. These contradictions often stem from short-term thinking or unequal resource distribution.\n\n**Step 4: Emphasize growth potential**  \nHistory shows humanity's ability to learn and adapt. Movements for social justice, renewable energy transitions, and scientific breakthroughs suggest progress is possible when values align with action.\n\n**Final Answer**  \nMankind is a paradoxical yet hopeful entity—capable of profound compassion and destructive shortsightedness. Its future hinges on balancing self-interest with collective responsibility, leveraging intelligence and empathy to address shared challenges."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 13,
    "completion_tokens": 289,
    "total_tokens": 302,
    "prompt_tokens_details": null,
    "completion_tokens_details": null
  },
  "system_fingerprint": "",
  "meta": {
    "usage": {
      "credits_used": 615
    }
  }
}
```
{% endcode %}

</details>
