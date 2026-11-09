# Jev 1.14

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `typesafe/jev-1.14`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/typesafe/jev-1.14" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Jev is a "System One" decision model from TypeSafe: instead of generating text it returns typed answers — yes/no, choice, score, box — with calibrated probabilities. It is built for routing, classification, triage and other in-app decision points where a fast, predictable verdict matters more than prose, and it answers in well under a second.

**Version 1.14** improves across the board, most of all in languages other than English, and adds two experimental capabilities: reading images, and the new **`box`** question — where something is in an image. Context window is 262,144 tokens.

This is the pinned id. `typesafe/jev` currently resolves to this same version, but it moves with each release — pin `typesafe/jev-1.14` when you need the behaviour to stay put, and see [Jev 1.13](jev-1.13.md) for the previous one.

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
▪ **Select a model:** set the `model` field to `typesafe/jev-1.14`.\
▪ **Provide input:** put the content to evaluate in `state` and describe what to decide in `questions`.

**4️ (Optional) Tune the request**\
See the API schema below for the four question types (`noul`, `choice`, `score`, `box`) and their `criteria`.

**5️ Run your code**\
Run the updated code in your development environment.

{% hint style="success" %}
For a detailed walkthrough, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="typesafe-jev-1-14" path="/v1/decisions" method="post" %}
[OpenAPI typesafe-jev-1-14](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/decision-models/TypeSafe/jev-1.14.json)
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
        "model": "typesafe/jev-1.14",
        "state": "Help! My payments have been failing for 3 days and nobody answers support.",
        "questions": {
            "is_urgent": {
                "type": "noul",
                "instructions": "Does this convey urgency?",
            },
            "department": {
                "type": "choice",
                "instructions": "Which team should handle this?",
                "criteria": {
                    "billing": "Payments, invoicing, refunds",
                    "technical": "Bugs, outages, integrations",
                    "sales": "Pricing, upgrades, new accounts",
                },
            },
            "frustration": {
                "type": "score",
                "instructions": "How frustrated is the customer?",
                "criteria": ["Calm", "Frustrated", "Very angry"],
            },
        },
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
      model: 'typesafe/jev-1.14',
      state: 'Help! My payments have been failing for 3 days and nobody answers support.',
      questions: {
        is_urgent: {
          type: 'noul',
          instructions: 'Does this convey urgency?',
        },
        department: {
          type: 'choice',
          instructions: 'Which team should handle this?',
          criteria: {
            billing: 'Payments, invoicing, refunds',
            technical: 'Bugs, outages, integrations',
            sales: 'Pricing, upgrades, new accounts',
          },
        },
        frustration: {
          type: 'score',
          instructions: 'How frustrated is the customer?',
          criteria: ['Calm', 'Frustrated', 'Very angry'],
        },
      },
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
  "model": "jev-1.14.0",
  "answers": {
    "is_urgent": {
      "type": "noul",
      "noul": 0.96
    },
    "department": {
      "type": "choice",
      "choice": "billing",
      "confidence": 0.98,
      "probabilities": {
        "billing": 0.99,
        "technical": 0.01,
        "sales": 0
      }
    },
    "frustration": {
      "type": "score",
      "score": 1.21,
      "confidence": 0.69,
      "legend": {
        "0": "Calm",
        "1": "Frustrated",
        "2": "Very angry"
      },
      "probabilities": {
        "0": 0.02,
        "1": 0.75,
        "2": 0.23
      }
    }
  },
  "usage": {
    "input_tokens": 406,
    "output_tokens": 73
  },
  "meta": {
    "model": "typesafe/jev-1.14",
    "provider": "typesafe",
    "usage": {
      "credits_used": 45,
      "usd_spent": 0.0000225
    }
  }
}
```
{% endcode %}

</details>

Every key you send under `questions` comes back under `answers` with the matching type. The top-level `model` is the exact build that answered (`jev-1.14.0`); `meta.model` is the id you called.

## Images and the `box` question

New in 1.14, and marked experimental by TypeSafe: the model reads images, and a **`box`** question returns where something is in one.

Images go in **`assets`**, not in `images` — each entry is a base64-encoded PNG or JPEG, with no `data:` prefix and no line breaks. Refer to an asset by its key from the question's `instructions`.

A `box` answer is four edges, each a fraction of the image from the top-left corner, plus a confidence. There is **no "not found" answer**, so pair it with a `noul` that asks whether the target is in the picture at all — exactly as below.

{% code overflow="wrap" %}
```python
import base64, json, requests

with open("photo.jpg", "rb") as f:
    encoded = base64.b64encode(f.read()).decode()

response = requests.post(
    "https://api.aimlapi.com/v1/decisions",
    headers={
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "typesafe/jev-1.14",
        "state": "A photo of a forest floor.",
        "assets": {
            "photo": {"type": "image", "format": "jpg", "data_base64": encoded},
        },
        "questions": {
            # there is no "not found" box, so ask first whether it is there
            "has_mushroom": {"type": "noul", "instructions": "Is there a mushroom in `photo`?"},
            "where": {"type": "box", "instructions": "The mushroom cap in `photo`"},
        },
    },
)

print(json.dumps(response.json(), indent=2, ensure_ascii=False))
```
{% endcode %}

{% code overflow="wrap" %}
```json
{
  "model": "jev-1.14.0",
  "answers": {
    "has_mushroom": {
      "type": "noul",
      "noul": 0.96
    },
    "where": {
      "type": "box",
      "box": {
        "top": 0.15,
        "bottom": 0.34,
        "left": 0.31,
        "right": 0.93
      },
      "confidence": 0.79
    }
  },
  "usage": {
    "input_tokens": 3830,
    "output_tokens": 40
  },
  "meta": {
    "model": "typesafe/jev-1.14",
    "provider": "typesafe",
    "usage": {
      "credits_used": 419,
      "usd_spent": 0.0002095
    }
  }
}
```
{% endcode %}

To turn the fractions into pixels, multiply `left`/`right` by the image width and `top`/`bottom` by its height.

{% hint style="warning" %}
An image costs far more than text: the request above billed 3,830 input tokens against 406 for the text-only one on the same model — roughly nine times as much for one 66 KB photo. Send images only on the questions that need them.
{% endhint %}

{% hint style="info" %}
`box` takes no `criteria`, and the `images` field is refused — this model takes images in `assets`, TypeSafe's own format. Both capabilities are experimental and not production-ready per TypeSafe.
{% endhint %}
