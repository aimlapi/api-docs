# Claude 3.7 Sonnet

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `claude-3-7-sonnet-20250219`
* `claude-3-7-sonnet-latest`
* `anthropic/claude-3.7-sonnet`
{% endhint %}

## Model Overview

Anthropic's latest hybrid reasoning model, designed to tackle complex tasks requiring both rapid inference and detailed problem-solving. It introduces a dual-mode operation, combining standard language generation with extended thinking capabilities.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="../Anthropic/claude-3-7-sonnet.json" path="/v1/chat/completions" method="post" %}
[claude-3-7-sonnet.json](../Anthropic/claude-3-7-sonnet.json)
{% endopenapi %}
