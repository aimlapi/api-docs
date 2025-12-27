# voyage-law-2

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `voyage-law-2`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/voyage-law-2" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

This model leads the MTEB leaderboard for legal retrieval by a significant margin, outperforming OpenAI v3 large by an average of 6% across eight legal retrieval datasets and by over 10% on three key benchmarks (LeCaRDv2, LegalQuAD, and GerDaLIR). With a 16K context length and training on extensive long-context legal documents, voyage-law-2 excels in retrieving information across lengthy texts. Notably, it also matches or surpasses performance on general-purpose corpora across domains.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Submit a request

### API Schema

{% openapi src="../../../.gitbook/assets/voyage-law-2.json" path="/v1/embeddings" method="post" %}
[voyage-law-2.json](../../../.gitbook/assets/voyage-law-2.json)
{% endopenapi %}
