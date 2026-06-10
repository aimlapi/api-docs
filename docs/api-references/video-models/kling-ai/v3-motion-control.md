# v3/motion control

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `klingai/video-v3-motion-control`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/klingai/video-v3-motion-control" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

An advanced AI video generation model developed by Kuaishou Technology that animates a character from a reference image using the motion captured from a reference video. Kling v3 Motion Control transfers movements from a source video onto a character provided in an image, enabling high-fidelity motion replication with support for Standard and Professional quality modes.

## Setup your API Key

If you don't have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

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
Now, all of our API schemas for video models use our new universal short URL — `https://api.aimlapi.com/v2/video/generations`.\
However, you can still call this model using the legacy URL that includes the vendor name.
{% endhint %}

### Create a video generation task and send it to the server

{% hint style="info" %}
Both `image_url` and `video_url` are required. The character from the image will be animated using the motion from the reference video.
{% endhint %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `completed`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="universal-video-endpoint-fetch" path="/v2/video/generations" method="get" %}
[OpenAPI universal-video-endpoint-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/universal-video-fetch.json)
{% endopenapi-operation %}

## Full Example: Generating and Retrieving the Video From the Server

The example below animates a character from a reference image using the motions captured in a reference video. The code creates a video generation task, then automatically polls the server every **15** seconds until it receives the video URL.

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
        "model": "klingai/video-v3-motion-control",
        "image_url": "<YOUR_CHARACTER_IMAGE_URL>",
        "video_url": "<YOUR_REFERENCE_VIDEO_URL>",
        "prompt": "A character dancing in a sunlit studio.",
        "mode": "std",
        "character_orientation": "video",
        "keep_audio": True,
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
    model: "klingai/video-v3-motion-control",
    image_url: "<YOUR_CHARACTER_IMAGE_URL>",
    video_url: "<YOUR_REFERENCE_VIDEO_URL>",
    prompt: "A character dancing in a sunlit studio.",
    mode: "std",
    character_orientation: "video",
    keep_audio: true,
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
    const interval = 15 * 1000;  // 15 sec
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
Generation ID:   abc123XYZ
Status: queued. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Processing complete:
 {'id': 'abc123XYZ', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/generations/hedgehog/1759866285599-0cdfb138-c03a-49d4-a601-4f6413e27b15.mp4'}}
```
{% endcode %}

</details>
