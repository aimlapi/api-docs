# Google OCR

{% hint style="info" %}
When calling the API described on this page, the ID of a specific model is not provided. The request is made solely by specifying the correct method URL and valid parameters.
{% endhint %}

## Model Overview

This API provides a feature to extract characters from images.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

1. Copy the code from the example below.
2. Replace `<YOUR_AIMLAPI_KEY>` with your AIML API key from [your personal account](https://aimlapi.com/app/keys).
3. Replace the URL of the image with the one you need.
4. If you need to use different parameters, refer to the API schema below for valid values and operational logic.
5. Save the modified code as a Python file and run it in an IDE[^1] or via the console.

## API Schema

{% openapi src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/v1/ocr" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endopenapi %}

[^1]: An integrated development environment (IDE) is a software application that helps programmers write, test, and debug software code efficiently.
