---
icon: code
---

# Fetch Generation

## Overview

After sending a request for video generation, this task is added to the queue. Based on the service's load, the generation can be completed in seconds or take a bit more. Here are the API to fetch the generations.

## API Schema

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/v2/generate/video/runway/generation" method="get" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

## Example

{% hint style="info" %}
Ensure you replace `"my_key"` with your actual API key before running the code.
{% endhint %}

### Fetch Single Generation

You can send the following request:

{% tabs %}
{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const main = async () => {
  const url = new URL('https://api.aimlapi.com/v2/generate/video/runway/generation');
  url.searchParams.set('generation_id', 'aa1234aa-a109-4334-9407-f7f6a9306584');

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer my_key',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log('Generation:', data);
};

main();

```
{% endcode %}
{% endtab %}

{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests


def main():
    response = requests.get(
        "https://api.aimlapi.com/v2/generate/video/runway/generation",
        params={
            "generation_id": "aa1234aa-a109-4334-9407-f7f6a9306584"
        },
        headers={
            "Authorization": "Bearer my_key",
            "Content-Type": "application/json",
        },
    )

    response.raise_for_status()
    data = response.json()
    print("Generation:", data)


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}
{% endtabs %}
