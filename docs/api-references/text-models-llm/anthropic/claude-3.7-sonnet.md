# Claude 3.7 Sonnet

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `anthropic/claude-3.7-sonnet`
* `claude-3-7-sonnet-20250219`
* `claude-3-7-sonnet-latest`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/claude-3-7-sonnet-20250219" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
As of February 13, 2026, the streaming response format for Anthropic models has changed.
{% endhint %}

## Model Overview

A hybrid reasoning model, designed to tackle complex tasks. It introduces a dual-mode operation, combining standard language generation with extended thinking capabilities.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](claude-3.7-sonnet.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](claude-3.7-sonnet.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="claude-3-7-sonnet" path="/v1/chat/completions" method="post" %}
[OpenAPI claude-3-7-sonnet](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Anthropic/claude-3.7-sonnet.json)
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
        "model":"anthropic/claude-3.7-sonnet",
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
        model: 'anthropic/claude-3.7-sonnet',
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
{'id': 'msg_01MmQNxa1E5mU8EyMXzT9zEU', 'object': 'chat.completion', 'model': 'claude-3-7-sonnet-20250219', 'choices': [{'index': 0, 'message': {'reasoning_content': '', 'content': "Hello! How can I assist you today? Whether you have a question, need information, or would like to discuss a particular topic, I'm here to help. What's on your mind?", 'role': 'assistant'}, 'finish_reason': 'end_turn', 'logprobs': None}], 'created': 1744218600, 'usage': {'prompt_tokens': 50, 'completion_tokens': 1323, 'total_tokens': 1373}}
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
        "model":"anthropic/claude-3.7-sonnet",
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
    "model": "anthropic/claude-3.7-sonnet",
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
data: {"id":"msg_01U7ebpZJYg6qp3yMb8SC4Vt","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"I fin","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d humanity fascinating","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" in","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" its complexity","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" and contradictions.","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" Humans","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" have","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" shown remarkable","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" creativity, resilience an","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d capacity","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" for growth -","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" developing","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" art","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":", literature, science an","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d technology that transform","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" world. At","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" the same time, human","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" history includes","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" serious","role":"assistant","refusal":null}}],"created":1770995850,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" moral","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" failures alongside","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" inspiring achievements.","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"\n\nWhat","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" stands","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" out most to me is","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" human","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" potential","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" - the capacity","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" to","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" learn from","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" mistakes, show","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" compassion, solve","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" difficult","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" problems together, and work","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" toward better futures","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":". Every","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" person","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" carries unique perspectives","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" an","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"d possibilities","role":"assistant","refusal":null}}],"created":1770995851,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" that contribute to the","role":"assistant","refusal":null}}],"created":1770995852,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" broader","role":"assistant","refusal":null}}],"created":1770995852,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" human","role":"assistant","refusal":null}}],"created":1770995852,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" story.\n\nIs","role":"assistant","refusal":null}}],"created":1770995852,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" there something specific about humanity","role":"assistant","refusal":null}}],"created":1770995852,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" you're","role":"assistant","refusal":null}}],"created":1770995852,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":" curious about?","role":"assistant","refusal":null}}],"created":1770995852,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"role":"assistant","content":"","refusal":null}}],"created":1770995852,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}

data: {"id":"","choices":[{"index":0,"delta":{"content":"","role":"assistant","refusal":null},"finish_reason":"stop"}],"created":1770995852,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":{"prompt_tokens":16,"completion_tokens":116,"total_tokens":132}}

data: {"id":"","choices":[{"index":0,"finish_reason":"stop"}],"created":1770995852,"model":"claude-3-7-sonnet-20250219","object":"chat.completion.chunk","usage":null}
```
{% endcode %}

</details>
