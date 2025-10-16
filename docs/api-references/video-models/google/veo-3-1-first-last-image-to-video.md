# Veo 3.1 (First-Last-Image-to-Video)

{% columns %}
{% column width="75%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/veo-3.1-first-last-image-to-video`
{% endhint %}
{% endcolumn %}

{% column width="25%" %}
<a href="https://aimlapi.com/app/?model=google/veo-3.1-first-last-image-to-video&#x26;mode=video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

The model generates realistic 8-second 720p and 1080p videos with detailed visuals and audio, offering multiple styles and even dialogue support. It also allows specifying the first and last frames of the video.

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
    url = f"{base_url}/video/generations"
    headers = {
        "Authorization": f"Bearer {aimlapi_key}", 
    }

    data = {
        "model": "google/veo-3.1-first-last-image-to-video",
        "prompt": "A woman looks into the camera, breathes in, then exclaims energetically, 'Hello world!'",
        "image_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg",
        "last_image_url": "https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg",
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

// Creating and sending a video generation task to the server
async function generateVideo() {
  const url = "https://api.aimlapi.com/v2/video/generations";

  const data = {
    model: "google/veo-3.1-first-last-image-to-video",
    prompt: 'A woman looks into the camera, breathes in, then exclaims energetically, "Hello world!"',
    image_url: 'https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg',
    last_image_url: 'https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg',
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error: ${response.status} - ${errorText}`);
      return null;
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}

// Requesting the result of the task from the server using the generation_id
async function getVideo(genId) {
  const url = new URL("https://api.aimlapi.com/v2/video/generations");
  url.searchParams.append("generation_id", genId);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

// Initiates video generation and checks the status every 10 seconds until completion or timeout
async function main() {
  const genResponse = await generateVideo();
  if (!genResponse) return;

  const genId = genResponse.id;
  console.log("Generation ID:", genId);

  if (genId) {
    const timeout = 600 * 1000; // 10 minutes
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const responseData = await getVideo(genId);

      if (!responseData) {
        console.error("Error: No response from API");
        break;
      }

      const status = responseData.status;
      console.log("Status:", status);

      if (["waiting", "active", "queued", "generating"].includes(status)) {
        console.log("Still waiting... Checking again in 10 seconds.");
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } else {
        console.log("Processing complete:\n", responseData);
        return responseData;
      }
    }

    console.log("Timeout reached. Stopping.");
  }
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
Generation ID:   9fa414f4-9733-46c8-a88c-ae46206f5e47:google/veo-3.1-first-last-image-to-video
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
Processing complete:
{'id': '9fa414f4-9733-46c8-a88c-ae46206f5e47:google/veo-3.1-first-last-image-to-video', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/flamingo/files/b/elephant/Qa7slw4Wgl2g4n3jTWnAY_output.mp4'}}
```
{% endcode %}

</details>

**Low-res GIF preview**:

<div align="left"><figure><img src="../../../.gitbook/assets/ezgif-66911a1f85c840 (1).gif" alt=""><figcaption></figcaption></figure></div>

## API Schemas

### Create a video generation task and send it to the server

You can generate a video using this API.



{% openapi-operation spec="veo-3-1-first-last-image-to-video" path="/v2/video/generations" method="post" %}
[OpenAPI veo-3-1-first-last-image-to-video](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/veo-3.1-first-last-image-to-video.json)
{% endopenapi-operation %}

### Fetch the video

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="fetch-video" path="/v2/video/generations" method="get" %}
[OpenAPI fetch-video](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/veo-3.1-t2v-pair.json)
{% endopenapi-operation %}
