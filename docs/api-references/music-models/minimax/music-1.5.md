# music-1.5

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `minimax/music-1.5`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/minimax/music-1.5" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

The model creates full-length songs (up to 4 minutes) featuring natural-sounding vocals and detailed instrumental arrangements.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

### Generate music sample <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

This endpoint generates a new music piece based on the voice and/or instrumental pattern identifiers obtained from the first endpoint above.\
The generation can be completed in 60-80 seconds or take a bit more.

{% openapi-operation spec="music-1-5" path="/v2/generate/audio" method="post" %}
[OpenAPI music-1-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/MiniMax/music-1.5.json)
{% endopenapi-operation %}

### Retrieve the generated music sample from the server <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

After sending a request for music generation, this task is added to the queue. Based on the service's load, the generation can be completed in 50-60 seconds or take a bit more.

{% openapi-operation spec="stable-audio-pair" path="/v2/generate/audio" method="get" %}
[OpenAPI stable-audio-pair](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/Stability-AI/stable-audio-pair.json)
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
        "model": "minimax/music-1.5",
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
    
    
# This is the main function of the program. From here, we sequentially call the audio generation and then repeatedly request the result from the server every 10 seconds:
def main():
    generation_response = generate_audio()
    gen_id = generation_response.get("id")
        
    if gen_id:
        start_time = time.time()

        timeout = 600
        while time.time() - start_time < timeout:
            response_data = retrieve_audio(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break
        
            status = response_data.get("status")

            if status == "generating" or status == "queued" or status == "waiting":
                print("Still waiting... Checking again in 10 seconds.")
                time.sleep(10)
            else:
                print("Generation complete:/n", response_data)
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
        model: 'minimax/music-1.5',
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
  const interval = 10000; // 10 seconds
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
    if (['generating', 'queued', 'waiting'].includes(status)) {
      console.log('Still waiting... Checking again in 10 seconds.');
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
Generation: {'id': 'd51032d5-e7b3-4e5b-a5c8-12e0c9474949:minimax/music-1.5', 'status': 'queued'}
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Generation complete:/n {'id': 'd51032d5-e7b3-4e5b-a5c8-12e0c9474949:minimax/music-1.5', 'status': 'completed', 'audio_file': {'url': 'https://minimax-algeng-chat-tts-us.oss-us-east-1.aliyuncs.com/music%2Fprod%2Ftts-20251106201349-ESweHLjHtnWFQLwO.mp3?Expires=1762517636&OSSAccessKeyId=LTAI5tCpJNKCf5EkQHSuL9xg&Signature=ZIKZMHUCU3r30ysGjbSoqc3aVks%3D'}, 'extra_info': {'music_duration': 93022, 'music_sample_rate': 44100, 'music_channel': 2, 'bitrate': 256000, 'music_size': 0}, 'trace_id': '055bc3b9622dd73d828276162cc7d516'}
```
{% endcode %}

</details>

Listen to the track we generated:

{% embed url="https://drive.google.com/file/d/1SnLnpa4C4gU1sWDEIfd-fTTGdd6zwfJW/view" %}
