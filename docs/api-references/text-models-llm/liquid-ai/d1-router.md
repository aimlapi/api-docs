# D1 Router

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `liquid/d1-router`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/liquid/d1-router" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Routes each chat request to a model picked for it. Liquid AI d1 judges how hard the request is, and the request goes to the cheapest model of the matching tier that can take it — light: GPT-6 Luna, DeepSeek V4.1 Flash, Gemini 3.1 Flash-Lite, Gemini 3.5 Flash-Lite; standard: GPT-6.1 Sol, Claude Sonnet 5.5; heavy: Claude Opus 5.5, GPT-6 Astra — falling back to a pricier one of the same tier if it fails. Light models do not reason unless you ask (`reasoning_effort`); standard and heavy ones may think before they answer. You pay the rate of the model that answers, named in `meta.model` (and the `x-aimlapi-model` header when not streaming), plus the judgement: one `liquid/d1` decision at its catalogue price, listed as its own request in your usage (a turn that returns tool results goes back to the model that made the calls and needs none).

{% hint style="info" %}
The two routers share one routing table — the pool, the tiers and the reasoning rules below are identical to the [Jev Router](../ml-api/jev-router.md). Only the judge differs, and that shows up in latency: d1 is served from Liquid AI's free tier, where a judgement has been measured at **27–41 seconds**, against well under a second for TypeSafe Jev. The judgement runs before the answering model is even picked, so it is added to every first request in a conversation. Prefer the Jev Router when time to first token matters.
{% endhint %}

Context window is 1,050,000 tokens, with up to 384,000 tokens of output. The router accepts text, images, files and audio, and supports tools, parallel tool calls, streaming and structured output — the request shape is the same as any other chat model here.

## Which models it routes to

Eight models, in three tiers. Within a tier they are comparable in quality and listed **cheapest first**: a request lands on the cheapest one that can take it, and falls back **up** in price, never down.

| Tier         | Models, cheapest first                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **light**    | `openai/gpt-6-luna` · `deepseek/deepseek-v4.1-flash` · `google/gemini-3-1-flash-lite` · `google/gemini-3-5-flash-lite` |
| **standard** | `openai/gpt-6.1-sol` · `anthropic/claude-sonnet-5.5`                                                                   |
| **heavy**    | `anthropic/claude-opus-5.5` · `openai/gpt-6-astra`                                                                     |

Liquid AI d1 scores how much capability the request needs, on a scale from _trivial_ to _frontier_. Below 1.5 the request goes to the light tier, below 2.5 to standard, otherwise to heavy; if the judgement does not come back, it defaults to **standard**. A candidate that cannot take the request — tools, images, a JSON schema, the context size — is skipped for the next one in its tier, and each request carries **one** fallback: the model chosen and the next eligible one.

Within a conversation the choice sticks for 30 minutes, so a follow-up does not get re-judged or jump models mid-thread.

The reasoning rule follows the tier. Light models are sent with their thinking off, so a small `max_tokens` is an answer rather than an empty, paid-for reasoning trace; standard and heavy ones may think before they answer. Either way, if **you** set `reasoning_effort`, `reasoning` or `thinking`, the router passes your value through untouched.

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
▪ **Select a model:** set the `model` field to `liquid/d1-router` — the router picks the answering model for you.\
▪ **Provide input:** fill in the request input field(s) shown in the example.

**4️ (Optional) Tune the request**\
See the API schema below for optional generation settings.

**5️ Run your code**\
Run the updated code in your development environment.

{% hint style="success" %}
For a detailed walkthrough, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="d1-router" path="/v1/chat/completions" method="post" %}
[OpenAPI d1-router](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Liquid-AI/d1-router.json)
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
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "liquid/d1-router",
        "messages": [
            {
                "role": "user",
                "content": "Hi! What's the capital of France?"  # insert your prompt
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))

# which model actually answered, and what you were billed for:
print(data["meta"]["model"], response.headers.get("x-aimlapi-model"))
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
      model: 'liquid/d1-router',
      messages: [
        {
          role: 'user',
          content: "Hi! What's the capital of France?" // insert your prompt here
        }
      ],
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));

  // which model actually answered, and what you were billed for:
  console.log(data.meta.model, response.headers.get('x-aimlapi-model'));
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
  "id": "chatcmpl-EVdZurlE1APJaMkCWYneQS6myVPdv",
  "object": "chat.completion",
  "created": 1791209014,
  "model": "gpt-6-luna",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Paris.",
        "refusal": null,
        "annotations": []
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 14,
    "completion_tokens": 5,
    "total_tokens": 19,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  },
  "service_tier": "default",
  "system_fingerprint": null,
  "meta": {
    "model": "openai/gpt-6-luna",
    "provider": "openai",
    "usage": {
      "credits_used": 11,
      "usd_spent": 0.0000055
    },
    "metrics": {
      "duration_ms": 617,
      "ttft_ms": 616,
      "tps": 8.1
    }
  }
}
```
{% endcode %}

</details>

## Finding out which model answered

The router never answers in its own name, so `model` at the top level is **the model that was picked**, in its short form — `gpt-6-luna` above, not `liquid/d1-router`. The canonical id is in `meta.model`, and `meta.usage` is what that model charged you.

On non-streaming requests the same facts come back as response headers, which is the cheaper place to read them if you do not need the body:

| Header                   | Example             |
| ------------------------ | ------------------- |
| `x-aimlapi-model`        | `openai/gpt-6-luna` |
| `x-aimlapi-provider`     | `openai`            |
| `x-aimlapi-credits-used` | `11`                |
| `x-aimlapi-usd-spent`    | `0.000005500`       |

The same two questions, asked of the router, land on different models — this is the routing working as intended:

```bash
# trivial -> light tier
curl -s https://api.aimlapi.com/v1/chat/completions \
  -H 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' -H 'Content-Type: application/json' \
  -d '{"model":"liquid/d1-router","messages":[{"role":"user","content":"Hi! What'\''s the capital of France?"}]}' \
  | jq '.meta.model, .meta.usage.usd_spent'
# "openai/gpt-6-luna"
# 0.0000055

# hard -> standard tier
curl -s https://api.aimlapi.com/v1/chat/completions \
  -H 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' -H 'Content-Type: application/json' \
  -d '{"model":"liquid/d1-router","messages":[{"role":"user","content":"Prove rigorously that the sum of the first n odd numbers equals n squared."}]}' \
  | jq '.meta.model, .meta.usage.usd_spent'
# "openai/gpt-6.1-sol"
# 0.0066095
```

{% hint style="info" %}
Because the answering model changes per request, so does the price. Budget against `meta.usage.usd_spent` per call rather than a fixed per-token rate, and expect a second, separate line in your [usage logs](../../service-endpoints/usage-logs.md) for the `liquid/d1` judgement that picked the model.
{% endhint %}

{% hint style="warning" %}
Pin a specific model instead of the router when you need a guaranteed context window, a specific capability, or a stable price per call. The router's own limits (1,050,000 context, 384,000 output) are the ceiling across the pool, not a promise about the model that takes any given request.
{% endhint %}
