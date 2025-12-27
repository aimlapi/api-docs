# voyage-multilingual-2

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `voyage-multilingual-2`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/voyage-multilingual-2" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Optimized for multilingual retrieval and retrieval-augmented generation (RAG), this model surpasses alternatives like OpenAI v3 large and Cohere multilingual v3 across most languages, including French, German, Japanese, Spanish, and Korean. On average, it outperforms the second-best model by 5.6%, while maintaining strong performance in English. Additionally, it supports a large 32K context length.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="../../../.gitbook/assets/voyage-multilingual-2.json" path="/v1/embeddings" method="post" %}
[voyage-multilingual-2.json](../../../.gitbook/assets/voyage-multilingual-2.json)
{% endopenapi %}
