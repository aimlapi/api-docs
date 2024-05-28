---
description: How to manage an API key
---

# API Key Management

### **Creating an API Key**

To create a new API key Sign-ip to [app.aimlapi.com](https://app.aimlapi.com), navigate to Key Management page and create an API Key

Note that your Keys only work with an Active Subscription

### **Disabling an API Key**

If you need to revoke access temporarily, disable an API key by:

* Sending a PUT request to `/service/api-keys/{id}/disable`, replacing `{id}` with the key's unique identifier.
* This will change the key's status to inactive.

{% swagger src="../.gitbook/assets/aimlapi.yaml" path="/api-keys/{id}/disable" method="put" %}
[aimlapi.yaml](../.gitbook/assets/aimlapi.yaml)
{% endswagger %}

### **Enabling an API Key**

To restore access using a previously disabled API key:

* Send a PUT request to `/service/api-keys/{id}/enable`, replacing `{id}` with the key's unique identifier.
* The key's status will be updated to active.

{% swagger src="../.gitbook/assets/aimlapi.yaml" path="/api-keys/{id}/enable" method="put" %}
[aimlapi.yaml](../.gitbook/assets/aimlapi.yaml)
{% endswagger %}

### **Best Practices**

* Regularly review and manage your API keys to ensure optimal security.
* Use separate keys for different services or environments to limit the scope of access.
* Rotate your API keys periodically to reduce the risk of unauthorized use.

By effectively managing your API keys, you maintain control over who can access your AI/ML API services and safeguard your resources.
