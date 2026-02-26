# API Key Management

<table data-header-hidden data-full-width="true"><thead><tr><th width="185.762939453125" valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top"><a href="api-key-management.md#create-an-api-key">Create a new API key</a></td><td valign="top"><mark style="color:$warning;"><strong><code>POST</code></strong></mark> <code>https://api.aimlapi.com/v1/keys</code></td></tr><tr><td valign="top"><a href="api-key-management.md#list-api-keys">List API keys</a></td><td valign="top"><mark style="color:$success;"><strong><code>GET</code></strong></mark> <code>https://api.aimlapi.com/v1/keys</code></td></tr><tr><td valign="top"><a href="api-key-management.md#get-the-api-key">Get the API key</a></td><td valign="top"><mark style="color:$success;"><strong><code>GET</code></strong></mark> <code>https://api.aimlapi.com/v1/key</code></td></tr><tr><td valign="top"><a href="api-key-management.md#update-an-api-key">Update an API key</a></td><td valign="top"><mark style="color:blue;"><strong><code>PUT</code></strong></mark> <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr><tr><td valign="top"><a href="api-key-management.md#delete-an-api-key">Delete an API key</a></td><td valign="top"><mark style="color:$danger;"><strong><code>DELETE</code></strong></mark> <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr></tbody></table>

{% hint style="warning" %}
Before you start you should create [a managment key](../../faq/how-can-i-work-with-my-api-keys.md#management-keys).
{% endhint %}

### Create a new API key

Copy the created key and store it in a secure location. If the key is lost, create a new one.&#x20;

{% openapi-operation spec="keys-post" path="/keys" method="post" %}
[OpenAPI keys-post](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-post.json)
{% endopenapi-operation %}

***

### List API keys

Returns all API keys for your account, including each key’s settings and metadata.

{% openapi-operation spec="keys-get" path="/keys" method="get" %}
[OpenAPI keys-get](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-get.json)
{% endopenapi-operation %}

***

### Get the API key

Retrieve parameters of the AIMLAPI key used in the request.

{% openapi-operation spec="key-get" path="/key" method="get" %}
[OpenAPI key-get](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/key-get.json)
{% endopenapi-operation %}

***

### Update an API key

{% openapi-operation spec="keys-put" path="/keys/{prefix}" method="put" %}
[OpenAPI keys-put](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-put.json)
{% endopenapi-operation %}

***

### Delete an API key

{% openapi-operation spec="keys-delete" path="/keys/{prefix}" method="delete" %}
[OpenAPI keys-delete](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-delete.json)
{% endopenapi-operation %}
