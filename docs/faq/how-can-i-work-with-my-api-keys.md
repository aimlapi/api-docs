---
icon: circle-question
---

# How can I work with my API keys?

API keys are used to call our models from the Playground and from your own applications via the API.

In your account dashboard, open the [**Keys**](https://aimlapi.com/app/keys/) section. You will see two tabs:

* **API Keys**
* **Management Keys**

If you plan to create, edit, delete, or list API keys via our API, see the API schemas for the relevant endpoints on the [**API Key Management**](../api-references/service-endpoints/api-key-management.md) page.

***

## API Keys

### Creating an API key

1. Open the **API Keys** tab.

<figure><img src="../.gitbook/assets/image (32).png" alt=""><figcaption></figcaption></figure>

2. Click **Create API Key**.
3. Enter a descriptive name for the key.\
   Use a name that clearly reflects its purpose (for example, a specific project or environment).
4. Copy the key immediately after it is created and store it in a secure location.

{% hint style="warning" %}
The full key will not be displayed again. If the key is lost, simply create a new one.
{% endhint %}

***

### Configuring an API key

#### **Usage limits**

For each API key, you can configure a spending limit.\
Once the limit is reached, further charges using this key are blocked. This allows you to better control your costs.

You can select one of the following limit types:

* **No reset**
* **Daily**
* **Weekly**
* **Monthly**

All limits that have a reset period (except **No reset**) are reset at **00:00 UTC**.

The reset periods are defined as follows:

* **Daily**\
  From 00:00 to 23:59 UTC of the current day.
* **Weekly**\
  From 00:00 UTC on Monday to 23:59 UTC on Sunday.
* **Monthly**\
  From 00:00 UTC on the first day of the month to 23:59 UTC on the last day of the month.\
  The limit is reset on the first day of the next month.

#### **Endpoint permissions**

You can restrict which API endpoints are allowed for a specific API key.

This allows you to:

* limit access to only the required endpoints, and
* reduce the risk of misuse by team members or accidental calls to unsupported endpoints.

***

## Management Keys

This type of key can only be created in the dashboard and is used to call [the API for managing regular API keys](../api-references/service-endpoints/api-key-management.md).

#### Creating a Management key

1. Open the **Management Keys** tab.

<figure><img src="../.gitbook/assets/image (33).png" alt=""><figcaption></figcaption></figure>

2. Click **Create Management Key**.
3. Enter a descriptive name for the key.
4. Copy the key immediately after creation and store it in a secure location.

{% hint style="warning" %}
The full Management key will not be displayed again. If the key is lost, simply create a new one.
{% endhint %}
