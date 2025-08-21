# minimax-music \[legacy]

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `minimax-music`
{% endhint %}

## Model Overview

An advanced AI model that generates diverse high-quality audio compositions by analyzing and reproducing musical patterns, rhythms, and vocal styles from the reference track. Refine the process using a text prompt.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

### :digit\_one:  Setup You Can’t Skip

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

### :digit\_two:  Copy the code example

At the bottom of this page, you'll find [a code example](minimax-music-\[legacy].md#quick-code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

{% hint style="success" %}
Generating a music piece using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a music generation task to the server (returns a generation ID).
* The second one is for requesting the generated piece from the server using the generation ID received from the first endpoint.&#x20;

The code example combines both endpoint calls.
{% endhint %}

### :digit\_three:  Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Provide your lyrics via the `prompt` parameter. The model will use it to generate a song.&#x20;

{% hint style="warning" %}
Keep in mind that the maximum length of generated audio is 1 minute. If you provide a `prompt` that’s too long (which the model tries to use as song lyrics), it might exceed the time limit and result in a `"Downstream service error."`
{% endhint %}

:black\_small\_square:  Via `reference_audio_url` parameter, provide a URL to a reference track from which the model will extract the genre, style, tempo, vocal and instrument timbres, and the overall mood of the piece.

### :digit\_four:  <sup><sub><mark style="background-color:yellow;">(Optional)<mark style="background-color:yellow;"><sub></sup> Adjust other optional parameters if needed

