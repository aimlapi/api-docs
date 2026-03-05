---
hidden: true
noIndex: true
icon: circle-question
---

# How can I track my funds?

### How can I check my current balance?

* [https://aimlapi.com/app/billing](https://aimlapi.com/app/billing)
* You can also check your balance [programmatically](../api-references/service-endpoints/account-balance.md).

### Where can I see my outgoing balance?

On [the usage page](https://aimlapi.com/app/usage) in your dashboard, your balance is displayed in credits and is automatically deducted based on model usage.

You can also check your current balance programmatically via the API.

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

You can find the pricing for all available models on the pricing page.

***

### Where can I see how many credits were actually spent for a request?

The number of credits actually consumed by a request is returned in the `total_tokens` field of the API response.

