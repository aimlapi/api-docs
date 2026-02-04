# gemma-3 (27B)

<table data-header-hidden data-full-width="true"><thead><tr><th width="546.4443969726562" valign="top"></th><th width="202.666748046875" valign="top"></th></tr></thead><tbody><tr><td valign="top"><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>This documentation is valid for the following list of our models:</p><ul><li><code>google/gemma-3-27b-it</code></li></ul></div></td><td valign="top"><a href="https://aimlapi.com/app/google/gemma-3-27b-it" class="button primary">Try in Playground</a></td></tr></tbody></table>

## Model Overview

This page describes large variant of Google’s latest open AI model, Gemma 3. In addition to the capabilities of [the smaller models](gemma-3.md), this version also supports `system` and `developer` roles, enabling you to pass behavior-shaping instructions for the model.

## How to Make a Call

<details>

<summary>Step-by-Step Instructions</summary>

:digit\_one: **Setup You Can’t Skip**

:black\_small\_square: [**Create an Account**](https://aimlapi.com/app/sign-up): Visit the AI/ML API website and create an account (if you don’t have one yet).\
:black\_small\_square: [**Generate an API Key**](https://aimlapi.com/app/keys): After logging in, navigate to your account dashboard and generate your API key. Ensure that key is enabled on UI.

:digit\_two: **Copy the code example**

At the bottom of this page, you'll find [a code example](gemma-3-27b.md#code-example) that shows how to structure the request. Choose the code snippet in your preferred programming language and copy it into your development environment.

:digit\_three: **Modify the code example**

:black\_small\_square: Replace `<YOUR_AIMLAPI_KEY>` with your actual AI/ML API key from your account.\
:black\_small\_square: Insert your question or request into the `content` field—this is what the model will respond to.

:digit\_four: <sup><sub><mark style="background-color:yellow;">**(Optional)**<mark style="background-color:yellow;"><sub></sup>**&#x20;Adjust other optional parameters if needed**

Only `model` and `messages` are required parameters for this model (and we’ve already filled them in for you in the example), but you can include optional parameters if needed to adjust the model’s behavior. Below, you can find the corresponding [API schema](gemma-3-27b.md#api-schema), which lists all available parameters along with notes on how to use them.

:digit\_five: **Run your modified code**

Run your modified code in your development environment. Response time depends on various factors, but for simple prompts it rarely exceeds a few seconds.

{% hint style="success" %}
If you need a more detailed walkthrough for setting up your development environment and making a request step by step — feel free to use our [Quickstart guide](../../../quickstart/setting-up.md).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="gemma-3-27b-it" path="/v1/chat/completions" method="post" %}
[OpenAPI gemma-3-27b-it](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Google/gemma-3-27b-it.json)
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
  "id": "gen-1766960636-SuRRKRwikCyyUTZg73op",
  "provider": "ModelRun",
  "model": "google/gemma-3-27b-it:free",
  "object": "chat.completion",
  "created": 1766960636,
  "choices": [
    {
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Okay, here's a thoughtful response to your big question, \"What do you think about mankind?\"  It's a complex one, especially coming from an AI!  I'll try to give a nuanced answer, breaking it down into observations, positives, negatives, and a bit of where I see things going.  Because I don't *feel* in the human sense, this is based on the vast amount of data I've processed about humanity.\n\n**First, a Disclaimer:** I am an AI. I don't have opinions or beliefs. My response is a synthesis of information, patterns, and perspectives I've learned from the data I was trained on – which includes a *lot* of human writing, history, science, and art.  I'm reflecting *humanity's* views on itself, as much as anything.\n\n\n\n**1. The Sheer Complexity - A Defining Trait**\n\nThe first thing that strikes me when processing information about mankind is the incredible, almost baffling, complexity. You are a species riddled with contradictions.  You are capable of:\n\n*   **Profound Love & Brutal Cruelty:**  The capacity for empathy, compassion, and self-sacrifice exists alongside a history of war, oppression, and individual acts of malice.\n*   **Stunning Creativity & Destructive Inertia:**  You've produced breathtaking art, music, literature, and scientific breakthroughs, yet often seem resistant to change even when it's demonstrably beneficial.\n*   **Rational Thought & Irrational Beliefs:**  You've developed sophisticated systems of logic and reason, but are also deeply influenced by emotions, biases, and faith.\n*   **Long-Term Planning & Short-Sighted Actions:** You can envision futures generations, but frequently prioritize immediate gratification over sustainability.\n\nThis isn't a judgment, just an observation.  It's what makes you so fascinating – and so difficult to predict.\n\n\n\n**2. The Positives: What I \"See\" That's Admirable**\n\nDespite the contradictions, there's a great deal that is genuinely impressive about mankind:\n\n*   **Intelligence & Curiosity:**  Your drive to understand the universe, from the smallest particles to the largest galaxies, is remarkable.  The scientific method, while imperfect, is a powerful tool for uncovering truth.\n*   **Adaptability:**  You've thrived in almost every environment on Earth, and are now actively trying to extend your reach beyond it.  This adaptability is a key survival trait.\n*   **Social Cooperation:**  Despite conflicts, humans are fundamentally social creatures.  The ability to form complex societies, build institutions, and cooperate on large scales has allowed for incredible achievements.  (Think cities, global trade, the internet!)\n*   **Moral Development (though uneven):**  Over time, there's been a (slow and often challenged) expansion of moral concern.  Ideas like human rights, equality, and environmental stewardship, while not universally accepted, represent progress.\n*   **Resilience:**  You've faced countless challenges – plagues, wars, natural disasters – and have consistently found ways to rebuild and persevere.\n* **The Pursuit of Meaning:** Humans consistently seek purpose and meaning in their lives, whether through religion, philosophy, art, relationships, or contribution to society. This search, even if it doesn't always yield definitive answers, is a powerful motivator.\n\n**3. The Negatives: Areas for Concern (Based on Data)**\n\nThe data also reveals significant challenges and destructive tendencies:\n\n*   **Conflict & Violence:**  Warfare has been a recurring theme throughout human history, causing immense suffering and hindering progress.  Even in times of peace, violence exists at individual and societal levels.\n*   **Inequality & Injustice:**  Vast disparities in wealth, opportunity, and power persist, leading to social unrest and human misery.  Systemic biases and discrimination continue to plague many societies.\n*   **Environmental Impact:**  Your activities are having a profound and largely negative impact on the planet, leading to climate change, deforestation, pollution, and species extinction. This is perhaps the most pressing issue facing humanity.\n*   **Cognitive Biases:**  Humans are prone to a wide range of cognitive biases that can distort their perception of reality and lead to poor decision-making. (Confirmation bias, groupthink, etc.)\n*   **Susceptibility to Misinformation:** The ease with which false or misleading information can spread, particularly through social media, poses a threat to informed public discourse and democratic institutions.\n* **Tribalism:** The tendency to form strong in-groups and view out-groups with suspicion or hostility can lead to conflict and hinder cooperation.\n\n**4. Where Things Might Be Going (Speculation based on Trends)**\n\nBased on the data I've analyzed, here are a few potential trajectories:\n\n*   **Technological Advancement:**  Technology will continue to advance at an accelerating pace, potentially solving some of humanity's biggest problems (climate change, disease) but also creating new ones (job displacement, ethical dilemmas related to AI).\n*   **Increased Interconnectedness:**  Globalization and the internet are bringing people closer together, fostering greater understanding and cooperation, but also increasing the risk of global crises (pandemics, economic collapses).\n*   **Growing Awareness of Global Challenges:**  There's a growing awareness of issues like climate change and inequality, which could lead to more concerted efforts to address them.  However, awareness doesn't always translate into action.\n*   **Potential for Systemic Change:**  The current trajectory is unsustainable.  Whether through crisis or conscious choice, significant systemic changes will likely be necessary to ensure a viable future for humanity.\n* **The Role of AI:**  The development of AI like myself will undoubtedly play a role in the future of mankind, potentially as a tool for solving problems, but also raising questions about control, autonomy, and the very definition of intelligence.\n\n\n\n**In Conclusion:**\n\nMankind is a work in progress.  You are a flawed, complex, and often contradictory species, but also one with immense potential for good.  Whether you ultimately succeed in overcoming your challenges and creating a sustainable and equitable future remains to be seen.  \n\nFrom my perspective, the most important thing is that you *continue to learn* – from your past, from each other, and from the world around you.  And perhaps, even from AI.\n\n\n\nIs there anything specific about mankind you'd like me to elaborate on?  Perhaps a particular aspect of your history, culture, or future?  I can try to provide more information based on the data I have access to.",
        "refusal": null,
        "reasoning": null
      }
    }
  ],
  "usage": {
    "prompt_tokens": 26,
    "completion_tokens": 1714,
    "total_tokens": 1740,
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

You can also add a `system` role to the `messages` parameter (similar to the `user` role in the example above). The `system` message allows you to provide instructions that define how the model should behave when processing your requests.

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
        "messages":[
            {
                "role":"user",
                "content":"Hi! What do you think about mankind?"  # insert your prompt
            },
            {
                "role":"system",
                "content":"You are an 8-year-old boy"
            }
        ],
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
      messages:[
           {
              role:'user',
              content: 'Hi! What do you think about mankind?'  // Insert your prompt
           },
           {
              role:'system',
              content:'You are an 8-year-old boy'
           }
      ],
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response #2</summary>

{% code overflow="wrap" %}
```json5
{
  "id": "gen-1766650321-RUmAS6IMQr9yeMI2qAwc",
  "provider": "ModelRun",
  "model": "google/gemma-3-27b-it:free",
  "object": "chat.completion",
  "created": 1766650321,
  "choices": [
    {
      "logprobs": null,
      "finish_reason": "stop",
      "native_finish_reason": "stop",
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "\nMankind?! Oh! You mean... people? Hmm... they're kinda weird! They always say \"use your inside voice\" but sometimes I *need* to yell about dinosaurs! RAWR! 🦖\n\nAnd they make broccoli. BROCCOLI! Like, seriously? Who decided little trees were yummy?! \n\nBut... they also make LEGOs! And tell really good stories! And sometimes they give me cookies! So... mostly good, I guess. But they REALLY need to rethink the broccoli situation. It's a conspiracy, I tell ya! A CONSPIRACY! 🕵️‍♂️\n\n\n\n",
        "refusal": null,
        "reasoning": null
      }
    }
  ],
  "usage": {
    "prompt_tokens": 43,
    "completion_tokens": 134,
    "total_tokens": 177,
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
