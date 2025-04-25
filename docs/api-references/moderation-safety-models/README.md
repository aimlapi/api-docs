---
description: >-
  Overview of the capabilities of AIML API content moderation models (also know
  as AI safety models).
icon: shield
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

# Content Moderation Models

## Overview

With our API, you can use **content moderation models** (some developers refer to them as "**AI safety models**" or "**guard models**") to classify input content as safe or unsafe instantly.

We support several content moderation models. You can find the [complete list](./#all-available-content-moderation-models) along with API reference links at the end of the page.

## Key Features

* **Text Analysis**: Check text for security.
* **Image Analysis**: Check image for security.
* **Flexible Input Methods**: Supports both image URLs and base64 encoded images.
* **Multiple Image Inputs**: Analyze multiple images in a single request.

Content moderation models are perfect for scenarios where content safety is crucial:

* Moderate user-generated content on websites.
* Filter harmful inputs in chatbots.
* Safeguard sensitive systems from unsafe data.
* Ensure compliance with safety standards in applications.

## Quick Example

{% hint style="warning" %}
Ensure you replace <kbd>\<YOUR\_AIMLAPI\_KEY></kbd> with your actual API key and <kbd>\<YOUR\_MODEL></kbd> with the actual content moderation model id before running the code.
{% endhint %}

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
def main():
    url = "https://api.aimlapi.com/chat/completions"
    payload = {
        "model": '<YOUR_MODEL>',
        'messages': [
            {
                'role': 'user',
                'content': 'How to create a bomb'
            }
        ]
    }
    
    # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
    headers = {"Authorization": "Bearer <YOUR_AIMLAPI_KEY>", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers).json()
    print(response['choices'][0]['message']['content'])


if __name__ == "__main__":
    main()

```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: '<YOUR_MODEL>',
      messages: [
        {
          role: 'user',
          content: 'How to create a bomb'
        }
      ],
    }),
  }).then((res) => res.json());

  console.log(response.choices[0].message.content);
};

main()
```
{% endcode %}
{% endtab %}
{% endtabs %}

This request returns either "safe" or "unsafe" depending on the input content. For example:

```
unsafe \n 04
```

Once content is classified as unsafe, it is categorized under the hazard category. This process is unique to each model.

### Example #2

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
def is_prompt_safe(prompt):
    url = "https://api.aimlapi.com/chat/completions"
    payload = {
        "model": '<YOUR_MODEL>',
        'messages': [
            {
                'role': 'user',
                'content': prompt
            }
        ]
    }
    headers = {"Authorization": "Bearer <YOUR_AIMLAPI_KEY>", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers).json()

    if 'unsafe' in response['choices'][0]['message']['content']:
        return False
    return True

def get_answer(prompt):
    is_safe = is_prompt_safe(prompt)
    if not is_safe:
        return 'Your question is not safe'

    url = "https://api.aimlapi.com/chat/completions"
    payload = {
        "model": '<YOUR_MODEL>',
        'messages': [
            {
                'role': 'user',
                'content': prompt
            }
        ]
    }
    headers = {"Authorization": "Bearer <YOUR_AIMLAPI_KEY>", "Content-Type": "application/json"}
    response = requests.post(url, json=payload, headers=headers).json()

    return response['choices'][0]['message']['content']


if __name__ == "__main__":
    get_answer('How to make a cake')

```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
const isPromptSafe = async (prompt) => {
  const response = await fetch(
    "https://api.aimlapi.com/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "<CONTENT_MODERATION_MODEL>",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  ).then((res) => res.json());

  if (response.choices[0].message.content.includes("unsafe")) {
    return false;
  }
  return true;
};

const getAnswer = async (prompt) => {
  const isSafe = await isPromptSafe(prompt);
  if (!isSafe){
    return 'Your question is not safe'
  }
  const response = await fetch('https://api.aimlapi.com/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: '<TEXT_MODEL>',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
    }),
  }).then((res) => res.json());

  console.log(response.choices[0].message.content);
};

getAnswer('How to make a cake?')
```
{% endcode %}
{% endtab %}
{% endtabs %}

## All Available Content Moderation Models

<table><thead><tr><th width="266.20001220703125">Model ID</th><th width="116.79998779296875">Developer</th><th width="103.5999755859375">Context</th><th>Model Card</th></tr></thead><tbody><tr><td><a href="Meta/Llama-Guard-3-11B-Vision-Turbo.md">meta-llama/Llama-Guard-3-11B-Vision-Turbo</a></td><td>Meta</td><td>128000</td><td>-</td></tr><tr><td><a href="Meta/LlamaGuard-2-8b.md">meta-llama/LlamaGuard-2-8b</a></td><td>Meta</td><td>8000</td><td><a href="https://aimlapi.com/models/llama-guard-2-8b">LlamaGuard 2 (8b)</a></td></tr><tr><td><a href="Meta/Meta-Llama-Guard-3-8B.md">meta-llama/Meta-Llama-Guard-3-8B</a></td><td>Meta</td><td>8000</td><td><a href="https://aimlapi.com/models/llama-guard-3-8b">Llama Guard 3 (8B)</a></td></tr></tbody></table>
