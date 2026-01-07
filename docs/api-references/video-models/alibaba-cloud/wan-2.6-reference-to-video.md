# Wan 2.6 (Reference-to-Video)

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/wan-2-6-r2v`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/alibaba/wan-2-6-r2v" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

This model builds videos from reference video material with reliable character consistency, synchronized audio, and cinematic multi-shot storytelling. Compared to earlier versions, Wan 2.6 provides stronger instruction following, higher visual fidelity, and improved sound generation.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint. Below, you can find both corresponding API schemas.

</details>

## API Schemas

### Create a video generation task and send it to the server

{% openapi-operation spec="wan-2-6-r2v" path="/v2/video/generations" method="post" %}
[OpenAPI wan-2-6-r2v](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan2.6-r2v.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `generation_id`, obtained from the endpoint described above.\
If the video generation task status is `completed`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="universal-video-endpoint-fetch" path="/v2/video/generations" method="get" %}
[OpenAPI universal-video-endpoint-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/universal-video-fetch.json)
{% endopenapi-operation %}

## Code Example

The code below creates a video generation task, then automatically polls the server every **15** seconds until it finally receives the video URL.

Two reference videos are supplied via URLs, and the prompt defines how the model should use them.

{% tabs %}
{% tab title="Python" %}
<pre class="language-python" data-overflow="wrap"><code class="lang-python">import requests
import time

# Insert your AIML API Key instead of &#x3C;YOUR_AIMLAPI_KEY>:
api_key = "&#x3C;YOUR_AIMLAPI_KEY>"
base_url = "https://api.aimlapi.com/v2"

# Creating and sending a video generation task to the server
def generate_video():
    url = f"{base_url}/video/generations"
    headers = {
        "Authorization": f"Bearer {api_key}", 
        "Content-Type": "application/json"
    }

    payload = {
        "model": "alibaba/wan-2-6-r2v",
        "prompt": '''
<strong>Use the woman from the second reference video as Mona Lisa — keep her face, clothing, colors, lighting, camera angle, and background exactly as in the second reference video.
</strong>Do not replace her with a different person and do not change the environment.

Take the raccoon only from the first reference video — keep the same fur pattern, colors, proportions, and appearance.
Do not generate a different raccoon.

Place the raccoon gently in Mona Lisa’s arms, as if he is her pet. She softly pets the raccoon. The raccoon affectionately licks her face, and Mona Lisa reacts with a warm, joyful laugh.

The audio must be in English. Mona Lisa says the short line:
"Oh, you sweet little one!"
Synchronize her lip movement to this line only. Do not generate Chinese speech.

Keep the visual style, motion, framing, and atmosphere realistic and consistent with the second reference video.
''',
        "video_urls":[
            "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/racoon-in-the-forest.mp4",
            "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/monalisa.mp4"
            ],
        # "duration": "5",
    }
 
    response = requests.post(url, json=payload, headers=headers)
    
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
    print(gen_response)
    gen_id = gen_response.get("id")
    print("Generation ID:  ", gen_id)

    # Try to retrieve the video from the server every 15 sec
    if gen_id:
        start_time = time.time()

        timeout = 1000
        while time.time() - start_time &#x3C; timeout:
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
</code></pre>
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
    model: "alibaba/wan-2-6-r2v",
    prompt: `Use the woman from the second reference video as Mona Lisa — keep her face, clothing, colors, lighting, camera angle, and background exactly as in the second reference video.
Do not replace her with a different person and do not change the environment.

Take the raccoon only from the first reference video — keep the same fur pattern, colors, proportions, and appearance.
Do not generate a different raccoon.

Place the raccoon gently in Mona Lisa’s arms, as if he is her pet. She softly pets the raccoon. The raccoon affectionately licks her face, and Mona Lisa reacts with a warm, joyful laugh.

The audio must be in English. Mona Lisa says the short line:
"Oh, you sweet little one!"
Synchronize her lip movement to this line only. Do not generate Chinese speech.

Keep the visual style, motion, framing, and atmosphere realistic and consistent with the second reference video.`,
    video_urls: [
      "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/racoon-in-the-forest.mp4",
      "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/monalisa.mp4"
    ]
};

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
{'id': 'F4ydZjZhuZFinNQMnQleh', 'status': 'queued', 'meta': {'usage': {'credits_used': 3150000}}}
Generation ID:   F4ydZjZhuZFinNQMnQleh
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
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Status: generating. Checking again in 15 seconds.
Processing complete:
 {'id': 'F4ydZjZhuZFinNQMnQleh', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/alpaca/1d/ef/20260107/69015395/89757270-8987f96a-bdd1-439f-92f6-4ebc4e8a7a4d.mp4?Expires=1767873802&OSSAccessKeyId=LTAI5tRcsWJEymQaTsKbKqGf&Signature=kBywVpc6QoOT0%2BqFhUSAmsw3fqo%3D'}}
```
{% endcode %}

</details>

**Processing time**: \~ 4 min 20 sec.

**Generated video** (1920x1080, with sound):

{% embed url="https://drive.google.com/file/d/1uqKLmzOZ_MYUTZ1f_DnQ_PoVXhl-DLD0/view" %}
