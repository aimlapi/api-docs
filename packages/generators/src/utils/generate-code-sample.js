const { MODELS_URL } = require('../config');

async function fetchModelsCop(modelName) {
  return await fetch(MODELS_URL).then((res) =>
    res.json().then((json) => json.find((m) => m.name === modelName))
  );
}

function buildCodeSamplesByBody(
  body,
  url = 'https://api.aimlapi.com/v2/video/generations'
) {
  return [
    {
      lang: 'JavaScript',
      source: `async function main() {
  const response = await fetch('${url}', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <YOUR_API_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(${body.replace(/\n/g, '\n    ')}),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();`,
    },
    {
      lang: 'Python',
      source: `import requests

response = requests.post(
    "${url}",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer <YOUR_API_KEY>",
    },
    json=${body.replace(/\n/g, '\n      ')}
)

data = response.json()
print(data)`,
    },
    {
      lang: 'cURL',
      source: `curl -L \\
  --request POST \\
  --url '${url}' \\
  --header 'Authorization: Bearer <YOUR_API_KEY>' \\
  --header 'Content-Type: application/json' \\
  --data '${body.replace(/'/g, "\\'").replace(/\n/g, '\n    ')}'`,
    },
    {
      lang: 'HTTP',
      source: `POST / HTTP/1.1
Host: ${url}
Authorization: Bearer <YOUR_API_KEY>
Content-Type: application/json

${body}`,
    },
  ];
}

