---
icon: scale-balanced
---

# Decision Models

Decision models do not generate text. You give them a piece of content (the **state**) and a set of typed **questions**, and they return a typed answer for each question together with calibrated probabilities. They are built for the places inside an application where a fast, predictable, machine-readable verdict matters more than prose: routing, classification, triage, moderation gates, A/B triggers.

Compared with prompting an LLM for JSON, a decision model answers in a fraction of the time, cannot produce anything outside the question schema, and reports how confident it is instead of writing a number into free text.

## Question Types

| Type     | Question                                   | Answer                                                                 |
| -------- | ------------------------------------------ | ---------------------------------------------------------------------- |
| `noul`   | A yes/no question.                         | `noul` — probability that the answer is "yes" (0–1).                   |
| `choice` | Pick exactly one option from `criteria`.   | `choice` — the selected key, plus a probability for every option and a `confidence`. |
| `score`  | Rate the state against ordered levels.     | `score` — expected level index (may be fractional), a probability per level, the `legend` and a `confidence`. |
| `box`    | Where something is in an image.            | `box` — the four edges as fractions of the width and height, plus a `confidence`. Jev 1.14 only; experimental. |

The `state` can be a plain string, a JSON object, or an array of texts. Images are supported by [Jev 1.14](TypeSafe/jev-1.14.md) and [d1](Liquid-AI/d1.md), passed in `assets` rather than in `state`; audio and video are not supported.

## Pricing

Decision models are billed by input tokens only; output tokens are reported in `usage` but are free. See the [pricing page](https://aimlapi.com/ai-ml-api-pricing) and the model card for current rates.

## Example: Triaging a Support Ticket

```powershell
curl https://api.aimlapi.com/v1/decisions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_AIMLAPI_KEY>" \
  -d '{
    "model": "typesafe/jev",
    "state": "Help! My payments have been failing for 3 days and nobody answers support.",
    "questions": {
      "is_urgent":   { "type": "noul",   "instructions": "Does this convey urgency?" },
      "department":  { "type": "choice", "instructions": "Which team should handle this?",
                       "criteria": { "billing": "Payments, invoicing, refunds", "technical": "Bugs, outages, integrations", "sales": "Pricing, upgrades, new accounts" } },
      "frustration": { "type": "score",  "instructions": "How frustrated is the customer?",
                       "criteria": ["Calm", "Frustrated", "Very angry"] }
    }
  }'
```

Every key from `questions` comes back under `answers` with a typed result:

```json
{
  "model": "jev-1.14.0",
  "answers": {
    "is_urgent":   { "type": "noul",   "noul": 0.96 },
    "department":  { "type": "choice", "choice": "billing", "confidence": 0.98,
                     "probabilities": { "billing": 0.99, "technical": 0.01, "sales": 0 } },
    "frustration": { "type": "score",  "score": 1.21, "confidence": 0.69,
                     "legend": { "0": "Calm", "1": "Frustrated", "2": "Very angry" },
                     "probabilities": { "0": 0, "1": 0.79, "2": 0.21 } }
  },
  "usage": { "input_tokens": 406, "output_tokens": 73 }
}
```

## All Available Decision Models

<table data-full-width="true"><thead><tr><th width="266.20001220703125">Model ID + API Reference link</th><th width="132.79998779296875">Developer</th><th width="103.5999755859375">Context</th><th>Model Card</th></tr></thead><tbody><tr><td><a href="TypeSafe/jev.md">typesafe/jev</a></td><td>TypeSafe AI</td><td>262 144</td><td>Floating — always the current Jev</td></tr><tr><td><a href="TypeSafe/jev-1.14.md">typesafe/jev-1.14</a></td><td>TypeSafe AI</td><td>262 144</td><td>Current; adds images and <code>box</code></td></tr><tr><td><a href="TypeSafe/jev-1.13.md">typesafe/jev-1.13</a></td><td>TypeSafe AI</td><td>262 144</td><td>Previous release, pinned</td></tr><tr><td><a href="Liquid-AI/d1.md">liquid/d1</a></td><td>Liquid AI</td><td>32 768</td><td>No output tokens; reads images</td></tr></tbody></table>
