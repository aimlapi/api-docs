# music-cover

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `minimax/music-cover`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/minimax/music-cover" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

An audio-to-audio music generation model that creates cover versions from reference audio. Supports style transformation while preserving the original structure and melody.

## How to Make a Call

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>Step-by-Step Instructions</summary>

Generating an audio using this model involves sequentially calling two endpoints:

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.

Below, you can find two corresponding API schemas and examples for both endpoint calls.

***

If you want to learn how to call AI models via API from the very basics, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

</details>

## API Schemas

### Generate music sample <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

This endpoint generates a music piece based on the prompt (which includes style instructions) and the provided lyrics. It returns a generation task ID, its status, and related metadata.

{% openapi-operation spec="music-cover" path="/v2/generate/audio" method="post" %}
[OpenAPI music-cover](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/MiniMax/music-cover.json)
{% endopenapi-operation %}

### Retrieve the generated music sample from the server <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

After sending a request for music generation, this task is added to the queue. This endpoint lets you check the status of a audio generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated audio URL and additional metadata.

{% openapi-operation spec="universal-audio-fetch" path="/v2/generate/audio" method="get" %}
[OpenAPI universal-audio-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/universal-audio-fetch.json)
{% endopenapi-operation %}

## Quick Code Examples

This model allows you to modify both the arrangement and the lyrics of a track. While both can be updated in a single request, we demonstrate them as separate examples to keep the process more controlled.

### Arrangement Replacement

Generate a new musical arrangement while preserving the original melody and lyrics of the reference audio file.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import time
import requests

# Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
aimlapi_key = '<YOUR_AIMLAPI_KEY>'

# Creating and sending an audio generation task to the server (returns a generation ID)
def generate_audio():
    url = "https://api.aimlapi.com/v2/generate/audio"
    payload = {
        "model": "minimax/music-cover",
        "prompt": "Oboe and clarinet intro and accompaniment, jazz",
        "reference_audio_url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/why-is-this-wind.mp3"
    }
    headers = {"Authorization": f"Bearer {aimlapi_key}", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        print("Generation:", response_data)
        return response_data


# Requesting the result of the generation task from the server using the generation_id:
def retrieve_audio(gen_id):
    url = "https://api.aimlapi.com/v2/generate/audio"
    params = {
        "generation_id": gen_id,
    }
    headers = {"Authorization": f"Bearer {aimlapi_key}", "Content-Type": "application/json"}

    response = requests.get(url, params=params, headers=headers)
    return response.json()
    
    
# This is the main function of the program. From here, we sequentially call the audio generation and then repeatedly request the result from the server every 15 seconds:
def main():
    # Running video generation and getting a task id
    gen_response = generate_audio()
    print(gen_response)
    gen_id = gen_response.get("id")
    print("Generation ID:  ", gen_id)

    # Try to retrieve the video from the server every 15 sec
    if gen_id:
        start_time = time.time()

        timeout = 1000
        while time.time() - start_time < timeout:
            response_data = retrieve_audio(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break

            status = response_data.get("status")
            
            if status in ["queued", "generating"]:
                print(f"Status: {status}. Checking again in 15 seconds.")
                time.sleep(15)
            else:
                print("Processing complete:\n", response_data)
                return response_data

        print("Timeout reached. Stopping.")
        return None 


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
// Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
const API_KEY = '<YOUR_AIMLAPI_KEY>';

async function generateAudio() {
  const url = 'https://api.aimlapi.com/v2/generate/audio';
  const payload = {
        model: 'minimax/music-cover',
        prompt: 'Oboe and clarinet intro and accompaniment, jazz',
        reference_audio_url: 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/why-is-this-wind.mp3'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${await response.text()}`);
    return null;
  }

  const data = await response.json();
  console.log('Generation:', data);
  return data;
}

async function retrieveAudio(generationId) {
  const url = `https://api.aimlapi.com/v2/generate/audio?generation_id=${generationId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${await response.text()}`);
    return null;
  }

  return await response.json();
}

