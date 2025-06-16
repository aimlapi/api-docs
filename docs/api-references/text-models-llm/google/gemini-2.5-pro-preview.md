# gemini-2.5-pro-preview

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/gemini-2.5-pro-preview`
* `google/gemini-2.5-pro-preview-05-06`
{% endhint %}

{% hint style="success" %}
We provide the latest version of this model from **May 06, 2025**.\
Both IDs listed above refer to the same model; we support them for backward compatibility.
{% endhint %}

## Model Overview

Gemini 2.5 Pro is Google's most advanced coding model as of Spring 2025. This is a preview version, building on the earlier [exp release](gemini-2.5-pro-exp.md).\
**Stronger reasoning**: Leads in math and science tasks across major benchmarks.\
**Natively multimodal**: Processes text, audio, images, and video as input.\
**Advanced coding capabilities**: Generates code for complex web development workflows.\
**Extended context**: Handles up to 1 million tokens for working with large datasets.

## How to Make a Call

{% stepper %}
{% step %}
### Setup You Can’t Skip&#x20;

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.
{% endstep %}

{% step %}
### Copy the code example

At the bottom of this page, you'll find [a code example](gemini-2.5-pro-preview.md#code-example-python) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.
{% endstep %}

{% step %}
### Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Insert your question or request into the `content` field—this is what the model will respond to.
{% endstep %}

{% step %}
### <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gemini-2.5-pro-preview.md#api-schema), which lists all available parameters along with notes on how to use them.
{% endstep %}

{% step %}
### Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

## API Schema

{% openapi-operation spec="gemini-2-5-pro-preview" path="/v1/chat/completions" method="post" %}
[Broken link](broken-reference)
{% endopenapi-operation %}

## Code Example (Python)

{% code overflow="wrap" %}
```python
import requests

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        "Content-Type":"application/json", 

        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"google/gemini-2.5-pro-preview-05-06",
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
print(data)
```
{% endcode %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{'id': '2025-05-08|11:35:53.973599-07|9.7.166.192|-684698876', 'object': 'chat.completion', 'choices': [{'index': 0, 'finish_reason': 'stop', 'logprobs': None, 'message': {'role': 'assistant', 'content': 'Hello there! How can I help you today?'}}], 'created': 1746729353, 'model': 'google/gemini-2.5-pro-preview-05-06', 'usage': {'prompt_tokens': 3, 'completion_tokens': 3990, 'completion_tokens_details': {'reasoning_tokens': 180}, 'total_tokens': 3993}}
```
{% endcode %}

</details>
