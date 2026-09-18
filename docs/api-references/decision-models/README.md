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

The `state` can be a plain string, a JSON object, or an array of texts. Text only — images, audio and video are not supported.

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
  "model": "typesafe/jev-1.13-20260917",
  "answers": {
    "is_urgent":   { "type": "noul",   "noul": 0.96 },
    "department":  { "type": "choice", "choice": "billing", "confidence": 0.97,
                     "probabilities": { "billing": 0.98, "technical": 0.02, "sales": 0 } },
    "frustration": { "type": "score",  "score": 1.3, "confidence": 0.55,
                     "legend": { "0": "Calm", "1": "Frustrated", "2": "Very angry" },
                     "probabilities": { "0": 0, "1": 0.7, "2": 0.3 } }
  },
  "usage": { "input_tokens": 403, "output_tokens": 73 }
}
```

## All Available Decision Models

<table data-full-width="true"><thead><tr><th width="266.20001220703125">Model ID + API Reference link</th><th width="132.79998779296875">Developer</th><th width="103.5999755859375">Context</th><th>Model Card</th></tr></thead><tbody><tr><td><a href="typesafe/jev.md">typesafe/jev</a></td><td>TypeSafe AI</td><td>32 000</td><td>-</td></tr></tbody></table>
