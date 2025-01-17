---
icon: code
---

# Generate an Audio

## Overview

* **High-Quality Music Generation**: Create music tracks based on descriptive prompts.
* **Flexible Integration**: Compatible with various programming languages and frameworks.

## Consumption

1 audio file will be generated for each request, consuming a total of 63 000 AI/ML Tokens.

## API Reference

{% swagger src="https://api-staging.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27" path="/v2/generate/audio/minimax/generate" method="post" %}
[https://api-staging.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27](https://api-staging.aimlapi.com/docs-public-yaml?key=3b878a3c71a785f13366e9be96bacb27)
{% endswagger %}

## Examples

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// npm install node-fetch form-data
import fs from "fs";
import fetch from "node-fetch";

const generateMusic = async () => {
  const url = "https://api.aimlapi.com/v2/generate/audio/minimax/generate";
  const voiceId = "vocal-2025010100000000-a0AAAaaa";
  const referInstrumental = "instrumental-2025010100000000-Aaa0aAaA";

  // Sample lyrics
  const lyrics = `
  ##
  I see a skyline painted in dreams,
  The colors shift, nothing's as it seems.
  You’re the whisper in a crowded night,
  The only constant in a world of flight.

  And I wonder, where the road will go,
  Through the chaos, you’re the one I know.

  In the future, there’s a place for us,
  Where time will fade, but not our trust.
  Through the echoes of what’s yet to be,
  You’re my forever, my destiny.
  ##
  `;

  const payload = {
    refer_voice: voiceId,
    refer_instrumental: referInstrumental,
    lyrics: lyrics,
    model: "music-01",
  };

  const apiKey = "<YOUR_API_KEY>"; 

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      const audioHex = data.data.audio;
      const decodedHex = Buffer.from(audioHex, "hex");

      // Convert to mp3
      fs.writeFileSync("generated_audio.mp3", decodedHex);
      console.log("Audio file saved as generated_audio.mp3");
    } else {
      console.error("Failed to generate music:", data);
    }
  } catch (error) {
    console.error("Error during API request:", error);
  }
}

generateMusic();

```
{% endtab %}

{% tab title="Python" %}
```python
import requests

def generate_music():
    api_key = '<YOUR_API_KEY>'
    url = 'https://api.aimlapi.com/v2/generate/audio/minimax/generate'

    voice_id = 'vocal-2025010100000000-a0AAAaaa'
    refer_instrumental = 'instrumental-2025010100000000-Aaa0aAaA'

    #Sample lyrics
    lyrics = '''
    ##
    I see a skyline painted in dreams,
    The colors shift, nothing's as it seems.
    You’re the whisper in a crowded night,
    The only constant in a world of flight.

    And I wonder, where the road will go,
    Through the chaos, you’re the one I know.

    In the future, there’s a place for us,
    Where time will fade, but not our trust.
    Through the echoes of what’s yet to be,
    You’re my forever, my destiny.
    ##
    '''

    payload = {
        'refer_voice': voice_id,
        'refer_instrumental': refer_instrumental,
        'lyrics':  lyrics,
        'model': 'music-01',
        }
    headers = {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + api_key,
    }

    response = requests.post(url, headers=headers, json=payload)

    audio_hex = response.json()['data']['audio']
    decoded_hex = bytes.fromhex(audio_hex)

    # convert to mp3
    with open('generated_audio.mp3', 'wb') as f:
        f.write(decoded_hex)

if __name__ == '__main__':
    generate_music()

```
{% endtab %}
{% endtabs %}
