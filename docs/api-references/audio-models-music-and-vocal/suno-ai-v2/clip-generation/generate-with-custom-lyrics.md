---
icon: code
---

# Generate with Custom Lyrics

## Overview

You can also provide custom lyrics, titles, and tags to the song to generate a fully customized one.

#### Lyrics Format

An example of custom lyrics is as follows:

```markdown
[Verse]
Silver cities shine brightly
Skies are painted blue
Hopes and dreams take flight
Future starts anew

[Verse 2]
Machines hum a new tune
Worlds we’ve never seen
Chasing stars so far
Building our own dream

[Chorus]
Future dreams so high
Touch the endless sky
Live beyond the now
Make the future wow

[Verse 3]
We create the world
Technology our guide
Hearts and minds as one
Infinite the ride

[Chorus]
Future dreams so high
Touch the endless sky
Live beyond the now
Make the future wow

[Bridge]
With every beat we rise 
See through wiser eyes 
The places we can go 
A brilliance that will grow 
```

For better results, parts of the song should be labeled with their respective categories. In the previous example, these are: Verse, Verse 2, Chorus, Verse 3, Chorus, Bridge. You can set them in any order you want — just experiment and see the results.

## Payload

The payload should contain the song lyrics passed in the `prompt` field. The example format is as follows:

```json
{
    "prompt": "lyrics passed here",
    "tags": "pop rock electric",
    "title": "Highway Cats"
}
```

## Example

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const prompt = `
    [Verse]
    Silver cities shine brightly
    Skies are painted blue
    Hopes and dreams take flight
    Future starts anew

    [Verse 2]
    Machines hum a new tune
    Worlds we’ve never seen
    Chasing stars so far
    Building our own dream

    [Chorus]
    Future dreams so high
    Touch the endless sky
    Live beyond the now
    Make the future wow

    [Verse 3]
    We create the world
    Technology our guide
    Hearts and minds as one
    Infinite the ride

    [Chorus]
    Future dreams so high
    Touch the endless sky
    Live beyond the now
    Make the future wow

    [Bridge]
    With every beat we rise
    See through wiser eyes
    The places we can go
    A brilliance that will grow
  `;
  const { clip_ids } = await fetch('https://api.aimlapi.com/v2/generate/audio/suno-ai/clip', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer my_key',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      tags: 'pop rock electric',
      title: 'Highway Cats',
    }),
  }).then((res) => res.json());

  console.log('Generated clip ids:', clip_ids);
};

main();

```
{% endtab %}

{% tab title="Python" %}
```python
import requests


def main():
    prompt = """
    [Verse]
    Silver cities shine brightly
    Skies are painted blue
    Hopes and dreams take flight
    Future starts anew

    [Verse 2]
    Machines hum a new tune
    Worlds we’ve never seen
    Chasing stars so far
    Building our own dream

    [Chorus]
    Future dreams so high
    Touch the endless sky
    Live beyond the now
    Make the future wow

    [Verse 3]
    We create the world
    Technology our guide
    Hearts and minds as one
    Infinite the ride

    [Chorus]
    Future dreams so high
    Touch the endless sky
    Live beyond the now
    Make the future wow

    [Bridge]
    With every beat we rise
    See through wiser eyes
    The places we can go
    A brilliance that will grow
    """

    response = requests.post(
        "https://api.aimlapi.com/v2/generate/audio/suno-ai/clip",
        headers={
            "Authorization": "Bearer my_key",
            "Content-Type": "application/json",
        },
        json={
            "prompt": prompt,
            "tags": "pop rock electric",
            "title": "Highway Cats",
        },
    )

    response.raise_for_status()
    data = response.json()
    clip_ids = data["clip_ids"]

    print("Generated clip ids:", clip_ids)


if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}

