---
icon: text-size
description: Overview of the capabilities of AIML API text models (LLMs).
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

# Text Models (LLM)

## Overview

The AI/ML API provides access to text-based models, also known as Large Language Models (LLMs), and allows you to interact with them through natural language. These models can be applied to various tasks, enabling the creation of diverse applications using our API.

For example, text models can be used to:

* Create a system that searches your photos using text prompts.
* Act as a psychological supporter.
* Play games with you through natural language.
* Assist you with coding.
* Perform a security assessment (pentests) on servers for vulnerabilities.
* Write documentation for your services.
* Serve as a grammar corrector for multiple languages with deep context understanding.
* And much more.

We support numerous Large Language Models. You can view the complete list of models in [our database](https://docs.aimlapi.com/api-overview/model-database/text-models).

## Quick Code Example

We will call the **gpt-4o** model using the Python programming language and the OpenAI SDK.

{% hint style="info" %}
If you need a more detailed explanation of how to call a model's API in code, check out our [<mark style="color:blue;">QUICKSTART</mark>](https://docs.aimlapi.com/quickstart/setting-up) section.
{% endhint %}

{% code overflow="wrap" %}
```python
%pip install openai
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aimlapi.com/v1",

    # Insert your AIML API Key in the quotation marks instead of <YOUR_API_KEY>.
    api_key="<YOUR_API_KEY>",  
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "system",
            "content": "You are an AI assistant who knows everything.",
        },
        {
            "role": "user",
            "content": "Tell me, why is the sky blue?"
        },
    ],
)

message = response.choices[0].message.content

print(f"Assistant: {message}")
```
{% endcode %}

By running this code example, we received the following response from the chat model:

{% code overflow="wrap" %}
```
Assistant: The sky appears blue due to a phenomenon called Rayleigh scattering. When sunlight enters Earth's atmosphere, it collides with gas molecules and small particles. Sunlight is made up of different colors, each with different wavelengths. Blue light has a shorter wavelength and is scattered in all directions by the gas molecules in the atmosphere more than other colors with longer wavelengths, such as red or yellow.
As a result, when you look up at the sky during the day, you see this scattered blue light being dispersed in all directions, making the sky appear blue to our eyes. During sunrise and sunset, the sun's light passes through a greater thickness of Earth's atmosphere, scattering the shorter blue wavelengths out of your line of sight and leaving the longer wavelengths, like red and orange, more dominant, which is why the sky often turns those colors at those times.
```
{% endcode %}

## Next Steps

* [Learn what a _completion_ is and understand why modern models are often referred to as _chat models_.](completion-or-chat-models.md)