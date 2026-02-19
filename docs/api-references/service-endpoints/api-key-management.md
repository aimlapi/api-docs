---
icon: dot
---

# API Key Management

This section describes the API methods for managing your API keys. \
You can use these endpoints to create, list, update, and delete API keys:

<table data-header-hidden data-full-width="true"><thead><tr><th width="274.0167236328125" valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top">Create an API key</td><td valign="top"><img src="../../.gitbook/assets/post.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/keys</code></td></tr><tr><td valign="top">Retrieve a list of API keys along with their parameters</td><td valign="top"><img src="../../.gitbook/assets/get.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/keys</code></td></tr><tr><td valign="top">Retrieve information about a specific API key by its prefix (first 8 symbols of the key)</td><td valign="top"><img src="../../.gitbook/assets/get.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/key/{prefix}</code></td></tr><tr><td valign="top">Modify specific parameters of a specific API key by its prefix</td><td valign="top"><img src="../../.gitbook/assets/patch.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr><tr><td valign="top">Modify all the parameters of a specific API key by its prefix</td><td valign="top"><img src="../../.gitbook/assets/put.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr><tr><td valign="top">Delete a specific API key by its prefix</td><td valign="top"><img src="../../.gitbook/assets/delete.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr></tbody></table>

On the right side of each API schema below, you’ll find short examples (cURL, JavaScript, Python) demonstrating how to call the corresponding method using the REST API.

{% hint style="warning" %}
Important: all requests to these endpoints must be authorized using a Management key, not a regular AIMLAPI key used for calling models and other API endpoints. The Management key must be created and copied in advance from your dashboard, in the [**API Keys**](https://aimlapi.com/app/keys) section (see [the FAQ section](../../faq/how-can-i-work-with-my-api-keys.md) for detailed instructions).
{% endhint %}

## API Schemas

### Create an API key

Out of the five methods described on this page, only this one returns the full API key value — the same way it is shown once immediately after the key is created in the dashboard.

{% openapi-operation spec="keys-post" path="/keys" method="post" %}
[OpenAPI keys-post](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-post.json)
{% endopenapi-operation %}

***

### Retrieve a list of API keys along with their parameters

{% openapi-operation spec="keys-get" path="/keys" method="get" %}
[OpenAPI keys-get](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-get.json)
{% endopenapi-operation %}

***

### Retrieve parameters of the latest API key

{% openapi-operation spec="key-get" path="/key" method="get" %}
[OpenAPI key-get](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/key-get.json)
{% endopenapi-operation %}

***

### Modify specific parameters of a specific API key by its prefix

{% openapi-operation spec="keys-patch" path="/keys/{prefix}" method="patch" %}
[OpenAPI keys-patch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-patch.json)
{% endopenapi-operation %}

***

### Modify all the parameters of a specific API key by its prefix

{% openapi-operation spec="keys-put" path="/keys/{prefix}" method="put" %}
[OpenAPI keys-put](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-put.json)
{% endopenapi-operation %}

***

### Delete a specific API key by its prefix

{% openapi-operation spec="keys-delete" path="/keys" method="delete" %}
[OpenAPI keys-delete](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-delete.json)
{% endopenapi-operation %}
