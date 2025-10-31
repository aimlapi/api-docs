# Wan 2.5 Preview (Image-to-Video)

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `alibaba/wan2.5-i2v-preview`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=alibaba/wan2.5-i2v-preview&#x26;mode=video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

This text-to-video model generates videos up to 1080p and can voice a character with full lip-sync by providing dialogue directly in the `prompt` parameter. In addition to the features of the [Wan 2.5 Preview (Text-to-Video)](wan-2.5-preview-text-to-video.md) model, it also supports uploading a reference image, which may depict the character to be animated or the surrounding scene.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

Below, you can find two corresponding API schemas and examples for both endpoint calls.

</details>

## Full Example: Generating and Retrieving the Video From the Server

The code below creates a video generation task, then automatically polls the server every **10** seconds until it finally receives the video URL.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import time

# replace <YOUR_AIMLAPI_KEY> with your actual AI/ML API key
api_key = "<YOUR_AIMLAPI_KEY>"
base_url = "https://api.aimlapi.com/v2"


# Creating and sending a video generation task to the server
def generate_video():
    url = f"{base_url}/generate/video/alibaba/generation"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }

    data = {
        "model": "alibaba/wan2.5-i2v-preview",
        "prompt": '''Mona Lisa nervously puts on glasses with her hands and asks her off-screen friend to the left: ‘Do they suit me?’ She then tilts her head slightly to one side and then the other, so the unseen friend can better judge.''',
        "image_url": "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg",    
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
    url = f"{base_url}/generate/video/alibaba/generation"
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
const https = require("https");
const { URL } = require("url");

// Replace <YOUR_AIMLAPI_KEY> with your actual AI/ML API key
const apiKey = "<YOUR_AIMLAPI_KEY>";
const baseUrl = "https://api.aimlapi.com/v2";

// Creating and sending a video generation task to the server
function generateVideo(callback) {
  const data = JSON.stringify({
    model: "alibaba/wan2.5-i2v-preview",
    prompt: `Mona Lisa nervously puts on glasses with her hands and asks her off-screen friend to the left: ‘Do they suit me?’ She then tilts her head slightly to one side and then the other, so the unseen friend can better judge.`,
    image_url: "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg",
  });

  const url = new URL(`${baseUrl}/generate/video/alibaba/generation`);
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
  const url = new URL(`${baseUrl}/generate/video/alibaba/generation`);
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

// Initiates video generation and checks the status every 10 seconds until completion or timeout
function main() {
  generateVideo((genResponse) => {
    if (!genResponse || !genResponse.id) {
      console.error("Failed to start generation");
      return;
    }

    const genId = genResponse.id;
    console.log("Gen_ID:", genId);

    const startTime = Date.now();
    const timeout = 600000;

    const checkStatus = () => {
      if (Date.now() - startTime > timeout) {
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
          setTimeout(checkStatus, 10000);
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
Generation ID:   c8a198bb-8b06-4640-91ee-f96caa792390:alibaba/wan2.5-i2v-preview
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
Processing complete:/n {'id': 'c8a198bb-8b06-4640-91ee-f96caa792390:alibaba/wan2.5-i2v-preview', 'status': 'completed', 'video': {'url': 'https://dashscope-result-sh.oss-cn-shanghai.aliyuncs.com/1d/15/20250927/1080b7c5/c8a198bb-8b06-4640-91ee-f96caa792390.mp4?Expires=1759009739&OSSAccessKeyId=LTAI5tKPD3TMqf2Lna1fASuh&Signature=3oH7JKM54LL2LwnoRKvTyyhvWeM%3D'}}
```
{% endcode %}

</details>

**Processing time**: \~3 min 40 sec.

**Generated video** (786x1172, with sound):

{% embed url="https://drive.google.com/file/d/19Q6QkD_ZTX5semo0k50B5RK6HHTT2GsA/view" fullWidth="false" %}

## API Schemas

### Video Generation

This endpoint creates and sends a video generation task to the server — and returns a generation ID.

{% hint style="success" %}
To quickly test video models from different developers without changing endpoints, use our new universal short one — **`https://api.aimlapi.com/v2/video/generations`.**
{% endhint %}

{% openapi-operation spec="wan2-5-i2v-preview" path="/v2/generate/video/alibaba/generation" method="post" %}
[OpenAPI wan2-5-i2v-preview](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan2.5-i2v-preview.json)
{% endopenapi-operation %}

### Fetch the video

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="alibaba-fetch" path="/v2/generate/video/alibaba/generation" method="get" %}
[OpenAPI alibaba-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Alibaba-Cloud/wan2.1-t2v-turbo-pair.json)
{% endopenapi-operation %}
