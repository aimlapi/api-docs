# music-01

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `music-01`
{% endhint %}

An advanced AI model that generates diverse high-quality audio compositions by analyzing and reproducing musical patterns, rhythms, and vocal styles from the reference track. Refine the process using a text prompt.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

### Upload a reference sample

This endpoint uploads a reference music piece to the server, analyzes it, and returns identifiers for the voice and/or instrumental patterns to use later.

{% openapi src="../../../.gitbook/assets/music-01-pair.json" path="/v2/generate/audio/minimax/upload" method="post" %}
[music-01-pair.json](../../../.gitbook/assets/music-01-pair.json)
{% endopenapi %}

### Generate music sample <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

This endpoint generates a new music piece based on the voice and/or instrumental pattern identifiers obtained from the first endpoint above.\
The generation can be completed in 50-60 seconds or take a bit more.

{% openapi src="../../../.gitbook/assets/music-01.json" path="/v2/generate/audio/minimax/generate" method="post" %}
[music-01.json](../../../.gitbook/assets/music-01.json)
{% endopenapi %}

## Quick Code Example

Here is an example of generation an audio file based on a sample and a prompt using the music model **music-01**.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

# Insert your AI/ML API key here:
aimlapi_key = "<YOUR_AIMLAPI_KEY>"

# Input data
audio_url = "https://tand-dev.github.io/audio-hosting/spinning-head-271171.mp3"
file_name = "spinning-head-271171.mp3"
purpose = "song"  # Possible values: 'song', 'voice', 'instrumental'


def upload_reference_file():
    """Download file from URL and upload it to AIML API"""

    url = "https://api.aimlapi.com/v2/generate/audio/minimax/upload"

    try:
        # Step 1: Download the file
        response = requests.get(audio_url)
        response.raise_for_status()

        # Step 2: Upload to AIML API
        payload = {"purpose": purpose}
        files = {"file": (file_name, response.content, "audio/mpeg")}
        headers = {"Authorization": f"Bearer {aimlapi_key}"}

        upload_response = requests.post(url, headers=headers, files=files, data=payload)
        upload_response.raise_for_status()

        data = upload_response.json()
        print("Upload successful:", data)
        return data  # return JSON with file ids

    except requests.exceptions.RequestException as error:
        print(f"Error during upload: {error}")
        return None


def generate_audio(voice_id=None, instrumental_id=None):
    """Send audio generation request and save result"""

    url = "https://api.aimlapi.com/v2/generate/audio/minimax/generate"
    lyrics = (
        "##Side by side, through thick and thin, \n\n"
        "With a laugh, we always win. \n\n"
        "Storms may come, but we stay true, \n\n"
        "Friends forever—me and you!##"
    )

    payload = {
        "refer_voice": voice_id,
        "refer_instrumental": instrumental_id,
        "lyrics": lyrics,
        "model": "music-01",
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {aimlapi_key}",
    }

    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()

    audio_hex = response.json()["data"]["audio"]
    decoded_hex = bytes.fromhex(audio_hex)

    out_name = "generated_audio.mp3"
    with open(out_name, "wb") as f:
        f.write(decoded_hex)

    print(f"Generated audio saved as {out_name}")


def main():
    uploaded = upload_reference_file()
    if not uploaded:
        return

    # Extract IDs depending on purpose
    voice_id = uploaded.get("voice_id")
    instrumental_id = uploaded.get("instrumental_id")

    generate_audio(voice_id, instrumental_id)


if __name__ == "__main__":
    main()

```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
import { writeFile } from "node:fs/promises";
import { Blob } from "node:buffer";

// Insert your AI/ML API key here:
const API_KEY = "<YOUR_AIMLAPI_KEY>";

// Input data
const AUDIO_URL = "https://tand-dev.github.io/audio-hosting/spinning-head-271171.mp3";
const FILE_NAME = "spinning-head-271171.mp3";
const PURPOSE = "song"; // Possible values: 'song', 'voice', 'instrumental'

// Download file from URL and upload it to AIML API
async function uploadReferenceFile() {
  const uploadUrl = "https://api.aimlapi.com/v2/generate/audio/minimax/upload";

  try {
    // Step 1: Download the file
    const response = await fetch(AUDIO_URL);
    if (!response.ok) throw new Error(`Failed to download file: ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    const fileBlob = new Blob([arrayBuffer], { type: "audio/mpeg" });

    // Step 2: Upload to AIML API
    const formData = new FormData();
    formData.append("purpose", PURPOSE);
    formData.append("file", fileBlob, FILE_NAME);

    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        // Content-Type should not be set manually for FormData
      },
      body: formData,
    });

    if (!uploadResponse.ok) {
      const text = await uploadResponse.text();
      throw new Error(`Upload failed ${uploadResponse.status}: ${text}`);
    }

    const data = await uploadResponse.json();
    console.log("Upload successful:", data);
    return data; // JSON with file ids

  } catch (err) {
    console.error("Error during upload:", err.message);
    return null;
  }
}

// Send audio generation request and save result
async function generateAudio(voiceId = null, instrumentalId = null) {
  const url = "https://api.aimlapi.com/v2/generate/audio/minimax/generate";
  const lyrics = `
##Side by side, through thick and thin,
With a laugh, we always win.
Storms may come, but we stay true,
Friends forever—me and you!##
  `.trim();

  const payload = {
    refer_voice: voiceId,
    refer_instrumental: instrumentalId,
    lyrics,
    model: "music-01",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Generation failed ${res.status}: ${text}`);
  }

  const data = await res.json();
  const audioHex = data?.data?.audio;
  if (!audioHex) throw new Error("No audio hex in response");

  const audioBuffer = Buffer.from(audioHex, "hex");
  const outName = "generated_audio.mp3";
  await writeFile(outName, audioBuffer);
  console.log(`Generated audio saved as ${outName}`);
}

// Main function
async function main() {
  const uploaded = await uploadReferenceFile();
  if (!uploaded) return;

  // Extract IDs depending on purpose
  const voiceId = uploaded.voice_id;
  const instrumentalId = uploaded.instrumental_id;

  await generateAudio(voiceId, instrumentalId);
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
Upload successful: {'voice_id': 'vocal-2025082518145625-6XW9wCOF', 'instrumental_id': 'instrumental-2025082518145625-vCCEiiES', 'trace_id': '04fb6a8721abeee5b66edd452b4d0f33', 'base_resp': {'status_code': 0, 'status_msg': 'success'}}
Generated audio saved as generated_audio.mp3
```
{% endcode %}

</details>

Listen to the track we generated:

{% embed url="https://drive.google.com/file/d/1sKlPIK6kiYrp6__VhKkgGpr65e8qy2PU/view?usp=sharing" %}
