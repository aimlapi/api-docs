[#references:start]: <> ({ "template": "openapi" })
{% hint style="info" %}
This documentation is valid for the following list of our models:
* triposr
{% endhint %}

# Model Overview
A transformer-based model designed for rapid 3D object reconstruction from a single RGB image, capable of generating high-quality 3D meshes in under 0.5 seconds on an NVIDIA A100 GPU.

# Setup your API Key
If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

# Submit a request
## API Schema
{% swagger src="./triposr.json" path="/images/generations/with-url" method="post" %}
./triposr.json
{% endswagger %}

[#references:end]: <> ({})