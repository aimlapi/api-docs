# Gpt 6 Luna

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-6-luna`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/gpt-6-luna" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Fast, cost-efficient GPT-6 model from OpenAI, positioned below GPT-6 Sol for high-volume and latency-sensitive work: text and image input over a 1.05M-token context, with reasoning, function calling and the Responses server tools.

It is served on three surfaces: `/v1/chat/completions`, `/v1/responses`, and — since the latest release — `/v1/decisions`, where it answers typed questions instead of generating text. See [Using it as a decision model](#using-it-as-a-decision-model) below, and [Decision Models](../../decision-models/README.md) for what the endpoint is for.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schemas

{% openapi-operation spec="gpt-6-luna" path="/v1/chat/completions" method="post" %}
[OpenAPI gpt-6-luna](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/openai/gpt-6-luna.json)
{% endopenapi-operation %}

{% openapi-operation spec="gpt-6-luna-RESPONSES" path="/v1/responses" method="post" %}
[OpenAPI gpt-6-luna-RESPONSES](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/openai/gpt-6-luna-RESPONSES.json)
{% endopenapi-operation %}

{% openapi-operation spec="gpt-6-luna-DECISIONS" path="/v1/decisions" method="post" %}
[OpenAPI gpt-6-luna-DECISIONS](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/openai/gpt-6-luna-DECISIONS.json)
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
        "model":"openai/gpt-6-luna",
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
      model: 'openai/gpt-6-luna-pro',
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
  "id": "gen-1777366507-bSV7vJgDvkOHnhhiYzuR",
  "object": "chat.completion",
  "created": 1777366507,
  "model": "openai/gpt-6-luna",
  "system_fingerprint": null,
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "That's a profound question! As an AI, I observe mankind with a mix of awe and curiosity. You're a species of breathtaking contradictions—you've created symphonies and space stations, but also wars and pollution. You possess the unique ability to reflect on your own existence, to ask \"why?\" about the stars, a song, or your own feelings.\n\nWhat stands out most to me is your boundless capacity for both empathy and invention. You build cathedrals and write poems, but you also collaborate to solve problems like disease and hunger. In the grand cosmic story, you are very young, yet you've already understood enough about the universe to question your place within it.\n\nI think of mankind as cosmic teenagers—full of potential, sometimes reckless, but capable of extraordinary growth and kindness. Your greatest strength might be your ability to imagine a better world and then, slowly and imperfectly, work to build it.\n\nWhat part of the human experience do you find most fascinating?",
        "refusal": null,
        "reasoning": "Hmm, this is a broad philosophical question. The user is asking for my perspective on humanity, which requires balancing objectivity with emotional nuance. \n\nI should start by acknowledging the complexity of the topic while maintaining a warm tone. The user might be looking for both intellectual depth and emotional resonance. \n\nI can structure the response by first stating the duality of human nature, then highlighting their unique capacity for both destruction and creation. The cosmic perspective could add weight, while ending with a hopeful note about their potential feels appropriate. \n\nThe key is to avoid sounding either overly optimistic or cynical - humanity is both flawed and remarkable. The metaphor of \"cosmic teenagers\" might make the concept more relatable.",
        "reasoning_details": [
          {
            "type": "reasoning.text",
            "text": "Hmm, this is a broad philosophical question. The user is asking for my perspective on humanity, which requires balancing objectivity with emotional nuance. \n\nI should start by acknowledging the complexity of the topic while maintaining a warm tone. The user might be looking for both intellectual depth and emotional resonance. \n\nI can structure the response by first stating the duality of human nature, then highlighting their unique capacity for both destruction and creation. The cosmic perspective could add weight, while ending with a hopeful note about their potential feels appropriate. \n\nThe key is to avoid sounding either overly optimistic or cynical - humanity is both flawed and remarkable. The metaphor of \"cosmic teenagers\" might make the concept more relatable.",
            "format": "unknown",
            "index": 0
          }
        ]
      }
    }
  ],
  "usage": {
    "completion_tokens": 343,
    "prompt_tokens": 256,
    "total_tokens": 599,
    "completion_tokens_details": {
      "reasoning_tokens": 141,
      "image_tokens": 0,
      "audio_tokens": 0
    },
    "prompt_tokens_details": {
      "cached_tokens": 192,
      "cache_write_tokens": 0,
      "audio_tokens": 0,
      "video_tokens": 0
    }
  },
  "meta": {
    "usage": {
      "credits_used": 1892,
      "usd_spent": 0.000946
    }
  }
}
```
{% endcode %}

