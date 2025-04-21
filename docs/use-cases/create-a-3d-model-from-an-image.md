---
icon: cubes
---

# Create a 3D Model from an Image

## Idea and Step-by-Step Plan

Transforming a 2D image into a 3D model is a powerful way to bring static visuals to life. Whether you're working on a game, a product prototype, or just exploring creative tools, this process helps bridge the gap between visual concepts and spatial design.

In this tutorial, you'll learn how to go from a single image to a usable 3D model using readily available tools. No deep 3D modeling experience required — just a bit of patience and curiosity.

1. Prepare Your Image. Choose a clear image of the object you want to convert. Best results come from front-facing images with neutral backgrounds and good lighting.
2. Upload the image to Triposr model and wait for the AI to process it — this usually takes under a minute.
3. Download the 3D Model. You can now use the model in your web app, AR/VR project, or 3D viewer.

## Implementation

Let's call the Triposr model and pass it a reference image in Python code.

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
            "model": "triposr",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Fly_Agaric_mushroom_05.jpg/576px-Fly_Agaric_mushroom_05.jpg",
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

**Response**:

The example returns a textured 3D mesh in GLB file format. You can view it [here](https://drive.google.com/file/d/1pfA6PGgDY31rEGcoea7qoZW6uhhPYSE6/view?usp=sharing).

For clarity, we took several screenshots of our mushroom from different angles in an online GLB viewer. As you can see, the model understands the shape, but preserving the pattern on the back side (which was not visible on the reference image) could be improved:

<table data-header-hidden><thead><tr><th valign="top"></th><th></th><th></th></tr></thead><tbody><tr><td valign="top"><img src="../.gitbook/assets/image (5).png" alt="" data-size="original"></td><td><img src="../.gitbook/assets/image (9).png" alt="" data-size="original"></td><td><img src="../.gitbook/assets/image (7).png" alt="" data-size="original"></td></tr></tbody></table>

Compare them with the [reference image](https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Fly_Agaric_mushroom_05.jpg/576px-Fly_Agaric_mushroom_05.jpg):

<table data-header-hidden><thead><tr><th width="279"></th><th data-hidden></th><th data-hidden></th></tr></thead><tbody><tr><td><img src="../.gitbook/assets/576px-Fly_Agaric_mushroom_05 (2).jpg" alt="" data-size="original"></td><td></td><td></td></tr></tbody></table>

{% hint style="info" %}
Try to choose reference images where the target object is not obstructed by other objects and does not blend into the background. Depending on the complexity of the object, you may need to experiment with the resolution of the reference image to achieve a satisfactory mesh.
{% endhint %}
