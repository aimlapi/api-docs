---
icon: brackets-curly
---

# Fetch an audio (Stable Audio)

## API Reference

{% swagger src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/v2/generate/audio" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
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
