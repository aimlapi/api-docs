# Seedance 2.0 Fast

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `bytedance/seedance-2-0-fast`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/bytedance/seedance-2-0-fast" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

The model supports text-to-video, image-to-video, and reference-to-video generation. \
Delivers strong prompt fidelity and high motion quality, optimized for lower latency.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.

Below, you can find both corresponding API schemas.

</details>

## API Schemas

### Create a video generation task and send it to the server

This endpoint creates and sends a video generation task to the server — and returns its ID.

{% openapi-operation spec="seedance-2-0-fast" path="/v2/video/generations" method="post" %}
[OpenAPI seedance-2-0-fast](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/ByteDance/seedance-2-0-fast.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.

If the video generation task status is `completed`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="universal-video-endpoint-fetch" path="/v2/video/generations" method="get" %}
[OpenAPI universal-video-endpoint-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/universal-video-fetch.json)
{% endopenapi-operation %}

## Code Example #1: Generating and Retrieving the Video From the Server

The code below creates a video generation task, then automatically polls the server every **15** seconds until it finally receives the video URL.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import time

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
api_key = "<YOUR_AIMLAPI_KEY>"
base_url = "https://api.aimlapi.com/v2"

# Creating and sending a video generation task to the server
def generate_video():
    url = f"{base_url}/video/generations"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }

    data = {
        "model": "bytedance/seedance-2-0-fast",
        "prompt": "Mona Lisa puts on glasses with her hands.",
        "image_url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/mona_lisa_extended.jpg",
        "duration": "8",
    }
 
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        return response_data
    

# Requesting the result of the task from the server using the generation_id
def get_video(gen_id):
    url = f"{base_url}/video/generations"
    params = {
        "generation_id": gen_id,
    }
    
    headers = {
        "Authorization": f"Bearer {api_key}", 
        "Content-Type": "application/json"
        }

    response = requests.get(url, params=params, headers=headers)
    return response.json()


def main():
    # Running video generation and getting a task id
    gen_response = generate_video()
    gen_id = gen_response.get("id")
    print("Generation ID:  ", gen_id)

    # Try to retrieve the video from the server every 15 sec
    if gen_id:
        start_time = time.time()

        timeout = 1000
        while time.time() - start_time < timeout:
            response_data = get_video(gen_id)

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

{% tab title="JS" %}
{% code overflow="wrap" %}
```javascript
const https = require("https");
const { URL } = require("url");

// Replace <YOUR_AIMLAPI_KEY> with your actual AI/ML API key
const apiKey = "<YOUR_AIMLAPI_KEY>";
const baseUrl = "https://api.aimlapi.com/v2";

// Creating and sending a video generation task to the server
function generateVideo(callback) {
  const data = JSON.stringify({
    model: "bytedance/seedance-2-0-fast",
    prompt: "Mona Lisa puts on glasses with her hands.",
    image_url: "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/mona_lisa_extended.jpg",
    duration: "8",
  });

  const url = new URL(`${baseUrl}/video/generations`);
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
function getVideo(genId, callback) {
  const url = new URL(`${baseUrl}/video/generations`);
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

// Initiates video generation and checks the status every 15 seconds until completion or timeout
function main() {
    generateVideo((genResponse) => {
        if (!genResponse || !genResponse.id) {
            console.error("No generation ID received.");
            return;
        }

        const genId = genResponse.id;
        console.log("Generation ID:", genId);

        const timeout = 1000 * 1000; // 1000 sec
        const interval = 15 * 1000; // 15 sec
        const startTime = Date.now();

        const checkStatus = () => {
            if (Date.now() - startTime >= timeout) {
                console.log("Timeout reached. Stopping.");
                return;
            }

            getVideo(genId, (responseData) => {
                if (!responseData) {
                    console.error("Error: No response from API");
                    return;
                }

                const status = responseData.status;
        
                if (["queued", "generating"].includes(status)) {
                    console.log(`Status: ${status}. Checking again in 15 seconds.`);
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
Generation ID:   pHxD_AA0BrRYwRdDR6lBT
Status: queued. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Processing complete:
 {'id': 'pHxD_AA0BrRYwRdDR6lBT', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/flamingo/files/b/0a957a4a/_meThYPT-u6woH3F9Q-7h_video.mp4'}}
```
{% endcode %}

</details>

**Processing time**: \~ 1 min 33 sec.

**Generated video** (1280x720, with sound):

{% embed url="https://drive.google.com/file/d/1hPKsxciQmB6RmCdoSxfWXLkl2FStvIIp/view?usp=sharing" %}

## Code Example #2: Lip-Sync

Now let’s look at how reference images and audio can be used. We ask the model to generate a lip-sync video in which the Mona Lisa from the reference image speaks the content taken from the reference audio. Following the developer’s recommendations, we refer to the reference image in the prompt as `@Image1` and the audio as `@Audio1`.

