---
description: A glossary page with some important API terms explained.
icon: book-open
---

# Concepts

## API

API stands for _Application Programming Interface_. In the context of AI/ML, an API serves as a "handle" that enables you to integrate and utilize any Machine Learning model within your application. Our API supports communication via HTTP requests and is fully backward-compatible with OpenAI’s API. This means you can refer to OpenAI’s documentation for making calls to our API. However, be sure to change the base URL to direct your requests to our servers and select the desired model from our offerings.

## API Key

An _API Key_ is a credential that grants you access to our API from within your code. It is a sensitive string of characters that should be kept confidential. Do not share your API key with anyone else, as it could be misused without your knowledge.

You can find your API key on the [account page](https://aimlapi.com/app/keys).&#x20;

## Base URL

The Base URL is the first part of the URL (including the protocol, domain, and pathname) that determines the server responsible for handling your request. It’s crucial to configure the correct Base URL in your application, especially if you are using SDKs from OpenAI, Azure, or other providers. By default, these SDKs are set to point to their servers, which are not compatible with our API keys and do not support many of the models we offer.

Our base URL also supports versioning, so you can use the following as well:

* `https://api.aimlapi.com`
* `https://api.aimlapi.com/v1`

Usually, you pass the base URL as the same field inside the SDK constructor. In some cases, you can set the environment variable `BASE_URL`, and it will work. If you want to use the OpenAI SDK, then follow the [setting up article](../quickstart/setting-up.md) and take a closer look at how to use it with the AI/ML API.

## Base64

Base64 is a way to encode binary data, such as files or images, into text format, making it safe to include in places like URLs or JSON requests.

In the context of working with AI models, this means that if a model expects a parameter like `file_data` or `image_url`, you can encode your local file or image as a Base64 string, pass it as the value for that parameter, and in most cases, the model will successfully receive and process your file. You’ll need to import the `base64` library to handle file encoding. Below is a code example showing a real model call.

<details>

<summary>Code Example (Python): Providing an Image as a Base64 String</summary>

We'll send an image file from the local disk to the chat model by passing it through the `image_url` parameter as a Base64-encoded string. Our prompt will ask [**gpt-4o**](../api-references/text-models-llm/OpenAI/gpt-4o.md) chat model to describe the contents of the image with the question: `"What's in this image?"`

<figure><img src="../.gitbook/assets/racoons_0.png" alt=""><figcaption></figcaption></figure>

<pre class="language-python" data-overflow="wrap"><code class="lang-python">from openai import OpenAI
from pathlib import Path
import base64

# loading the picture
file_path = Path("C:/Users/user/Documents/example/images/racoons_0.png")

# Read and encode the image in base64
with open(file_path, "rb") as image_file:
    base64_image = base64.b64encode(image_file.read()).decode("utf-8")

# Create a data URL for the base64 image
image_data_url = f"data:image/png;base64,{base64_image}"

# Define an OpenAI client to call the model via OpepAI SDK
base_url = "https://api.aimlapi.com/"
api_key = "&#x3C;YOUR_AIMLAPI_KEY>"

client = OpenAI(api_key=api_key, base_url=base_url)

<strong># Send the image as Base64 to GPT-4o chat model
</strong>completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": "What’s in this image?"},
            {
                "role": "user", "content":[ 
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_data_url
                         }
                    }
                ]
            }

        ],
    )

response = completion.choices[0].message.content
print(response)
</code></pre>

**Response**:

{% code overflow="wrap" %}
```
The image depicts an illustrated raccoon by a stream, reaching into the water with its paw. The setting is natural, with rocks and greenery surrounding the stream.
```
{% endcode %}

</details>

<details>

<summary>Code Example (Python): Providing a PDF file as a Base64 String</summary>

We'll pass a local [PDF file](https://drive.google.com/file/d/1Lktn3GHw9zyfY7vhZqzQRa6kYCpgViI3/view?usp=sharing) to the chat model via the `file_data` parameter, encoding it as a Base64 string. The prompt will ask [**gpt-4o**](../api-references/text-models-llm/OpenAI/gpt-4o.md) chat model to extract and list all headers, one per line.

{% code overflow="wrap" %}
```python
import base64
from openai import OpenAI


aimlapi_key = "<YOUR_AIMLAPI_KEY>"

client = OpenAI(
    base_url = "https://api.aimlapi.com",
    api_key = aimlapi_key, 
)

def main():
    
    # Put your filename here. The file must be in the same folder as your Python script.
    your_file_name = "headers-example.pdf"

    with open(your_file_name, "rb") as f:
        data = f.read()

    # We encode the entire file into a single string to send it to the model
    base64_string = base64.b64encode(data).decode("utf-8")

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        # Sending our file to the model
                        "type": "file",
                        "file": {
                            "filename": your_file_name,
                            "file_data": f"data:application/pdf;base64,{base64_string}",
                        }
                    },
                    {
                        # Providing the model with instructions on how to process the uploaded file 
                        "type": "text",
                        "text": "Extract all the headers from this file, placing each on a new line",
                    },
                ],
            },
        ]
    )
    print(response.choices[0].message.content)

     

if __name__ == "__main__":
    main()
```
{% endcode %}

