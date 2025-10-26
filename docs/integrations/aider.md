# Aider

## About

[Aider](https://aider.chat/) is a command-line pair programming tool that connects to OpenAI-compatible APIs. It lets you chat with models to edit your codebase, auto-commit changes, and build software collaboratively from the terminal.

This guide explains how to connect **AI/ML API** to **Aider** using the **OpenAI-compatible** flow.\
You’ll get a clean setup with **one endpoint**, support for **slashes in model names**, and **full compatibility** with all chat-completion models.

***

## 🚀 Quick Setup

| Field               | Value                                                                               |
| ------------------- | ----------------------------------------------------------------------------------- |
| **Base URL**        | `https://api.aimlapi.com/v1`                                                        |
| **API Key**         | Your AI/ML API key (create at [aimlapi.com/app/keys](https://aimlapi.com/app/keys)) |
| **Model**           | `openai/meta-llama/Llama-3-70b-chat-hf` _(openai/\<your\_full\_model\_id>)_         |
| **Command Example** | `aider --model openai/chatgpt-4o-latest`                                            |

{% hint style="success" %}
**Tip:** Always include the `openai/` prefix (case-sensitive) before your model name.&#x20;

This ensures Aider correctly routes requests to your **AI/ML API** endpoint.
{% endhint %}

***

## ✅ Prerequisites

* AI/ML API key
* Python 3.8–3.13 installed
* Internet access to `api.aimlapi.com`
* Aider installed ([Install Guide](https://aider.chat/docs/install.html))

***

## Installation

#### 1️⃣ Install Aider

```bash
python -m pip install aider-install
aider-install
```

<div data-with-frame="true"><figure><img src="../.gitbook/assets/Снимок экрана 2025-10-22 133803.png" alt=""><figcaption><p><em>Install Aider via terminal</em></p></figcaption></figure></div>

***

#### 2️⃣ Configure AI/ML API credentials

**Mac/Linux**

```bash
export OPENAI_API_BASE=https://api.aimlapi.com/v1
export OPENAI_API_KEY=<your_aimlapi_key>
```

**Windows (PowerShell)**

```powershell
setx OPENAI_API_BASE https://api.aimlapi.com/v1
setx OPENAI_API_KEY <your_aimlapi_key>
# restart your terminal
```

***

#### 3️⃣ Run Aider with AI/ML API

Move into your project directory:

```bash
cd /to/your/project
```

Then launch Aider with your preferred model:

```bash
# GPT-4o (OpenAI)
aider --model openai/chatgpt-4o-latest

# Meta Llama 3 70B Chat
aider --model openai/meta-llama/Llama-3-70b-chat-hf

# DeepSeek Chat V3
aider --model openai/deepseek/deepseek-chat

# Claude 3.7 Sonnet
aider --model openai/anthropic/claude-3.7-sonnet

# Gemini 1.5 Pro
aider --model openai/google/gemini-1.5-pro
```

<div data-with-frame="true"><figure><img src="../.gitbook/assets/image (1).png" alt="Running Aider with AI/ML API model"><figcaption><p>Running Aider with AI/ML API model</p></figcaption></figure></div>

***

#### ⚙️ 4️⃣ Model Prefix Rule

Aider automatically routes requests to your `OPENAI_API_BASE`.\
To connect to **AI/ML API**, **always prefix your model with `openai/`**.

**Pattern:**

```
openai/<provider>/<model-name>
```

**Examples:**

* `openai/chatgpt-4o-latest`
* `openai/meta-llama/Llama-3-70b-chat-hf`
* `openai/deepseek/deepseek-chat`
* `openai/anthropic/claude-3.7-sonnet`
* `openai/google/gemini-1.5-pro`

***

#### 🧾 5️⃣ Example Aider Session

```bash
cd ~/workspace/myapp
aider --model openai/chatgpt-4o-latest
```

Aider will:

1. Load your project map.
2. Analyze the repo.
3. Apply AI-suggested edits.
4. Commit changes automatically.

<div data-with-frame="true"><figure><img src="../.gitbook/assets/Снимок экрана 2025-10-23 125950 (1).png" alt="Aider researching your repo"><figcaption><p>Aider researching your repo</p></figcaption></figure></div>

<div align="left" data-with-frame="true"><figure><img src="../.gitbook/assets/Снимок экрана 2025-10-23 130108 (1).png" alt="Aider working on code changes"><figcaption><p><em>Aider working on code changes</em></p></figcaption></figure></div>

***

#### 🧩 Common Pitfalls

* **Bad request – check parameters** → verify the model name and prefix
* **Unknown model** → confirm it exists in [AI/ML API Models](https://aimlapi.com/models?utm_source=aider\&utm_medium=github\&utm_campaign=integration)
* **Invalid API key** → re-copy from [AI/ML API Dashboard](https://aimlapi.com/app/keys)
* **No response** → check `OPENAI_API_BASE` and your internet access

***

#### 📚 References

* [**Dashboard & API Keys**](https://aimlapi.com/app)
* [**Model Catalog**](https://aimlapi.com/models)
* [**Aider GitHub**](https://github.com/Aider-AI/aider)
* [**Aider Installation Docs**](https://aider.chat/docs/install.html)
