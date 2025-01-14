---
icon: brackets-curly
---

# Fetch Generations

## API Reference

{% swagger src="../../../.gitbook/assets/docs-public.yaml" path="/v2/generate/audio" method="get" %}
[docs-public.yaml](../../../.gitbook/assets/docs-public.yaml)
{% endswagger %}

## Examples

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const params = new URLSearchParams({
    generation_id: "<YOUR_GENERATION_ID>"
  });
  const response = await fetch(`https://api.aimlapi.com/v2/generate/audio?${params.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer <YOUR_API_KEY>',
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
    url = "https://api.aimlapi.com/v2/generate/audio"
    params = {
        "generation_id": "<YOUR_GENERATION_ID>",
    }
    headers = {"Authorization": "Bearer <YOUR_API_KEY>", "Content-Type": "application/json"}

    response = requests.get(url, params=params, headers=headers)
    print("Generation:", response.json())

if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}