**Response**:

{% code overflow="wrap" %}
```
The Renaissance Era  
A New Dawn of Thought  
The Masters of Art  
Scientific Breakthroughs  
Legacy and Influence
```
{% endcode %}

</details>

## Deprecation

Deprecation is the process where a provider marks a model, parameter, or feature as outdated and no longer recommended for use. Deprecated items may remain available for some time but are likely to be removed or unsupported in the future.

Deprecation can apply to an entire model (see [our list of deprecated/no longer supported models](../api-references/model-database.md#deprecated-no-longer-supported-models)) or to individual parameters. For example, in a recent update to the video model [**v1.6-pro/image-to-video**](../api-references/video-models/Kling-AI/v1.6-pro-image-to-video.md) by Kling AI, the `aspect_ratio` parameter was deprecated: the model now automatically determines the aspect ratio based on the properties of the provided reference image, and explicit `aspect_ratio` input is no longer required.

Users are encouraged to monitor deprecation notices carefully and update their integrations accordingly. We notify our users about such changes in our email newsletters.

## Endpoint&#x20;

A specific URL where an API can be accessed to perform an operation (e.g., generate a response, upload a file).

## **Fine-tuned model**

A fine-tuned model is a base AI model that has been further trained on additional, specific data to specialize it for certain tasks or behaviors.

For example, an "[_11B Llama 3.2_](../api-references/moderation-safety-models/Meta/Llama-Guard-3-11B-Vision-Turbo.md) _model fine-tuned for content safety_" means that the original Llama 3.2 model (with 11 billion parameters) has received extra training using datasets focused on safe and appropriate content generation.

## Multimodal Model&#x20;

A model that can process and generate different types of data (text, images, audio) in a single interaction.

## Prompt&#x20;

The input given to a model to generate a response.&#x20;

The parameter used to pass a prompt is most often called simply `prompt`:

<details>

<summary>Some Python code</summary>

{% code overflow="wrap" %}
```python
json={
    "prompt": "slightly dim banner with abstract lines, base colors are coral, yellow and magenta",  # a prompt used for image generation
    "model": "flux/schnell",
    "image_size": {
        "width": 1536,
        "height": 640
} 
```
{% endcode %}

</details>

But there can be other variations. For example, the **messages** structure used in chat models passes the prompt within the **content** subfield. Depending on the value of the `role` parameter value, this prompt will be interpreted either as a user message (**role: user**) or as a model instruction (**role: system** or **role: assistant**).

<details>

<summary>Some Python code</summary>

{% code overflow="wrap" %}
```python
"messages":[
    {
        "role":"system",
        "content":"you are a helpful assistant",#this prompt is an instruction
        "name":"text"
    },
    {
        "role":"user",
        "content":"Why is the ocean salty?" #this prompt is a user question
    }
],
```
{% endcode %}

</details>

There are also special parameters that allow you to refine prompts, control how strongly the model should follow them, or adjust the strictness of their interpretation.

* `prompt_optimizer` or `enhance_prompt`: The model will automatically optimize the incoming prompt to improve the video generation quality if necessary. For more precise control, this parameter can be set to `False`, and the model will follow the instructions more strictly.&#x20;
* `negative_prompt`: The description of elements to avoid in the generated video/image/etc.
* `cfg_scale` or `guidance_scale`: The Classifier Free Guidance (CFG) scale is a measure of how close you want the model to stick to your prompt.
* `strength`: Determines how much the prompt influences the generated image.

Which of these parameters are supported by a specific model can be found in the API Schema section on that model's page.

## Terminal

If you are not a developer or are using modern systems, you might be familiar with it only as a "black window for hackers." However, the terminal is a very old and useful way to communicate with a computer. The terminal is an app inside your operating system that allows you to run commands by typing strings associated with some program. Depending on the operating system, you can run the terminal in many ways. Here are basic ways that usually work:

* **On Windows:** Press the combination <kbd>`Win + R`</kbd> and type `cmd`.
* **On Mac:** Press <kbd>`Command + Space`</kbd>, search for _Terminal_, then hit <kbd>`Enter`</kbd>.
* **On Linux:** You are probably already familiar with it. On Ubuntu with GUI, for example, you can type <kbd>`Ctrl + F`</kbd>, search for _Terminal_, then hit <kbd>`Enter`</kbd>.

## Token

A chunk of text (word, part of a word, or symbol) that text models use for processing inputs and outputs. The cost of using a text model is calculated based on the number of tokens processed. Both the text documents you send and the conversation history (in the case of interacting with an [Assistant](../solutions/openai/assistants/)) are tokenized (split into tokens) and included in the cost calculation.

You can limit the model’s output using the `max_completion_tokens` parameter (the fully equivalent deprecated `max_tokens` parameter is still supported for now).
