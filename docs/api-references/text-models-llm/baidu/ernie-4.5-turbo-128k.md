# ernie-4.5-turbo-128k

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `baidu/ernie-4-5-turbo-128k`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/baidu/ernie-4-5-turbo-128k" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A model from the ERNIE 4.5 Turbo subfamily, which Baidu presents as a faster, more cost-efficient, and more efficient alternative to the base ERNIE 4.5. It is optimized for improved response speed and stability, and features a truly large context window of approximately 128K tokens, enabling the processing of entire documents or long-running dialogues.

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

{% openapi-operation spec="ernie-4-5-turbo-128k" path="/v1/chat/completions" method="post" %}
[OpenAPI ernie-4-5-turbo-128k](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/baidu/ernie-4.5-turbo-128k.json)
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
        "model":"baidu/ernie-4-5-turbo-128k",
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
      model: 'baidu/ernie-4-5-turbo-128k',
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
  "id": "as-hjivyd5xqd",
  "object": "chat.completion",
  "created": 1768942341,
  "model": "ernie-4.5-turbo-128k",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "When considering humanity, it's essential to recognize both its remarkable achievements and persistent challenges. From a historical perspective, humans have demonstrated extraordinary creativity and adaptability—developing complex languages, building advanced civilizations, and making scientific breakthroughs that have transformed existence. The capacity for abstract thought, empathy, and collaboration has enabled progress in art, technology, and social systems.\n\nHowever, this progress coexists with significant flaws. Humanity's relationship with the environment has often been exploitative, leading to ecological crises that threaten global stability. Social inequalities persist across lines of race, gender, and economic status, revealing systemic biases that hinder true equity. Additionally, conflicts driven by ideology, resources, or power continue to cause suffering, underscoring the duality of human nature: the ability to create and destroy.\n\nThe modern era presents both hope and urgency. Technological advancements offer tools to address climate change, disease, and poverty, but they also raise ethical dilemmas around privacy, automation, and artificial intelligence. Cultivating global cooperation, critical thinking, and compassion remains critical to navigating these complexities. Ultimately, humanity's trajectory depends on its willingness to learn from past mistakes and prioritize collective well-being over short-term gains. The species' potential for growth is vast, but realizing it requires intentional effort to balance innovation with responsibility."
      },
      "finish_reason": "stop",
      "flag": 0
    }
  ],
  "usage": {
    "prompt_tokens": 13,
    "completion_tokens": 268,
    "total_tokens": 281
  },
  "meta": {
    "usage": {
      "credits_used": 314
    }
  }
}
```
{% endcode %}

</details>
