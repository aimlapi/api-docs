---
description: >-
  Short description of third-party integration with AI/ML API (Langflow) and how
  to work with it.
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

# Langflow

## About

[Langflow](https://www.langflow.org/) is a new visual framework for building multi-agent and RAG applications. It is open-source, Python-powered, fully customizable, and LLM and vector store agnostic.

Its intuitive interface allows for easy manipulation of AI building blocks, enabling developers to quickly prototype and turn their ideas into powerful, real-world solutions.

## How to Use AIML API via Langflow

A user of the Langflow framework can create a working AI pipeline (a _flow_) by simply adding visual components, connecting their inputs and outputs in the required order, and setting various available parameters in each component.&#x20;

At the center of such a flow is one or more sequential **model components** that generate text using LLMs. Choose **Models > AIML** in the sidebar, then click the "+" button or simply drag and drop the model element onto the work area. After that, connect it to your input and output elements:

<figure><img src="../.gitbook/assets/langflow aimlapi flow.png" alt=""><figcaption><p>The component at the center creates a chat model instance powered by AIML API.</p></figcaption></figure>

### Inputs <a href="#inputs" id="inputs"></a>

{% hint style="info" %}
Only 1-2 key parameters are usually displayed directly on the model component body. To configure most parameters, you need to click on the model element and then click the **Controls** button that appears above the model component.
{% endhint %}

| Name            | Type         | Description                                                                               |
| --------------- | ------------ | ----------------------------------------------------------------------------------------- |
| `max_tokens`    | Integer      | The maximum number of tokens to generate. Set to 0 for unlimited tokens. Range: 0-128000. |
| `model_kwargs`  | Dictionary   | Additional keyword arguments for the model.                                               |
| `model_name`    | String       | The name of the AIML model to use. Options are predefined in `AIML_CHAT_MODELS`.          |
| `aiml_api_base` | String       | The base URL of the AIML API. Defaults to `https://api.aimlapi.com`.                      |
| `api_key`       | SecretString | The AIML API Key to use for the model.                                                    |
| `temperature`   | Float        | Controls randomness in the output. Default: `0.1`.                                        |
| `seed`          | Integer      | Controls reproducibility of the job.                                                      |

### Outputs <a href="#outputs" id="outputs"></a>

| Name    | Type          | Description                                                         |
| ------- | ------------- | ------------------------------------------------------------------- |
| `text`  | String        | Chat model response.                                                |
| `model` | LanguageModel | An instance of ChatOpenAI configured with the specified parameters. |

For further information about the framework, please check the [official Langflow documentation.](https://docs.langflow.org/)
