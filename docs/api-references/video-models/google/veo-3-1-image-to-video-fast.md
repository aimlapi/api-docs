# Veo 3.1 Fast (Image-to-Video)

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `google/veo-3.1-i2v-fast`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/?model=google/veo-3.1-i2v-fast&#x26;mode=video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

The model generates realistic 8-second 720p and 1080p videos with detailed visuals and audio, offering multiple styles and even dialogue support.

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

### Create a video generation task and send it to the server

You can generate a video using this API.

{% openapi-operation spec="veo-3-1-i2v-fast" path="/v2/video/generations" method="post" %}
[OpenAPI veo-3-1-i2v-fast](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/veo-3.1-i2v-fast.json)
{% endopenapi-operation %}

### Fetch the video

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="fetch-video" path="/v2/video/generations" method="get" %}
[OpenAPI fetch-video](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/Google/veo-3.1-t2v-pair.json)
{% endopenapi-operation %}

## Full Example: Generating and Retrieving the Video From the Server

We have a classic [reproduction](https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg) of the famous da Vinci painting. Let's ask the model to generate a video where the Mona Lisa puts on glasses.

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
        "model": "google/veo-3.1-i2v-fast",
        "prompt": "The woman puts on glasses with her hands and then sighs and says slowly: 'Well...'.",
        "image_url": "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg",
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
    model: "google/veo-3.1-i2v-fast",
    prompt: "The woman puts on glasses with her hands and then sighs and says slowly: 'Well...'.",
    image_url: "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg",
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
Generation ID:   812dcc2d-05ba-4ea4-bd79-062be27269c3:google/veo-3.1-i2v-fast
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
{'id': '812dcc2d-05ba-4ea4-bd79-062be27269c3:google/veo-3.1-i2v-fast', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/flamingo/files/b/tiger/Sp-Wjt6lWhS5VMK-JlmFH_output.mp4'}}
```
{% endcode %}

</details>

**Low-res GIF preview**:

<div align="left"><figure><img src="../../../.gitbook/assets/ezgif-6be2e8b593df09.gif" alt=""><figcaption></figcaption></figure></div>
