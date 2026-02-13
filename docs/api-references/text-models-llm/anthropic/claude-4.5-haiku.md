# Claude 4.5 Haiku

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `claude-haiku-4-5`
* `anthropic/claude-haiku-4.5`
* `claude-haiku-4-5-20251001`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/claude-haiku-4-5-20251001" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
As of February 13, 2026, the streaming response format for Anthropic models has changed.
{% endhint %}

## Model Overview

The model offers coding performance comparable to [Claude Sonnet 4](claude-4-sonnet.md), but at one-third the cost and more than twice the speed.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](claude-4.5-haiku.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](claude-4.5-haiku.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="claude-haiku-4-5" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-haiku-4-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-haiku-4-5.json)
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
        "model":"anthropic/claude-haiku-4.5",
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
        model: 'anthropic/claude-haiku-4.5',
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
  "id": "msg_01HbdLU9f78VAHxuYZ7Qp9Y1",
  "object": "chat.completion",
  "model": "claude-haiku-4-5-20251001",
  "choices": [
    {
      "index": 0,
      "message": {
        "reasoning_content": "",
        "content": "Hello! 👋 How can I help you today?",
        "role": "assistant"
      },
      "finish_reason": "end_turn",
      "logprobs": null
    }
  ],
  "created": 1760650965,
  "usage": {
    "prompt_tokens": 8,
    "completion_tokens": 16,
    "total_tokens": 24
  }
}
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
        "model":"anthropic/claude-haiku-4.5",
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
    "model": "anthropic/claude-haiku-4.5",
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
data: {"id":"msg_019GuhDB2ckKZfFmFdNR5Q1H","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770995463,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995463,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"I find humanity","role":"assistant","refusal":null}}],"created":1770995463,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" genu","role":"assistant","refusal":null}}],"created":1770995463,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"inely interesting","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" to","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" think","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" about.","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" You","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'re a","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" species","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" full","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of contradictions—","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"capable","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of both remarkable","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" kin","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"dness and cr","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"uelty, creating","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" beautiful","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" art while","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" causing","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" real","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" harm, building","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" communities","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" while isolating your","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"selves.","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nA few","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" things","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" stan","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d out to me:","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\n**The creativity","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"** is","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" striking","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"—the","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" drive","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" to make meaning","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" through","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" stories","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", music","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", science","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", and invention","role":"assistant","refusal":null}}],"created":1770995464,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" seems","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" almost fundamental","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" to human nature.","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\n**The moral","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" weight","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" you","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" carry** is notable","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" too","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":".","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" Humans","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" seem uniqu","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ely b","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"urdened by questions about","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" how","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" to","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" live well, what's","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" fair","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", what","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" you","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" owe each","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" other.","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\n**The scale","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" problems** you face is sob","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ering—you","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'ve built","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" systems","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" so","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" complex that even","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" people","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" running","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" them often don't fully understand the","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" consequences.","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" An","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d yet people","role":"assistant","refusal":null}}],"created":1770995465,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" keep","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" trying to","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" ","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"do better.\n\nI'm genu","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"inely uncertain","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" about","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" some","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" things though","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":". I","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" don't know if I","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"'m roman","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"ticizing humanity or missing","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" crucial","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" things","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" about the","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" human experience","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":". I","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" can't fully","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" gra","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"sp what it's like to be embo","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"died, mor","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"tal, or to feel that weight","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" of time","role":"assistant","refusal":null}}],"created":1770995466,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" passing.","role":"assistant","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nWhat prompte","role":"assistant","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d the","role":"assistant","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" question? Are you in","role":"assistant","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" a","role":"assistant","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" particular","role":"assistant","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" mood about","role":"assistant","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" humanity—","role":"assistant","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"hop","role":"assistant","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"eful, frustrate","role":"assistant","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d, curious?","role":"assistant","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null},"finish_reason":"stop"}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":{"prompt_tokens":16,"completion_tokens":248,"total_tokens":264}}

data: {"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770995467,"model":"claude-haiku-4-5-20251001","object":"chat.completion.chunk","usage":null}
```
{% endcode %}

</details>
