# DeepSeek Prover V2

{% hint style="info" %}
This documentation is valid for the following model:   `deepseek/deepseek-prover-v2`
{% endhint %}

## Model Overview

A massive 671B-parameter model, presumed to focus on logic and mathematics. It appears to be an upgrade over DeepSeek Prover V1.5.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### &#x20;:digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](deepseek-prover-v2.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](deepseek-prover-v2.md#api-schema), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="deepseek-prover-v2" path="/v1/chat/completions" method="post" %}
[OpenAPI deepseek-prover-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/DeepSeek/deepseek-prover-v2.json)
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
        "Content-Type":"application/json", 

        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"deepseek/deepseek-prover-v2",
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
# getting a structured output with indentation
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
        model: 'deepseek/deepseek-prover-v2',
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
```json
{'id': 'gen-1747126732-rD70SgJEEBVBXPHmKlNJ', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': "Hello there! As a virtual assistant, I'm here to help you with a wide variety of tasks and questions. Here are some of the things I can do:  \n  \n1. Provide information on a wide range of topics, from science and history to pop culture and current events.  \n2. Answer factual questions using my knowledge base.  \n3. Assist with homework or research projects by providing explanations, summaries, and resources.  \n4. Help with language-related tasks such as grammar, vocabulary, translations, and writing assistance.  \n5. Engage in general conversation, discussing ideas, and providing opinions on various subjects.  \n6. Offer advice or tips on various life situations, though not as a substitute for professional guidance.  \n7. Perform calculations, solve math problems, and help with understanding mathematical concepts.  \n8. Generate creative content like stories, poems, or song lyrics.  \n9. Play interactive games, such as word games or trivia.  \n10. Help you practice a language by conversing in it.  \n  \nFeel free to ask me anything, and I'll do my best to assist you!", 'reasoning_content': None, 'refusal': None}}], 'created': 1747126732, 'model': 'deepseek/deepseek-prover-v2', 'usage': {'prompt_tokens': 15, 'completion_tokens': 1021, 'total_tokens': 1036, 'prompt_tokens_details': None}}
```
{% endcode %}

</details>
