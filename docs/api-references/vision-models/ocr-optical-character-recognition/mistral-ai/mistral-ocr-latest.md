# mistral-ocr-latest

{% hint style="info" %}
This documentation is valid for the following list of our models:

* `mistral/mistral-ocr-latest`
{% endhint %}

## Model Overview

This Optical Character Recognition API from Mistral sets a new standard in document understanding. Unlike other models, Mistral OCR comprehends each element of documents—media, text, tables, equations—with unprecedented accuracy and cognition. It takes images and PDFs as input and extracts content in an ordered interleaved text and images.

## Setup your API Key

If you don’t have an API key for the AI/ML API yet, feel free to use our [Quickstart guide](https://docs.aimlapi.com/quickstart/setting-up).

## How to Make a Call

1. Copy the code from one of the [examples](mistral-ocr-latest.md#example-1-process-a-pdf-file) below, depending on whether you want to process an image or a PDF.
2. Replace `<YOUR_AIMLAPI_KEY>` with your AIML API key from [your personal account](https://aimlapi.com/app/keys).
3. Replace the URL of the document or image with the one you need.
4. If you need to use different parameters, refer to the API schema below for valid values and operational logic.
5. Save the modified code as a Python file and run it in an IDE[^1] or via the console.

## API Schema

{% openapi src="https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/vision-models-ocr/Mistral-AI/mistral-ocr-latest.json" path="/v1/ocr" method="post" %}
[https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/vision-models-ocr/Mistral-AI/mistral-ocr-latest.json](https://raw.githubusercontent.com/aimlapi/api-docs/refs/heads/main/docs/api-references/vision-models-ocr/Mistral-AI/mistral-ocr-latest.json)
{% endopenapi %}

## Example #1: Process a PDF File

Let's process a PDF file from the internet using the described model:

{% code overflow="wrap" %}
```python
import requests


def main():
    response = requests.post(
        "https://api.aimlapi.com/v1/ocr",
        headers={
            "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "document": {
                "type": "document_url",
                "document_url": "https://css4.pub/2015/textbook/somatosensory.pdf"
            },
            "model": "mistral/mistral-ocr-latest",
        },
    )

    response.raise_for_status()
    data = response.json()

    print(data)


if __name__ == "__main__":
    main()
    
```
{% endcode %}

<details>

<summary>Response</summary>

{% code overflow="wrap" %}
```json5
{'pages': [{'index': 0, 'markdown': "# Anatomy of the Somatosensory System \n\nFrom Wiкibooks ${ }^{1}$\n\nOur somatosensory system consists of sensors in the skin and sensors in our muscles, tendons, and joints. The receptors in the skin, the so called cutaneous receptors, tell us about temperature (thermoreceptors), pressure and surface texture (mechano receptors), and pain (nociceptors). The receptors in muscles and joints provide information about muscle length, muscle tension, and joint angles.\n\n## Cutaneous receptors\n\nSensory information from Meissner corpuscles and rapidly adapting afferents leads to adjustment of grip force when objects are lifted. These afferents respond with a brief burst of action potentials when objects move a small distance during the early stages of lifting. In response to\n![img-0.jpeg](img-0.jpeg)\n\nThis is a sample document to showcase page-based formatting. It contains a chapter from a Wikibook called Sensory Systems. None of the content has been changed in this article, but some content has been removed.\n\nFigure 1: Receptors in the human skin: Mechanoreceptors can be free receptors or encapsulated. Examples for free receptors are the hair receptors at the roots of hairs. Encapsulated receptors are the Pacinian corpuscles and the receptors in the glabrous (hairless) skin: Meissner corpuscles, Ruffini corpuscles and Merkel's disks.\n\n[^0]\n[^0]:    ${ }^{1}$ The following description is based on lecture notes from Laszlo Zaborszky, from Rutgers University.", 'images': [{'id': 'img-0.jpeg', 'top_left_x': 155, 'top_left_y': 1073, 'bottom_right_x': 937, 'bottom_right_y': 1694, 'image_base64': None}], 'dimensions': {'dpi': 200, 'height': 1970, 'width': 1575}}, {'index': 1, 'markdown': "Figure 2: Mammalian muscle spindle showing typical position in a muscle (left), neuronal connections in spinal cord (middle) and expanded schematic (right). The spindle is a stretch receptor with its own motor supply consisting of several intrafusal muscle fibres. The sensory endings of a primary (group Ia) afferent and a secondary (group II) afferent coil around the non-contractile central portions of the intrafusal fibres.\n![img-1.jpeg](img-1.jpeg)\nrapidly adapting afferent activity, muscle force increases reflexively until the gripped object no longer moves. Such a rapid response to a tactile stimulus is a clear indication of the role played by somatosensory neurons in motor activity.\n\nThe slowly adapting Merkel's receptors are responsible for form and texture perception. As would be expected for receptors mediating form perception, Merkel's receptors are present at high density in the digits and around the mouth ( $50 / \\mathrm{mm}^{2}$ of skin surface), at lower density in other glabrous surfaces, and at very low density in hairy skin. This innervations density shrinks progressively with the passage of time so that by the age of 50 , the density in human digits is reduced to $10 / \\mathrm{mm}^{2}$. Unlike rapidly adapting axons, slowly adapting fibers respond not only to the initial indentation of skin, but also to sustained indentation up to several seconds in duration.\n\nActivation of the rapidly adapting Pacinian corpuscles gives a feeling of vibration, while the slowly adapting Ruffini corpuscles respond to the lataral movement or stretching of skin.\n\n## Nociceptors\n\nNociceptors have free nerve endings. Functionally, skin nociceptors are either high-threshold mechanoreceptors", 'images': [{'id': 'img-1.jpeg', 'top_left_x': 606, 'top_left_y': 228, 'bottom_right_x': 1431, 'bottom_right_y': 705, 'image_base64': None}], 'dimensions': {'dpi': 200, 'height': 1970, 'width': 1575}}, {'index': 2, 'markdown': '|  | Rapidly adapting | Slowly adapting |\n| :-- | :-- | :-- |\n| Surface receptor / <br> small receptive <br> field | Hair receptor, Meissner\'s corpuscle: De- <br> tect an insect or a very fine vibration. <br> Used for recognizing texture. | Merkel\'s receptor: Used for spa- <br> tial details, e.g. a round surface <br> edge or "an X" in brail. |\n| Deep receptor / <br> large receptive <br> field | Pacinian corpuscle: "A diffuse vibra- <br> tion" e.g. tapping with a pencil. | Ruffini\'s corpuscle: "A skin <br> stretch". Used for joint position <br> in fingers. |\n\nTable 1\nor polymodal receptors. Polymodal receptors respond not only to intense mechanical stimuli, but also to heat and to noxious chemicals. These receptors respond to minute punctures of the epithelium, with a response magnitude that depends on the degree of tissue deformation. They also respond to temperatures in the range of $40-60^{\\circ} \\mathrm{C}$, and change their response rates as a linear function of warming (in contrast with the saturating responses displayed by non-noxious thermoreceptors at high temperatures).\n\nPain signals can be separated into individual components, corresponding to different types of nerve fibers used for transmitting these signals. The rapidly transmitted signal, which often has high spatial resolution, is called first pain or cutaneous pricking pain. It is well localized and easily tolerated. The much slower, highly affective component is called second pain or burning pain; it is poorly localized and poorly tolerated. The third or deep pain, arising from viscera, musculature and joints, is also poorly localized, can be chronic and is often associated with referred pain.\n\n## Muscle Spindles\n\nScattered throughout virtually every striated muscle in the body are long, thin, stretch receptors called muscle spindles. They are quite simple in principle, consisting of a few small muscle fibers with a capsule surrounding the middle third of the fibers. These fibers are called intrafusal fibers, in contrast to the ordinary extrafusal fibers. The ends of the intrafusal fibers are attached to extrafusal fibers, so whenever the muscle is stretched, the intrafusal fibers are also\n\nNotice how figure captions and sidenotes are shown in the outside margin (on the left or right, depending on whether the page is left or right). Also, figures are floated to the top/ bottom of the page. Wide content, like the table and Figure 3, intrude into the outside margins.', 'images': [], 'dimensions': {'dpi': 200, 'height': 1970, 'width': 1575}}, {'index': 3, 'markdown': '![img-2.jpeg](img-2.jpeg)\n\nFigure 3: Feedback loops for proprioceptive signals for the perception and control of limb movements. Arrows indicate excitatory connections; filled circles inhibitory connections.\n\nFor more examples of how to use HTML and CSS for paper-based publishing, see css4.pub.\nstretched. The central region of each intrafusal fiber has few myofilaments and is non-contractile, but it does have one or more sensory endings applied to it. When the muscle is stretched, the central part of the intrafusal fiber is stretched and each sensory ending fires impulses.\n\nMuscle spindles also receive a motor innervation. The large motor neurons that supply extrafusal muscle fibers are called alpha motor neurons, while the smaller ones supplying the contractile portions of intrafusal fibers are called gamma neurons. Gamma motor neurons can regulate the sensitivity of the muscle spindle so that this sensitivity can be maintained at any given muscle length.\n\n## Joint receptors\n\nThe joint receptors are low-threshold mechanoreceptors and have been divided into four groups. They signal different characteristics of joint function (position, movements, direction and speed of movements). The free receptors or type 4 joint receptors are nociceptors.', 'images': [{'id': 'img-2.jpeg', 'top_left_x': 155, 'top_left_y': 226, 'bottom_right_x': 1307, 'bottom_right_y': 843, 'image_base64': None}], 'dimensions': {'dpi': 200, 'height': 1970, 'width': 1575}}], 'model': 'mistral-ocr-2503-completion', 'usage_info': {'pages_processed': 4, 'doc_size_bytes': 145349}}
```
{% endcode %}

</details>



[^1]: An integrated development environment (IDE) is a software application that helps programmers write, test, and debug software code efficiently.
