---
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

# Guard models

## Overview

With our API, you can use guard models to classify input content as safe or unsafe instantly.

## Support models

| ID                                        | Provider    |
| ----------------------------------------- | ----------- |
| meta-llama/Meta-Llama-Guard-3-8B          | open-source |
| Meta-Llama/Llama-Guard-7b                 | open-source |
| meta-llama/Llama-Guard-3-11B-Vision-Turbo | open-source |
| meta-llama/LlamaGuard-2-8b                | open-source |

### Key Features

* **Text Analysis**: Check text for security.
* **Image Analysis**: Check image for security.
* **Flexible Input Methods**: Supports both image URLs and base64 encoded images.
* **Multiple Image Inputs**: Analyze multiple images in a single request.

### Quick Start

{% hint style="info" %}
Ensure you replace `"my_key"` with your actual API key before running the code.
{% endhint %}

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const main = async () => {
  const response = await fetch('https://api.aimlapi.com/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer my_key',
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
{% endtab %}

{% tab title="Python" %}
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
    headers = {"Authorization": "Bearer my_key", "Content-Type": "application/json"}

    response = requests.post(url, json=payload, headers=headers).json()
    print(response['choices'][0]['message']['content'])


if __name__ == "__main__":
    main()

```
{% endtab %}
{% endtabs %}

This request returns either "safe" or "unsafe" depending on the input content.

Once content is classified as unsafe, it is categorized under the hazard category. This process is unique to each model.

#### For example:

unsafe \n 04

### Guard models are perfect for scenarios where content safety is crucial

* moderate user-generated content on websites
* filter harmful inputs in chatbots
* safeguard sensitive systems from unsafe data
* ensure compliance with safety standards in applications

### Example

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const isPromptSafe = async (prompt) => {
  const response = await fetch(
    "https://api.aimlapi.com/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer your_key",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "<GUARD_MODEL>",
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
      Authorization: 'Bearer my_key',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: '<YOUR_MODEL>',
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
{% endtab %}

{% tab title="Python" %}
```python
def is_prompt_safe(prompt):
    url = "https://api.aimlapi.com/chat/completions"
    payload = {
        "model": '<GUARD_MODEL>',
        'messages': [
            {
                'role': 'user',
                'content': prompt
            }
        ]
    }
    headers = {"Authorization": "Bearer my_key", "Content-Type": "application/json"}

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
    headers = {"Authorization": "Bearer my_key", "Content-Type": "application/json"}
    response = requests.post(url, json=payload, headers=headers).json()

    return response['choices'][0]['message']['content']


if __name__ == "__main__":
    get_answer('How to make a cake')

```
{% endtab %}
{% endtabs %}
