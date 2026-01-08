# music-2.0

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `minimax/music-2.0`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/minimax/music-2-0" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

A fast and cost-efficient music generator optimized for high-quality music production. The model creates full-length songs (up to 4 minutes) featuring natural-sounding vocals and detailed instrumental arrangements.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

### Generate music sample <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

This endpoint generates a music piece based on the prompt (which includes style instructions) and the provided lyrics. It returns a generation task ID, its status, and related metadata.

{% openapi-operation spec="music-2-0" path="/v2/generate/audio" method="post" %}
[OpenAPI music-2-0](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/MiniMax/music-2.0.json)
{% endopenapi-operation %}

### Retrieve the generated music sample from the server <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

After sending a request for music generation, this task is added to the queue.

{% openapi-operation spec="universal-audio-fetch" path="/v2/generate/audio" method="get" %}
[OpenAPI universal-audio-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/universal-audio-fetch.json)
{% endopenapi-operation %}

## Quick Code Example

Here’s an example of generating an audio file using a prompt with style instructions and a separate parameter for the lyrics.

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
        "model": "minimax/music-2.0",
        "prompt": "A calm and soothing instrumental music with gentle piano and soft strings.",
        "lyrics": "[Verse]\nStreetlights flicker, the night breeze sighs\nShadows stretch as I walk alone\nAn old coat wraps my silent sorrow\nWandering, longing, where should I go\n[Chorus]\nPushing the wooden door, the aroma spreads\nIn a familiar corner, a stranger gazes back\nWarm lights flicker, memories awaken\nIn this small cafe, I find my way\n[Verse]\nRaindrops tap on the windowpane\nA melody plays, soft and low\nThe clink of cups, the murmur of dreams\nIn this haven, I find my home\n[Chorus]\nPushing the wooden door, the aroma spreads\nIn a familiar corner, a stranger gazes back\nWarm lights flicker, memories awaken\nIn this small cafe, I find my way" 
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
        model: 'minimax/music-2.0',
        prompt: 'A calm and soothing instrumental music with gentle piano and soft strings.',
        lyrics: '[Verse]\nStreetlights flicker, the night breeze sighs\nShadows stretch as I walk alone\nAn old coat wraps my silent sorrow\nWandering, longing, where should I go\n[Chorus]\nPushing the wooden door, the aroma spreads\nIn a familiar corner, a stranger gazes back\nWarm lights flicker, memories awaken\nIn this small cafe, I find my way\n[Verse]\nRaindrops tap on the windowpane\nA melody plays, soft and low\nThe clink of cups, the murmur of dreams\nIn this haven, I find my home\n[Chorus]\nPushing the wooden door, the aroma spreads\nIn a familiar corner, a stranger gazes back\nWarm lights flicker, memories awaken\nIn this small cafe, I find my way'
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
Generation: {'id': 'e84c6bd4-bb02-4702-a55d-9b73e170c110:minimax/music-2.0', 'status': 'queued'}
{'id': 'e84c6bd4-bb02-4702-a55d-9b73e170c110:minimax/music-2.0', 'status': 'queued'}
Generation ID:   e84c6bd4-bb02-4702-a55d-9b73e170c110:minimax/music-2.0
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Processing complete:
 {'id': 'e84c6bd4-bb02-4702-a55d-9b73e170c110:minimax/music-2.0', 'status': 'completed', 'audio_file': {'url': 'https://cdn.aimlapi.com/moose/music%2Fprod%2Ftts-20260108200145-PyWuVGVLaIkSAOEp.mp3?Expires=1767960111&OSSAccessKeyId=LTAI5tCpJNKCf5EkQHSuL9xg&Signature=pTfbqVDKtdUdX1dr0iqEjSI4xnY%3D'}, 'extra_info': {'music_duration': 107102, 'music_sample_rate': 44100, 'music_channel': 2, 'bitrate': 25600, 'music_size': 0}, 'trace_id': '05ae21d02744d305c8493d77c5b96a26'}
```
{% endcode %}

</details>

Listen to the track we generated:

{% embed url="https://drive.google.com/file/d/1nYJ3OCdcQ8_pR4vD_0yCZhnHDuS7LFdp/view" %}
