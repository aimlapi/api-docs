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

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](sonar-pro.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](sonar-pro.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
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
