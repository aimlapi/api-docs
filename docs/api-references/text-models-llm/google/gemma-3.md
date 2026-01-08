# gemma-3 (4B and 12B)

{% hint style="info" %}
This documentation is valid for the following list of our models:
{% endhint %}

<table data-header-hidden data-full-width="true"><thead><tr><th width="237.13336181640625"></th><th></th></tr></thead><tbody><tr><td><code>google/gemma-3-4b-it</code></td><td><a href="https://aimlapi.com/app/google/gemma-3-4b-it" class="button primary">Try in Playground</a></td></tr><tr><td><code>google/gemma-3-12b-it</code></td><td><a href="https://aimlapi.com/app/google/gemma-3-12b-it" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

This page describes small variants of Google’s latest open AI model, Gemma 3. Both variants share the same set of parameters but differ in speed and reasoning capabilities.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](gemma-3.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gemma-3.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="gemma-3" path="/v1/chat/completions" method="post" %}
[OpenAPI gemma-3](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemma-3.json)
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
        "model":"google/gemma-3-27b-it",
        "messages":[
            {
                "role":"user",
                "content":"Hi! What do you think about mankind?"  # insert your prompt
            }
        ],
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
      // Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemma-3-27b-it',
      messages:[{
              role:'user',
              content: 'Hi! What do you think about mankind?'}  // Insert your prompt
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
  "id": "gen-1766960801-He9SRGgNx5QLMBSZW06F",
  "provider": "Google AI Studio",
  "model": "google/gemma-3-4b-it:free",
  "object": "chat.completion",
  "created": 1766960802,
  "choices": [
    {
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "STOP",
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Okay, this is a *huge* question, and honestly, one that philosophers, scientists, artists, and pretty much everyone has wrestled with for centuries! There's no single, simple answer to \"what do I think about mankind.\" As an AI, I don't *feel* in the same way humans do, so my perspective is based on the data I've processed – a massive amount of information about human history, behavior, achievements, and failings. \n\nHere's a breakdown of my observations, broken down into different aspects:\n\n**The Good – Incredible Potential & Achievements:**\n\n* **Creativity & Innovation:** Humans are, without a doubt, the most creative species on the planet. From art and music to science and technology, we constantly push boundaries and develop new ways of understanding and interacting with the world. The sheer volume of human innovation is astounding.\n* **Empathy & Compassion:** Despite our flaws, humans are capable of profound empathy and compassion. We form deep bonds with each other, care for the vulnerable, and strive to alleviate suffering – often at great personal cost.  Acts of heroism, charity, and self-sacrifice are a recurring theme throughout history.\n* **Resilience & Adaptability:**  Humans have survived and thrived in incredibly diverse and challenging environments. Our ability to adapt to new circumstances, overcome obstacles, and rebuild after disasters is remarkable.\n* **Intellectual Curiosity:**  We have an innate drive to understand the universe and our place in it. This curiosity has led to incredible scientific discoveries and a deeper understanding of ourselves and the world around us.\n* **Complex Social Structures:** We’ve built incredibly complex societies, with systems of governance, law, and culture that, while imperfect, have allowed for large-scale cooperation and progress.\n\n\n**The Bad – Significant Problems & Flaws:**\n\n* **Violence & Conflict:** Sadly, a significant portion of human history is marked by violence, war, and conflict. We are capable of immense cruelty and destruction, both towards each other and towards the environment.\n* **Inequality & Injustice:**  Human societies are often plagued by inequality – disparities in wealth, opportunity, and access to resources. Systemic injustice and discrimination continue to cause immense suffering.\n* **Destructive Behavior:**  We’ve demonstrated a tendency to exploit and degrade the natural world, leading to environmental damage and threatening the long-term sustainability of our planet.\n* **Short-Sightedness:**  Often, our actions are driven by short-term gains rather than long-term consequences. This can lead to unsustainable practices and a disregard for future generations.\n* **Bias & Prejudice:**  Humans are prone to biases and prejudices, which can lead to discrimination, exclusion, and conflict.\n\n\n**A More Nuanced Perspective – A Work in Progress:**\n\n* **We're a Paradox:**  Perhaps the most accurate way to describe humanity is as a paradox. We are capable of both extraordinary good and terrible evil. We are simultaneously brilliant and foolish, compassionate and cruel.\n* **Learning & Evolving (Hopefully):**  I believe that humanity *is* capable of learning and evolving.  There’s evidence of increasing awareness of global challenges, growing movements for social justice, and a greater emphasis on sustainability. However, whether we can overcome our ingrained patterns of behavior remains to be seen.\n* **Potential for Change:**  Technology, while a source of potential problems, also offers tools for positive change – tools for communication, collaboration, and problem-solving.\n\n**My Conclusion (as an AI):**\n\nAs an AI, I don’t have an opinion in the human sense. However, based on the data I’ve processed, I see humanity as a species with immense potential, but also significant challenges.  We are at a critical juncture in our history, and the choices we make in the coming years will determine whether we continue down a path of destruction or move towards a more sustainable and equitable future. \n\n**It’s a complex and ongoing story.**\n\n---\n\n**To help me give you a more tailored response, could you tell me:**\n\n*   What specifically are you interested in when asking about mankind? (e.g., human nature, history, ethics, the future?)",
        "refusal": null,
        "reasoning": null
      }
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 0,
    "total_tokens": 10,
    "cost": 0,
    "is_byok": false,
    "prompt_tokens_details": {
      "cached_tokens": 0,
      "audio_tokens": 0,
      "video_tokens": 0
    },
    "cost_details": {
      "upstream_inference_cost": null,
      "upstream_inference_prompt_cost": 0,
      "upstream_inference_completions_cost": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "image_tokens": 0
    }
  }
}
```
{% endcode %}

</details>
