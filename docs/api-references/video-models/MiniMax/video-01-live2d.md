# video-01-live2d

{% columns %}
{% column %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `video-01-live2d`
{% endhint %}
{% endcolumn %}

{% column %}
<a href="https://aimlapi.com/app/?model=video-01-live2d&#x26;mode=video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

An innovative AI model designed for generating high-quality videos from text prompts or image. This model can produce visually striking content with cinematic qualities, allowing users to create engaging videos quickly and efficiently.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

Generating a video using this model involves sequentially calling two endpoints:

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.

Below, you can find two corresponding API schemas.

### Create a video generation task and send it to the server

{% openapi src="../../../.gitbook/assets/video-01-live2d.json" path="/v2/generate/video/minimax/generation" method="post" %}
[video-01-live2d.json](../../../.gitbook/assets/video-01-live2d.json)
{% endopenapi %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi src="../../../.gitbook/assets/video-01-live2d-pair.json" path="/v2/generate/video/minimax/generation" method="get" %}
[video-01-live2d-pair.json](../../../.gitbook/assets/video-01-live2d-pair.json)
{% endopenapi %}

## Full Example: Generating and Retrieving the Video From the Server

We have a classic [reproduction](https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg) of the famous da Vinci painting. Let's ask the model to generate a video where the Mona Lisa puts on glasses. Generation may take around 3 minutes for a 6-second video.

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
    url = f"{base_url}/generate/video/minimax/generation"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }

    data = {
        "model": "video-01-live2d",
        "prompt": "Mona Lisa puts on glasses with her hands.",
        "first_frame_image": "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg",      
    }
 
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        # print(response_data)
        return response_data
    

# Requesting the result of the task from the server using the generation_id
def get_video(gen_id):
    url = f"{base_url}/generate/video/minimax/generation"
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
    gen_id = gen_response.get("generation_id")
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
    model: "video-01-live2d",
    prompt: "Mona Lisa puts on glasses with her hands.",
    first_frame_image: "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg",
  });

  const url = new URL(`${baseUrl}/generate/video/minimax/generation`);
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
  const url = new URL(`${baseUrl}/generate/video/minimax/generation`);
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
    if (!genResponse || !genResponse.generation_id) {
      console.error("Failed to start generation");
      return;
    }

    const genId = genResponse.generation_id;
    console.log("Generation ID:", genId);

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
Generation ID:   288439434137694
Status: queued
Still waiting... Checking again in 10 seconds.
Status: queued
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
Processing complete:/n {'id': '288439434137694', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/whale/inference_output%2Fvideo%2F2025-07-08%2Fd1626f4f-be9c-4aca-87da-5b749efcdef7%2Foutput.mp4?Expires=1752005613&OSSAccessKeyId=LTAI5tAmwsjSaaZVA6cEFAUu&Signature=5guXof04YOOgZPBhkeklSFY5gqM%3D'}}
```
{% endcode %}

</details>

<details>

<summary>Generated Video</summary>

**Original**: [720x1072](https://drive.google.com/file/d/1AnWhtqf-_DI9f7B3wkhIKAa1YmbE06ns/view?usp=sharing)

**Low-res GIF preview**:

<div align="left"><figure><img src="../../../.gitbook/assets/minimax-video-01-live2d_preview.gif" alt=""><figcaption></figcaption></figure></div>

</details>
