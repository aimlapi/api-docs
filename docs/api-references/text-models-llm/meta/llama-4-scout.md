# Llama-4-scout

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following list of our models:</p><ul><li><code>meta-llama/llama-4-scout</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/?model=meta-llama/llama-4-scout&#x26;mode=chat" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

A 17 billion active parameter model with 16 experts, is the best multimodal model in the world in its class and is more powerful than all previous generation Llama models. Additionally, the model offers an industry-leading context window of 1M and delivers better results than [Gemma 3](../google/gemma-3.md), Gemini 2.0 Flash-Lite, and Mistral 3.1 on a wide range of common benchmarks.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

#### :digit\_one: Setup You Can’t Skip

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

#### :digit\_two: Copy the code example

At the bottom of this page, you'll find [a code example](llama-4-scout.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

#### :digit\_three: Modify the code example

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

#### :digit\_four: <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](llama-4-scout.md#api-schema), which lists all available parameters along with notes on how to use them.

#### :digit\_five: Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="llama-4-scout" path="/v1/chat/completions" method="post" %}
[OpenAPI llama-4-scout](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Meta/Llama-4-scout.json)
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
        "model":"meta-llama/llama-4-scout",
        "messages":[
            {
                "role":"user",
                "content":"Hello"  # insert your prompt here, instead of Hello
            }
        ],
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-4-scout',
      messages:[
          {
              role:'user',
              content: 'Hello'   // insert your prompt here, instead of Hello
          }
      ],
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{'id': 'npXpsYC-2j9zxn-92e24e9e0c97d74d', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': "Hello! It's nice to meet you. Is there something I can help you with or would you like to chat?", 'tool_calls': []}}], 'created': 1744288767, 'model': 'meta-llama/Llama-4-Scout-17B-16E-Instruct', 'usage': {'prompt_tokens': 4, 'completion_tokens': 30, 'total_tokens': 34}}
```
{% endcode %}

</details>
