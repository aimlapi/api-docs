# Seedance 1.0 lite (Text-to-Video)

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `bytedance/seedance-1-0-lite-t2v`
{% endhint %}

## Model Overview

Generate professional video content from text prompts in minutes — with the option to keep the camera fixed throughout the entire clip.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find both corresponding API schemas.

</details>

## API Schemas

### Create a video generation task and send it to the server

You can generate a video using this API. In the basic setup, you only need a prompt. \
This endpoint creates and sends a video generation task to the server — and returns a generation ID.

{% openapi-operation spec="seedance-1-0-lite-t2v" path="/v2/generate/video/bytedance/generation" method="post" %}
[OpenAPI seedance-1-0-lite-t2v](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/ByteDance/seedance-1.0-lite-text-to-video.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="bytedance-video-fetch" path="/v2/generate/video/bytedance/generation" method="get" %}
[OpenAPI bytedance-video-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/ByteDance/seedance-1.0-lite-text-to-video-pair.json)
{% endopenapi-operation %}

## Full Example: Generating and Retrieving the Video From the Server

The code below creates a video generation task, then automatically polls the server every **10** seconds until it finally receives the video URL.

{% hint style="warning" %}
Generation may take around 40-50 seconds for a 5-second video.
{% endhint %}

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import time

# Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
api_key = "<YOUR_AIMLAPI_KEY>"

# Creating and sending a video generation task to the server
def generate_video():
    url = "https://api.aimlapi.com/v2/generate/video/bytedance/generation"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }

    data = {
        "model": "bytedance/seedance-1-0-lite-t2v",
        "prompt": "A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming",     
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
    url = "https://api.aimlapi.com/v2/generate/video/bytedance/generation"
    params = {
        "generation_id": gen_id,
    }
    
    # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    headers = {
        "Authorization": f"Bearer {api_key}", 
        "Content-Type": "application/json"
        }

    response = requests.get(url, params=params, headers=headers)
    # print("Generation:", response.json())
    return response.json()



def main():
    
    # Generate video
    gen_response = generate_video()
    gen_id = gen_response.get("id")
    print("Gen_ID:  ", gen_id)

    # Try to retrieve the video from the server every 10 sec
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
        model: "bytedance/seedance-1-0-lite-t2v",
        prompt: `
A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming.
`
    });

    const url = new URL(`${baseUrl}/generate/video/bytedance/generation`);
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
    const url = new URL(`${baseUrl}/generate/video/bytedance/generation`);
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
        console.log("Gen_ID:", genId);

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
{'id': 'cgt-20250704191750-n4qjp', 'status': 'queued'}
Gen_ID:   cgt-20250704191750-n4qjp
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: completed
Processing complete:/n {'id': 'cgt-20250704191750-n4qjp', 'status': 'completed', 'video': {'url': 'https://ark-content-generation-ap-southeast-1.tos-ap-southeast-1.volces.com/seedance-1-0-lite-t2v/02175162787056300000000000000000000ffffc0a870115c506e.mp4?X-Tos-Algorithm=TOS4-HMAC-SHA256&X-Tos-Credential=AKLTYjg3ZjNlOGM0YzQyNGE1MmI2MDFiOTM3Y2IwMTY3OTE%2F20250704%2Fap-southeast-1%2Ftos%2Frequest&X-Tos-Date=20250704T111816Z&X-Tos-Expires=86400&X-Tos-Signature=9fa7ce9b1230bdd6c9ed5e2f08bfeda232e48e81877ef1647d45b55b641e9f15&X-Tos-SignedHeaders=host'}}
```
{% endcode %}

</details>

**Processing time**: \~36 sec.

**Original**: [1248x704](https://drive.google.com/file/d/1cNFk4MuQG7wuTi_wwQjrNDqGI6jgCKM5/view?usp=sharing)

**Low-res GIF preview**:

<div align="left"><figure><img src="../../../.gitbook/assets/seedance_t2v_preview.gif" alt=""><figcaption><p><code>"A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming."</code></p></figcaption></figure></div>
