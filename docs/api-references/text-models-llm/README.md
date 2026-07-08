---
description: Overview of the capabilities of AIML API text models (LLMs).
icon: text-size
layout:
  width: wide
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Text Models (LLM)

<details>

<summary>Specific Capabilities</summary>

There are several capabilities of text models that are worth mentioning separately.

**Completion** allows the model to analyze a given text fragment and predict how it might continue based on the probabilities of the next possible tokens or characters. **Chat Completion** extends this functionality, enabling a simulated dialogue between the user and the model based on predefined roles (e.g., "strict language teacher" and "student"). A detailed description and examples can be found in our [Completion and Chat Completion](../../capabilities/completion-or-chat-models.md) article.

***

An evolution of chat completion includes **Assistants** (preconfigured conversational agents with specific roles) and **Threads** (a mechanism for maintaining conversation history for context). Examples of this functionality can be found in the [Managing Assistants & Threads](../../solutions/openai/assistants/) article.

***

**Function Calling** allows a chat model to invoke external programmatic tools (e.g., a function you have written) while generating a response. A detailed description and examples are available in the [Function Calling](../../capabilities/function-calling.md) article.

</details>

<details>

<summary>Endpoint</summary>

All text and chat models use the same endpoint:

<img src="/broken/files/j1sGKuO2wS5fYyQZ5SGg" alt="" data-size="line"> `https://api.aimlapi.com/v1/chat/completions`

The parameters may vary (especially for models from different developers), so it’s best to check the API schema on each model’s page for details.

</details>

<details>

<summary>Quick Code Example</summary>

We will call the [**gpt-4o**](OpenAI/gpt-4o.md) model using the Python programming language and the OpenAI SDK.

{% hint style="info" %}
If you need a more detailed explanation of how to call a model's API in code, check out our [<mark style="color:blue;">QUICKSTART</mark>](https://github.com/aimlapi/api-docs/blob/main/docs/api-references/text-models-llm/broken-reference/README.md) section.
{% endhint %}

{% code overflow="wrap" %}
```python
%pip install openai
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aimlapi.com/v1",

    # Insert your AIML API Key in the quotation marks instead of <YOUR_AIMLAPI_KEY>:
    api_key="<YOUR_AIMLAPI_KEY>",  
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
```http
Assistant: The sky appears blue due to a phenomenon called Rayleigh scattering. When sunlight enters Earth's atmosphere, it collides with gas molecules and small particles. Sunlight is made up of different colors, each with different wavelengths. Blue light has a shorter wavelength and is scattered in all directions by the gas molecules in the atmosphere more than other colors with longer wavelengths, such as red or yellow.
As a result, when you look up at the sky during the day, you see this scattered blue light being dispersed in all directions, making the sky appear blue to our eyes. During sunrise and sunset, the sun's light passes through a greater thickness of Earth's atmosphere, scattering the shorter blue wavelengths out of your line of sight and leaving the longer wavelengths, like red and orange, more dominant, which is why the sky often turns those colors at those times.
```
{% endcode %}

</details>
