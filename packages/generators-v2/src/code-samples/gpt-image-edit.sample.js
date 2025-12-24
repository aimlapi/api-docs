export const gptImageEditSample = (options) => [
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
    lang: 'HTTP',
    source: `POST /v1/images/edits HTTP/1.1
Host: api.aimlapi.com
Authorization: Bearer <YOUR_AIMLAPI_KEY>
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="model"

${options.name}
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="prompt"

Add a crown to the T-rex's head.
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="image"; filename="<IMAGE_NAME>"
Content-Type: image/png

(data)
------WebKitFormBoundary7MA4YWxkTrZu0gW--`,
  },
];
