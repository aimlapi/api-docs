# ernie-x1-turbo-32k

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `baidu/ernie-x1-turbo-32k`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/baidu/ernie-x1-turbo-32k" class="button primary">Try in Playground</a>
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

{% openapi-operation spec="ernie-x1-turbo-32k" path="/v1/chat/completions" method="post" %}
[OpenAPI ernie-x1-turbo-32k](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/baidu/ernie-x1-turbo-32k.json)
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
        "model":"baidu/ernie-x1-turbo-32k",
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
      model: 'baidu/ernie-x1-turbo-32k',
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
  "id": "as-379ekp2jci",
  "object": "chat.completion",
  "created": 1768940690,
  "model": "ernie-x1-turbo-32k",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Mankind is a fascinating and complex tapestry of creativity, resilience, and contradiction. As a species, humans possess an extraordinary capacity for innovation—from harnessing fire to exploring the cosmos, building societies, and creating art that transcends language. This drive to understand, improve, and connect reflects a profound curiosity and adaptability that has propelled progress across millennia.  \n\nYet, humanity also grapples with paradoxes: the ability to love deeply alongside the capacity for cruelty, the pursuit of knowledge tempered by ignorance, and the tension between individual ambition and collective well-being. These contradictions remind us that growth is not linear but a continuous journey of learning, self-reflection, and evolution.  \n\nWhat stands out most is humanity’s resilience. Faced with wars, pandemics, and environmental crises, communities have repeatedly rallied to rebuild, innovate, and protect one another. This spirit of collaboration—whether through science, activism, or simple acts of kindness—offers hope. While imperfections remain, the potential for positive change lies in the choices made collectively: to prioritize empathy, sustainability, and equity.  \n\nIn the end, mankind’s story is still being written. Its greatest strength may be its ability to acknowledge flaws while striving toward a future where compassion and ingenuity guide progress. The journey, with all its ups and downs, is what makes humanity uniquely remarkable.",
        "reasoning_content": "The user asked me, \"Hi! What do you think about mankind?\" and specified to answer in English. First, I need to understand the user's intention. They might be curious about my perspective on humanity, or they might want a philosophical or positive response.\n\nNext, I have to consider my identity as an AI. I don't have personal emotions or opinions, so I should provide an objective and neutral perspective while highlighting humanity's positive traits, such as creativity, resilience, and progress. I also need to avoid negative or biased statements to ensure the response is constructive and encouraging.\n\nThen, I should structure the response. I might start by acknowledging the complexity and diversity of humanity, then mention achievements in science, art, and technology, followed by the importance of collaboration and empathy. Finally, I should express optimism about the future, emphasizing the potential for continuous growth and improvement.\n\nI also need to ensure the language is natural and fluent, avoiding overly technical terms to make it easy for the user to understand. Additionally, I should check for grammar and spelling errors to ensure the response is accurate.\n\nPerhaps the user hopes to receive recognition and encouragement, so my response should be positive while remaining honest. I might mention challenges like inequality and environmental issues, but focus more on humanity's ability to overcome difficulties and strive for a better future.\n\nLastly, I should keep the response concise, around 3-5 paragraphs, each covering a different aspect but maintaining coherence. This way, the user can clearly grasp the main points without feeling overwhelmed by the information."
      },
      "finish_reason": "stop",
      "flag": 0
    }
  ],
  "usage": {
    "prompt_tokens": 13,
    "completion_tokens": 601,
    "total_tokens": 614,
    "completion_tokens_details": {
      "reasoning_tokens": 323
    }
  },
  "meta": {
    "usage": {
      "credits_used": 391
    }
  }
}
```
{% endcode %}

</details>
