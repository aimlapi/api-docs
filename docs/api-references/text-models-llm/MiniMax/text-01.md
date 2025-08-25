# text-01

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following list of our models:</p><ul><li><code>MiniMax-Text-01</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=MiniMax-Text-01&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

A powerful language model developed by MiniMax AI, designed to excel in tasks requiring extensive context processing and reasoning capabilities. With a total of 456 billion parameters, of which 45.9 billion are activated per token, this model utilizes a hybrid architecture that combines various attention mechanisms to optimize performance across a wide array of applications.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### :digit\_two:  Copy the code example

Below, you'll find [a code example](text-01.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](text-01.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## Code Example

{% tabs %}
{% tab title="Python" %}
<pre class="language-python" data-overflow="wrap"><code class="lang-python">import requests
import json  # for getting a structured output with indentation

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
<strong>        "Content-Type":"application/json", 
</strong>
        # Insert your AIML API Key instead of &#x3C;YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer &#x3C;YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"MiniMax-Text-01",
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
</code></pre>
{% endtab %}

{% tab title="JS" %}
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
        model: 'MiniMax-Text-01',
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
  "id": "04a9c0b5acca8b79bf1aba62f288f3b7",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "Hello! How are you doing today? I'm here and ready to chat about anything you'd like to discuss or help with any questions you might have."
      }
    }
  ],
  "created": 1750764981,
  "model": "MiniMax-Text-01",
  "usage": {
    "prompt_tokens": 299,
    "completion_tokens": 67,
    "total_tokens": 366
  }
}
```
{% endcode %}

</details>

## API Schema

{% openapi-operation spec="text-01" path="/v1/chat/completions" method="post" %}
[OpenAPI text-01](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/MiniMax/text-01.json)
{% endopenapi-operation %}
