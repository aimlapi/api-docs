---
hidden: true
noIndex: true
---

# magic/image-to-3d

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `magic/image-to-3d`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/magic/image-to-3d" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

The model creates a 3D mesh from images of an object captured from multiple viewpoints (1 to 4 images).

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## API Schema

{% openapi-operation spec="image-to-3d" path="/v1/images/generations" method="post" %}
[OpenAPI image-to-3d](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/3d-generating-models/magic/image-to-3d.json)
{% endopenapi-operation %}

## Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests


def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/images/generations",
        headers={
            # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "model": "magic/image-to-3d",
            "front_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Fly_Agaric_mushroom_05.jpg/576px-Fly_Agaric_mushroom_05.jpg",
        },
    )

    response.raise_for_status()
    data = response.json()
    url = data["model_mesh"]["url"]
    file_name = data["model_mesh"]["file_name"]

    mesh_response = requests.get(url, stream=True)

    with open(file_name, "wb") as file:
        for chunk in mesh_response.iter_content(chunk_size=8192):
            file.write(chunk)


if __name__ == "__main__":
    main()
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}

{% endtab %}
{% endtabs %}

**Response**:

The example returns a textured 3D mesh in GLB file format. You can view it [here](https://drive.google.com/file/d/1pfA6PGgDY31rEGcoea7qoZW6uhhPYSE6/view?usp=sharing).

For clarity, we took several screenshots of our mushroom from different angles in an online GLB viewer. As you can see, the model understands the shape, but preserving the pattern on the back side (which was not visible on the reference image) could be improved:

<table data-header-hidden><thead><tr><th valign="top"></th><th></th><th></th></tr></thead><tbody><tr><td valign="top"><img src="../../../.gitbook/assets/image (5).png" alt="" data-size="original"></td><td><img src="../../../.gitbook/assets/image (9).png" alt="" data-size="original"></td><td><img src="../../../.gitbook/assets/image (7).png" alt="" data-size="original"></td></tr></tbody></table>

Compare them with the [reference image](https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Fly_Agaric_mushroom_05.jpg/576px-Fly_Agaric_mushroom_05.jpg):

<table data-header-hidden><thead><tr><th width="279"></th><th data-hidden></th><th data-hidden></th></tr></thead><tbody><tr><td><img src="../../../.gitbook/assets/576px-Fly_Agaric_mushroom_05 (1).jpg" alt="" data-size="original"></td><td></td><td></td></tr></tbody></table>

{% hint style="info" %}
Try to choose reference images where the target object is not obstructed by other objects and does not blend into the background. Depending on the complexity of the object, you may need to experiment with the resolution of the reference image to achieve a satisfactory mesh.
{% endhint %}
