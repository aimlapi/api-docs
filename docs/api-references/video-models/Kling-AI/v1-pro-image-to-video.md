# v1-pro/image-to-video

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `kling-video/v1/pro/image-to-video`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/kling-video/v1/pro/image-to-video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

This model transforms static images into dynamic video clips. Offers more advanced camera controls than [v1 Standard](v1-standard-image-to-video.md) model, including options for tilt, pan, zoom, and roll movements. Results in richer details and more stable camera movements, enhancing the overall visual quality of the generated videos. Enhanced animations make elements like water flow and character movements appear more natural and engaging.

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

{% hint style="success" %}
Now, all of our API schemas for video models use our new universal short URL — `https://api.aimlapi.com/v2/video/generations`. \
However, you can still call this model using the legacy URL that includes the vendor name.
{% endhint %}

### Create a video generation task and send it to the server

{% hint style="info" %}
The aspect ratio of the generated video is solely determined by the aspect ratio of the input reference image.
{% endhint %}

{% openapi-operation spec="v1-pro-image-to-video" path="/v2/video/generations" method="post" %}
[OpenAPI v1-pro-image-to-video](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Kling-AI/v1-pro-image-to-video.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `completed`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="universal-video-endpoint-fetch" path="/v2/video/generations" method="get" %}
[OpenAPI universal-video-endpoint-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/universal-video-fetch.json)
{% endopenapi-operation %}

## Full Example: Generating and Retrieving the Video From the Server

We have a classic [reproduction](https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg) of the famous da Vinci painting. Let's ask the model to generate a video where the Mona Lisa puts on glasses. The code below creates a video generation task, then automatically polls the server every **15** seconds until it finally receives the video URL.

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
        "model": "kling-video/v1/pro/image-to-video",
        "prompt": "Mona Lisa puts on glasses with her hands.",
        "image_url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/mona_lisa_extended.jpg",
        "duration": "5",       
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
const https = require("https");
const { URL } = require("url");

// Replace <YOUR_AIMLAPI_KEY> with your actual AI/ML API key
const apiKey = "<YOUR_AIMLAPI_KEY>";
const baseUrl = "https://api.aimlapi.com/v2";

// Creating and sending a video generation task to the server
function generateVideo(callback) {
  const data = JSON.stringify({
    model: "kling-video/v1/pro/image-to-video",
    prompt: "Mona Lisa puts on glasses with her hands.",
    image_url: "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/mona_lisa_extended.jpg",
    duration: "5",
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
Generation ID:   gg6lldgKC2tRmvJwBjK7-
Status: queued. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Processing complete:
 {'id': 'gg6lldgKC2tRmvJwBjK7-', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/kangaroo/bs2/upload-ylab-stunt-sgp/muse/784256485483880450/VIDEO/20260122/d40612cb5e896d7522b879ef1df858d9-a9d6cd03-e7c7-436f-a5ea-8e4a0436905a.mp4?cacheKey=ChtzZWN1cml0eS5rbGluZy5tZXRhX2VuY3J5cHQSsAHb-cd6E1sNt1khQt00KZDlKKywMoWCcZZpN20KDMWKJ2KpOPIvyEvdZGxo6Pq2ZdfroGNpC8qzkfsQ5NKoUYw3eMISmzkZUGfsxQoGf1s62zOVo8DgLcWTcSVjBrPWDiINCRcRfPLhDcpBBo0nxg5Y4okHO7NlLCxkO5GEezRFVR_DKVVo2STvgP67QWtHz3CzfT8rUhcGCYs1XkQTMJhUxaBjWmmBYRx3p4wutoKr3hoSYF8ADrg3uvuiuzhTSVrQUvw0IiAsCh1HKrgcKo6_JboDCYiKlWjo6KJpZr1TjTMcg3vWAigFMAE&x-kcdn-pid=112781&ksSecret=0de731a5285509eb9c9eb89da6e10bd0&ksTime=6999d288'}}
```
{% endcode %}

</details>

**Processing time**: \~ 3 min 24 sec.

**Generated video** (1280x720, without sound):

{% embed url="https://drive.google.com/file/d/1mU4Kv0k37SH0RN3WL3PNC7A3anQpZEts/view" %}
