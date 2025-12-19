---
description: Overview of the capabilities of AIML API 3D-generating models.
icon: cube
---

# 3D-Generating Models

## Overview

3D-generating models are AI-powered tools designed to create three-dimensional objects, environments, and textures based on input data such as text prompts, reference images, or existing 3D models. These models utilize advanced techniques like neural rendering, implicit representations, and generative adversarial networks (GANs) to produce high-quality, realistic 3D assets. They are widely used in gaming, virtual reality (VR), augmented reality (AR), and industrial design.

We currently support only one 3D-generating model. You can find [its ID along with the API reference link](./#all-available-3d-generating-models) at the end of the page.

## **Key Features**

* **Text-to-3D Generation** – Create 3D models directly from descriptive text prompts.
* **Image-to-3D Conversion** – Generate 3D objects from 2D images using deep learning techniques.
* **Mesh and Texture Generation** – Produce detailed 3D meshes with realistic textures.
* **Scene Composition** – Generate entire 3D environments with lighting and object placement.
* **High-Fidelity Rendering** – Utilize neural rendering for enhanced visual quality.
* **Scalability & Efficiency** – Optimize generation speed and memory usage for large-scale applications.

## Example

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

For clarity, we took several screenshots of our mushroom from different angles in an online GLB viewer. As you can see, the model understands the shape, but preserving the pattern on the back side (which was not visible on the reference image) could be improved:

<table data-header-hidden><thead><tr><th valign="top"></th><th></th><th></th></tr></thead><tbody><tr><td valign="top"><img src="../../.gitbook/assets/image (5).png" alt="" data-size="original"></td><td><img src="../../.gitbook/assets/image (9).png" alt="" data-size="original"></td><td><img src="../../.gitbook/assets/image (7).png" alt="" data-size="original"></td></tr></tbody></table>

Compare them with the [reference image](https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Fly_Agaric_mushroom_05.jpg/576px-Fly_Agaric_mushroom_05.jpg):

<table data-header-hidden><thead><tr><th width="279"></th><th data-hidden></th><th data-hidden></th></tr></thead><tbody><tr><td><img src="../../.gitbook/assets/576px-Fly_Agaric_mushroom_05 (1).jpg" alt="" data-size="original"></td><td></td><td></td></tr></tbody></table>

{% hint style="info" %}
Try to choose reference images where the target object is not obstructed by other objects and does not blend into the background. Depending on the complexity of the object, you may need to experiment with the resolution of the reference image to achieve a satisfactory mesh.
{% endhint %}

## All Available 3D-Generating Models

<table data-full-width="false"><thead><tr><th width="222.4000244140625">Model ID</th><th width="134.39996337890625">Developer</th><th width="95">Context</th><th>Model Card</th></tr></thead><tbody><tr><td><a href="Stability-AI/triposr.md">triposr</a></td><td>Tripo AI</td><td></td><td><a href="https://aimlapi.com/models/stable-tripo-sr-api">Stable TripoSR 3D</a></td></tr></tbody></table>
