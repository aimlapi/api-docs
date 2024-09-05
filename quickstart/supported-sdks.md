---
description: OpenAI API structure support
---

# Supported SDKs

### OpenAI

In the [setting up article](setting-up.md), we showed an example of how to use the OpenAI SDK with the AI/ML API. We configured the environment from the very beginning and executed our request to the AI/ML API.

We fully support the OpenAI API structure, and you can seamlessly use the features that the OpenAI SDK provides out-of-the-box, including:

* Streaming
* Completions
* Chat Completions
* Audio
* Beta Assistants
* Beta Threads
* Embeddings
* Image Generation
* Uploads

This support provides easy integration into systems already using OpenAI's standards. For example, you can integrate our API into any product that supports LLM models by updating only two things in the configuration: the base URL and the API key.

{% hint style="info" %}
[How do I configure the base URL and API key?](../faq/openai-sdk-doesnt-work.md)
{% endhint %}

### Raw HTTP

Because we support the OpenAI API structure, our API can be used with the same endpoints as OpenAI. You can call them from any environment.

### Next Steps

* [Learn how to access the API without any SDK](raw-http-api-access.md)
