# music-01

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `music-01`
{% endhint %}

## Model Overview

An advanced AI model that generates diverse high-quality audio compositions by analyzing and reproducing musical patterns, rhythms, and vocal styles from the reference track. Refine the process using a text prompt.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

{% openapi src="music-01-pair.json" path="/v2/generate/audio/minimax/upload" method="post" %}
[music-01-pair.json](music-01-pair.json)
{% endopenapi %}

{% openapi src="music-01.json" path="/v2/generate/audio/minimax/generate" method="post" %}
[music-01.json](music-01.json)
{% endopenapi %}
