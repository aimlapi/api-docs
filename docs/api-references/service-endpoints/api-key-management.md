---
hidden: true
noIndex: true
icon: dot
---

# API Key Management

This section describes the API methods for managing your API keys. \
You can use these endpoints to list, create, update, and delete API keys:

<table data-header-hidden data-full-width="true"><thead><tr><th width="302.0167236328125" valign="top"></th><th valign="top"></th></tr></thead><tbody><tr><td valign="top">Create an API key</td><td valign="top"><img src="../../.gitbook/assets/POST (3).png" alt="" data-size="line"> <code>https://api.aimlapi.com/v1/keys</code></td></tr><tr><td valign="top">Retrieve a list of API keys along with their parameters</td><td valign="top"><img src="../../.gitbook/assets/GET (2).png" alt="" data-size="line"> <code>https://api.aimlapi.com/v1/keys</code></td></tr><tr><td valign="top">Retrieve information about a specific API key by its prefix (first 8 symbols of the key)</td><td valign="top"><img src="../../.gitbook/assets/GET (3).png" alt="" data-size="line"> <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr><tr><td valign="top">Modify all the parameters of a specific API key by its prefix</td><td valign="top"><img src="../../.gitbook/assets/PUT.png" alt="" data-size="line"> <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr><tr><td valign="top">Modify specific parameters of a specific API key by its prefix</td><td valign="top"><img src="../../.gitbook/assets/PATCH.png" alt="" data-size="line"> <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr><tr><td valign="top">Delete a specific API key by its prefix</td><td valign="top"><img src="../../.gitbook/assets/DELETE (1).png" alt="" data-size="line"> <code>https://api.aimlapi.com/v1/keys/{prefix}</code></td></tr></tbody></table>

After each API schema below, you'll find a short example demonstrating how to correctly call the described method in code using the OpenAI SDK.

{% hint style="warning" %}
Important: all requests to these endpoints must be authorized using a Management key, not a regular AIMLAPI key used for calling models and other API endpoints. The Management key must be created and copied in advance from your dashboard, in the [**API Keys**](https://aimlapi.com/app/keys) section.
{% endhint %}

## API Schemas

### Create an API key



***

### Retrieve a list of API keys along with their parameters

***

### Modify specific parameters of a specific API key by its prefix

***

### Modify all the parameters of a specific API key by its prefix

***

### Delete a specific API key by its prefix

{% openapi-operation spec="keys-delete" path="/keys" method="delete" %}
[OpenAPI keys-delete](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/service-endpoints/keys-delete.json)
{% endopenapi-operation %}

#### Example Code

