# llama-3.1-nemotron-70b

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following list of our models:</p><ul><li><code>nvidia/llama-3.1-nemotron-70b-instruct</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=nvidia/llama-3.1-nemotron-70b-instruct&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

A sophisticated LLM, designed to enhance the performance of instruction-following tasks. It utilizes advanced training techniques and a robust architecture to generate human-like responses across a variety of applications.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

#### :digit\_one: Setup You Can’t Skip

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

#### :digit\_two: Copy the code example

At the bottom of this page, you'll find [a code example](llama-3.1-nemotron-70b.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

#### :digit\_three: Modify the code example

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

#### :digit\_four: <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](llama-3.1-nemotron-70b.md#api-schema), which lists all available parameters along with notes on how to use them.

#### :digit\_five: Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="llama-3-1-nemotron-70b" path="/v1/chat/completions" method="post" %}
[OpenAPI llama-3-1-nemotron-70b](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/NVIDIA/llama-3.1-nemotron-70b.json)
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
        "model":"nvidia/llama-3.1-nemotron-70b-instruct",
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
      model: 'nvidia/llama-3.1-nemotron-70b-instruct',
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
{'id': 'gen-1744191323-N0aZy5UyzpOYfRwYbik3', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': {'content': [], 'refusal': []}, 'message': {'role': 'assistant', 'content': "Hello!\n\nHow can I assist you today? Do you have:\n\n1. **A question** on a specific topic you'd like answered?\n2. **A problem** you're trying to solve and need help with?\n3. **A topic** you'd like to **discuss**?\n4. **A game or activity** in mind (e.g., trivia, word games, storytelling)?\n5. **Something else** on your mind (feel free to surprise me)?\n\nPlease respond with a number or describe what's on your mind, and I'll do my best to help!", 'refusal': None}}], 'created': 1744191323, 'model': 'nvidia/llama-3.1-nemotron-70b-instruct', 'usage': {'prompt_tokens': 11, 'completion_tokens': 78, 'total_tokens': 89}}
```
{% endcode %}

</details>
