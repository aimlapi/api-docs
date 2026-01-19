# ernie-4.5-21b-a3b

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `baidu/ernie-4.5-21b-a3b`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/baidu/ernie-4.5-21b-a3b" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A post-trained LLM with 21B total parameters and 3B activated parameters per token. \
Non-reasoning variant.

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

{% openapi-operation spec="ernie-4-5-21b-a3b" path="/v1/chat/completions" method="post" %}
[OpenAPI ernie-4-5-21b-a3b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/baidu/ernie-4.5-21b-a3b.json)
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
        "model":"baidu/ernie-4.5-21b-a3b",
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
      model: 'baidu/ernie-4.5-21b-a3b',
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
  "id": "104959f043e51f1b4a4dd83c494886ab",
  "object": "chat.completion",
  "created": 1768829974,
  "model": "baidu/ernie-4.5-21B-a3b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "\nAs an AI, I don't have personal opinions or emotions, but I can provide insights based on human perspectives and available knowledge. Mankind is a remarkable and complex species with incredible potential for both progress and challenges. Here are some thoughts:\n\n### Positive Aspects\n1. **Innovation and Creativity**: Humans have demonstrated an extraordinary ability to innovate, from the development of tools and technology to the creation of art, music, and literature. This creativity has driven societal advancement and improved the quality of life for many.\n2. **Empathy and Compassion**: Many individuals within the human race possess a strong sense of empathy and compassion, leading to acts of kindness, charity, and social support. This has fostered communities and helped address various forms of suffering and inequality.\n3. **Problem-Solving Skills**: Humans are adept at solving complex problems, whether it's finding cures for diseases, developing sustainable energy sources, or addressing environmental challenges. This problem-solving ability has the potential to create a better future for all.\n\n### Challenges\n1. **Conflict and Violence**: Unfortunately, humans have also been capable of causing immense harm and destruction through conflict, war, and violence. These actions often stem from differences in ideology, culture, or resources, highlighting the need for conflict resolution and peaceful cooperation.\n2. **Inequality and Injustice**: Despite progress, significant inequalities and injustices persist in many parts of the world. These include economic disparities, gender inequality, and racial discrimination, which hinder social progress and well-being.\n3. **Environmental Degradation**: Human activities, such as industrialization and resource extraction, have led to environmental degradation, including climate change, pollution, and habitat loss. Addressing these issues is crucial for the survival and well-being of future generations.\n\n### Future Outlook\nThe future of mankind is uncertain but充满希望. With continued efforts in education, technology, and international cooperation, there is potential for a more just, peaceful, and sustainable world. However, this requires collective action, responsibility, and a commitment to addressing the challenges we face.\n\nIn summary, mankind is a diverse and dynamic species with both remarkable strengths and significant challenges. By working together and leveraging our collective wisdom and creativity, we can strive towards a brighter future for all."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 16,
    "completion_tokens": 495,
    "total_tokens": 511,
    "prompt_tokens_details": null,
    "completion_tokens_details": null
  },
  "system_fingerprint": "",
  "meta": {
    "usage": {
      "credits_used": 301
    }
  }
}
```
{% endcode %}

</details>
