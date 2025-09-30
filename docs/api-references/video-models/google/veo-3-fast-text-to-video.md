# Veo 3 Fast (Text-to-Video)

{% columns %}
{% column width="75%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/veo-3.0-fast`
{% endhint %}
{% endcolumn %}

{% column width="25%" %}
<a href="https://aimlapi.com/app/?model=google/veo-3.0-fast&#x26;mode=video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

The model generates realistic 8-second 720p and 1080p videos with detailed visuals and audio. Optimized for speed and cost compared to the [Veo 3 (Text-to-Video)](veo3-text-to-video.md) model.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find two corresponding API schemas and an example with both endpoint calls.

</details>

## Full Example: Generating and Retrieving the Video From the Server

The code below creates a video generation task, then automatically polls the server every **10** seconds until it finally receives the video URL.

{% hint style="warning" %}
This model produces highly detailed and natural-looking videos, so generation may take around 2 minutes for a 8-second video with audio.
{% endhint %}

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import time

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
aimlapi_key = "<YOUR_AIMLAPI_KEY>"
base_url = "https://api.aimlapi.com/v2"

# Creating and sending a video generation task to the server
def generate_video():
    url = f"{base_url}/generate/video/google/generation"
    headers = {
        "Authorization": f"Bearer {aimlapi_key}", 
    }

    data = {
        "model": "google/veo-3.0-fast",
        "prompt": '''
A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming.
'''
    }
 
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        return response_data
    

# Requesting the result of the task from the server using the generation_id
def get_video(gen_id):
    url = f"{base_url}/generate/video/google/generation"
    params = {
        "generation_id": gen_id,
    }
    
    headers = {
        "Authorization": f"Bearer {aimlapi_key}", 
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

        timeout = 1000
        while time.time() - start_time < timeout:
            response_data = get_video(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break
        
            status = response_data.get("status")
            print("Status:", status)

            if status == "waiting" or status == "active" or  status == "queued" or status == "generating":
                print("Still waiting... Checking again in 10 seconds.")
                time.sleep(10)
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

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
// Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
const apiKey = "<YOUR_AIMLAPI_KEY>";
const baseUrl = "https://api.aimlapi.com/v2";
const https = require("https");
const { URL } = require("url");

// Creating and sending a video generation task to the server
function generateVideo(callback) {
    const data = JSON.stringify({
        model: "google/veo-3.0-fast",
        prompt: `
A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming.
`
    });

    const url = new URL(`${baseUrl}/generate/video/google/generation`);
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(data)
        }
    };

    const req = https.request(url, options, (res) => {
        let body = "";
        res.on("data", (chunk) => body += chunk);
        res.on("end", () => {
            if (res.statusCode >= 400) {
                console.error(`Error: ${res.statusCode} - ${body}`);
                callback(null);
            } else {
                const result = JSON.parse(body);
                callback(result);
            }
        });
    });

    req.on("error", (err) => {
        console.error("Request error:", err);
        callback(null);
    });

    req.write(data);
    req.end();
}

// Requesting the result of the task from the server using the generation_id
function getVideo(genId, callback) {
    const url = new URL(`${baseUrl}/generate/video/google/generation`);
    url.searchParams.append("generation_id", genId);

    const options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        }
    };

    const req = https.request(url, options, (res) => {
        let body = "";
        res.on("data", (chunk) => body += chunk);
        res.on("end", () => {
            const result = JSON.parse(body);
            callback(result);
        });
    });

    req.on("error", (err) => {
        console.error("Request error:", err);
        callback(null);
    });

    req.end();
}

// Initiates video generation and checks the status every 10 seconds until completion or timeout
function main() {
    generateVideo((genResponse) => {
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

            getVideo(genId, (responseData) => {
                if (!responseData) {
                    console.error("Error: No response from API");
                    return;
                }

                const status = responseData.status;
                console.log("Status:", status);

                if (["waiting", "active", "queued", "generating"].includes(status)) {
                    console.log("Still waiting... Checking again in 10 seconds.");
                    setTimeout(checkStatus, interval);
                } else {
                    console.log("Processing complete:\n", responseData);
                }
            });
        };

        checkStatus();
    });
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
Gen_ID:   083c6067-0bc6-464a-943b-930b1eb1753b:veo-3.0-fast-generate-001
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: completed
Processing complete:/n {'status': 'completed', 'id': '083c6067-0bc6-464a-943b-930b1eb1753b:veo-3.0-fast-generate-001', 'video': {'url': 'https://cdn.aimlapi.com/generations/guepard/1754989116527-98dac026-6570-4d01-8a93-4234dc699032.mp4'}}
```
{% endcode %}

</details>

**Original** (with the audio):  [1280x720](https://drive.google.com/file/d/1D66CSzwl-hOzKuozQGK0_6WGQdurlG5G/view?usp=sharing)

**Low-res GIF preview**:

<div align="left"><figure><img src="../../../.gitbook/assets/veo-3.0-fast_preview.gif" alt=""><figcaption><p><code>"A menacing evil dragon appears in a distance above the tallest mountain, then rushes</code> <br><code>toward the camera with its jaws open, revealing massive fangs. We see it's coming."</code></p></figcaption></figure></div>

## API Schemas

### Create a video generation task and send it to the server

You can generate a video using this API. In the basic setup, you only need a prompt.&#x20;

{% hint style="warning" %}
The prompt will be automatically enhanced using AI. To disable this feature, set the parameter `enhance_prompt` to `false`.
{% endhint %}

{% openapi-operation spec="veo-3-0-fast" path="/v2/generate/video/google/generation" method="post" %}
[OpenAPI veo-3-0-fast](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/veo-3.0-fast.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="veo3-fetch" path="/v2/generate/video/google/generation" method="get" %}
[OpenAPI veo3-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/veo3-pair.json)
{% endopenapi-operation %}
