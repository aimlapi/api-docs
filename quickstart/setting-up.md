# Setting Up



* Visit [AI/ML API](https://aimlapi.com/app) and create an account&#x20;
* **Generate an API Key**: Obtain your API key from the account dashboard.
* **Configure Base URL**: Set the base URL for API requests:

```
https://api.aimlapi.com
```

## **Making Your First API Call**

**Example in Python**

```python
import openai

system_content = "You are a travel agent. Be descriptive and helpful."
user_content = "Tell me about San Francisco"

client = openai.OpenAI(
    api_key="your_api_key_here",
    base_url="https://api.aimlapi.com",
)

chat_completion = client.chat.completions.create(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    messages=[
        {"role": "system", "content": system_content},
        {"role": "user", "content": user_content},
    ],
    temperature=0.7,
    max_tokens=128,
)

response = chat_completion.choices[0].message.content
print("AI/ML API:\n", response)
```

**Example in Node.js**

```javascript
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "your_api_key_here",
  baseURL: "https://api.aimlapi.com",
});

(async () => {
  const chatCompletion = await openai.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      { role: "system", content: "You are a travel agent. Be descriptive and helpful" },
      { role: "user", content: "Tell me about San Francisco" }
    ],
    temperature: 0.7,
    max_tokens: 128,
  });
  console.log("AI/ML API:\n", chatCompletion.choices[0].message.content);
})();
```