async function generateCodeSample(fetchedModels, modelName, schema, path) {
  const model = fetchedModels.find((m) => m.name === modelName);
  if (!model) {
    return;
  }
  const additionalParamsMap = {
    chatAudio: {
      python: `,
        "modalities": ["text", "audio"],
        "audio": {"voice": "alloy", "format": "pcm16"}`,
      js: `,
        modalities: ['text', 'audio'],
        audio: { voice: 'alloy', format: 'pcm16' },`,
      curl: `,
    "modalities": ["text", "audio"], 
    "audio": {"voice": "alloy", "format": "pcm16"}`,
      http: `,
  "modalities": ["text", "audio"], 
  "audio": {"voice": "alloy", "format": "pcm16"}`,
    },
    textToImage: {
      python: `,
        "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."`,
      js: `,
      prompt: 'A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses.',`,
      curl: `,
    "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."`,
      http: `,
  "prompt": "A T-Rex relaxing on a beach, lying on a sun lounger and wearing sunglasses."`,
    },
    imageToImage: {
      python: `,
        "prompt": "Add a crown to the T-rex's head.",
        "${
          modelName.includes('image-to-image') ||
          modelName.includes('edit-image') ||
          modelName === 'triposr'
            ? 'image_url'
            : 'image'
        }": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png"`,
      js: `,
      prompt: "Add a crown to the T-rex's head.",
      ${
        modelName.includes('image-to-image') ||
        modelName.includes('edit-image') ||
        modelName === 'triposr'
          ? 'image_url'
          : 'image'
      }: 'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png',`,
      curl: `,
    "prompt": "Add a crown to the T-rexs head.",
    "${
      modelName.includes('image-to-image') ||
      modelName.includes('edit-image') ||
      modelName === 'triposr'
        ? 'image_url'
        : 'image'
    }": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png"`,
      http: `,
  "prompt": "Add a crown to the T-rex's head.",
  "${
    modelName.includes('image-to-image') ||
    modelName.includes('edit-image') ||
    modelName === 'triposr'
      ? 'image_url'
      : 'image'
  }": "https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/t-rex.png"`,
    },
  };
  let additionalParamKey;
  if (modelName.includes('-audio-')) {
    additionalParamKey = 'chatAudio';
  } else if (model.category === 'image-models') {
    additionalParamKey = model.features?.includes('image-to-image')
      ? 'imageToImage'
      : 'textToImage';
  }
  if (model.category === 'text-models-llm') {
    return [
      {
        lang: 'JavaScript',
        source: `async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: '${modelName}',
      messages:[
          {
              role:'user',
              content: 'Hello'
          }
      ]${additionalParamKey ? additionalParamsMap[additionalParamKey].js : ''}
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();`,
      },
      {
        lang: 'Python',
        source: `import requests

response = requests.post(
    "https://api.aimlapi.com/v1/chat/completions",
    headers={
        "Content-Type":"application/json", 
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
    },
    json={
        "model":"${modelName}",
        "messages":[
            {
                "role":"user",
                "content":"Hello"
            }
        ]${
          additionalParamKey
            ? additionalParamsMap[additionalParamKey].python
            : ''
        }
    }
)

data = response.json()
print(data)`,
      },
      {
        lang: 'cURL',
        source: `curl -L \\
  --request POST \\
  --url 'https://api.aimlapi.com/v1/chat/completions' \\
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "model": "${modelName}",
    "messages": [
      {
        "role": "user",
        "content": "hi"
      }
    ]${additionalParamKey ? additionalParamsMap[additionalParamKey].curl : ''}
  }'`,
      },
      {
        lang: 'HTTP',
        source: `POST /v1/chat/completions HTTP/1.1
Host: api.aimlapi.com
Authorization: Bearer <YOUR_AIMLAPI_KEY>
Content-Type: application/json

{
  "model": "${modelName}",
  "messages": [
    {
      "role": "user",
      "content": "hi"
    }
  ]${additionalParamKey ? additionalParamsMap[additionalParamKey].http : ''}
}`,
      },
    ];
  } else if (modelName === 'openai/gpt-image-1') {
    return [
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
            "model":"${modelName}",
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
  --form "prompt=Add a crown to the T-rex's head." \\
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

${modelName}
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
  } else if (model.category === 'image-models') {
    return [
      {
        lang: 'JavaScript',
        source: `async function main() {
  const response = await fetch('https://api.aimlapi.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: '${modelName}'${
          additionalParamKey ? additionalParamsMap[additionalParamKey].js : ''
        }
    }),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();`,
      },
      {
        lang: 'Python',
        source: `import requests

response = requests.post(
    "https://api.aimlapi.com/v1/images/generations",
    headers={
        "Content-Type":"application/json", 
        "Authorization":"Bearer <YOUR_AIMLAPI_KEY>",
    },
    json={
        "model":"${modelName}"${
          additionalParamKey
            ? additionalParamsMap[additionalParamKey].python
            : ''
        }
    }
)

data = response.json()
print(data)`,
      },
      {
        lang: 'cURL',
        source: `curl -L \\
  --request POST \\
  --url 'https://api.aimlapi.com/v1/images/generations' \\
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "model": "${modelName}"${
          additionalParamKey ? additionalParamsMap[additionalParamKey].curl : ''
        }
  }'`,
      },
      {
        lang: 'HTTP',
        source: `POST /v1/images/generations HTTP/1.1
Host: api.aimlapi.com
Authorization: Bearer <YOUR_AIMLAPI_KEY>
Content-Type: application/json

{
  "model": "${modelName}"${
          additionalParamKey ? additionalParamsMap[additionalParamKey].http : ''
        }
}`,
      },
    ];
  } else if (model.category === 'video-models') {
    const modelDetails = await fetchModelsCop(modelName);
    const requiredModelParams = modelDetails.params?.required || [];
    const customParams = {
      model: modelName,
    };
    if (modelName === 'runway/gen4_aleph') {
      Object.assign(customParams, {
        video_url:
          'https://zovi0.github.io/public_misc/kling-v2-master-t2v-racoon.mp4',
        prompt:
          'Add a small fairy as a rider on the raccoon’s back. She must have a black-and-golden face and a cloak in the colors of a dark emerald tropical butterfly with bright blue shimmering spots.',
      });
    } else if (modelName === 'runway/act_two') {
      Object.assign(customParams, {
        character: {
          type: 'image',
          url: 'https://fs.tonkosti.ru/33/ol/33olc2eyzj6s4w8ksg8kkc0gg.jpg',
        },
        reference: {
          type: 'video',
          url: 'https://videos.pexels.com/video-files/3044160/3044160-uhd_2560_1440_24fps.mp4',
        },
      });
    } else if (modelName === 'kling-video/v1.6/standard/multi-image-to-video') {
      Object.assign(customParams, {
        image_list: [
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-1.png',
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-2.png',
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-3.png',
        ],
      });
    } else if (modelName === 'pixverse/lip-sync') {
      Object.assign(customParams, {
        video_url:
          'https://storage.googleapis.com/falserverless/model_tests/kling/kling-v2.5-turbo-pro-text-to-video-output.mp4',
        lip_sync_tts_content: 'Hello World!',
        lip_sync_tts_speaker: 'Harper',
      });
    } else if (modelName.includes('-effects')) {
      Object.assign(customParams, {
        image_url: [
          'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
          'https://storage.googleapis.com/falserverless/juggernaut_examples/QEW5VrzccxGva7mPfEXjf.png',
        ],
        effect_scene: 'heart_gesture',
      });
    } else if (
      requiredModelParams.includes('video_url') &&
      requiredModelParams.includes('image_url')
    ) {
      Object.assign(customParams, {
        video_url:
          'https://storage.googleapis.com/falserverless/example_inputs/wan_animate_input_video.mp4',
        image_url:
          'https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg',
      });
    } else if (
      requiredModelParams.includes('video_url') &&
      Boolean(modelDetails.params?.properties?.prompt)
    ) {
      Object.assign(customParams, {
        video_url:
          'https://storage.googleapis.com/falserverless/example_inputs/wan_animate_input_video.mp4',
        prompt:
          "A lone woman strides through the neon-drenched streets of Tokyo at night.  Her crimson dress, a vibrant splash of color against the deep blues and blacks of the cityscape, flows slightly with each step. A tailored black jacket, crisp and elegant, contrasts sharply with the dress's rich texture. Medium shot:  The city hums around her, blurred lights creating streaks of color in the background. Close-up:  The fabric of her dress catches the streetlight's glow, revealing a subtle silk sheen and the intricate stitching at the hem. Her black jacket’s subtle texture is visible – a fine wool perhaps, with a matte finish. The overall mood is one of quiet confidence and mystery, a vibrant woman navigating a bustling, nocturnal landscape. High resolution 4k.",
      });
    } else if (
      requiredModelParams.includes('image_url') &&
      requiredModelParams.includes('audio_url')
    ) {
      Object.assign(customParams, {
        image_url:
          'https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg',
        audio_url:
          'https://storage.googleapis.com/falserverless/example_inputs/omnihuman_audio.mp3',
      });
    } else if (
      requiredModelParams.includes('image_url') &&
      requiredModelParams.includes('last_image_url') &&
      requiredModelParams.includes('prompt')
    ) {
      Object.assign(customParams, {
        prompt:
          "A woman looks into the camera, breathes in, then exclaims energetically, 'Hello world!'",
        image_url:
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg',
        last_image_url:
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg',
      });
    } else if (
      requiredModelParams.includes('image_url') &&
      requiredModelParams.includes('tail_image_url') &&
      requiredModelParams.includes('prompt')
    ) {
      Object.assign(customParams, {
        prompt:
          "A woman looks into the camera, breathes in, then exclaims energetically, 'Hello world!'",
        image_url:
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg',
        tail_image_url:
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg',
      });
    } else if (
      requiredModelParams.includes('image_urls') &&
      requiredModelParams.includes('prompt')
    ) {
      Object.assign(customParams, {
        prompt:
          'A graceful ballerina dancing outside a circus tent on green grass, with colorful wildflowers swaying around her as she twirls and poses in the meadow.',
        image_urls: [
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-1.png',
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-2.png',
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-3.png',
        ],
      });
    } else if (requiredModelParams.includes('image_list')) {
      Object.assign(customParams, {
        image_list: [
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-1.png',
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-2.png',
          'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-3.png',
        ],
      });
    } else if (
      requiredModelParams.includes('image_url') &&
      Boolean(modelDetails.params?.properties?.prompt)
    ) {
      Object.assign(customParams, {
        prompt:
          'Mona Lisa nervously puts on glasses with her hands and asks her off-screen friend to the left: ‘Do they suit me?’ She then tilts her head slightly to one side and then the other, so the unseen friend can better judge.',
        image_url:
          'https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg',
      });
    } else if (
      (requiredModelParams.length === 1 &&
        requiredModelParams.includes('prompt')) ||
      (requiredModelParams.length === 2 &&
        requiredModelParams.includes('prompt') &&
        requiredModelParams.includes('model'))
    ) {
      Object.assign(customParams, {
        prompt:
          "A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it's coming.",
      });
    } else {
      console.error(`Unable to generate code sample for model ${modelName}`);
      return;
    }

    const jsonBody = JSON.stringify(customParams, null, 2);

    return buildCodeSamplesByBody(jsonBody);
  } else if (model.category === 'music-models') {
    const requiredModelParams = schema?.required || [];
    const customParams = {
      model: modelName,
    };
    if (
      requiredModelParams.includes('prompt') &&
      requiredModelParams.includes('lyrics')
    ) {
      Object.assign(customParams, {
        prompt:
          'A calm and soothing instrumental music with gentle piano and soft strings.',
        lyrics:
          '[Verse]\nStreetlights flicker, the night breeze sighs\nShadows stretch as I walk alone\nAn old coat wraps my silent sorrow\nWandering, longing, where should I go\n[Chorus]\nPushing the wooden door, the aroma spreads\nIn a familiar corner, a stranger gazes back\nWarm lights flicker, memories awaken\nIn this small cafe, I find my way\n[Verse]\nRaindrops tap on the windowpane\nA melody plays, soft and low\nThe clink of cups, the murmur of dreams\nIn this haven, I find my home\n[Chorus]\nPushing the wooden door, the aroma spreads\nIn a familiar corner, a stranger gazes back\nWarm lights flicker, memories awaken\nIn this small cafe, I find my way',
      });
    } else if (requiredModelParams.includes('prompt')) {
      Object.assign(customParams, {
        prompt: 'lo-fi pop hip-hop ambient music',
      });
    } else {
      console.error(`Unable to generate code sample for model ${modelName}`);
      return;
    }
    const jsonBody = JSON.stringify(customParams, null, 2);

    return buildCodeSamplesByBody(
      jsonBody,
      'https://api.aimlapi.com/v2/generate/audio'
    );
  } else if (model.category === 'speech-models') {
    const requiredModelParams = schema?.required || [];
    const customParams = {
      model: modelName,
    };
    let url = 'https://api.aimlapi.com/v1/tts';
    if (path.includes('stt')) {
      url = 'https://api.aimlapi.com/v1/stt/create';
      Object.assign(customParams, {
        url: 'https://audio-samples.github.io/samples/mp3/blizzard_primed/sample-0.mp3',
      });
    } else if (requiredModelParams.includes('text')) {
      Object.assign(customParams, {
        text: 'Cities of the future promise to radically transform how people live, work, and move. Instead of sprawling layouts, we’ll see vertical structures that integrate residential, work, and public spaces into single, self-sustaining ecosystems. Architecture will adapt to climate conditions, and buildings will be energy-efficient—generating power through solar panels, wind turbines, and even foot traffic.',
      });
      if (
        requiredModelParams.includes('voice') &&
        schema.properties?.voice?.enum?.[0]
      ) {
        Object.assign(customParams, {
          voice: schema.properties?.voice?.enum?.[0],
        });
      }
    } else if (requiredModelParams.includes('script')) {
      Object.assign(customParams, {
        script:
          'Speaker 1: Wow, whats happening, Alice? \nSpeaker 2: Oh, just the usual… a full-blown AI revolution. Nothing to worry about',
      });
    } else {
      console.error(`Unable to generate code sample for model ${modelName}`);
      return;
    }
    const jsonBody = JSON.stringify(customParams, null, 2);

    return buildCodeSamplesByBody(jsonBody, url);
  }
}

module.exports = generateCodeSample;
