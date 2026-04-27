# gpt-5-5-pro

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-5-5-pro`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/openai/gpt-5-5-pro" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

OpenAI’s flagship model and one of its best offerings as of late April 2026. Designed for maximum quality, reliability, and performance in critical or high-precision workloads. Ideal for advanced reasoning, premium generation quality, and complex production workflows.\
This model can only be called via the `/responses` endpoint.

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

{% openapi-operation spec="gpt-5-5-pro" path="/v1/responses" method="post" %}
[OpenAPI gpt-5-5-pro](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/OpenAI/gpt-5-5-pro-RESPONSES.json)
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
        "model":"openai/gpt-5-5-pro",
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
      model: 'openai/gpt-5-5-pro',
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
  "id": "Chyyu2KgZuNhSnHKMr8dO",
  "object": "response",
  "created_at": 1777249873,
  "status": "completed",
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1777249891,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": null,
  "max_tool_calls": null,
  "model": "gpt-5.5-pro-2026-04-23",
  "moderation": null,
  "output": [
    {
      "id": "rs_002611bcb314c3ad0069eeae63a18c81939ee43c6302aea5fa",
      "type": "reasoning",
      "summary": []
    },
    {
      "id": "msg_002611bcb314c3ad0069eeae63a3248193aabe8d57c839e0ab",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "Hi! I don’t have personal feelings in the human sense, but my perspective is that mankind is deeply contradictory and remarkable: capable of cruelty, shortsightedness, and destruction, but also compassion, imagination, courage, science, art, humor, and self-sacrifice.\n\nWhat stands out most is humanity’s ability to *reflect on itself*—to ask what is good, to learn from mistakes, to build meaning, and to care about people far beyond one’s immediate circle. That capacity gives mankind both danger and hope.\n\nSo, in short: humanity is flawed, powerful, and still unfinished. At its best, it’s astonishing."
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
  "prompt_cache_retention": "24h",
  "reasoning": {
    "effort": "high",
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
    "output_tokens": 249,
    "output_tokens_details": {
      "reasoning_tokens": 114
    },
    "total_tokens": 264
  },
  "user": null,
  "metadata": {},
  "output_text": "Hi! I don’t have personal feelings in the human sense, but my perspective is that mankind is deeply contradictory and remarkable: capable of cruelty, shortsightedness, and destruction, but also compassion, imagination, courage, science, art, humor, and self-sacrifice.\n\nWhat stands out most is humanity’s ability to *reflect on itself*—to ask what is good, to learn from mistakes, to build meaning, and to care about people far beyond one’s immediate circle. That capacity gives mankind both danger and hope.\n\nSo, in short: humanity is flawed, powerful, and still unfinished. At its best, it’s astonishing."
}
```
{% endcode %}

</details>
