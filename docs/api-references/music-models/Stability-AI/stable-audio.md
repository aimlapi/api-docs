# stable-audio

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `stable-audio`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/stable-audio" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

An advanced audio generation model designed to create high-quality audio tracks from textual prompts.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

{% openapi-operation spec="stable-audio" path="/v2/generate/audio" method="post" %}
[OpenAPI stable-audio](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/Stability-AI/stable-audio.json)
{% endopenapi-operation %}

### Retrieve the generated music sample from the server <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

After sending a request for music generation, this task is added to the queue. This endpoint lets you check the status of a audio generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated audio URL and additional metadata.

{% openapi-operation spec="universal-audio-fetch" path="/v2/generate/audio" method="get" %}
[OpenAPI universal-audio-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/universal-audio-fetch.json)
{% endopenapi-operation %}

## Full Example: Generating and Retrieving the Audio From the Server <a href="#full-example-generating-and-retrieving-the-video-from-the-server" id="full-example-generating-and-retrieving-the-video-from-the-server"></a>

The code below creates a audio generation task, then automatically polls the server every **10** seconds until it finally receives the video URL.

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
        "model": "elevenlabs/eleven_music",
        "prompt": "lo-fi pop hip-hop ambient music, slow intro: 10 s, then faster and with loud bass: 10 s",
        "seconds_total": 20,
    }
    headers = {"Authorization": f"Bearer {aimlapi_key}", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        print("Generation: ", response_data)
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
            
            if status in ["queued", "generating"]:
                print(f"Status: {status}. Checking again in 10 seconds.")
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
const https = require("https");
const { URL } = require("url");

// Replace <YOUR_AIMLAPI_KEY> with your actual AI/ML API key
const apiKey = "<YOUR_AIMLAPI_KEY>";
const baseUrl = "https://api.aimlapi.com/v2";

// Creating and sending a audio generation task to the server
function generateAudio(callback) {
  const data = JSON.stringify({
      model: "elevenlabs/eleven_music",
      prompt: "lo-fi pop hip-hop ambient music, slow intro: 10 s, then faster and with loud bass: 10 s",
      seconds_total: 20,
  });

  const url = new URL(`${baseUrl}/generate/audio`);
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(data),
    },
  };

  const req = https.request(url, options, (res) => {
    let body = "";
    res.on("data", (chunk) => body += chunk);
    res.on("end", () => {
      if (res.statusCode >= 400) {
        console.error(`Error: ${res.statusCode} - ${body}`);
        callback(null);
      } else {
        const parsed = JSON.parse(body);
        callback(parsed);
      }
    });
  });

  req.on("error", (err) => console.error("Request error:", err));
  req.write(data);
  req.end();
}

// Requesting the result of the task from the server using the generation_id
function getAudio(genId, callback) {
  const url = new URL(`${baseUrl}/generate/audio`);
  url.searchParams.append("generation_id", genId);

  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  };

  const req = https.request(url, options, (res) => {
    let body = "";
    res.on("data", (chunk) => body += chunk);
    res.on("end", () => {
      const parsed = JSON.parse(body);
      callback(parsed);
    });
  });

  req.on("error", (err) => console.error("Request error:", err));
  req.end();
}

// Initiates sound generation and checks the status every 10 seconds until completion or timeout
function main() {
    generateAudio((genResponse) => {
        if (!genResponse || !genResponse.id) {
            console.error("No generation ID received.");
            return;
        }

        const genId = genResponse.id;
        console.log("Generation ID:", genId);

        const timeout = 1000 * 1000; // 1000 sec
        const interval = 10 * 1000; // 10 sec
        const startTime = Date.now();

        const checkStatus = () => {
            if (Date.now() - startTime >= timeout) {
                console.log("Timeout reached. Stopping.");
                return;
            }

            getAudio(genId, (responseData) => {
                if (!responseData) {
                    console.error("Error: No response from API");
                    return;
                }

                const status = responseData.status;
        
                if (["queued", "generating"].includes(status)) {
                    console.log(`Status: ${status}. Checking again in 10 seconds.`);
                    setTimeout(checkStatus, interval);
                } else {
                    console.log("Processing complete:\n", responseData);
                }
            });
        };
        checkStatus();
    })
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
Generation ID: ed58c4e0-2ed6-429f-91a1-b2c13a89ff46:stable-audio
Status: queued. Checking again in 10 seconds.
Status: generating. Checking again in 10 seconds.
Status: generating. Checking again in 10 seconds.
Status: generating. Checking again in 10 seconds.
Processing complete:
 {
  id: 'ed58c4e0-2ed6-429f-91a1-b2c13a89ff46:stable-audio',
  status: 'completed',
  audio_file: {
    url: 'https://cdn.aimlapi.com/flamingo/files/b/0a88448e/wxI96EIL4Noe21Zt3XsFc_tmpdwdfh537.wav',
    content_type: 'application/octet-stream',
    file_name: 'tmpdwdfh537.wav',
    file_size: 5292078
  }
}
```
{% endcode %}

</details>

Listen to the track we generated:

{% embed url="https://drive.google.com/file/d/178CN92wTCsgeb-JiPuXiEFgZa_jonjB_/view" %}
