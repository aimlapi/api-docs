export const gptImageEditSample = (options) => [
  {
    lang: 'cURL',
    source: `curl -L \\
  --request POST \\
  --url 'https://api.aimlapi.com/v1/images/edits' \\
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \\
  --form "prompt=Add a crown to the T-rex’s head." \\
  --form "image=@<YOUR_IMAGE_PATH.png>;type=image/png;filename=<IMAGE_NAME>"`,
  },
  {
    lang: 'JavaScript',
    source: `import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

async function main() {
  const formData = new FormData();
  formData.append('model', 'openai/gpt-image-1');
  formData.append('prompt', "Add a crown to the T-rex's head.");
  formData.append('image', fs.createReadStream('<YOUR_IMAGE_PATH.png>'), {
    filename: '<IMAGE_NAME>',
    contentType: 'image/png',
  });

  const response = await fetch('https://api.aimlapi.com/v1/images/edits', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <YOUR_AIMLAPI_KEY>',
      ...formData.getHeaders(),
    },
    body: formData,
  });

  const data = await response.json();
  console.log(data);
}

main();`,
  },
  {
    lang: 'Python',
    source: `import requests
with open("<YOUR_IMAGE_PATH.png>", "rb") as file:
    files = {"image": ("<IMAGE_NAME>", file, "image/png")}
    response = requests.post(
        "https://api.aimlapi.com/v1/images/edits",
        headers={
            "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
        },
        data={
            "model":"${options.name}",
            "prompt": "Add a crown to the T-rex's head."
        },
        files=files
    )

    data = response.json()
    print(data)`,
  },
];
