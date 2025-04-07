# DeepSeek R1

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `deepseek/deepseek-r1`
* `deepseek-reasoner`
{% endhint %}

{% hint style="success" %}
Both IDs listed above refer to the same model; we support them for backward compatibility.
{% endhint %}

## Model Overview

DeepSeek R1 is a cutting-edge reasoning model developed by DeepSeek AI, designed to excel in complex problem-solving, mathematical reasoning, and programming assistance. Leveraging a Mixture-of-Experts (MoE) architecture, the model activates only a subset of its parameters for each token processed, allowing for efficient computation while maintaining high performance across various tasks.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="deepseek-r1.json" path="/v1/chat/completions" method="post" %}
[deepseek-r1.json](deepseek-r1.json)
{% endopenapi %}