async function main() {
  const generationResponse = await generateAudio();

  if (!generationResponse || !generationResponse.id) {
    console.error('No generation ID received.');
    return;
  }

  const genId = generationResponse.id;
  const timeout = 600000; // 10 minutes
  const interval = 15000; // 15 seconds
  const start = Date.now();

  const intervalId = setInterval(async () => {
    if (Date.now() - start > timeout) {
      console.log('Timeout reached. Stopping.');
      clearInterval(intervalId);
      return;
    }

    const result = await retrieveAudio(genId);

    if (!result) {
      console.error('No response from API.');
      clearInterval(intervalId);
      return;
    }

    const status = result.status;
    if (['generating', 'queued'].includes(status)) {
      console.log(`Status: ${status}. Checking again in 15 seconds.`);
    } else {
      console.log('Generation complete:\n', result);
      clearInterval(intervalId);
    }
  }, interval);
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
Generation: {'id': 'BV5y0it0TMlupfLEeHc6J', 'status': 'queued'}
{'id': 'BV5y0it0TMlupfLEeHc6J', 'status': 'queued'}
Generation ID:   BV5y0it0TMlupfLEeHc6J
Status: queued. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Processing complete:
 {'id': 'BV5y0it0TMlupfLEeHc6J', 'status': 'completed', 'audio_file': {'url': 'https://cdn.aimlapi.com/moose/music%2Fprod%2Ftts-20260423163856-VUzVkZnrUQAWAiVT.mp3?Expires=1777019942&OSSAccessKeyId=LTAI5tCpJNKCf5EkQHSuL9xg&Signature=V101IbN67pvDEiOlaoV9n%2FBHOGQ%3D'}}
```
{% endcode %}

</details>

Listen to [the track](https://drive.google.com/file/d/1cmAtOR0qGYzs0F1NgTJ0q-pC796f2k7o/view?usp=sharing) we generated.

### Replacing the Lyrics

Generate a version with new lyrics while preserving the original melody, structure, and arrangement of the reference audio file.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import time
import requests

# Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
aimlapi_key = '<YOUR_AIMLAPI_KEY>'

# Creating and sending an audio generation task to the server (returns a generation ID)
def generate_audio():
    url = "https://api.aimlapi.com/v2/generate/audio"
    payload = {
        "model": "minimax/music-cover",
        "prompt": "Quiet jazz",
        "lyrics": "[Verse]: Why is this wind so gentle? Why is this wind so gentle? Why is this wind so gentle? As if it knows where sorrow sleeps...",
        "reference_audio_url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/why-is-this-wind.mp3"
    }
    headers = {"Authorization": f"Bearer {aimlapi_key}", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        print("Generation:", response_data)
        return response_data


# Requesting the result of the generation task from the server using the generation_id:
def retrieve_audio(gen_id):
    url = "https://api.aimlapi.com/v2/generate/audio"
    params = {
        "generation_id": gen_id,
    }
    headers = {"Authorization": f"Bearer {aimlapi_key}", "Content-Type": "application/json"}

    response = requests.get(url, params=params, headers=headers)
    return response.json()
    
    
# This is the main function of the program. From here, we sequentially call the audio generation and then repeatedly request the result from the server every 15 seconds:
def main():
    # Running video generation and getting a task id
    gen_response = generate_audio()
    print(gen_response)
    gen_id = gen_response.get("id")
    print("Generation ID:  ", gen_id)

    # Try to retrieve the video from the server every 15 sec
    if gen_id:
        start_time = time.time()

        timeout = 1000
        while time.time() - start_time < timeout:
            response_data = retrieve_audio(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break

            status = response_data.get("status")
            
            if status in ["queued", "generating"]:
                print(f"Status: {status}. Checking again in 15 seconds.")
                time.sleep(15)
            else:
                print("Processing complete:\n", response_data)
                return response_data

        print("Timeout reached. Stopping.")
        return None 


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
// Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
const API_KEY = '<YOUR_AIMLAPI_KEY>';

async function generateAudio() {
  const url = 'https://api.aimlapi.com/v2/generate/audio';
  const payload = {
        model: 'minimax/music-cover',
        prompt: 'Quiet jazz',
        lyrics: '[Verse]: Why is this wind so gentle? Why is this wind so gentle? Why is this wind so gentle? As if it knows where sorrow sleeps...',
        reference_audio_url: 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/why-is-this-wind.mp3'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${await response.text()}`);
    return null;
  }

  const data = await response.json();
  console.log('Generation:', data);
  return data;
}

async function retrieveAudio(generationId) {
  const url = `https://api.aimlapi.com/v2/generate/audio?generation_id=${generationId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${await response.text()}`);
    return null;
  }

  return await response.json();
}

async function main() {
  const generationResponse = await generateAudio();

  if (!generationResponse || !generationResponse.id) {
    console.error('No generation ID received.');
    return;
  }

  const genId = generationResponse.id;
  const timeout = 600000; // 10 minutes
  const interval = 15000; // 15 seconds
  const start = Date.now();

  const intervalId = setInterval(async () => {
    if (Date.now() - start > timeout) {
      console.log('Timeout reached. Stopping.');
      clearInterval(intervalId);
      return;
    }

    const result = await retrieveAudio(genId);

    if (!result) {
      console.error('No response from API.');
      clearInterval(intervalId);
      return;
    }

    const status = result.status;
    if (['generating', 'queued'].includes(status)) {
      console.log(`Status: ${status}. Checking again in 15 seconds.`);
    } else {
      console.log('Generation complete:\n', result);
      clearInterval(intervalId);
    }
  }, interval);
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
Generation: {'id': 'NMDk4_Yh8DjqiZ7Ub_7WB', 'status': 'queued'}
{'id': 'NMDk4_Yh8DjqiZ7Ub_7WB', 'status': 'queued'}
Generation ID:   NMDk4_Yh8DjqiZ7Ub_7WB
Status: queued. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Processing complete:
 {'id': 'NMDk4_Yh8DjqiZ7Ub_7WB', 'status': 'completed', 'audio_file': {'url': 'https://cdn.aimlapi.com/moose/music%2Fprod%2Ftts-20260424025125-EqUGzuXIkyQrPxKU.mp3?Expires=1777056692&OSSAccessKeyId=LTAI5tCpJNKCf5EkQHSuL9xg&Signature=64TjxWDj2nSt930Nxbtp3jB6uvI%3D'}}
```
{% endcode %}

</details>

Listen to [the track](https://drive.google.com/file/d/1TEIuXqv6rSTL2_Uuwt7se7tV34qvrHrx/view?usp=sharing) we generated.
