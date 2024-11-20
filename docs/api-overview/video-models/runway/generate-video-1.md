---
icon: code
---

# Fetch Generation

## Overview

After sending a request for video generation, this task is added to the queue. Based on the service's load, the generation can be completed in seconds or take a bit more. Here are the API to fetch the generations.

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
  const url = new URL('https://api.aimlapi.com/v2/generate/video/runway/generation');
  url.searchParams.set('generation_id', '755f9bbb-d99b-4880-992b-f05244ddba61:runway-gen3/turbo/image-to-video');

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
{% endtab %}

{% tab title="Python" %}
```python
import requests


def main():
    response = requests.get(
        "https://api.aimlapi.com/v2/generate/video/runway/generation",
        params={
            "generation_id": "755f9bbb-d99b-4880-992b-f05244ddba61:runway-gen3/turbo/image-to-video"
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
{% endtab %}
{% endtabs %}
