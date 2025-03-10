---
icon: cube
description: Overview of the capabilities of AIML API 3D-generating models.
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

# 3D-Generating Models

## Overview

3D-generating models are AI-powered tools designed to create three-dimensional objects, environments, and textures based on input data such as text prompts, reference images, or existing 3D models. These models utilize advanced techniques like neural rendering, implicit representations, and generative adversarial networks (GANs) to produce high-quality, realistic 3D assets. They are widely used in gaming, virtual reality (VR), augmented reality (AR), and industrial design.

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
            
            "Authorization": "Bearer <YOUR_API_KEY>",
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

<table data-header-hidden><thead><tr><th valign="top"></th><th></th><th></th></tr></thead><tbody><tr><td valign="top"><img src="../../.gitbook/assets/image (5).png" alt="" data-size="original"></td><td><img src="../../.gitbook/assets/image (9).png" alt="" data-size="original"></td><td><img src="../../.gitbook/assets/image (7).png" alt="" data-size="original"></td></tr></tbody></table>

Compare them with the [reference image](https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Fly_Agaric_mushroom_05.jpg/576px-Fly_Agaric_mushroom_05.jpg):

<table data-header-hidden><thead><tr><th width="279"></th><th data-hidden></th><th data-hidden></th></tr></thead><tbody><tr><td><img src="../../.gitbook/assets/576px-Fly_Agaric_mushroom_05 (2).jpg" alt="" data-size="original"></td><td></td><td></td></tr></tbody></table>

{% hint style="info" %}
Try to choose reference images where the target object is not obstructed by other objects and does not blend into the background. Depending on the complexity of the object, you may need to experiment with the resolution of the reference image to achieve a satisfactory mesh.
{% endhint %}
