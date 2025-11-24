---
icon: money-check-pen
---

# Account Balance

## Get account balance info

<mark style="color:green;">`GET`</mark> `https://billing.aimlapi.com/v1/billing/balance`

**Headers**

<table><thead><tr><th width="190.6666259765625">Name</th><th>Value</th></tr></thead><tbody><tr><td>Authorization</td><td><code>Bearer &#x3C;token></code></td></tr><tr><td>Content-Type</td><td><code>application/json</code></td></tr></tbody></table>

**Body**

**-**

**Response Schema**

<table><thead><tr><th width="189">Field</th><th>Description</th></tr></thead><tbody><tr><td><code>balance</code></td><td>The total credits associated with the provided API key.</td></tr><tr><td><code>lowBalance</code></td><td>True if the balance is below the threshold.</td></tr><tr><td><code>lowBalanceThreshold</code></td><td>Threshold for switching to low balance status.</td></tr><tr><td><code>lastUpdated</code></td><td>The date of the request — i.e., the current date.</td></tr><tr><td><code>autoDebitStatus</code></td><td>Indicates whether auto top-up is enabled for the plan.</td></tr><tr><td><code>status</code></td><td>The status of the plan associated with the provided API key.</td></tr><tr><td><code>statusExplanation</code></td><td>A more detailed explanation of the plan status.</td></tr></tbody></table>

## Example

{% tabs %}
{% tab title="cURL" %}
```url
curl https://billing.aimlapi.com/v1/billing/balance \
  -H "Authorization: Bearer <YOUR_AIMLAPI_KEY>" \
  -H "Content-Type: application/json"
```
{% endtab %}

{% tab title="HTTP" %}
```http
GET /v1/billing/balance HTTP/1.1
Host: billing.aimlapi.com
Authorization: Bearer <YOUR_AIMLAPI_KEY>
Content-Type: application/json
```
{% endtab %}

{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json

def main():
    response = requests.get(
        "https://billing.aimlapi.com/v1/billing/balance",
        headers={
            # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        })
   
    data = response.json()
    print(json.dumps(data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch("https://billing.aimlapi.com/v1/billing/balance", {
    headers: {
      "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json5
{
  "balance": 551564495,
  "lowBalance": false,
  "lowBalanceThreshold": 10000,
  "lastUpdated": "2025-11-10T10:01:56.824Z",
  "autoDebitStatus": "disabled",
  "status": "current",
  "statusExplanation": "Balance is current and up to date"
}
```

</details>
