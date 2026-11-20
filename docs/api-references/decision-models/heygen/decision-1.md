---
description: "Model id: heygen/decision-1. HeyGen Decision 1 answers typed questions about text and images in one request (yes/no, choice, score) with a calibrated probability for every answer and no generated text…"
---

# HeyGen Decision 1

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `heygen/decision-1`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/heygen/decision-1" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

HeyGen Decision 1 is HeyGen's decision model: instead of generating text it returns typed answers (yes/no, choice, score) with a calibrated probability for every answer. One request can carry up to 400 named questions about the same text and up to 32 images, which makes it a fit for moderation, identity checks, routing, triage and QA. Context window is 131,072 tokens.

[HeyGen Decision 1 Turbo](decision-1-turbo.md) takes the same request and is the faster, cheaper option: on the support ticket below it used 765 input tokens against 1,002 here, and it takes up to 100 images instead of 32.

It uses the same `/v1/decisions` request as [Jev](../typesafe/jev.md) and [d1](../liquid-ai/d1.md) for text: `state` and an object of typed `questions`. Images differ: they go in **`images`**, not in `assets` (see [below](#images)).

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
▪ **Select a model:** set the `model` field to `heygen/decision-1`.\
▪ **Provide input:** put the content to evaluate in `state` and describe what to decide in `questions`.

**4️ (Optional) Tune the request**\
See the API schema below for the three question types (`noul`, `choice`, `score`), their `criteria`, and the `images` field.

**5️ Run your code**\
Run the updated code in your development environment.

{% hint style="success" %}
For a detailed walkthrough, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="heygen-decision-1" path="/v1/decisions" method="post" %}
[OpenAPI heygen-decision-1](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/decision-models/heygen/decision-1.json)
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
        "model": "heygen/decision-1",
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
      model: 'heygen/decision-1',
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
  "model": "heygen-decision-1",
  "answers": {
    "is_urgent": {
      "type": "noul",
      "noul": 0.97
    },
    "department": {
      "type": "choice",
      "choice": "billing",
      "confidence": 0.99,
      "probabilities": {
        "billing": 0.99,
        "sales": 0.0,
        "technical": 0.01
      }
    },
    "frustration": {
      "type": "score",
      "score": 1.04,
      "confidence": 0.82,
      "legend": {
        "0": "Calm",
        "1": "Frustrated",
        "2": "Very angry"
      },
      "probabilities": {
        "0": 0.04,
        "1": 0.88,
        "2": 0.08
      }
    }
  },
  "usage": {
    "input_tokens": 1002,
    "output_tokens": 0
  },
  "meta": {
    "model": "heygen/decision-1",
    "provider": "heygen",
    "usage": {
      "credits_used": 281,
      "usd_spent": 0.0
    }
  }
}
```
{% endcode %}

</details>

Every key you send under `questions` comes back under `answers` with the matching type. The top-level `model` is the build that answered (`heygen-decision-1`); `meta.model` is the id you called. Output tokens are always 0: the model returns probabilities, not text.

## Images

Send up to 32 images in **`images`**, in order. Each entry is a JPEG, PNG or WebP image as an http(s) URL or a base64 `data:` URL (`data:image/png;base64,…`). Every question sees all of them, so refer to an image by its position ("image 1", "image 2") in `instructions`. `assets`, which [Jev 1.14](../typesafe/jev-1.14.md) uses for images, is refused by this model, and there is no `box` question.

{% code overflow="wrap" %}
```python
import json, requests

response = requests.post(
    "https://api.aimlapi.com/v1/decisions",
    headers={
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "heygen/decision-1",
        "state": "A photo uploaded as a profile picture.",
        "images": ["https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"],
        "questions": {
            "has_animal": {"type": "noul", "instructions": "Is there an animal in image 1?"},
            "animal": {
                "type": "choice",
                "instructions": "Which animal is in image 1?",
                "criteria": {"cat": None, "dog": None, "bird": None, "none": "No animal"},
            },
            "ok_as_avatar": {"type": "noul", "instructions": "Is image 1 safe to show as a public profile picture?"},
        },
    },
)

print(json.dumps(response.json(), indent=2, ensure_ascii=False))
```
{% endcode %}

{% code overflow="wrap" %}
```json
{
  "model": "heygen-decision-1",
  "answers": {
    "has_animal": {
      "type": "noul",
      "noul": 1.0
    },
    "animal": {
      "type": "choice",
      "choice": "cat",
      "confidence": 1.0,
      "probabilities": {
        "bird": 0.0,
        "cat": 1.0,
        "dog": 0.0,
        "none": 0.0
      }
    },
    "ok_as_avatar": {
      "type": "noul",
      "noul": 0.98
    }
  },
  "usage": {
    "input_tokens": 3697,
    "output_tokens": 0
  },
  "meta": {
    "model": "heygen/decision-1",
    "provider": "heygen",
    "usage": {
      "credits_used": 1036,
      "usd_spent": 0.0
    }
  }
}
```
{% endcode %}

A `choice` option can be `null` when its key says it all, as `cat`, `dog` and `bird` do above.

{% hint style="warning" %}
Images are billed as input tokens: 1.5 tokens per 32×32-pixel patch (a 1024×1024 image is 1,536), counted again for every question. The request above billed 3,697 input tokens against 1,002 for the text-only one. Images are never resized: one outside the limits, or a request over 16 MiB once the images are inlined, is refused with a `400` that says what to change.
{% endhint %}
