---
icon: code
---

# Fetch Lyrics

## Overview

After lyrics generation, you need to fetch it by the ID. It will return a generation with the title and text.

{% hint style="info" %}
**Be careful:** You can fetch generation results only once.
{% endhint %}

## Example

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const url = new URL('https://api.aimlapi.com/v2/generate/audio/suno-ai/lyric');
  url.searchParams.set('lyric_id', '8e28a5da-5c02-453c-9fcf-0e8f88d1bfd5');

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer my_key',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log('Lyric data:', data);
};

main();

```
{% endtab %}

{% tab title="Python" %}
```python
import requests


def main():
    response = requests.get(
        "https://api.aimlapi.com/v2/generate/audio/suno-ai/lyric",
        params={"lyric_id": "b1c8d5b4-bee1-4b8b-8f94-07a67080990e"},
        headers={
            "Authorization": "Bearer my_key",
            "Content-Type": "application/json",
        },
    )

    response.raise_for_status()
    data = response.json()
    print("Lyric data:", data)


if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}