Only  `prompt` is a required parameter for this model (and we’ve already filled it in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](minimax-music-\[legacy].md#api-schemas) ("Generate a music sample"), which lists all available parameters along with notes on how to use them.

### :digit\_five:  Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds 1 minute.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schemas

### Generate a music sample

This endpoint creates and sends a music generation task to the server — and returns a generation ID and the task status.

{% openapi-operation spec="minimax-music" path="/v2/generate/audio" method="post" %}
[OpenAPI minimax-music](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/MiniMax/minimax-music.json)
{% endopenapi-operation %}

### Retrieve the generated music sample from the server <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

After sending a request for music generation, this task is added to the queue. Based on the service's load, the generation can be completed in 50-60 seconds or take a bit more.

{% openapi-operation spec="minimax-music-fetch" path="/v2/generate/audio" method="get" %}
[OpenAPI minimax-music-fetch](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/music-models/MiniMax/minimax-music-pair.json)
{% endopenapi-operation %}

## Quick Code Example

Here is an example of generation an audio file based on a sample and a prompt using the music model **minimax-music**.

<details>

<summary>Full example explanation</summary>

As an example, we will generate a song using the popular **minimax-music** model from the Chinese company MiniMax. As you can verify in its API Schemas above, this model accepts an audio sample as input—extracting information about its vocals and instruments for use in the generation process—along with a text prompt where we can provide lyrics for our song.

We used a publicly available sample from royalty-free sample database and generated some lyrics in [Chat GPT](../../text-models-llm/OpenAI/gpt-4o.md):

_Side by side, through thick and thin,_\
&#xNAN;_&#x57;ith a laugh, we always win._\
&#xNAN;_&#x53;torms may come, but we stay true,_\
&#xNAN;_&#x46;riends forever—me and you!_

To turn this into a model-friendly prompt (as a single string), we added hash symbols and line breaks.

<mark style="background-color:blue;">'''</mark>\ <mark style="background-color:blue;">##Side by side, through thick and thin, \n\nWith a laugh, we always win. \n\n Storms may come, but we stay true, \n\nFriends forever—me and you!##</mark>\ <mark style="background-color:blue;">'''</mark>

A notable feature of our audio and video models is that uploading the prompt or sample, generating the content, and retrieving the final file from the server are handled through separate API calls. _(AIML API tokens are only consumed during the first step—i.e., the actual content generation.)_

We’ve written a complete code example that sequentially calls both endpoints — you can view and copy it below. <mark style="background-color:green;">Don’t forget to replace</mark> <mark style="background-color:green;"></mark><mark style="background-color:green;">`<YOUR_AIMLAPI_KEY>`</mark> <mark style="background-color:green;"></mark><mark style="background-color:green;">with your actual AIML API Key from your</mark> [<mark style="background-color:green;">account</mark>](https://aimlapi.com/app/keys)<mark style="background-color:green;">!</mark>

The structure of the code is simple: there are two separate functions for calling each endpoint, and a main function that orchestrates everything.&#x20;

Execution starts automatically from `main()`. It first runs the function that creates and sends a music generation task to the server — this is where you pass your **prompt** describing the desired musical fragment. This function returns a **generation ID** and the initial **task status**:

{% code overflow="wrap" %}
```javascript
Generation: {'id': '906aec79-b0af-40c4-adae-15e6c4410e29:minimax-music', 'status': 'queued'}
```
{% endcode %}

This indicates that the file upload and our generation has been queued on the server (which took 7 seconds in our case).

Next, `main()` launches the second function — the one that checks the task status and, once ready, retrieves the download URL from the server. This second function is called in a loop every 10 seconds.

During execution, you’ll see messages in the output:

* If the file is not yet ready:

```json5
Still waiting... Checking again in 10 seconds.
```

* Once the file is ready, a completion message appears with the download info. In our case, after five reruns of the second code block (waiting a total of about 50-60 seconds), we saw the following output:

{% code overflow="wrap" %}
```javascript
Generation: {'id': '906aec79-b0af-40c4-adae-15e6c4410e29:minimax-music', 'status': 'completed', 'audio_file': {'url': 'https://cdn.aimlapi.com/squirrel/files/koala/Oa2XHFE1hEsUn1qbcAL2s_output.mp3', 'content_type': 'audio/mpeg', 'file_name': 'output.mp3', 'file_size': 1014804}}
```
{% endcode %}

As you can see, the `'status'` is now `'completed'`, and further in the output line, we have a URL where the generated audio file can be downloaded.

***

Listen to the track we generated below the code and response blocks.

</details>

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import time
import requests

# Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
aimlapi_key = '<YOUR_AIMLAPI_KEY>'

# Creating and sending an audio generation task to the server (returns a generation ID)
def generate_audio():
    url = "https://api.aimlapi.com/v2/generate/audio"
    payload = {
        "model": "minimax-music",
        "reference_audio_url": 'https://tand-dev.github.io/audio-hosting/spinning-head-271171.mp3',
        "prompt": '''
##Side by side, through thick and thin, \n\nWith a laugh, we always win. \n\n Storms may come, but we stay true, \n\nFriends forever—me and you!##
''', 
    }
    headers = {"Authorization": f"Bearer {aimlapi_key}", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code >= 400:
        print(f"Error: {response.status_code} - {response.text}")
    else:
        response_data = response.json()
        print("Generation:", response_data)
        return response_data


# Requesting the result of the generation task from the server using the generation_id:
def retrieve_audio(gen_id):
    url = "https://api.aimlapi.com/v2/generate/audio"
    params = {
        "generation_id": gen_id,
    }
    headers = {"Authorization": f"Bearer {aimlapi_key}", "Content-Type": "application/json"}

    response = requests.get(url, params=params, headers=headers)
    return response.json()
    
    
# This is the main function of the program. From here, we sequentially call the audio generation and then repeatedly request the result from the server every 10 seconds:
def main():
    generation_response = generate_audio()
    gen_id = generation_response.get("id")
        
    if gen_id:
        start_time = time.time()

        timeout = 600
        while time.time() - start_time < timeout:
            response_data = retrieve_audio(gen_id)

            if response_data is None:
                print("Error: No response from API")
                break
        
            status = response_data.get("status")

            if status == "generating" or status == "queued" or status == "waiting":
                print("Still waiting... Checking again in 10 seconds.")
                time.sleep(10)
            else:
                print("Generation complete:/n", response_data)
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
// Insert your AI/ML API key instead of <YOUR_AIMLAPI_KEY>:
const AIMLAPI_KEY = '<YOUR_AIMLAPI_KEY>';

async function generateAudio() {
  const url = 'https://api.aimlapi.com/v2/generate/audio';
  const payload = {
    model: 'minimax-music',
    reference_audio_url: 'https://tand-dev.github.io/audio-hosting/spinning-head-271171.mp3',
    prompt: `##Side by side, through thick and thin,

With a laugh, we always win.

Storms may come, but we stay true,

Friends forever—me and you!##`
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIMLAPI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${await response.text()}`);
    return null;
  }

  const data = await response.json();
  console.log('Generation:', data);
  return data;
}

async function retrieveAudio(generationId) {
  const url = `https://api.aimlapi.com/v2/generate/audio?generation_id=${generationId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${AIMLAPI_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${await response.text()}`);
    return null;
  }

  return await response.json();
}

async function main() {
  const generationResponse = await generateAudio();

  if (!generationResponse || !generationResponse.id) {
    console.error('No generation ID received.');
    return;
  }

  const genId = generationResponse.id;
  const timeout = 600000; // 10 minutes
  const interval = 10000; // 10 seconds
  const start = Date.now();

  const intervalId = setInterval(async () => {
    if (Date.now() - start > timeout) {
      console.log('Timeout reached. Stopping.');
      clearInterval(intervalId);
      return;
    }

    const result = await retrieveAudio(genId);

    if (!result) {
      console.error('No response from API.');
      clearInterval(intervalId);
      return;
    }

    const status = result.status;
    if (['generating', 'queued', 'waiting'].includes(status)) {
      console.log('Still waiting... Checking again in 10 seconds.');
    } else {
      console.log('Generation complete:\n', result);
      clearInterval(intervalId);
    }
  }, interval);
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
Generation: {'id': '906aec79-b0af-40c4-adae-15e6c4410e29:minimax-music', 'status': 'queued'}
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Still waiting... Checking again in 10 seconds.
Generation: {'id': '906aec79-b0af-40c4-adae-15e6c4410e29:minimax-music', 'status': 'completed', 'audio_file': {'url': 'https://cdn.aimlapi.com/squirrel/files/koala/Oa2XHFE1hEsUn1qbcAL2s_output.mp3', 'content_type': 'audio/mpeg', 'file_name': 'output.mp3', 'file_size': 1014804}}
```
{% endcode %}

</details>

Listen to the track we generated:

{% embed url="https://drive.google.com/file/d/1itPTKlfuOLCtgw7SycISdPLj6gTftp1t/view" fullWidth="false" %}
