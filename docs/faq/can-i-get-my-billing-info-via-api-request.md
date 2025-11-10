---
icon: circle-question
---

# Can I get my billing info via API request?

Yes, you can query your account balance and other billing details through the AIML Billing API.

## Get account balance info

<mark style="color:green;">`GET`</mark>  `https://billing.aimlapi.com/v1/billing/balance`



**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Authorization | `Bearer <token>`   |
| Content-Type  | `application/json` |

**Body**

**-**

## Code Example

{% tabs %}
{% tab title="HTTP" %}
```http
GET /v1/billing/balance HTTP/1.1
Host: billing.aimlapi.com
Authorization: Bearer <YOUR_AIMLAPI_KEY>
Content-Type: application/json
```
{% endtab %}

{% tab title="cURL" %}
```url
curl https://billing.aimlapi.com/v1/billing/balance \
  -H "Authorization: Bearer <YOUR_AIMLAPI_KEY>" \
  -H "Content-Type: application/json"
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

{% code overflow="wrap" %}
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
{% endcode %}

</details>
