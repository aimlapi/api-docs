---
icon: code
---

# Fetch Generations

## Overview

After sending a request for video generation, this task is added to the queue. Based on the service's load, the generation can be completed in seconds or take a bit more. Here are the API details to wait for a certain video generation state.

### Edge Cases

Each state has its own priority, described below:

* `queued` -> `dreaming` -> `completed` -> `failed`

If the video state reaches any higher-priority state than you requested, then the result is immediately returned. For example, if you are waiting for the `completed` state and your request fails (reaching the `failed` state), then the result is immediately returned with the current error state.

If video generation takes too long, it can reach a timeout of 30 seconds. In such cases, the result returns with the current actual state. This polling allows you to request it again and wait for the needed state.

{% hint style="info" %}
You cannot wait for an `failed` state.
{% endhint %}

## Example

### Fetch Single Generation

For example, if you are waiting for video dreaming (when the video is popped from the queue and generation is in processing), then you can send the following request:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const url = new URL('https://api.aimlapi.com/v2/generate/video/luma-ai/generation');
  url.searchParams.set('generation_id', '755f9bbb-d99b-4880-992b-f05244ddba61');
  url.searchParams.set('state', 'dreaming');

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
        "https://api.aimlapi.com/v2/generate/video/luma-ai/generation",
        params={
            "generation_id": "755f9bbb-d99b-4880-992b-f05244ddba61",
            "status": "dreaming"
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

If you are waiting for a video to be fully generated, you can wait for the `completed` state in the same way as described above.

### Fetch Multiple Generations

Instead of using the `generation_id` parameter, you will pass `generation_ids`, which can be an array of IDs. This parameter can also accept IDs separated by commas.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const url = new URL('https://api.aimlapi.com/v2/generate/video/luma-ai/generations');
  url.searchParams.set('generation_ids[]', '755f9bbb-d99b-4880-992b-f05244ddba61');
  url.searchParams.set('state', 'dreaming');

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
        "https://api.aimlapi.com/v2/generate/video/luma-ai/generations",
        params={
            "generation_ids[]": "755f9bbb-d99b-4880-992b-f05244ddba61",
            "status": "streaming",
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
