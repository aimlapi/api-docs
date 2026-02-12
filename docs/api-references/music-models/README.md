---
description: Overview of the capabilities of AIML API audio / music models.
icon: guitar
---

# Music Models

## Overview

Our API features the capability to generate audio. With this API, you can create your own music, speech, and any audio experience from your prompt and imagination.

We support multiple music models. You can find the [complete list](./#all-available-music-models) along with API reference links at the end of the page.

## Quick Code Example

Here is an example of generation an audio file based on a sample and a prompt using the music model [**minimax-music**](MiniMax/minimax-music-\[legacy].md) from MiniMax.

<details>

<summary>Full example explanation</summary>

As an example, we will generate a song using the popular **minimax-music** model from the Chinese company MiniMax. As you can verify in its [**API Reference**](https://docs.aimlapi.com/api-overview/audio-models-music-and-vocal/minimax-music-legacy), this model accepts an audio sample as input—extracting information about its vocals and instruments for use in the generation process—along with a text prompt where we can provide lyrics for our song.

We used a publicly available sample from royalty-free sample database and generated some lyrics in [Chat GPT](https://docs.aimlapi.com/api-overview/text-models-llm/chat-completion):

_Side by side, through thick and thin,_\
\&#xNAN;_With a laugh, we always win._\
\&#xNAN;_Storms may come, but we stay true,_\
\&#xNAN;_Friends forever—me and you!_

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

## All Available Music Models

<table data-full-width="true"><thead><tr><th width="266.20001220703125">Model ID</th><th width="134.4000244140625">Developer</th><th width="102.60009765625">Context</th><th>Model Card</th></tr></thead><tbody><tr><td><a href="elevenlabs/eleven_music.md">elevenlabs/eleven_music</a></td><td>ElevenLabs</td><td></td><td><a href="https://aimlapi.com/models/elevenmusic">Eleven Music</a></td></tr><tr><td><a href="google/lyria-2.md">google/lyria2</a></td><td>Google</td><td></td><td><a href="https://aimlapi.com/models/lyria-2">Lyria 2</a></td></tr><tr><td><a href="Stability-AI/stable-audio.md">stable-audio</a></td><td>Stability AI</td><td></td><td><a href="https://aimlapi.com/models/stable-audio">Stable Audio</a></td></tr><tr><td><a href="MiniMax/minimax-music-[legacy].md">minimax-music</a></td><td>Minimax AI</td><td></td><td>-</td></tr><tr><td><a href="MiniMax/music-01.md">music-01</a></td><td>Minimax AI</td><td></td><td><a href="https://aimlapi.com/models/minimax-music-api">MiniMax Music</a></td></tr><tr><td><a href="minimax/music-1.5.md">minimax/music-1.5</a></td><td>Minimax AI</td><td></td><td><a href="https://aimlapi.com/models/minimax-music-1-5">MiniMax Music 1.5</a></td></tr><tr><td><a href="minimax/music-2.0.md">minimax/music-2.0</a></td><td>Minimax AI</td><td></td><td><a href="https://aimlapi.com/models/minimax-music-2-0">MiniMax Music 2.0</a></td></tr></tbody></table>
