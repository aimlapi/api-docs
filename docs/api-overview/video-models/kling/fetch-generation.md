---
icon: code
---

# Fetch Generation

## Overview

After sending a request for video generation, this task is added to the queue. Based on the service's load, the generation can be completed in seconds or take a bit more. Here are the API to fetch the generations.

{% swagger src="https://api-staging.aimlapi.com/docs-public-json" path="/v2/generate/video/kling/generation" method="get" %}
[https://api-staging.aimlapi.com/docs-public-json](https://api-staging.aimlapi.com/docs-public-json)
{% endswagger %}

## Example

{% hint style="info" %}
Ensure you replace `"my_key"` with your actual API key before running the code.
{% endhint %}

### Fetch Single Generation

You can send the following request:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const params = new URLSearchParams({
    generation_id: "<YOUR_GENERATION_ID>"
  });
  const response = await fetch(`https://api.aimlapi.com/v2/generate/video/kling/generation?${params.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer my_key',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log('Generation:', response);
};

main()

```
{% endtab %}

{% tab title="Python" %}
```python
import requests


def main():
    url = "https://api.aimlapi.com/v2/generate/video/kling/generation"
    params = {
        "generation_id": "<YOUR_GENERATION_ID>",
    }
    headers = {"Authorization": "Bearer my_key", "Content-Type": "application/json"}

    response = requests.get(url, params=params, headers=headers)
    print("Generation:", response.json())


if __name__ == "__main__":
    main()
```
{% endtab %}
{% endtabs %}
