# sonar-pro

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `perplexity/sonar-pro`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/perplexity/sonar-pro" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Pro version is built for real-time, web-connected research and complex queries. Handles multi-step, deeper reasoning tasks. Retrieves and synthesizes multiple web searches, yielding more detailed answers. Delivers 2× more citations than standard [Sonar](sonar.md) for enhanced traceability.

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

{% openapi-operation spec="sonar-pro" path="/v1/chat/completions" method="post" %}
[OpenAPI sonar-pro](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Perplexity/sonar-pro.json)
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
        "model":"perplexity/sonar-pro",
        "messages":[
            {
                "role":"user",
                "content":"Hello"  # insert your prompt here, instead of Hello
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
      model: 'perplexity/sonar-pro',
      messages:[
          {
              role:'user',
              content: 'Hello'  // insert your prompt here, instead of Hello
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
  "id": "14884548-2103-493c-a69d-7585f36f1c80",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "**Hello** is primarily an English salutation or greeting, first recorded in written form in 1826[1]. It is commonly used to initiate conversation or acknowledge someone's presence.\n\nThe term has notable cultural associations:\n- Students often use \"Hello, World!\" as the first output when learning programming languages—a tradition established by its inclusion in influential programming textbooks[1].\n- \"Hello\" is also the title of notable songs, including Adele’s chart-topping 2015 single and Lionel Richie’s 1984 hit[2][3][4].\n\nAlternative cultural greetings include \"Aloha,\" \"Ciao,\" and \"Namaste,\" among others[1]."
      },
      "delta": {
        "role": "assistant",
        "content": ""
      }
    }
  ],
  "created": 1753467346,
  "model": "sonar-pro",
  "usage": {
    "prompt_tokens": 12606,
    "completion_tokens": 4221,
    "total_tokens": 16827,
    "search_context_size": "low"
  },
  "citations": [
    "https://en.wikipedia.org/wiki/Hello",
    "https://www.youtube.com/watch?v=YQHsXMglC9A",
    "https://en.wikipedia.org/wiki/Hello_(Adele_song)",
    "https://www.youtube.com/watch?v=mHONNcZbwDY",
    "https://www.hello-products.com"
  ],
  "search_results": [
    {
      "title": "Hello - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Hello",
      "date": "2002-06-09",
      "last_updated": "2025-07-23"
    },
    {
      "title": "Adele - Hello (Official Music Video) - YouTube",
      "url": "https://www.youtube.com/watch?v=YQHsXMglC9A",
      "date": "2015-10-22",
      "last_updated": "2025-07-07"
    },
    {
      "title": "Hello (Adele song) - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Hello_(Adele_song)",
      "date": "2015-10-22",
      "last_updated": "2025-06-13"
    },
    {
      "title": "Lionel Richie - Hello (Official Music Video) - YouTube",
      "url": "https://www.youtube.com/watch?v=mHONNcZbwDY",
      "date": "2020-11-20",
      "last_updated": "2025-07-07"
    },
    {
      "title": "Hello Products",
      "url": "https://www.hello-products.com",
      "date": "2025-06-04",
      "last_updated": "2025-06-16"
    }
  ]
}
```
{% endcode %}

</details>
