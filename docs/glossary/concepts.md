---
description: A glossary page with some important API terms explained.
icon: book-open
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Concepts

## API

API stands for _Application Programming Interface_. In the context of AI/ML, an API serves as a "handle" that enables you to integrate and utilize any Machine Learning model within your application. Our API supports communication via HTTP requests and is fully backward-compatible with OpenAI’s API. This means you can refer to OpenAI’s documentation for making calls to our API. However, be sure to change the base URL to direct your requests to our servers and select the desired model from our offerings.

## Base URL

The Base URL is the first part of the URL (including the protocol, domain, and pathname) that determines the server responsible for handling your request. It’s crucial to configure the correct Base URL in your application, especially if you are using SDKs from OpenAI, Azure, or other providers. By default, these SDKs are set to point to their servers, which are not compatible with our API keys and do not support many of the models we offer.

Our base URL also supports versioning, so you can use the following as well:

* `https://api.aimlapi.com`
* `https://api.aimlapi.com/v1`

Usually, you pass the base URL as the same field inside the SDK constructor. In some cases, you can set the environment variable `BASE_URL`, and it will work. If you want to use the OpenAI SDK, then follow the [setting up article ](../quickstart/setting-up.md)and take a closer look at how to use it with the AI/ML API.

## Base64

Base64 is a way to encode binary data, such as files or images, into text format, making it safe to include in places like URLs or JSON requests.

In the context of working with AI models, this means that if a model expects a parameter like `file_data` or `image_url`, you can encode your local file or image as a Base64 string, pass it as the value for that parameter, and in most cases, the model will successfully receive and process your file. You’ll need to import the `base64` library to handle file encoding. Below is a code example showing a real model call.

<details>

<summary>Code Example: Providing an Image as a Base64 String</summary>

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

<summary>Code Example: Providing a PDF file as a Base64 String</summary>

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

## API Key

You can find your API key on the [account page](https://aimlapi.com/app/keys). An _API Key_ is a credential that grants you access to our API from within your code. It is a sensitive string of characters that should be kept confidential. Do not share your API key with anyone else, as it could be misused without your knowledge.

## Terminal

If you are not a developer or are using modern systems, you might be familiar with it only as a "black window for hackers." However, the terminal is a very old and useful way to communicate with a computer. The terminal is an app inside your operating system that allows you to run commands by typing strings associated with some program. Depending on the operating system, you can run the terminal in many ways. Here are basic ways that usually work:

* **On Windows:** Press the combination <kbd>`Win + R`</kbd> and type `cmd`.
* **On Mac:** Press <kbd>`Command + Space`</kbd>, search for _Terminal_, then hit <kbd>`Enter`</kbd>.
* **On Linux:** You are probably already familiar with it. On Ubuntu with GUI, for example, you can type <kbd>`Ctrl + F`</kbd>, search for _Terminal_, then hit <kbd>`Enter`</kbd>.
