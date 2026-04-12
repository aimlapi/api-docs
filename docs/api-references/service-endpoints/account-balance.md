# Account Balance

## \[legacy] Get account balance info

{% hint style="warning" %}
This endpoint is considered legacy and is scheduled for future deprecation. \
Please plan to migrate to the new `/v2/billing` and `/v2/billing/detail` endpoints documented below.
{% endhint %}

You can query your account balance and other billing details through this API.\
To make a request, you only need your AIMLAPI key obtained from your [account dashboard](https://aimlapi.com/app/keys).

{% openapi-operation spec="billing-test-1" path="/v1/billing/balance" method="get" %}
[OpenAPI billing-test-1](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/billing-balance.json)
{% endopenapi-operation %}

## Get balance info

Returns a user's balance.

{% openapi-operation spec="billing-v2" path="/v2/billing" method="get" %}
[OpenAPI billing-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/billing-v2.json)
{% endopenapi-operation %}

## Get detailed billing info

Returns detailed billing information, balance and auto top-up settings.

{% openapi-operation spec="billing-detail-v2" path="/v2/billing/detail" method="get" %}
[OpenAPI billing-detail-v2](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/billing-detail-v2.json)
{% endopenapi-operation %}
