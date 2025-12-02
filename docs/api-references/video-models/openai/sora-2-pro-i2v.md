# sora-2-pro-i2v

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `openai/sora-2-pro-i2v`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/pixverse/v5/image-to-video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

Sora 2 Pro is state-of-the-art, most advanced media generation model, generating videos with synced audio.

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

You can generate a video using this API. In the basic setup, you only need a reference image and a prompt. \
This endpoint creates and sends a video generation task to the server — and returns a generation ID.

{% openapi-operation spec="sora-2-pro-i2v" path="/v2/video/generations" method="post" %}
[OpenAPI sora-2-pro-i2v](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/OpenAi/sora-2-pro-i2v.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `id`, obtained from the endpoint described above.\
If the video generation task status is `completed`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="sora-2-t2v-pair" path="/v2/video/generations" method="get" %}
[OpenAPI sora-2-t2v-pair](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/OpenAi/sora-2-t2v-pair.json)
{% endopenapi-operation %}

## Full Example: Generating and Retrieving the Video From the Server

The code below creates a video generation task, then automatically polls the server every **10** seconds until it finally receives the video URL.

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
    url = "https://api.aimlapi.com/v2/video/generations"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }

    data = {
        "model": "openai/sora-2-pro-i2v",
        "prompt": "She turns around and smiles, then slowly walks out of the frame.",
        "image_url": "https://cdn.openai.com/API/docs/images/sora/woman_skyline_original_720p.jpeg",
        "resolution": "720p",
        "duration": 4
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
    url = "https://api.aimlapi.com/v2/video/generations"
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
    # Generate video
    gen_response = generate_video()
    gen_id = gen_response.get("id")
    print("Generation ID:  ", gen_id)

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
const apiKey = '<YOUR_AIMLAPI_KEY>';

// Creating and sending a video generation task to the server
async function generateVideo() {
  const url = 'https://api.aimlapi.com/v2/video/generations';

  const data = {
    model: 'openai/sora-2-pro-i2v',
    prompt: 'She turns around and smiles, then slowly walks out of the frame.',
    image_url:
      'https://cdn.openai.com/API/docs/images/sora/woman_skyline_original_720p.jpeg',
    resolution: '720p',
    aspect_ratio: '16:9',
    duration: 4,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
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
    console.error('Request failed:', error);
    return null;
  }
}

// Requesting the result of the task from the server using the generation_id
async function getVideo(genId) {
  const url = new URL('https://api.aimlapi.com/v2/video/generations');
  url.searchParams.append('generation_id', genId);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching video:', error);
    return null;
  }
}

// Initiates video generation and checks the status every 10 seconds until completion or timeout
async function main() {
  const genResponse = await generateVideo();
  if (!genResponse) return;

  const genId = genResponse.id;
  console.log('Generation ID:', genId);

  if (genId) {
    const timeout = 600 * 1000; // 10 minutes
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const responseData = await getVideo(genId);

      if (!responseData) {
        console.error('Error: No response from API');
        break;
      }

      const status = responseData.status;
      console.log('Status:', status);

      if (['waiting', 'active', 'queued', 'generating'].includes(status)) {
        console.log('Still waiting... Checking again in 10 seconds.');
        await new Promise((resolve) => setTimeout(resolve, 10000));
      } else {
        console.log('Processing complete:\n', responseData);
        return responseData;
      }
    }

    console.log('Timeout reached. Stopping.');
  }
}

main();

```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Statuses</summary>

<table><thead><tr><th width="169.99993896484375">Status</th><th>Description</th></tr></thead><tbody><tr><td><code>queued</code>
</td><td>Job is waiting in queue</td></tr><tr><td><code>generating</code></td><td>Video is being generated</td></tr><tr><td><code>completed</code> </td><td>Generation successful, video available</td></tr><tr><td><code>error</code></td><td>Generation failed, check <code>error</code> field </td></tr></tbody></table>

</details>

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
Generation ID: video_68e57b98ad70819182a47a135a5fbcc407c36053d7b22880:openai/sora-2-pro-i2v
Status: generating
Still waiting... Checking again in 10 seconds.
Status: queued
Still waiting... Checking again in 10 seconds.
Status: queued
Still waiting... Checking again in 10 seconds.
...
Processing complete:
 {
  id: 'video_68e57b98ad70819182a47a135a5fbcc407c36053d7b22880:openai/sora-2-pro-i2v',
  status: 'completed',
  video: {
    url: 'https://cdn.aimlapi.com/generations/hedgehog/1759870057414-7a63e416-a2c0-4497-a55a-11665b7e1c17.mp4'
  }
}
```
{% endcode %}

</details>

**Processing time**: \~1.5 min.

**Low-res GIF preview**:

<div align="left"><figure><img src="../../../.gitbook/assets/ezgif-1b397f75ecad63.gif" alt=""><figcaption><p><code>"She turns around and smiles, then slowly walks out of the frame."</code></p></figcaption></figure></div>
