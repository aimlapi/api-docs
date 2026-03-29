# AutoGPT

## About

AutoGPT is an open-source platform designed to help you build, test, and run AI agents using a no-code visual interface. It allows users to link LLMs with tools, memory, planning modules, and action chains. By configuring block-based workflows, you can create custom agents that reason, plan, and act in multi-step environments.

In this guide, you'll learn how to connect AutoGPT with high-performance language models from AI/ML API for use in AI-driven text generation tasks.

***

## Prerequisites

Before proceeding, ensure:

* You’ve followed [AutoGPT’s Platform Setup Guide](https://docs.agpt.co/platform/getting-started/) and AutoGPT is running locally.
* You have an **API key** from [AI/ML API](https://aimlapi.com/app/keys).

***

## Step-by-Step Setup

### 🥇 Step 1. Install and Launch AutoGPT Locally

<div align="left"><figure><img src="../.gitbook/assets/Step 1 AutoGPT Running.png" alt=""><figcaption></figcaption></figure></div>

Use the latest official guide published on the AutoGPT documentation site: [AutoGPT Getting Started Guide](https://docs.agpt.co/platform/getting-started/)

> 💡 Tip: Always refer to the most recent version of the guide to avoid setup issues or deprecated steps.

Make sure you're running AutoGPT on `http://localhost:3000`.

### 🥈 Step 2. Open the Visual Block Builder

Before proceeding, make sure you're **logged in** to your AI/ML API account or **create an account** if you haven't already: [aimlapi.com](https://aimlapi.com/app/?utm_source=autogpt\&utm_medium=github\&utm_campaign=integration)

Once AutoGPT is running:

🔗 Open: [http://localhost:3000/build](http://localhost:3000/build) or click **"Build"** from the navigation bar.

<figure><img src="../.gitbook/assets/Step 2 Build Screen.png" alt=""><figcaption></figcaption></figure>

> 💡 Tip: This is your no-code playground to configure agents and workflows.

***

### 🥉 Step 3. Click “Blocks” on the Left Sidebar

* Find the left panel.
* Click the button labeled **"Blocks"**.

<div align="left"><figure><img src="../.gitbook/assets/Step 3 AI Block.png" alt=""><figcaption></figcaption></figure></div>

This shows you all available functional blocks (including LLMs, tools, memory, etc.)

***

### 🔍 Step 4. Search for “AI Text Generator”

In the search bar:

* Type: `ai text generator`
* Click on the **AI Text Generator** block when it appears.

<div align="left"><figure><img src="../.gitbook/assets/Step 4 AI Generator Block.png" alt=""><figcaption></figcaption></figure></div>

> 🧠 This block lets you plug in a language model for text completions, prompts, and chat flows.

***

### 🤖 Step 5. Select One of These AIMLAPI Models

<div align="left"><figure><img src="../.gitbook/assets/Step 5 AIMLAPI Models.png" alt=""><figcaption></figcaption></figure></div>

Click to configure the block, and in the model selection field choose any of the following **AIMLAPI models**:

<table data-header-hidden><thead><tr><th width="362.20001220703125"></th><th></th><th></th><th></th></tr></thead><tbody><tr><td><strong>Model</strong></td><td><strong>Generation Speed</strong></td><td><strong>Reasoning Depth and Quality</strong></td><td><strong>Optimization for Tasks</strong></td></tr><tr><td>nvidia/llama-3.1-nemotron-70b-instruct</td><td>Medium</td><td>High</td><td>Analytics and reasoning</td></tr><tr><td>meta-llama/Llama-3.3-70B-Instruct-Turbo</td><td>Low</td><td>Very high</td><td>Complex tasks</td></tr></tbody></table>

> 🧹 These models are optimized for high-speed generation with reasoning capabilities.

***

### 🔑 Step 6. Enter Your Prompt and API Credentials

In the **AI Text Generator** block:

1. Set **Prompt**: Type any message you want the model to respond to.
2. Set **API Key**:
   * Enter your AI/ML API key.

<div align="left"><figure><img src="../.gitbook/assets/Step 6.1 Key Placeholder.png" alt=""><figcaption></figcaption></figure></div>

<div align="left"><figure><img src="../.gitbook/assets/Step 6.2 No Fill Key Placeholder.png" alt=""><figcaption></figcaption></figure></div>

<div align="left"><figure><img src="../.gitbook/assets/Step 6.3 Filled Key Placeholder.png" alt=""><figcaption></figcaption></figure></div>

> 💡 Get your API key here: [aimlapi.com/app/keys](https://aimlapi.com/app/keys?utm_source=autogpt\&utm_medium=github\&utm_campaign=integration)

<div align="left"><figure><img src="../.gitbook/assets/Step 6.4 Overview.png" alt=""><figcaption></figcaption></figure></div>

***

### 🎉 Step 7. Done – You’re All Set!

Now that you’ve configured the prompt, selected a model, and added your API key — let’s finalize and run your agent in AutoGPT.

***

#### ✅ 1. Save your Agent

Before running, make sure to save your current block configuration as an agent:

1. Click the **"Save"** button at the top-right of the builder interface.
2. In the popup, enter a name for your agent (e.g., `aimlapi_test_agent`).
3. Click **"Save Agent"** to confirm.

> 💡 Saving your agent allows you to reuse it, schedule runs, or chain it into larger workflows with memory, tools, and action blocks.

<div align="left"><figure><img src="../.gitbook/assets/Step 7.1 Save.png" alt=""><figcaption></figcaption></figure></div>

***

#### ▶️ 2. Run your Agent

After saving, you can now launch the agent:

1. Press the **"Run"** button next to your agent on the workspace screen.
2. AutoGPT will trigger the `AI Text Generator` block and initiate a request to the AI/ML API model.

> ⏱️ At this point, the system will send your prompt to the selected model and wait for a response.

<div align="left"><figure><img src="../.gitbook/assets/Step 8 Run.png" alt=""><figcaption></figcaption></figure></div>

***

#### 🧾 3. View the Output

1. **Navigate to the "Output" Panel.** At your **AI/ML API block**, locate the **"Output"** panel below.2. You'll see the response returned by the AI/ML API model.
2. You can copy the result, export it, or pass it into further blocks (like analysis, memory, or a webhook).

<div align="left"><figure><img src="../.gitbook/assets/Step 9 Output.png" alt=""><figcaption></figcaption></figure></div>

***

🎉 That’s it! Your AutoGPT agent is now generating text using **AI/ML API’s powerful language models**.

***

> 💡 You can now expand your agent by chaining the `AI Text Generator` block to:
>
> * 🔧 **Tools** – call external APIs, perform web scraping, manage files.
> * 🧠 **Memory** – store and reuse past interactions for contextual reasoning.
> * ⚙️ **Actions / Chains** – create complex behavior flows and intelligent pipelines.

## More <a href="#more" id="more"></a>

For further information about the framework, please check [the official AutoGPT documentation](https://docs.agpt.co/platform/getting-started/).
