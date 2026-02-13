# Claude 3 Haiku

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `anthropic/claude-3-haiku`
* `anthropic/claude-3-haiku-20240307`
* `claude-3-haiku-20240307`
* `claude-3-haiku-latest`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/claude-3-haiku-20240307" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
As of February 13, 2026, the streaming response format for Anthropic models has changed.
{% endhint %}

## Model Overview

The quick and streamlined model, offering near-instant responsiveness.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](claude-3-haiku.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](claude-3-haiku.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="claude-3-haiku" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-3-haiku](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-3-haiku.json)
{% endopenapi-operation %}

## Code Example #1

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
        "model":"claude-3-haiku",
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
  try {
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        // Insert your AIML API Key instead of YOUR_AIMLAPI_KEY
        'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku',
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
{'id': 'msg_01Fd4uU3AZ3TXzSpSKN7oeDP', 'object': 'chat.completion', 'model': 'claude-3-haiku-20240307', 'choices': [{'index': 0, 'message': {'reasoning_content': '', 'content': 'Hello! How can I assist you today?', 'role': 'assistant'}, 'finish_reason': 'end_turn', 'logprobs': None}], 'created': 1744218395, 'usage': {'prompt_tokens': 4, 'completion_tokens': 32, 'total_tokens': 36}}
```
{% endcode %}

</details>

## Code Example #2: Streaming Mode

As of February 13, 2026, the streaming response format for Anthropic models has changed. \
Specifically, the usage fields were renamed as follows:&#x20;

* the `state` structure is no longer used,
* `input_tokens` → `prompt_tokens`,&#x20;
* `output_tokens` → `completion_tokens`,&#x20;
* a new `total_tokens` field has been added.

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
        "model":"anthropic/claude-3-haiku",
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

{% tab title="cURL" %}
{% code overflow="wrap" %}
```javascript
curl -L \
  --request POST \
  --url 'https://api.aimlapi.com/v1/chat/completions' \
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "anthropic/claude-3-haiku",
    "messages": [
      {
        "role": "user",
        "content": "Hi! What do you think about mankind?"
      }
    ],
    "stream": true
  }'
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
data: {"id":"msg_01Fkwy91EyWQbe3wC8jT4mNo","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"That","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'s a big","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and complex question!","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" I don","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'t have a personal","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" opinion on all","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" humanity, since","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" I'm an AI","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" assistant rather","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" than a human.","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" But in","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" general, I'","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d say that mankin","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d is","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" a","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" diverse","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" group","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of beings","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" with","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" a","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" wide range of beliefs","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", behaviors","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", and impacts","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" on","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the world.","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" Humanity has accomplished incredible","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" fe","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ats,","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" made","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" many","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" important","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" discoveries","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and innovations","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", and created beautiful","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" art an","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d culture","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":". At","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the same time,","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" humans","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" have also","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" done","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" great","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" harm to each other","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and the planet","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":".","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" I","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" think it's important","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" to recognize both","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the positive and negative","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" aspects of humanity.","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" What are your thoughts","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" on","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" this?","role":"assistant","refusal":null}}],"created":1770995985,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995986,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null},"finish_reason":"stop"}],"created":1770995986,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":{"prompt_tokens":16,"completion_tokens":127,"total_tokens":143}}

data: {"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770995986,"model":"claude-3-haiku-20240307","object":"chat.completion.chunk","usage":null}
```
{% endcode %}

</details>
