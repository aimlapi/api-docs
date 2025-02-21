---
icon: code
description: Use the API to list all available models and compare their responses.
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

# Model comparsion

The API used in this example is listed [here](../api-overview/model-database/).

### Example #1: Compare two random text models

For example, you can send the same request to two _random_ text models and compare the results:

{% tabs %}
{% tab title="Python" %}
```python
import requests
import random
from openai import OpenAI

# API credentials
BASE_URL = "https://api.aimlapi.com/v1"
# put your AIML API Key instead of <YOUR_API_KEY>:
API_KEY = "<YOUR_API_KEY>"

def get_models():
    headers = {"Authorization": f"Bearer {API_KEY}"}
    response = requests.get(f"{BASE_URL}/models", headers=headers)
    return list(response.json().keys())

def generate_joke(model):
    client = OpenAI(base_url=BASE_URL, api_key=API_KEY)
    
    system_prompt = "You are an AI assistant that only responds with jokes."
    user_prompt = "Why is the sky blue?"
    
    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        model=model,
    )
    
    return response.choices[0].message.content

def main():
    models = get_models()
    random.shuffle(models)
    selected_models = models[:2]

    for model in selected_models:
        joke = generate_joke(model)
        print(f"--- {model} ---")
        print(f"USER: Why is the sky blue?")
        print(f"AI  : {joke}")

if __name__ == "__main__":
    main()

```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const { OpenAI } = require('openai');
const { Axios } = require('axios');
const main = async () => {
  const BASE_URL = '<baseUrl>';
  const API_KEY = '<YOUR_API_KEY>';
  const axios = new Axios({
    headers: { Authorization: `Bearer ${API_KEY}` },
    baseURL: BASE_URL,
  });
  const openai = new OpenAI({ baseURL: BASE_URL, apiKey: API_KEY });
  const vendorByModel = await axios.get('/models').then((res) => JSON.parse(res.data));
  const models = Object.keys(vendorByModel);
  const shuffledModels = [...models].sort(() => Math.round(Math.random()));
  const selectedModels = shuffledModels.slice(0, 2);
  const systemPrompt = `You are an AI assistant that only responds with jokes.`;
  const userPrompt = `Why is the sky blue?`;
  for (const model of selectedModels) {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model,
    });
    const message = completion.choices[0].message.content;
    console.log(`--- ${model} ---`);
    console.log(`USER: ${userPrompt}`);
    console.log(`AI  : ${message}`);
  }
};
main();

```
{% endtab %}
{% endtabs %}

Will return something like this:

{% code overflow="wrap" %}
```css
--- zero-one-ai/Yi-34B-Chat ---
USER: Why is the sky blue?
AI  : Why is the sky blue? Because it's full of blueberries!
--- allenai/OLMo-7B-Instruct ---
USER: Why is the sky blue?
AI  : Because the white sun beams enter the blue Earth's atmosphere and get dispersed, resulting in the beautiful color we call "sky blue." It's like looking at paint being blown on a canvas by the wind! Just a joke, but the real answer is physics. 😎

```
{% endcode %}

### Example #2: Compare two predefined text models

You can also send the same request to two _specific_ text models of your choice and compare the results:

{% tabs %}
{% tab title="Python" %}
```python
import requests
from openai import OpenAI

# API credentials
BASE_URL = "https://api.aimlapi.com/v1"
# put your AIML API Key instead of <YOUR_API_KEY>:
API_KEY = "<YOUR_API_KEY>"

# Specify the models to compare
model1 = "gpt-4o"
model2 = "MiniMax-Text-01"

def generate_joke(model):
    client = OpenAI(base_url=BASE_URL, api_key=API_KEY)
    
    system_prompt = "You are an AI assistant that only responds with jokes."
    user_prompt = "Why did the programmer break up with their keyboard?"
    
    response = client.chat.completions.create(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        model=model,
    )
    
    return response.choices[0].message.content

def main():
    for model in [model1, model2]:
        joke = generate_joke(model)
        print(f"--- {model} ---")
        print(f"USER: Why did the programmer break up with their keyboard?")
        print(f"AI  : {joke}")

if __name__ == "__main__":
    main()

```
{% endtab %}

{% tab title="JavaScript" %}
```javascript
const { OpenAI } = require('openai');
const { Axios } = require('axios');
const main = async () => {
  const BASE_URL = '<baseUrl>';
  const API_KEY = '<YOUR_API_KEY>';
  const axios = new Axios({
    headers: { Authorization: `Bearer ${API_KEY}` },
    baseURL: BASE_URL,
  });
  const openai = new OpenAI({ baseURL: BASE_URL, apiKey: API_KEY });
  const vendorByModel = await axios.get('/models').then((res) => JSON.parse(res.data));
  const models = Object.keys(vendorByModel);
  const shuffledModels = [...models].sort(() => Math.round(Math.random()));
  const selectedModels = shuffledModels.slice(0, 2);
  const systemPrompt = `You are an AI assistant that only responds with jokes.`;
  const userPrompt = `Why is the sky blue?`;
  for (const model of selectedModels) {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model,
    });
    const message = completion.choices[0].message.content;
    console.log(`--- ${model} ---`);
    console.log(`USER: ${userPrompt}`);
    console.log(`AI  : ${message}`);
  }
};
main();

```
{% endtab %}
{% endtabs %}

Will return something like this:

{% code overflow="wrap" %}
```css
--- gpt-4o ---
USER: Why did the programmer break up with their keyboard?
AI  : Because it just wasn't their type!
--- MiniMax-Text-01 ---
USER: Why did the programmer break up with their keyboard?
AI  : Because it kept hitting the wrong keys!

```
{% endcode %}
