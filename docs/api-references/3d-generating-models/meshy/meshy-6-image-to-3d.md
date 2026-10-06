# Meshy 6 Image to 3D

{% columns %}
{% column width="66.66666666666666%" %}
{% hint style="info" %}
This documentation is valid for the following list of our models:

* `meshy/meshy-6-image-to-3d`
* `meshy/v6/image-to-3d`
{% endhint %}
{% endcolumn %}

{% column width="33.33333333333334%" %}
<a href="https://aimlapi.com/app/meshy/meshy-6-image-to-3d" class="button primary">Try in Playground</a>
{% endcolumn %}
{% endcolumns %}

## Model Overview

Meshy 6 turns a single image into a textured 3D model, with a low-poly mode and a target polygon count for game-ready assets.

The two ids above are the same model and take the same request — use either one. The mesh comes back in GLB, FBX, OBJ, USDZ and STL at once, with its textures as separate files.

{% hint style="warning" %}
**This is a long synchronous request.** The call returns the finished model rather than a job id, and a generation takes **several minutes** — the run behind the example below took 5 minutes 24 seconds. Set your client timeout to at least 15 minutes; most HTTP clients default to far less and will give up long before the model is ready, while you are still billed for the generation.
{% endhint %}

{% hint style="success" %}
[Create AI/ML API Key](https://aimlapi.com/app/keys)
{% endhint %}

<details>

<summary>How to make the first API call</summary>

**1️⃣ Required setup (don’t skip this)**\
▪ **Create an account:** Sign up on the AI/ML API website (if you don’t have one yet).\
▪ **Generate an API key:** In your account dashboard, create an API key and make sure it’s **enabled** in the UI.

**2️ Copy the code example**\
At the bottom of this page, pick the snippet for your preferred programming language (Python / Node.js) and copy it into your project.

**3️ Update the snippet for your use case**\
▪ **Insert your API key:** replace `<YOUR_AIMLAPI_KEY>` with your real AI/ML API key.\
▪ **Select a model:** set the `model` field to `meshy/meshy-6-image-to-3d` or `meshy/v6/image-to-3d`.\
▪ **Provide input:** put a publicly reachable image URL (or a Base64 data URI) in `image_url`.

**4️ (Optional) Tune the request**\
See the API schema below for `model_type`, `target_polycount`, `topology` and the texturing options.

**5️ Run your code**\
Run the updated code in your development environment — and raise the client timeout first.

{% hint style="success" %}
For a detailed walkthrough, use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).
{% endhint %}

</details>

## API Schema

{% openapi-operation spec="meshy-6-image-to-3d" path="/v1/images/generations" method="post" %}
[OpenAPI meshy-6-image-to-3d](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/3d-generating-models/meshy/meshy-6-image-to-3d.json)
{% endopenapi-operation %}

## Code Example

{% tabs %}
{% tab title="Python" %}
{% code overflow="wrap" %}
```python
import requests

IMAGE_URL = "https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/.gitbook/assets/576px-Fly_Agaric_mushroom_05.jpg"

response = requests.post(
    "https://api.aimlapi.com/v1/images/generations",
    headers={
        # Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>:
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
        "Content-Type": "application/json",
    },
    json={
        "model": "meshy/meshy-6-image-to-3d",
        "image_url": IMAGE_URL,
    },
    timeout=900,  # generation takes minutes, not seconds
)

response.raise_for_status()
data = response.json()

# download the mesh
mesh = data["model_glb"]
with requests.get(mesh["url"], stream=True) as r:
    r.raise_for_status()
    with open(mesh["file_name"], "wb") as f:
        for chunk in r.iter_content(chunk_size=8192):
            f.write(chunk)

print(f"saved {mesh['file_name']} ({mesh['file_size']} bytes)")
print("other formats:", [k for k, v in data["model_urls"].items() if v])
```
{% endcode %}
{% endtab %}

