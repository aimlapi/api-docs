# magic/image-to-video



{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `magic/image-to-video`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/magic/image-to-video" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

The model allows you to embed your custom image into the selected video template — sound included.

<details>

<summary>Supported Templates</summary>

<div><figure><img src="../../../.gitbook/assets/Art Gallery (1).gif" alt=""><figcaption><p><code>Art Gallery</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Cappadocia Balloons (1).gif" alt=""><figcaption><p><code>Cappadocia Balloons</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Desktop Reveal (2).gif" alt=""><figcaption><p><code>Desktop Reveal</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Digital Float (2).gif" alt=""><figcaption><p><code>Digital Float</code></p></figcaption></figure></div>

<div><figure><img src="../../../.gitbook/assets/Dubai Museum (1).gif" alt=""><figcaption><p><code>Dubai Museum</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Egypt Pyramid (1).gif" alt=""><figcaption><p><code>Egypt Pyramid</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Las Vegas LED (1).gif" alt=""><figcaption><p><code>Las Vegas LED</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/New York Times Square () (1).gif" alt=""><figcaption><p><code>New York Times Square(66)</code> </p></figcaption></figure></div>

<div><figure><img src="../../../.gitbook/assets/New York Times Square.gif" alt=""><figcaption><p><code>New York Times Square(77)</code> </p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Paris Eiffel Tower.gif" alt=""><figcaption><p><code>Paris Eiffel Tower</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Phone App.gif" alt=""><figcaption><p><code>Phone App</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Phone Social.gif" alt=""><figcaption><p><code>Phone Social</code></p></figcaption></figure></div>

<div><figure><img src="../../../.gitbook/assets/Rotating Сards (1).gif" alt=""><figcaption><p><code>Rotating Сards</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/San Francisco Skyscrapers (1).gif" alt=""><figcaption><p><code>San Francisco Skyscrapers</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Stockholm Metro (1).gif" alt=""><figcaption><p><code>Stockholm Metro</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Thailand Street (1).gif" alt=""><figcaption><p><code>Thailand Street</code></p></figcaption></figure></div>

<div><figure><img src="../../../.gitbook/assets/Times Square Billboard.gif" alt=""><figcaption><p><code>Times Square Billboard</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Times Square Round Screen.gif" alt=""><figcaption><p><code>Times Square Round Screen</code></p></figcaption></figure> <figure><img src="../../../.gitbook/assets/Tokyo Billboard.gif" alt=""><figcaption><p><code>Tokyo Billboard</code></p></figcaption></figure></div>

</details>

***

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schemas

Generating a video using this model involves sequentially calling two endpoints:

* The first one is for creating and sending a video generation task to the server (returns a generation ID).
* The second one is for requesting the generated video from the server using the generation ID received from the first endpoint.

Below, you can find two corresponding API schemas and an example with both endpoint calls.

### Create a video generation task and send it to the server

{% openapi-operation spec="image-to-video" path="/v2/video/generations" method="post" %}
[OpenAPI image-to-video](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/magic/image-to-video.json)
{% endopenapi-operation %}

### Retrieve the generated video from the server

After sending a request for video generation, this task is added to the queue. This endpoint lets you check the status of a video generation task using its `generation_id`, obtained from the endpoint described above.\
If the video generation task status is `complete`, the response will include the final result — with the generated video URL and additional metadata.

{% openapi-operation spec="universal-video-endpoint-fetch" path="/v2/video/generations" method="get" %}
[OpenAPI universal-video-endpoint-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/video-models/ByteDance/omnihuman-pair.json)
{% endopenapi-operation %}

## Code Example

The code below creates a video generation task, then automatically polls the server every **15** seconds until it finally receives the video URL.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import time

# Replace <YOUR_AIMLAPI_KEY> with your actual AI/ML API key
api_key = "<YOUR_AIMLAPI_KEY>"
base_url = "https://api.aimlapi.com/v2"

# Creating and sending a video generation task to the server
def generate_video():
    url = f"{base_url}/video/generations"
    headers = {
        "Authorization": f"Bearer {api_key}", 
    }

    data = {
        "model": "magic/image-to-video",
        "image_url": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/aimlapi.jpg",
        "template": "New York Times Square (66)"
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
    url = f"{base_url}/video/generations"
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
    print(gen_response)
    gen_id = gen_response.get("id")
    print("Generation ID:  ", gen_id)

    # Try to retrieve the video from the server every 15 sec
    if gen_id:
        start_time = time.time()

        timeout = 1000
        while time.time() - start_time < timeout:
            response_data = get_video(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break

            status = response_data.get("status")
            
            if status in ["waiting", "queued", "generating"]:
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
    model: "magic/image-to-video",
    image_url: "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/aimlapi.jpg",
    template: "New York Times Square (66)"
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
        
                if (["waiting", "queued", "generating"].includes(status)) {
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
{'id': 'f_X_2Wxezmp5xNVjO1S92', 'status': 'queued', 'meta': {'usage': {'credits_used': 1050000}}}
Generation ID:   f_X_2Wxezmp5xNVjO1S92
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
Processing complete:
 {'id': 'f_X_2Wxezmp5xNVjO1S92', 'status': 'completed', 'video': {'url': 'https://cdn.aimlapi.com/mule/ompr/openmagic/render_tasks/255013/559bbaed84a2455d8b98bac880610f1b.mp4?response-content-disposition=attachment%3B%20filename%3D559bbaed84a2455d8b98bac880610f1b.mp4&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=FUQDW4Z92RG9JPURIVP1%2F20251231%2Ffsn1%2Fs3%2Faws4_request&X-Amz-Date=20251231T164415Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=559f1a31d377647eb6a7dee2cbbf870de05062ac167547345d2c3dff4e62eef0'}}
```
{% endcode %}

</details>

**Processing time**: \~ 3 min 8 sec.

**Generated video** (608x1080, with sound):

{% embed url="https://drive.google.com/file/d/1wtQZrThH9oddX3guJYRQ7sq-0FoVWQQm/view" %}
