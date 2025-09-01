# sonar

{% hint style="info" %}
This documentation is valid for the following list of our models:   `perplexity/sonar`
{% endhint %}

## Model Overview

A model built on top of Llama 3.3 70B and optimized for Perplexity search. Fast, cost-effective, everyday search and Q\&A. Ideal for simple queries, topic summaries, and fact-checking.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](sonar.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](sonar.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="sonar" path="/v1/chat/completions" method="post" %}
[OpenAPI sonar](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Perplexity/sonar.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json   # for getting a structured output with indentation

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        "Content-Type":"application/json", 

        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"perplexity/sonar",
        "messages":[
            {
                "role":"user",

                # Insert your question for the model here, instead of Hello:
                "content":"Hello"
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
  try {
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'perplexity/sonar',
        messages:[
            {
                role:'user',

                // Insert your question for the model here, instead of Hello:
                content: 'Hello'
            }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('Error', error);
  }
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
  "id": "541db1f4-d5ef-4e65-9474-a10843fa92ab",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "Hello is a common English salutation or greeting, first recorded in writing in 1826 in the United States. It has since become widely used in spoken and written communication as a way to say \"hi\" or initiate conversation[1]. \n\nAdditionally, \"Hello\" is the title of well-known songs, such as Adele's 2015 hit and Lionel Richie's classic, both of which have contributed to the cultural popularity of the word[2][3]. \n\nIn other contexts, \"Hello\" is a brand name used by companies such as a vegan-friendly personal care products line and the meal kit service HelloFresh, showing its versatile use beyond just a greeting[4][5]."
      },
      "delta": {
        "role": "assistant",
        "content": ""
      }
    }
  ],
  "created": 1753461943,
  "model": "sonar",
  "usage": {
    "prompt_tokens": 10502,
    "completion_tokens": 292,
    "total_tokens": 10794,
    "search_context_size": "low"
  },
  "citations": [
    "https://en.wikipedia.org/wiki/Hello",
    "https://en.wikipedia.org/wiki/Hello_(Adele_song)",
    "https://www.youtube.com/watch?v=mHONNcZbwDY",
    "https://www.hello-products.com",
    "https://www.hellofresh.com"
  ],
  "search_results": [
    {
      "title": "Hello - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Hello",
      "date": "2002-06-09",
      "last_updated": "2025-07-23"
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
    },
    {
      "title": "HelloFresh® Meal Kits | Get 10 Free Meals + Free Breakfast For Life",
      "url": "https://www.hellofresh.com",
      "date": "2024-09-19",
      "last_updated": "2025-05-13"
    }
  ]
}
```
{% endcode %}

</details>
