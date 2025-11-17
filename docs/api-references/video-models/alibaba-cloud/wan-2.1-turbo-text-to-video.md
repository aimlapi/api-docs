# Wan 2.1 Turbo (Text-to-Video)

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/wan2.1-t2v-turbo`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=alibaba/wan2.1-t2v-turbo&#x26;mode=video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

A text-to-video (T2V) model that generates 480p and 720p silent video at \~30 FPS[^1].

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.

Below, you can find two corresponding API schemas and examples for both endpoint calls.

</details>

## API Schemas

### Video Generation

This endpoint creates and sends a video generation task to the server — and returns a generation ID.

{% hint style="success" %}
To quickly test video models from different developers without changing endpoints, use our new universal short one — **`https://api.aimlapi.com/v2/video/generations`.**
{% endhint %}

{% openapi-operation spec="wan2-1-t2v-turbo" path="/v2/generate/video/alibaba/generation" method="post" %}
[OpenAPI wan2-1-t2v-turbo](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan2.1-t2v-turbo.json)
{% endopenapi-operation %}

### Fetch the video

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="alibaba-fetch" path="/v2/generate/video/alibaba/generation" method="get" %}
[OpenAPI alibaba-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan2.1-t2v-turbo-pair.json)
{% endopenapi-operation %}

## Full Example: Generating and Retrieving the Video From the Server

The code below creates a video generation task, then automatically polls the server every **10** seconds until it finally receives the video URL.

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
    url = f"{base_url}/generate/video/alibaba/generation"
    headers = {
        "Authorization": f"Bearer {aimlapi_key}", 
    }

    data = {
        "model": "alibaba/wan2.1-t2v-turbo",
        "prompt": '''
A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming.
''' }
 
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        return response_data

# Requesting the result of the task from the server using the generation_id
def get_video(gen_id):
    url = f"{base_url}/generate/video/alibaba/generation"
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
        model: "alibaba/wan2.1-t2v-turbo",
        prompt: `
A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming.
`
    });

    const url = new URL(`${baseUrl}/generate/video/alibaba/generation`);
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
    const url = new URL(`${baseUrl}/generate/video/alibaba/generation`);
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
{'id': '4f516080-dd10-4e3d-ba3d-97bb37b5323f', 'status': 'queued'}
Generation ID:   4f516080-dd10-4e3d-ba3d-97bb37b5323f
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
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: completed
Processing complete:/n {'id': '4f516080-dd10-4e3d-ba3d-97bb37b5323f', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/alpaca/1d/9d/20250805/5259de3d/4f516080-dd10-4e3d-ba3d-97bb37b5323f.mp4?Expires=1754465864&OSSAccessKeyId=LTAI5tRcsWJEymQaTsKbKqGf&Signature=0%2BryY6k77uerXq7p8Jkp3tY%2FgqQ%3D'}}
```
{% endcode %}

</details>

**Processing time**: \~1.5 min.

**Original**: [1280x720](https://drive.google.com/file/d/1z5tcEgdLYjr1c6k1pwAinm3xr-H5tPIi/view?usp=sharing)

**Low-res GIF preview**:

<div align="left"><figure><img src="../../../.gitbook/assets/wan-v2.1-t2v-turbo-dragon-preview.gif" alt=""><figcaption><p><code>"A menacing evil dragon appears in a distance above the tallest mountain,</code><br><code>then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming."</code></p></figcaption></figure></div>

[^1]: Frame per second
