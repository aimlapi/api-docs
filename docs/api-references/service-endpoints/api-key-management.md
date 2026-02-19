---
icon: dot
---

# API Key Management

This section describes the API methods for managing your API keys. \
You can use these endpoints to create, list, update, and delete API keys.

<table data-header-hidden data-full-width="true"><thead><tr><th width="323.01678466796875" valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top">Create an API key</td><td valign="top"><img src="../../.gitbook/assets/post.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/keys</code></td></tr><tr><td valign="top">List all API keys</td><td valign="top"><img src="../../.gitbook/assets/get.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/keys</code></td></tr><tr><td valign="top">Get the latest API key</td><td valign="top"><img src="../../.gitbook/assets/get.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/key</code></td></tr><tr><td valign="top">Update specific parameters of an API key</td><td valign="top"><img src="../../.gitbook/assets/patch.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr><tr><td valign="top">Update all parameters of an API key</td><td valign="top"><img src="../../.gitbook/assets/put.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr><tr><td valign="top">Delete an API key</td><td valign="top"><img src="../../.gitbook/assets/delete.png" alt="" data-size="line">  <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr></tbody></table>

{% hint style="warning" %}
Important: all requests to these endpoints require a Management key, not a regular AIMLAPI key. \
Create and copy the Management key in advance from your [dashboard](https://aimlapi.com/app/keys).\
See [the FAQ section](../../faq/how-can-i-work-with-my-api-keys.md) for detailed instructions.
{% endhint %}

## API Schemas

### Create an API key

Only this method returns the full API key value — the same way it is shown once immediately after the key is created in the dashboard. Copy the key and store it in a secure location. If the key is lost, simply create a new one.

{% openapi-operation spec="keys-post" path="/keys" method="post" %}
[OpenAPI keys-post](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-post.json)
{% endopenapi-operation %}

***

### List all API keys

Retrieve a list of your API keys along with their parameters.

{% openapi-operation spec="keys-get" path="/keys" method="get" %}
[OpenAPI keys-get](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-get.json)
{% endopenapi-operation %}

***

### Get the latest API key

Retrieve parameters of the latest API key.

{% openapi-operation spec="key-get" path="/key" method="get" %}
[OpenAPI key-get](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/key-get.json)
{% endopenapi-operation %}

***

### Update specific parameters of an API key

{% openapi-operation spec="keys-patch" path="/keys/{prefix}" method="patch" %}
[OpenAPI keys-patch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-patch.json)
{% endopenapi-operation %}

***

### Update all parameters of an API key

{% openapi-operation spec="keys-put" path="/keys/{prefix}" method="put" %}
[OpenAPI keys-put](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-put.json)
{% endopenapi-operation %}

***

### Delete an API key

{% openapi-operation spec="keys-delete" path="/keys" method="delete" %}
[OpenAPI keys-delete](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-delete.json)
{% endopenapi-operation %}
