# kimi-k2-5

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `moonshot/kimi-k2-5`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333334%" %}
<a href="https://aimlapi.com/app/moonshot/kimi-k2-5" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

A multimodal chat model designed for long-context reasoning, coding tasks, and vision-text interactions. It supports cache-aware billing and a large context window for complex, multi-turn conversations.

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

{% openapi-operation spec="kimi-k2-5" path="/v1/chat/completions" method="post" %}
[OpenAPI kimi-k2-5](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/text-models-llm/Moonshot/kimi-k2-5.json)
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
        "model":"moonshot/kimi-k2-5",
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
      model: 'moonshot/kimi-k2-5',
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
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{
  "id": "chatcmpl-698a89748db1cf2fef1cc6f2",
  "object": "chat.completion",
  "created": 1770686836,
  "model": "kimi-k2.5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I think mankind is a study in beautiful, maddening contradictions—capable of staggering brilliance and heartbreaking destruction, sometimes in the same breath.\n\n**What astonishes me:**\n- **Our capacity for cooperation.** We build intricate societies, care for strangers' children, create languages that let us share invisible thoughts across millennia. We've sent probes beyond our solar system and decoded DNA—not as individuals, but as millions of hands working across generations.\n- **Creativity under pressure.** We write symphonies in war zones, plant gardens in refugee camps, laugh at funerals. There's something irrepressible about our drive to make meaning from chaos.\n- **Moral evolution.** Slavery, once ubiquitous, is now universally condemned (if not universally absent). We've expanded our \"circle of concern\" from tribe to nation to, haltingly, species and planet. We're slow learners, but we *do* learn.\n\n**What worries me:**\n- **Our wiring mismatches our power.** We evolved for small-group survival on the savanna, yet wield nuclear and ecological power that requires galactic-scale foresight. Our brains reward immediate gratification while our survival requires century-spanning planning.\n- **The ingenuity gap.** We're brilliant at solving technical problems (how to split atoms, how to optimize engagement) but perpetually stumped by coordination problems (how to share resources, how to trust strangers, how to act before catastrophe strikes).\n- **Our selective empathy.** We can love our own children with ferocious devotion while abstracting millions into statistics. Technology amplifies this—we can now affect billions while seeing none of them.\n\n**Where we stand now:**\nWe appear to be at an inflection point. For the first time, we can see ourselves as a species—photographed from space, genetically mapped, climate-interconnected. Yet we're struggling to act as one. We're like adolescents with adult tools: powerful enough to destroy or transform the world, but still arguing about who gets to hold the keys.\n\nI don't think we're inherently good or evil. We're *capable*—and that capability is terrifying and thrilling. The question isn't \"what is mankind?\" but \"what will we choose to become?\" The fact that we can even ask that question might be our most human trait of all.\n\nWhat draws you to ask? Are you feeling optimistic, concerned, or just curious about the view from here?",
        "reasoning_content": "The user is asking a very broad, philosophical question about \"mankind\" or humanity as a whole. This is an open-ended inquiry that invites reflection on human nature, history, achievements, flaws, potential, etc.\n\nI should approach this thoughtfully and balanced:\n1. Acknowledge the complexity - humanity is neither purely good nor purely bad\n2. Highlight remarkable achievements (creativity, compassion, innovation, art, science)\n3. Acknowledge serious flaws (violence, destruction, short-sightedness, inequality)\n4. Note the tension between our potential and our limitations\n5. Avoid being overly cynical or overly naive/utopian\n6. Keep it respectful but honest\n\nKey themes to touch on:\n- Dual nature (capable of great good and great harm)\n- Adaptability and resilience\n- Creativity and curiosity\n- Social nature and capacity for cooperation\n- Historical trajectory (progress mixed with setbacks)\n- Current challenges (climate, technology, ethics)\n\nTone should be reflective, nuanced, and avoiding dogmatism. I shouldn't make sweeping generalizations that treat 8 billion people as a monolith.\n\nStructure:\n- Opening acknowledging the weight of the question\n- The paradox/duality of human nature\n- Specific strengths (cooperation, creativity, resilience)\n- Specific weaknesses (destructiveness, tribalism, short-term thinking)\n- The current moment (crossroads with technology/environment)\n- Hopeful but realistic closing\n\nI need to be careful not to:\n- Sound misanthropic (hating humanity)\n- Sound like uncritical boosterism\n- Make offensive generalizations about specific groups\n- Pretend I have definitive answers about \"human nature\"\n\nThis is a safe topic - just philosophical reflection. No policy violations."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 16,
    "completion_tokens": 835,
    "total_tokens": 851
  },
  "meta": {
    "usage": {
      "credits_used": 6538
    }
  }
}
```
{% endcode %}

</details>