The code below creates a video generation task, then automatically polls the server every **15** seconds until it finally receives the video URL.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
# bytedance/omnihuman/v1.5
# klingai/avatar-standard / klingai/avatar-pro

import requests
import time

# replace <YOUR_AIMLAPI_KEY> with your actual AI/ML API key
api_key = "<YOUR_AIMLAPI_KEY>"
base_url = "https://api.aimlapi.com/v2"


# Creating and sending a video generation task to the server
def generate_video():
    url = f"{base_url}/video/generations"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }

    data = {
        "model": "bytedance/seedance-2-0-fast",
        "image_urls": ["https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/mona_lisa_extended.jpg"],
        "audio_urls": ["https://storage.googleapis.com/falserverless/example_inputs/omnihuman_audio.mp3"],
        "prompt": "The woman in @Image1 is speaking the audio from @Audio1."
    }
 
    response = requests.post(url, json=data, headers=headers)
    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        print(response_data)
        return response_data
    

# Requesting the result of the task from the server using the generation_id
def get_video(gen_id):
    url = f"{base_url}/video/generations"
    params = {
        "generation_id": gen_id,
    }
    
    headers = {
        "Authorization": f"Bearer {api_key}", 
        "Content-Type": "application/json"
        }

    response = requests.get(url, params=params, headers=headers)
    return response.json()


def main():
     # Running video generation and getting a task id
    gen_response = generate_video()
    gen_id = gen_response.get("id")
    print("Generation ID:  ", gen_id)

    # Trying to retrieve the video from the server every 10 sec
    if gen_id:
        start_time = time.time()

        timeout = 600
        while time.time() - start_time < timeout:
            response_data = get_video(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break
        
            status = response_data.get("status")
            print("Status:", status)

            if status in ["queued", "generating"]:
                print(f"Status: {status}. Checking again in 15 seconds.")
                time.sleep(15)
            else:
                print("Processing complete:/n", response_data)
                return response_data
   
        print("Timeout reached. Stopping.")
        return None     


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JS" %}
{% code overflow="wrap" %}
```javascript
const https = require("https");
const { URL } = require("url");

// Replace <YOUR_AIMLAPI_KEY> with your actual AI/ML API key
const apiKey = "<YOUR_AIMLAPI_KEY>";
const baseUrl = "https://api.aimlapi.com/v2";

// Creating and sending a video generation task to the server
function generateVideo(callback) {
  const data = JSON.stringify({
    model: "bytedance/seedance-2-0-fast",
    image_urls: ["https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/mona_lisa_extended.jpg"],
    audio_urls: ["https://storage.googleapis.com/falserverless/example_inputs/omnihuman_audio.mp3"],
    prompt: "The woman in @Image1 is speaking the audio from @Audio1."
  });

  const url = new URL(`${baseUrl}/video/generations`);
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
function getVideo(genId, callback) {
  const url = new URL(`${baseUrl}/video/generations`);
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

// Initiates video generation and checks the status every 15 seconds until completion or timeout
function main() {
    generateVideo((genResponse) => {
        if (!genResponse || !genResponse.id) {
            console.error("No generation ID received.");
            return;
        }

        const genId = genResponse.id;
        console.log("Generation ID:", genId);

        const timeout = 1000 * 1000; // 1000 sec
        const interval = 15 * 1000; // 15 sec
        const startTime = Date.now();

        const checkStatus = () => {
            if (Date.now() - startTime >= timeout) {
                console.log("Timeout reached. Stopping.");
                return;
            }

            getVideo(genId, (responseData) => {
                if (!responseData) {
                    console.error("Error: No response from API");
                    return;
                }

                const status = responseData.status;
        
                if (["queued", "generating"].includes(status)) {
                    console.log(`Status: ${status}. Checking again in 15 seconds.`);
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
{'id': 'gxcVNqPL4-vh3f3yoBuPJ', 'status': 'queued', 'meta': {'usage': {'credits_used': 5031936, 'usd_spent': 2.515968}}}
Generation ID:   gxcVNqPL4-vh3f3yoBuPJ
Status: queued. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: completed
Processing complete:/n {'id': 'gxcVNqPL4-vh3f3yoBuPJ', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/flamingo/files/b/0a95bee4/vv-UGbrbCo57qTkRG5HnQ_video.mp4'}}
```
{% endcode %}

</details>

Seedance 2.0 Fast delivered strong results, completing generation in about 1.5 minutes and handling lip synchronization very accurately. However, it is less advanced in voice adaptation: unlike the standard [Seedance 2.0](seedance-2.0.md) model, it uses the reference audio as-is and does not reliably transform a male voice into a female one, even when explicitly instructed in the prompt to use the audio transcript with a natural female voice.

**Processing time**: \~ 1 min 32 sec.

**Generated video** (1280x720, with sound):

{% embed url="https://drive.google.com/file/d/1554_MsXRzNDQGTfWiXaOSzYvThc4Z7PR/view?usp=sharing" %}
