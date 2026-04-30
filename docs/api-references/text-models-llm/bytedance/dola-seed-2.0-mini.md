# Dola Seed 2.0 Mini

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `bytedance/dola-seed-2-0-mini`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/dola-seed-2-0-mini" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A fast and cost-efficient multimodal model for lightweight tasks.\
Supports text, image, and video inputs with reasoning and agent workflows, handling up to \~256K context.

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

**1️⃣ Required setup (don’t skip this)**\
▪ **Create an account:** Sign up on the AI/ML API website (if you don’t have one yet).\
▪ **Generate an API key:** In your account dashboard, create an API key and make sure it’s **enabled** in the UI.

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

{% openapi-operation spec="dola-seed-2-0-mini" path="/v1/chat/completions" method="post" %}
[OpenAPI dola-seed-2-0-mini](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/ByteDance/dola-seed-2-0-mini.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
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
        "model":"bytedance/dola-seed-2-0-mini",
        "messages":[
            {
                "role":"user",
                "content":"Hi! What do you think about mankind?" # insert your prompt
            }
        ]
    }
)

data = response.json()
print(json.dumps(data, indent=2, ensure_ascii=False))
```
{% endtab %}

{% tab title="JavaScript" %}
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
      model: 'bytedance/dola-seed-2-0-mini',
      messages:[
          {
              role:'user',
              content: 'Hi! What do you think about mankind?' // insert your prompt here
          }
      ],
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();
```
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

```json5
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": "Mankind is a complex and multifaceted species, and it's difficult to sum up our entire existence in a single statement. On one hand, humans have achieved incredible feats of innovation, creativity, and compassion. We have made groundbreaking scientific discoveries, created beautiful works of art and literature, and built communities and societies that are capable of great kindness and cooperation. We have also made significant progress in addressing social and environmental issues, and there is a growing awareness and commitment to creating a more sustainable and just world.\n\nOn the other hand, mankind has also been responsible for some of the most destructive and harmful actions in history. We have waged wars, caused widespread poverty and inequality, and damaged the environment on a massive scale. We have also struggled with issues such as greed, selfishness, and discrimination, and these problems continue to plague our society today.\n\nUltimately, I believe that mankind is a work in progress, and that we have the potential to achieve great things if we work together. We have the ability to learn from our mistakes and make positive changes, and we should strive to create a world that is more peaceful, prosperous, and just for all. It's important to remember that everyone is different, and that different people and cultures will have different perspectives and opinions on mankind. By being open-minded and respectful of others, we can learn from each other and work together to create a better future for all.",
        "reasoning_content": "Let's think about this. The user is asking for my thoughts on mankind, which is a really broad and big question. First off, I need to make sure I approach it in a balanced way. I can't just focus on the good or the bad; I have to cover both sides.\n\nStarting with the positive aspects. Humans are really good at creating and innovating. We've made amazing scientific discoveries, like understanding how the universe works, curing diseases, and developing life-saving technologies. Art and culture are also huge parts of who we are. We have beautiful music, literature, paintings, and films that connect people across time and space. And then there's our ability to show kindness and compassion. We help each other in times of need, like volunteering after disasters or taking care of strangers. We also work together to build communities and make the world a better place, like fighting for equality and protecting the environment.\n\nBut we can't ignore the negative stuff either. Mankind has done some really bad things. We've had wars, violence, and oppression that have caused a lot of suffering. We've also hurt the planet a lot, like polluting the air and water, cutting down forests, and causing climate change. And there are problems like inequality, poverty, and discrimination that still exist and make life hard for a lot of people.\n\nI also need to remember that everyone is different. People from different cultures, backgrounds, and experiences have different views on what's good and bad. So I should avoid making generalizations that might be unfair or wrong.\n\nFinally, the most important thing is to stay positive. Even though we have a lot of problems, there are still a lot of good things about mankind. We have the ability to learn, grow, and change for the better. And we're working hard to fix the things we've broken. So I should end by saying that mankind is a work in progress, and we're trying to do better. That way, the user gets a balanced and hopeful answer.",
        "role": "assistant"
      }
    }
  ],
  "created": 1777553794,
  "id": "02177755378863915b33ccaa151d3ed7feaaa761bc71c37dac1af",
  "model": "seed-2-0-mini-260215",
  "service_tier": "default",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 697,
    "prompt_tokens": 57,
    "total_tokens": 754,
    "prompt_tokens_details": {
      "cached_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 412
    }
  },
  "meta": {
    "usage": {
      "credits_used": 741,
      "usd_spent": 0.0003705
    }
  }
}
```

</details>
