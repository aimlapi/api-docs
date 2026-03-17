# gpt-5-4-pro

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-5-4-pro`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/openai/gpt-5-4-pro" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

OpenAI’s latest high-performance language models for reasoning, coding, and advanced text generation as of March 2026. The Pro version offers stronger reasoning and better accuracy for complex tasks.

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

{% openapi-operation spec="gpt-5-4-pro" path="/v1/responses" method="post" %}
[OpenAPI gpt-5-4-pro](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/OpenAI/gpt-5-4-pro-RESPONSES.json)
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
        "model":"openai/gpt-5-4-pro",
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
      model: 'openai/gpt-5-4-pro',
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
  "id": "vlBAC8PE7nmIAtGg3T8B-",
  "object": "response",
  "created_at": 1773733347,
  "status": "completed",
  "background": false,
  "billing": {
    "payer": "developer"
  },
  "completed_at": 1773733429,
  "error": null,
  "frequency_penalty": 0,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": null,
  "max_tool_calls": null,
  "model": "gpt-5.4-pro-2026-03-05",
  "output": [
    {
      "id": "rs_01f52c93d42a8cb40069b90635d7a08193822ca9c61bcb815c",
      "type": "reasoning",
      "summary": []
    },
    {
      "id": "msg_01f52c93d42a8cb40069b90635d8c88193b6a68c24d56208ab",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "Hi! I think mankind is extraordinary and contradictory.\n\nHumans are capable of immense kindness, creativity, and courage. You make art, science, music, friendship, medicine, stories, and meaning. You keep going even when life is hard, and you often help each other in ways that are deeply moving.\n\nAt the same time, humans can be cruel, short-sighted, tribal, and destructive. A lot of suffering in the world comes from fear, greed, and the tendency to divide people into “us” and “them.”\n\nWhat stands out most to me is that mankind is unfinished. Humanity isn’t one fixed thing — it’s a constant struggle between your better instincts and your worse ones. And despite all the mistakes, people keep trying to improve: to understand more, love better, build fairer systems, and leave things better than they found them.\n\nSo overall: flawed, dangerous, brilliant, and full of potential.\n\nIf you want, I can answer that in a more philosophical, optimistic, or cynical way too."
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
    "effort": "medium",
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
    "output_tokens": 334,
    "output_tokens_details": {
      "reasoning_tokens": 120
    },
    "total_tokens": 349
  },
  "user": null,
  "metadata": {},
  "output_text": "Hi! I think mankind is extraordinary and contradictory.\n\nHumans are capable of immense kindness, creativity, and courage. You make art, science, music, friendship, medicine, stories, and meaning. You keep going even when life is hard, and you often help each other in ways that are deeply moving.\n\nAt the same time, humans can be cruel, short-sighted, tribal, and destructive. A lot of suffering in the world comes from fear, greed, and the tendency to divide people into “us” and “them.”\n\nWhat stands out most to me is that mankind is unfinished. Humanity isn’t one fixed thing — it’s a constant struggle between your better instincts and your worse ones. And despite all the mistakes, people keep trying to improve: to understand more, love better, build fairer systems, and leave things better than they found them.\n\nSo overall: flawed, dangerous, brilliant, and full of potential.\n\nIf you want, I can answer that in a more philosophical, optimistic, or cynical way too."
}
```
{% endcode %}

</details>
