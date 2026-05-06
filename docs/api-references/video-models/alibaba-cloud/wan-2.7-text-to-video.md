# Wan 2.7 (Text-to-Video)

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/wan-2-7-t2v`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/wan-2-7-t2v" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

A state-of-the-art text-to-video generation model designed to produce high-quality, realistic or stylized cinematic videos from prompts, with support for multi-shot composition and synchronized audio generation, offering flexible 720p/1080p output typically ranging from 5 to 15 seconds.

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

{% openapi-operation spec="wan-2-7-t2v" path="/v2/video/generations" method="post" %}
[OpenAPI wan-2-7-t2v](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan2.7-t2v.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `completed`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="universal-video-endpoint-fetch" path="/v2/video/generations" method="get" %}
[OpenAPI universal-video-endpoint-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/universal-video-fetch.json)
{% endopenapi-operation %}

## Full Example: Multi-shot

Let’s define a sequence of scenes in the prompt to achieve a more cinematic result. Set the shot\_type parameter to multi.

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
        "model": "alibaba/wan-2-7-t2v",
        "prompt": "A cheerful white raccoon runs through a giant sequoia forest. Sunlight streams through the tall trees, soft volumetric light, cinematic camera movement following the raccoon from the side, shallow depth of field, animated film style, 3 seconds. Then close-up of the raccoons face. The raccoon gently raises its head and looks up toward the towering sequoia treetops. Soft light on the fur, expressive eyes, subtle head movement, cinematic close-up, animated film style, 2 seconds. Then first-person view from the raccoon's perspective. Massive sequoia trees sway and rustle in the wind high above. Suddenly, a huge pterodactyl flies across the sky, blurred and partially hidden in mist and haze. Slight handheld camera feel, cinematic motion blur, dramatic atmosphere, animated film style, 4 seconds.",
        "aspect_ratio": "16:9",
        "resolution": "1080p",
        "duration": 10,
        "shot_type": "multi"
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

    # Trying to retrieve the video from the server every 15 sec
    if gen_id:
        start_time = time.time()

        timeout = 1000   # 1000 sec = 16 min 40 sec
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
        model: 'alibaba/wan-2-7-t2v',
        prompt: `A cheerful white raccoon runs through a giant sequoia forest. Sunlight streams through the tall trees, soft volumetric light, cinematic camera movement following the raccoon from the side, shallow depth of field, animated film style, 3 seconds. Then close-up of the raccoons face. The raccoon gently raises its head and looks up toward the towering sequoia treetops. Soft light on the fur, expressive eyes, subtle head movement, cinematic close-up, animated film style, 2 seconds. Then first-person view from the raccoon's perspective. Massive sequoia trees sway and rustle in the wind high above. Suddenly, a huge pterodactyl flies across the sky, blurred and partially hidden in mist and haze. Slight handheld camera feel, cinematic motion blur, dramatic atmosphere, animated film style, 4 seconds.`,
        duration: 10,
        aspect_ratio: '16:9'
        resolution: '1080p',
        shot_type: 'multi'
    });

    const url = new URL(`${baseUrl}/video/generations`);
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
    const url = new URL(`${baseUrl}/video/generations`);
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

// Initiates video generation and checks the status every 15 seconds until completion or timeout
function main() {
    generateVideo((genResponse) => {
        if (!genResponse || !genResponse.id) {
            console.error("No generation ID received.");
            return;
        }

        const genId = genResponse.id;
        console.log("Generation ID:", genId);

        const timeout = 1000 * 1000; // 1000 sec = 16 min 40 sec
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
{'id': 'QC4qjlUKt8ZedNi7r09LM', 'status': 'queued', 'meta': {'usage': {'credits_used': 3900000, 'usd_spent': 1.95}}}
Generation ID:   QC4qjlUKt8ZedNi7r09LM
Status: queued. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
...
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Processing complete:
 {'id': 'QC4qjlUKt8ZedNi7r09LM', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/generations/alligator/1778027467317-6ca89b94-4a86-413b-b1ad-6dccef4daffa.mp4'}}
```
{% endcode %}

</details>

**Processing time**: \~ 8 min 23 sec.

**Generated video** (1920x1080, with sound):

{% embed url="https://drive.google.com/file/d/1IrdYMD0MbYnzwVvfT4ELegPewjf2USXU/view" %}
