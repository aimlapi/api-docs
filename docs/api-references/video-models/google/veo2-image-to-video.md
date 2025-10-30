# Veo 2 (Image-to-Video)

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `veo2/image-to-video`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=veo2/image-to-video&#x26;mode=video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

An advanced multimodal (image + text) AI model that transforms static images into high-quality, dynamic video content. It builds upon the success of Google's [Veo2 text-to-video](veo2-text-to-video.md) model, offering unprecedented control and realism in video generation from still images, faithful content preservation from source images, and intuitive motion generation with physics-aware movement.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## Full Example: Generating and Retrieving the Video From the Server

We have a classic [reproduction](https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg) of the famous da Vinci painting. Let's ask the model to generate a video where the Mona Lisa puts on glasses.

{% hint style="info" %}
Generation may take around 40-50 seconds for a 5-second video.
{% endhint %}

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
    url = f"{base_url}/generate/video/google/generation"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }

    data = {
        "model": "veo2/image-to-video",
        "prompt": "Mona Lisa puts on glasses with her hands.",
        "image_url": "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg",
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
    url = f"{base_url}/generate/video/google/generation"
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
    model: "veo2/image-to-video",
    prompt: "Mona Lisa puts on glasses with her hands.",
    image_url: "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg",
    duration: "5",
  });

  const url = new URL(`${baseUrl}/generate/video/google/generation`);
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
  const url = new URL(`${baseUrl}/generate/video/google/generation`);
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

// Initiates video generation and checks the status every 10 s until completion or timeout
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
Gen_ID:   9bf4e6f6-dae7-41c7-94aa-354443b300c6:veo2/image-to-video
Status: queued
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: generating
Still waiting... Checking again in 10 seconds.
Status: completed
Processing complete:/n {'id': '812dbc37-f15a-46a4-a058-8477bd243f5a:veo2/image-to-video', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/eagle/files/rabbit/D7LD6oJwKMF9gk9KjqwDV_output.mp4', 'content_type': 'video/mp4', 'file_name': 'output.mp4', 'file_size': 6827705}}
```
{% endcode %}

</details>

**Original**: [1280x720](https://drive.google.com/file/d/19p8OlNOWJrJN9Z6KFTzloQ4ZAAmQIaDu/view?usp=sharing)

**Low-res GIF preview**:

<div align="left"><figure><img src="../../../.gitbook/assets/veo2-image-to-video-monalisa-preview.gif" alt=""><figcaption></figcaption></figure></div>

## API Schemas

Generating a video using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.&#x20;

### Create a video generation task and send it to the server

You can generate a video using this API.

{% hint style="success" %}
To quickly test video models from different developers without changing endpoints, use our new universal short one — **`https://api.aimlapi.com/v2/video/generations`.**
{% endhint %}

{% openapi-operation spec="veo2-image-to-video" path="/v2/generate/video/google/generation" method="post" %}
[OpenAPI veo2-image-to-video](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/Veo2-Image-to-Video.json)
{% endopenapi-operation %}

### Fetch the video

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="veo3-fetch" path="/v2/generate/video/google/generation" method="get" %}
[OpenAPI veo3-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/veo3-pair.json)
{% endopenapi-operation %}
