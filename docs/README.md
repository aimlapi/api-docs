---
hidden: true
---

# БУФФЕР ОБМАНА

## Драфт таблички с тегами

<table data-header-hidden data-full-width="true"><thead><tr><th width="175.449951171875"></th><th width="161.7000732421875"></th><th width="162.4500732421875"></th><th></th></tr></thead><tbody><tr><td>Context: <kbd>128,000</kbd></td><td>Parameters: <kbd>70B</kbd></td><td>Cutoff date: <kbd>2025-03-17</kbd></td><td></td></tr><tr><td>Function calling <span data-gb-custom-inline data-tag="emoji" data-code="2705">✅</span></td><td>Vision <span data-gb-custom-inline data-tag="emoji" data-code="2705">✅</span></td><td>Web Search  <span data-gb-custom-inline data-tag="emoji" data-code="2705">✅</span></td><td>Code Generation  <span data-gb-custom-inline data-tag="emoji" data-code="2705">✅</span></td></tr></tbody></table>





{% @aimlapi-chat/aimlapi-chat %}



## Embedding Model Comparison

AI/ML API offers two robust third-generation embedding models (indicated by -3 in the model ID).

<table><thead><tr><th>Model</th><th width="156">~ Pages per Dollar</th><th width="215">Performance on MTEB Eval</th><th>Max Input Tokens</th></tr></thead><tbody><tr><td>text-embedding-3-small</td><td>62,500</td><td>62.3%</td><td>8191</td></tr><tr><td>text-embedding-3-large</td><td>9,615</td><td>64.6%</td><td>8191</td></tr><tr><td>text-embedding-ada-002</td><td>12,500</td><td>61.0%</td><td>8191</td></tr></tbody></table>

##

## Quick Example

Let's modify this reference image using a prompt `"add some laughing human children to the scene"`:

<figure><img src=".gitbook/assets/flux-pro v1.1 khih.jpg" alt=""><figcaption></figcaption></figure>

In image-to-image generation, the `strength` parameter determines the extent to which the input image is transformed based on the provided prompt. It accepts values between 0 and 1:​

* **Low `strength` values (close to 0):** The output image retains more features from the original image, resulting in subtle modifications.​
* **High `strength` values (approaching 1):** The output image adheres more closely to the prompt, leading to more significant alterations and less resemblance to the initial image.

By adjusting the `strength` parameter, you can control the balance between preserving the original image's details and incorporating elements specified in the prompt.

{% code overflow="wrap" %}
```python
import requests


def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/images/generations",
        headers={
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "prompt": "add some laughing human children to the scene",
            "model": "flux/dev/image-to-image",
            "image_url": "https://cdn.aimlapi.com/squirrel/files/tiger/2T4FtC-Iwfq0AqoGZdeVQ_5a76234d6f2c4c4dbc787c1a528d3fe4.jpg",
            "strength": "0.6"
        }
    )

    response.raise_for_status()
    data = response.json()

    print("Generation:", data)


if __name__ == "__main__":
    main()
```
{% endcode %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
Generation: {'images': [{'url': 'https://cdn.aimlapi.com/eagle/files/panda/NCdssIKmQa2eRDmdjT8t2.png', 'width': 1024, 'height': 768, 'content_type': 'image/jpeg'}], 'timings': {'inference': 2.9201214220374823}, 'seed': 1672167241, 'has_nsfw_concepts': [False], 'prompt': 'add some laughing human children to the scene'}
```
{% endcode %}

</details>

We obtained the following image by running this code example.&#x20;

{% hint style="warning" %}
This model takes the size of the reference image as the dimensions for the generated image.
{% endhint %}
