---
hidden: true
noIndex: true
icon: circle-question
---

# How can I track my funds?

### How can I check my current balance?

* On your [billing page](https://aimlapi.com/app/billing) in the dashboard.
* Via [the API](../api-references/service-endpoints/account-balance.md).

### Where can I see my outgoing balance?

On [the usage page](https://aimlapi.com/app/usage) in your dashboard, your balance is displayed in credits and is automatically deducted based on model usage.

***

### How are real payments converted into usage credits?

AI/ML API uses a unified credit system for all models. Your balance is displayed in credits and automatically deducts based on model usage.

**Conversion Rate:** $1 USD = 2,000,000 credits

**Example calculations:**

* $0.05 = 100k credits
* $0.50 = 1M credits
* $5.00 = 10M credits
* $50.00 = 100M credits

***

### Where can I check in advance how much a specific model call will cost?

You can find the pricing for all available models on [the pricing page](https://aimlapi.com/ai-ml-api-pricing).

***

### Where can I see how many credits were actually spent for a request?

The number of credits actually consumed by a request is returned in the `credits_used` field of the API response.

Here are example response snippets showing usage information for different model categories.

<details>

<summary>Chat model (v1/chat/completions)</summary>

{% code overflow="wrap" %}
```json
  "usage": {
    "completion_tokens": 114,
    "prompt_tokens": 48,
    "total_tokens": 162,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 90
    }
  },
  "meta": {
    "usage": {
      "credits_used": 625
    }
  }
```
{% endcode %}

</details>

<details>

<summary>Chat model example response (v1/responses)</summary>

{% code overflow="wrap" %}
```json
  "usage": {
    "input_tokens": 7,
    "input_tokens_details": {
      "cached_tokens": 0
    },
    "output_tokens": 35,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 42
  },
```
{% endcode %}

</details>

<details>

<summary>Image model example response</summary>

{% code overflow="wrap" %}
```json
  "meta": {
    "usage": {
      "credits_used": 91000
    }
  }
```
{% endcode %}

</details>

<details>

<summary>Video model example response</summary>

{% code overflow="wrap" %}
```json
```
{% endcode %}

</details>

<details>

<summary>Music model example response</summary>

{% code overflow="wrap" %}
```json
```
{% endcode %}

</details>
