# Jev 1.13

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `typesafe/jev-1.13`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/typesafe/jev-1.13" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Jev is a "System One" decision model from TypeSafe: instead of generating text it returns typed answers — yes/no, choice, score — with calibrated probabilities. It is built for routing, classification, triage and other in-app decision points where a fast, predictable verdict matters more than prose, and it answers in well under a second.

**Version 1.13** is the previous release, kept available under its own id so an integration can stay on it. It also reads experimental images. Context window is 262,144 tokens.

Pin this id when you need the behaviour to stay put. [Jev 1.14](jev-1.14.md) is the current version — it improves across the board, most of all in languages other than English, and adds the `box` question type, which this version does not have.

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
▪ **Select a model:** set the `model` field to `typesafe/jev-1.13`.\
▪ **Provide input:** put the content to evaluate in `state` and describe what to decide in `questions`.

**4️ (Optional) Tune the request**\
See the API schema below for the three question types (`noul`, `choice`, `score`) and their `criteria`.

**5️ Run your code**\
Run the updated code in your development environment.

{% hint style="success" %}
For a detailed walkthrough, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="typesafe-jev-1-13" path="/v1/decisions" method="post" %}
[OpenAPI typesafe-jev-1-13](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/decision-models/TypeSafe/jev-1.13.json)
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
        "model": "typesafe/jev-1.13",
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
      model: 'typesafe/jev-1.13',
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
  "model": "jev-1.13.0",
  "answers": {
    "is_urgent": {
      "type": "noul",
      "noul": 0.96
    },
    "department": {
      "type": "choice",
      "choice": "billing",
      "confidence": 0.97,
      "probabilities": {
        "billing": 0.98,
        "technical": 0.02,
        "sales": 0
      }
    },
    "frustration": {
      "type": "score",
      "score": 1.32,
      "confidence": 0.52,
      "legend": {
        "0": "Calm",
        "1": "Frustrated",
        "2": "Very angry"
      },
      "probabilities": {
        "0": 0,
        "1": 0.68,
        "2": 0.32
      }
    }
  },
  "usage": {
    "input_tokens": 406,
    "output_tokens": 73
  },
  "meta": {
    "model": "typesafe/jev-1.13",
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

Every key you send under `questions` comes back under `answers` with the matching type. The top-level `model` is the exact build that answered (`jev-1.13.0`); `meta.model` is the id you called.
