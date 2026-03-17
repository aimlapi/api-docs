# gpt-5-4

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-5-4`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/openai/gpt-5-4" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

OpenAI’s latest high-performance language models for reasoning, coding, and advanced text generation as of March 2026.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

**1️⃣ Required setup (don’t skip this)**\
▪ **Create an account:** Sign up on the AI/ML API website (if you don’t have one yet).\
▪ **Generate an API key:** In your account dashboard, create an API key and make sure it’s **enabled** in the UI.

**2️ Copy the code example**\
At the bottom of this page, pick the snippet for your preferred programming language (Python / Node.js) and copy it into your project.

**3️ Update the snippet for your use case**\
▪ **Insert your API key:** replace `<YOUR_AIMLAPI_KEY>` with your real AI/ML API key.\
▪ **Select a model:** set the `model` field to the model you want to call.\
▪ **Provide input:** fill in the request input field(s) shown in the example (for example, `messages` for chat/LLM models, or other inputs for image/video/audio models).

**4️ (Optional) Tune the request**\
Depending on the model type, you can add optional parameters to control the output (e.g., generation settings, quality, length, etc.). See the API schema below for the full list.

**5️ Run your code**\
Run the updated code in your development environment. Response time depends on the model and request size, but simple requests typically return quickly.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="gpt-5-4" path="/v1/responses" method="post" %}
[OpenAPI gpt-5-4](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/OpenAI/gpt-5-4-RESPONSES.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation 

response = requests.post(
    "https://api.aimlapi.com/v1/responses",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"openai/gpt-5-4",
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
      model: 'openai/gpt-5-4',
      messages:[
          {
              role:'user',
              content: 'Hi! What do you think about mankind?' // insert your prompt here
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
  "id": "xoNMzdFi15mSMGDJSYQrG",
  "object": "response",
  "created_at": 1773685363,
  "status": "completed",
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1773685367,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": null,
  "max_tool_calls": null,
  "model": "gpt-5.4-2026-03-05",
  "output": [
    {
      "id": "msg_03562ec9153c2e220069b84a7389c88196a870b4591bd4c937",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "Mankind is complicated.\n\nAt its best, humanity is creative, compassionate, curious, and resilient. People make art, care for each other, build knowledge, and keep trying even after failure or tragedy. A lot of what’s admirable in the world comes from that mix of imagination and persistence.\n\nAt its worst, humanity can be cruel, short-sighted, and destructive. History gives plenty of examples of violence, greed, and indifference. People are capable of both great kindness and great harm.\n\nSo overall, I’d say mankind is neither simply good nor bad. It’s a species full of contradictions: flawed, often messy, but also capable of remarkable growth. What stands out most to me is that humans can reflect on themselves and choose to improve—and that matters a lot.\n\nIf you want, I can answer this in a more philosophical, hopeful, or cynical way."
        }
      ],
      "phase": "final_answer",
      "role": "assistant"
    }
  ],
  "parallel_tool_calls": true,
  "presence_penalty": 0,
  "previous_response_id": null,
  "prompt_cache_key": null,
  "prompt_cache_retention": null,
  "reasoning": {
    "effort": "none",
    "summary": null
  },
  "safety_identifier": null,
  "service_tier": "default",
  "store": true,
  "temperature": 1,
  "text": {
    "format": {
      "type": "text"
    },
    "verbosity": "medium"
  },
  "tool_choice": "auto",
  "tools": [],
  "top_logprobs": 0,
  "top_p": 0.98,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 15,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens": 180,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 195
  },
  "user": null,
  "metadata": {},
  "output_text": "Mankind is complicated.\n\nAt its best, humanity is creative, compassionate, curious, and resilient. People make art, care for each other, build knowledge, and keep trying even after failure or tragedy. A lot of what’s admirable in the world comes from that mix of imagination and persistence.\n\nAt its worst, humanity can be cruel, short-sighted, and destructive. History gives plenty of examples of violence, greed, and indifference. People are capable of both great kindness and great harm.\n\nSo overall, I’d say mankind is neither simply good nor bad. It’s a species full of contradictions: flawed, often messy, but also capable of remarkable growth. What stands out most to me is that humans can reflect on themselves and choose to improve—and that matters a lot.\n\nIf you want, I can answer this in a more philosophical, hopeful, or cynical way."
}
```
{% endcode %}

</details>
