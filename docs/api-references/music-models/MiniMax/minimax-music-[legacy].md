# minimax-music \[legacy]

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `minimax-music`
{% endhint %}

## Model Overview

An advanced AI model that generates diverse high-quality audio compositions by analyzing and reproducing musical patterns, rhythms, and vocal styles from the reference track. Refine the process using a text prompt.

## How to Make a Call

{% stepper %}
{% step %}
### Setup You Can’t Skip&#x20;

:black\_small\_square:  [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square:  [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.
{% endstep %}

{% step %}
### Copy the code example

At the bottom of this page, you'll find [a code example](minimax-music-\[legacy].md#quick-code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

{% hint style="success" %}
Generating an audio sample using this model involves sequentially calling two endpoints:&#x20;

* The first one is for creating and sending a music generation task to the server (returns a generation ID).
* The second one is for requesting the generated audio sample from the server using the generation ID received from the first endpoint.&#x20;

The code example combines both endpoint calls.
{% endhint %}
{% endstep %}

{% step %}
### Modify the code example

:black\_small\_square:  Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square:  Provide your lyrics via the `prompt` parameter. The model will use it to generate a song.&#x20;

{% hint style="warning" %}
Keep in mind that the maximum length of generated audio is 1 minute. If you provide a `prompt` that’s too long (which the model tries to use as song lyrics), it might exceed the time limit and result in a `"Downstream service error."`
{% endhint %}

:black\_small\_square:  Via `reference_audio_url` parameter, provide a URL to a reference track from which the model will extract the genre, style, tempo, vocal and instrument timbres, and the overall mood of the piece.
{% endstep %}

{% step %}
### Run your modified code

Run your modified code in your development environment. Response time depends on various factors, but it rarely exceeds 40 seconds.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

## API Schemas

### Generate a music sample

This endpoint creates and sends a music generation task to the server — and returns a generation ID and the task status.

{% openapi src="minimax-music-[legacy].json" path="/v2/generate/audio" method="post" %}
[minimax-music-\[legacy\].json](minimax-music-[legacy].json)
{% endopenapi %}

### Retrieve the generated music sample from the server <a href="#retrieve-the-generated-video-from-the-server" id="retrieve-the-generated-video-from-the-server"></a>

After sending a request for music generation, this task is added to the queue. Based on the service's load, the generation can be completed in 30-40 seconds or take a bit more.

{% openapi src="minimax-music-[legacy]-pair.json" path="/v2/generate/audio" method="get" %}
[minimax-music-\[legacy\]-pair.json](minimax-music-[legacy]-pair.json)
{% endopenapi %}

## Quick Code Example

Here is an example of generation an audio file based on a sample and a prompt using the music model **minimax-music**.

<details>

<summary>Full example explanation</summary>

As an example, we will generate a song using the popular **minimax-music** model from the Chinese company MiniMax. As you can verify in its [**API Reference**](https://docs.aimlapi.com/api-overview/audio-models-music-and-vocal/minimax-music-legacy), this model accepts an audio sample as input—extracting information about its vocals and instruments for use in the generation process—along with a text prompt where we can provide lyrics for our song.

We used a publicly available sample from royalty-free sample database and generated some lyrics in [Chat GPT](https://docs.aimlapi.com/api-overview/text-models-llm/chat-completion):

_Side by side, through thick and thin,_\
&#xNAN;_&#x57;ith a laugh, we always win._\
&#xNAN;_&#x53;torms may come, but we stay true,_\
&#xNAN;_&#x46;riends forever—me and you!_

To turn this into a model-friendly prompt (as a single string), we added hash symbols and line breaks.

<mark style="background-color:blue;">'''</mark>\ <mark style="background-color:blue;">##Side by side, through thick and thin, \n\nWith a laugh, we always win. \n\n Storms may come, but we stay true, \n\nFriends forever—me and you!##</mark>\ <mark style="background-color:blue;">'''</mark>

A notable feature of **minimax-music** model is that sample uploading/voice analysis + music generation and retrieving the final audio file from the server are done through separate API calls. _(AIML API tokens are only consumed during the first step—i.e., the actual music generation.)_

You can insert the contents of each of the two code blocks into a separate Python file in your preferred development environment (or, for example, place each part in a separate cell in **Jupyter Notebook**). Replace `<YOUR_API_KEY>` in both fragments with the **AIML API Key** obtained from your [account](https://aimlapi.com/app/keys).

Next, run the first code block. If everything is set up correctly, you will see the following line in the program output (the specific numbers, of course, will vary):

{% code overflow="wrap" %}
```javascript
Generation: {'id': '906aec79-b0af-40c4-adae-15e6c4410e29:minimax-music', 'status': 'queued'}
```
{% endcode %}

This indicates that the file upload and our generation has been queued on the server (which took 4.5 seconds in our case).

Now, copy this `id` value (_without_ quotation marks) and insert it into the second code block, replacing `<GENERATION_ID>`. Now, we can execute the second code block to get our song from the server.

Processing the request on the server may take some time (usually less than a minute). If the requested file is not yet ready, the output will display the corresponding status. Try waiting a bit and rerun the second code block. _(If you're comfortable with coding, you can modify the script to perform this request inside a loop.)_

In our case, after three reruns of the second code block (waiting a total of about 20 seconds), we saw the following output:

{% code overflow="wrap" %}
```javascript
Generation: {'id': '906aec79-b0af-40c4-adae-15e6c4410e29:minimax-music', 'status': 'completed', 'audio_file': {'url': 'https://cdn.aimlapi.com/squirrel/files/koala/Oa2XHFE1hEsUn1qbcAL2s_output.mp3', 'content_type': 'audio/mpeg', 'file_name': 'output.mp3', 'file_size': 1014804}}
```
{% endcode %}

As you can see, the `'status'` is now `'completed'`, and further in the output line, we have a URL where the generated audio file can be downloaded.

Listen to the track we generated below the code blocks.

</details>

The first code block (sample uploading and music generation):

{% code overflow="wrap" %}
```python
# 1st code block
import requests


def main():
    url = "https://api.aimlapi.com/v2/generate/audio"
    payload = {
        "model": "minimax-music",
        "reference_audio_url": 'https://tand-dev.github.io/audio-hosting/spinning-head-271171.mp3',
        "prompt": '''
##Side by side, through thick and thin, \n\nWith a laugh, we always win. \n\n Storms may come, but we stay true, \n\nFriends forever—me and you!##
''',   
    }
    # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    headers = {"Authorization": "Bearer <YOUR_AIMLAPI_KEY>", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers)
    print("Generation:", response.json())


if __name__ == "__main__":
    main()

```
{% endcode %}

The second code block (retrieving the generated audio file from the server):

<pre class="language-python" data-overflow="wrap"><code class="lang-python"><strong># 2nd code block
</strong>import requests


def main():
    url = "https://api.aimlapi.com/v2/generate/audio"
    params = {
        # Insert the id from the output of the 1st code block, instead of &#x3C;GENERATION_ID>:
        "generation_id": "&#x3C;GENERATION_ID>",
    }
    # Insert your AIML API Key instead of &#x3C;YOUR_AIMLAPI_KEY>:
    headers = {"Authorization": "Bearer &#x3C;YOUR_AIMLAPI_KEY>", "Content-Type": "application/json"}

    response = requests.get(url, params=params, headers=headers)
    print("Generation:", response.json())

if __name__ == "__main__":
    main()

</code></pre>

Listen to the track we generated:

{% embed url="https://drive.google.com/file/d/1itPTKlfuOLCtgw7SycISdPLj6gTftp1t/view" fullWidth="false" %}
