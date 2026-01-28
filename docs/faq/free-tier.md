---
description: FAQ section about AI/ML API Free Tier option.
icon: circle-question
---

# How to use the Free Tier?

## About

AIML API has two “free” modes:

1. **Free (no billing method added)** — you can use a small set of free models to try the platform.
2. **Verified Free Tier (billing method added)** — you get **50,000 free credits** and **access to the full model catalog** for testing.\
   &#xNAN;_&#x41;dding a billing method **does not charge you automatically**. You only pay when you **purchase a plan**._

## Free access without a billing method

If you **didn’t add a payment method**, you can use AIML API for free with these models only:

<figure><img src="../.gitbook/assets/Screenshot 2025-12-19 at 14.38.50.png" alt=""><figcaption></figcaption></figure>

> You can use them in:
>
> * [**AI Playground**](https://aimlapi.com/app/)
> * [**Via API** (Chat Completions)](https://docs.aimlapi.com/api-references/model-database#text-models-llm)
>
> > This is the easiest way to quickly test the platform without any billing setup.
> >
> > &#x20;[Try in Playground](https://aimlapi.com/app/)

### Verified Free Tier (billing method added)

If you add a billing method, you’ll receive **50,000 free credits** to test the platform with a much wider set of models.

**Important:** adding a billing method does **not** withdraw money. Payments start only after you purchase a plan.

#### What you can use with free credits

Using 50,000 free credits, you can access:

* [LLM models](../api-references/text-models-llm/)
* [Image models](../api-references/image-models/)
* [TTS models](../api-references/model-database.md)
* [STT models](../api-references/model-database.md)
* [Moderation models](../api-references/moderation-safety-models/)
* [OCR models](../api-references/model-database.md)
* [Embedding models](../api-references/embedding-models/)

#### How far do 50,000 credits go?

If you send short prompts (a few sentences) to non-image models, 50,000 credits is typically enough to try many models 1–10 times, depending on the model’s cost and workload.

#### Error Message

When you attempt to call the API after reaching the limit, you will receive an appropriate error.\
For example, if the `/v1/chat/completions` endpoint was called:

{% code overflow="wrap" %}
```json
{
    "message": "You have exhausted the available [plan.rule:api_token] resource limit. Update your payment method to continue using the service. For more information please visit https://aimlapi.com/app/billing"
    "path": "/v1/chat/completions"
    "requestId": "798b860e-98c2-4e8e-8c50-550bcfc2eccc"
    "statusCode": "403"
    "timestamp": "2025-03-11T07:13:27.813Z"
}
```
{% endcode %}
