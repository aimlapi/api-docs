---
description: Getting started
---

# Get Started with Inference

### **First steps**

1. **Register for an Account**: [Sign up](https://app.aimlapi.com/sign-up) to generate your API key and kickstart with free trial tokens.
2. **Run Your First Model**:

```python
import openai
system_content = "You are a travel agent. Be descriptive and helpful."
user_content = "Tell me about San Francisco"
client = openai.OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://api.aimlapi.com/",
)
chat_completion = client.chat.completions.create(
    model="mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages=[
        {"role": "system", "content": system_content},
        {"role": "user", "content": user_content},
    ],
    temperature=0.7,
    max_tokens=1024,
)
response = chat_completion.choices[0].message.content
print("Response:\n", response)

```

### **Next Steps**

* Explore the AI/ML API Playground to experiment with various models.
* Learn how to integrate real-time streaming responses into your applications.
* Check out code examples for inspiration on leveraging our API for different use cases.
* Discover integrations for a seamless development experience with leading AI frameworks.

Dive into the world of AI/ML API and explore the limitless possibilities of AI applications in your projects!