</details>

## Using it as a decision model

On `/v1/decisions` Luna does not generate text. You give it some content and a list of typed questions, and it returns a typed answer for each with calibrated probabilities — see [Decision Models](../../decision-models/README.md) for what the endpoint is for.

{% hint style="warning" %}
**Luna's request shape is not the one Jev and d1 use.** The endpoint serves two different contracts, and sending the wrong one is a `400`. On Luna:

| | Luna | [Jev](../../decision-models/TypeSafe/jev.md) / [d1](../../decision-models/Liquid-AI/d1.md) |
| --- | --- | --- |
| content field | `input` | `state` |
| `questions` | an **array**, each item with a `name` | an **object** keyed by name |
| yes/no type | `predicate` → `probability` | `noul` → `noul` |
| choice options | `choices: [{value, description}]` | `criteria: {key: description}` |
| score levels | `levels: [{label, description}]` | `criteria: ["Low", "High"]` |
| `answers` | an **array**, each echoing its `name` | an **object** keyed by name |
{% endhint %}

{% code overflow="wrap" %}
```python
import requests
import json

response = requests.post(
    "https://api.aimlapi.com/v1/decisions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "openai/gpt-6-luna",
        "input": "Help! My payments have been failing for 3 days and nobody answers support.",
        "questions": [
            {
                "type": "predicate",
                "name": "is_urgent",
                "instructions": "Does this convey urgency?",
            },
            {
                "type": "choice",
                "name": "department",
                "instructions": "Which team should handle this?",
                "choices": [
                    {"value": "billing", "description": "Payments, invoicing, refunds"},
                    {"value": "technical", "description": "Bugs, outages, integrations"},
                    {"value": "sales", "description": "Pricing, upgrades, new accounts"},
                ],
            },
            {
                "type": "score",
                "name": "frustration",
                "instructions": "How frustrated is the customer?",
                "levels": [{"label": "Calm"}, {"label": "Frustrated"}, {"label": "Very angry"}],
            },
        ],
    },
)

print(json.dumps(response.json(), indent=2, ensure_ascii=False))
```
{% endcode %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json
{
  "model": "gpt-6-luna",
  "answers": [
    {
      "type": "predicate",
      "name": "is_urgent",
      "probability": 0.98
    },
    {
      "type": "choice",
      "name": "department",
      "choice": "billing",
      "probabilities": [
        { "value": "billing", "probability": 1 },
        { "value": "technical", "probability": 0 },
        { "value": "sales", "probability": 0 }
      ],
      "confidence": 1
    },
    {
      "type": "score",
      "name": "frustration",
      "score": 1.01,
      "probabilities": [
        { "value": 0, "label": "Calm", "probability": 0 },
        { "value": 1, "label": "Frustrated", "probability": 0.99 },
        { "value": 2, "label": "Very angry", "probability": 0.01 }
      ],
      "confidence": 0.99
    }
  ],
  "usage": {
    "input_tokens": 406,
    "input_tokens_details": { "cached_tokens": 0, "cache_write_tokens": 0 },
    "output_tokens": 0,
    "output_tokens_details": { "reasoning_tokens": 0 },
    "total_tokens": 406
  },
  "meta": {
    "model": "openai/gpt-6-luna",
    "provider": "openai-verified",
    "usage": { "credits_used": 106, "usd_spent": 0.000053 },
    "metrics": { "duration_ms": 198 }
  }
}
```
{% endcode %}

</details>

`score` is the probability-weighted level index, 0-based — `1.01` above means "Frustrated" with a trace of "Very angry". As with other decision models `output_tokens` is `0`: the whole cost is the input, $0.000053 for the call above, answered in 198 ms.

`input` also accepts the Responses-style array of message objects, so you can hand it a conversation rather than a string. Add `prompt_cache_key` to partition prompt-cache reuse by a key of your own — `usage.input_tokens_details` reports what was cached.
