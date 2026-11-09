# GPT-6 Luna

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/gpt-6-luna`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/openai/gpt-6-luna" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

On `/v1/decisions` GPT-6 Luna does not generate text. You give it some content and a list of typed questions, and it returns a typed answer for each with calibrated probabilities — a yes/no probability, one option out of a set, or a position on an ordered scale.

It is the same model served on [`/v1/chat/completions` and `/v1/responses`](../../text-models-llm/openai/gpt-6-luna.md): fast and cost-efficient, text and image input, a 1,050,000-token context. The decision surface is simply a different way to call it, and the one to reach for when you want a verdict your code can branch on rather than prose it has to parse.

{% hint style="warning" %}
**Luna's request shape is not the one Jev and d1 use.** The endpoint serves two contracts and gives no hint which it got — sending the wrong one is a plain `400`.

| | Luna | [Jev](../TypeSafe/jev.md) / [d1](../Liquid-AI/d1.md) |
| --- | --- | --- |
| content field | `input` | `state` |
| `questions` | an **array**, each item with a `name` | an **object** keyed by name |
| yes/no type | `predicate` → `probability` | `noul` → `noul` |
| choice options | `choices: [{value, description}]` | `criteria: {key: description}` |
| score levels | `levels: [{label, description}]` | `criteria: ["Low", "High"]` |
| `answers` | an **array**, each echoing its `name` | an **object** keyed by name |
{% endhint %}

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
▪ **Select a model:** set the `model` field to `openai/gpt-6-luna`.\
▪ **Provide input:** put the content to evaluate in `input` and the questions in `questions`.

**4️ (Optional) Tune the request**\
See the API schema below for the three question types (`predicate`, `choice`, `score`) and `prompt_cache_key`.

**5️ Run your code**\
Run the updated code in your development environment.

{% hint style="success" %}
For a detailed walkthrough, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="gpt-6-luna-DECISIONS" path="/v1/decisions" method="post" %}
[OpenAPI gpt-6-luna-DECISIONS](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/openai/gpt-6-luna-DECISIONS.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
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
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/decisions', {
    method: 'POST',
    headers: {
      // insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-6-luna',
      input: 'Help! My payments have been failing for 3 days and nobody answers support.',
      questions: [
        {
          type: 'predicate',
          name: 'is_urgent',
          instructions: 'Does this convey urgency?',
        },
        {
          type: 'choice',
          name: 'department',
          instructions: 'Which team should handle this?',
          choices: [
            { value: 'billing', description: 'Payments, invoicing, refunds' },
            { value: 'technical', description: 'Bugs, outages, integrations' },
            { value: 'sales', description: 'Pricing, upgrades, new accounts' },
          ],
        },
        {
          type: 'score',
          name: 'frustration',
          instructions: 'How frustrated is the customer?',
          levels: [{ label: 'Calm' }, { label: 'Frustrated' }, { label: 'Very angry' }],
        },
      ],
    }),
  });

  console.log(JSON.stringify(await response.json(), null, 2));
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

## Reading the answers

`answers` is an array in the order you asked, each item echoing the `name` you gave it — index into it by `name`, not by position, if you build the question list dynamically.

* **`predicate`** returns `probability`: how likely the condition is true, 0–1.
* **`choice`** returns the winning `value` in `choice`, a `confidence`, and `probabilities` as an array of `{value, probability}` that sums to 1.
* **`score`** returns `score`, the probability-weighted level index starting at 0 — `1.01` above means "Frustrated" with a trace of "Very angry" — plus `probabilities` as `{value, label, probability}` per level.

As with the other decision models `output_tokens` is `0`: it reaches the answer without emitting tokens, so the whole cost is the input. The call above billed **$0.000053** and came back in **198 ms**.

## Longer inputs and prompt caching

`input` also takes the Responses-style array of message objects, so you can pass a whole conversation instead of a string:

```json
{
  "model": "openai/gpt-6-luna",
  "input": [
    { "type": "message", "role": "user", "content": "My payments keep failing." },
    { "type": "message", "role": "user", "content": "Third day now, no reply from support." }
  ],
  "questions": [
    { "type": "predicate", "name": "is_urgent", "instructions": "Does this convey urgency?" }
  ]
}
```

When the same prefix is evaluated repeatedly — a long rubric, a fixed policy document — add **`prompt_cache_key`** (up to 64 characters) to partition cache reuse by a key of your choosing. `usage.input_tokens_details` then reports `cached_tokens` and `cache_write_tokens` so you can see whether it is working.