{% tab title="JavaScript" %}
{% code overflow="wrap" %}
```javascript
import { writeFile } from 'node:fs/promises';

const IMAGE_URL = 'https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/.gitbook/assets/576px-Fly_Agaric_mushroom_05.jpg';

async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
    method: 'POST',
    headers: {
      // insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meshy/meshy-6-image-to-3d',
      image_url: IMAGE_URL,
    }),
    // generation takes minutes, not seconds
    signal: AbortSignal.timeout(900_000),
  });

  const data = await response.json();

  // download the mesh
  const mesh = data.model_glb;
  const file = await fetch(mesh.url);
  await writeFile(mesh.file_name, Buffer.from(await file.arrayBuffer()));

  console.log(`saved ${mesh.file_name} (${mesh.file_size} bytes)`);
  console.log('other formats:', Object.keys(data.model_urls).filter((k) => data.model_urls[k]));
}

main();
```
{% endcode %}
{% endtab %}
{% endtabs %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json
{
  "animation_glb": null,
  "animation_fbx": null,
  "model_glb": {
    "url": "https://s3.aimlapi.com/files/file-01a10cc8-472f-75a4-bdd8-c97e46dcdd1f",
    "content_type": "model/gltf-binary",
    "file_name": "model.glb",
    "file_size": 4788316
  },
  "thumbnail": {
    "url": "https://cdn.aimlapi.com/flamingo/files/b/0aad2dac/NMkebsnoWburjpVBTcazS_preview.png",
    "content_type": "image/png",
    "file_name": "preview.png",
    "file_size": 90966
  },
  "model_urls": {
    "glb": {
      "url": "https://s3.aimlapi.com/files/file-01a10cc8-472f-75a4-bdd8-c97e46dcdd1f",
      "content_type": "model/gltf-binary",
      "file_name": "model.glb",
      "file_size": 4788316
    },
    "fbx": {
      "url": "https://cdn.aimlapi.com/flamingo/files/b/0aad2dac/SSbnwYal_cM6dReB6oqNf_model.fbx",
      "content_type": "application/octet-stream",
      "file_name": "model.fbx",
      "file_size": 4512748
    },
    "obj": {
      "url": "https://cdn.aimlapi.com/flamingo/files/b/0aad2dac/WqcEdYf-MK8b5RVoXazhZ_model.obj",
      "content_type": "text/plain",
      "file_name": "model.obj",
      "file_size": 3328531
    },
    "usdz": {
      "url": "https://cdn.aimlapi.com/flamingo/files/b/0aad2dac/C_djfa2Opd-qWRDxb5oLU_model.usdz",
      "content_type": "model/vnd.usdz+zip",
      "file_name": "model.usdz",
      "file_size": 5195846
    },
    "blend": null,
    "stl": {
      "url": "https://cdn.aimlapi.com/flamingo/files/b/0aad2dac/-U0qMp5pgIb57SiQncG3w_model.stl",
      "content_type": "application/octet-stream",
      "file_name": "model.stl",
      "file_size": 1529634
    }
  },
  "texture_urls": [
    {
      "base_color": {
        "url": "https://cdn.aimlapi.com/flamingo/files/b/0aad2dad/8fZ_uVJ9IGRQjFfXiRWvO_texture_0.png",
        "content_type": "image/png",
        "file_name": "texture_0.png",
        "file_size": 6682194
      },
      "metallic": null,
      "normal": null,
      "roughness": null
    }
  ],
  "seed": 107751191,
  "rigged_character_glb": null,
  "rigged_character_fbx": null,
  "basic_animations": null,
  "rig_task_id": null,
  "requestId": "01a10cc3-589e-7993-b964-3fe08ef2b484",
  "meta": {
    "model": "meshy/v6/image-to-3d",
    "provider": "falai",
    "usage": {
      "credits_used": 2080000,
      "usd_spent": 1.04
    },
    "metrics": {
      "duration_ms": 323751
    }
  }
}
```
{% endcode %}

</details>

## Reading the response

There is no `data` array here — the response is the model itself:

* **`model_glb`** is the main output. Each file object carries `url`, `content_type`, `file_name` and `file_size`.
* **`model_urls`** holds the same mesh exported to `glb`, `fbx`, `obj`, `usdz` and `stl`. `blend` is `null` unless it was produced. Pick the format your engine wants; you do not pay extra for the others.
* **`thumbnail`** is a rendered preview, handy for a gallery without loading the mesh.
* **`texture_urls`** holds the texture maps. Only `base_color` is filled by default — set `enable_pbr: true` to also get `metallic`, `normal` and `roughness`.
* **`animation_*`, `rigged_character_*`, `basic_animations`, `rig_task_id`** stay `null` unless you asked for rigging or animation.
* **`meta.usage.usd_spent`** is what the generation cost, and `meta.metrics.duration_ms` how long it took.

{% hint style="info" %}
The download URLs are not permanent. Fetch the files you need as soon as the response arrives and store them yourself rather than linking to `cdn.aimlapi.com` from your application.
{% endhint %}

## Tuning the mesh

The defaults give a standard, textured, triangle-topology mesh. The parameters worth knowing:

| Parameter          | What it does                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| `model_type`       | `standard` (detailed), `lowpoly` (clean low-poly) or `smart-topology`                                     |
| `target_polycount` | 100 to 300,000 polygons — at most 15,000 with `smart-topology`. The result may deviate from the target     |
| `topology`         | `quad` for smooth surfaces, `triangle` for detailed geometry                                              |
| `symmetry_mode`    | `auto` detects symmetry, `on` enforces it, `off` disables it                                              |
| `enable_pbr`       | adds metallic, roughness and normal maps to `texture_urls`                                                |
| `texture_prompt`   | up to 600 characters of text to steer the texturing                                                       |
| `should_texture`   | set to `false` for an untextured mesh                                                                     |
| `pose_mode`        | `a-pose` or `t-pose` for characters, empty for no specific pose                                           |

A game-ready low-poly asset, for example:

```json
{
  "model": "meshy/v6/image-to-3d",
  "image_url": "https://example.com/your-reference.jpg",
  "model_type": "lowpoly",
  "target_polycount": 5000,
  "topology": "quad",
  "enable_pbr": true
}
```

{% hint style="info" %}
Choose reference images where the object is unobstructed and does not blend into the background. The model infers the unseen sides, so detail that only appears on the back of the object will be approximated.
{% endhint %}
