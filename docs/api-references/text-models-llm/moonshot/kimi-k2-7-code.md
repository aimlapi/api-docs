# kimi-k2-7-code

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `moonshot/kimi-k2-7-code`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/moonshot/kimi-k2-7-code" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

An agentic coding model from Moonshot AI, purpose-built for long-horizon software engineering tasks, code generation, and multi-step tool use. Kimi K2.7 Code features extended reasoning capabilities and a 262K-token context window, enabling it to tackle complex codebases and orchestrate sophisticated development workflows.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

**1️⃣ Required setup (don't skip this)**\
▪ **Create an account:** Sign up on the AI/ML API website (if you don't have one yet).\
▪ **Generate an API key:** In your account dashboard, create an API key and make sure it's **enabled** in the UI.

**2️ Copy the code example**\
At the bottom of this page, pick the snippet for your preferred programming language (Python / Node.js) and copy it into your project.

**3️ Update the snippet for your use case**\
▪ **Insert your API key:** replace `<YOUR_AIMLAPI_KEY>` with your real AI/ML API key.\
▪ **Select a model:** set the `model` field to the model you want to call.\
▪ **Provide input:** fill in the request input field(s) shown in the example (for example, `messages` for chat/LLM models, or other inputs for image/video/audio models).

**4️ (Optional) Tune the request**\
Depending on the model type, you can add optional parameters to control the output (e.g., generation settings, quality, length, etc.). See the API schema below for the full list.

**5️ Run your code**\
Run the updated code in your development environment. Response time depends on the model and request size, but simple requests typically return quickly.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](/broken/pages/ngeSCZKxiGVWqYZTHDjY).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="kimi-k2-7-code" path="/v1/chat/completions" method="post" %}
[OpenAPI kimi-k2-7-code](https://raw.githubusercontent.com/aimlapi/api-docs/dd740a8d15f1033c870e5d35bfc59cf4a2d120ee/docs/api-references/text-models-llm/Moonshot/kimi-k2-7-code.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation 

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type":"application/json"
    },
    json={
        "model":"moonshot/kimi-k2-7-code",
        "messages":[
            {
                "role":"user",
                "content":"Write a Python function that implements binary search on a sorted list." # insert your prompt
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      // insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'moonshot/kimi-k2-7-code',
      messages:[
          {
              role:'user',
              content: 'Write a Python function that implements binary search on a sorted list.' // insert your prompt here
          }
      ],
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "id": "chatcmpl-a1b2c3d4e5f6a7b8c9d0e1f2",
  "object": "chat.completion",
  "created": 1749724800,
  "model": "moonshot/kimi-k2-7-code",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Here's a Python implementation of binary search on a sorted list:\n\n```python\ndef binary_search(arr: list, target) -> int:\n    \"\"\"\n    Search for target in a sorted list using binary search.\n    Returns the index of target if found, or -1 if not present.\n    \"\"\"\n    left, right = 0, len(arr) - 1\n\n    while left <= right:\n        mid = left + (right - left) // 2  # avoids overflow vs (left+right)//2\n\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n\n    return -1\n```\n\n**How it works:**\n1. Start with the full range `[left, right]`.\n2. At each step, inspect the middle element.\n3. If it equals the target, return its index.\n4. If it's less than the target, discard the left half — narrow the search to `[mid+1, right]`.\n5. If it's greater, discard the right half — narrow to `[left, mid-1]`.\n6. If the range becomes empty (`left > right`), the target is absent — return `-1`.\n\n**Time complexity:** O(log n)  \n**Space complexity:** O(1)\n\n**Example usage:**\n```python\nnums = [1, 3, 5, 7, 9, 11, 13]\nprint(binary_search(nums, 7))   # → 3\nprint(binary_search(nums, 6))   # → -1\n```",
        "reasoning_content": null
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 18,
    "completion_tokens": 312,
    "total_tokens": 330
  },
  "meta": {
    "usage": {
      "credits_used": 3300,
      "usd_spent": 0.00165
    }
  }
}
```
{% endcode %}

</details>
