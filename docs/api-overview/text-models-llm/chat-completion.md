---
icon: code
---

# Chat Completion

### Create chat completion

{% hint style="info" %}
Please note that there is not just one, but several variations of this API described below, each with its own set of supported models and available parameters. You can explore these variations by selecting different options from the **object** dropdown menu and choose the one that suits you best.
{% endhint %}

{% swagger src="https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29" path="/v1/chat/completions" method="post" %}
[https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29](https://api.aimlapi.com/docs-public-yaml?key=2b878a3c71a785f13366e9be96bacb29)
{% endswagger %}

## Example of chat completion

We will call the **gpt-4o** model using the Python programming language and the OpenAI SDK.

{% code overflow="wrap" %}
```python
%pip install openai
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.aimlapi.com/v1",

    # Insert your AIML API Key in the quotation marks instead of <YOUR_API_KEY>:
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
            "content": "Why do the seasons change?"
        },
    ],
)

message = response.choices[0].message.content

print(f"Assistant: {message}")
```
{% endcode %}

