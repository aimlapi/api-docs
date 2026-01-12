export const videoSample = (options, fullSchema) => {
  const params = {
    model: options.name,
  };
  const schema =
    fullSchema?.paths?.['/v2/video/generations']?.post?.requestBody?.content?.[
      'application/json'
    ]?.schema;
  const requiredModelParams = schema?.required || [];
  const lengthRequiredParams = requiredModelParams?.length;

  if (options.name?.includes('pixverse/lip-sync')) {
    Object.assign(params, {
      video_url:
        'https://storage.googleapis.com/falserverless/model_tests/kling/kling-v2.5-turbo-pro-text-to-video-output.mp4',
      lip_sync_tts_content: 'Hello World!',
      lip_sync_tts_speaker: 'Harper',
    });
  } else if (
    (options.name?.includes('transition') &&
      options.name?.includes('pixverse')) ||
    options.name?.includes('gen3a_turbo')
  ) {
    Object.assign(params, {
      prompt:
        'The camera moves down, dives underwater and moves through a dark, moody world of greenish light and drifting plants. Giant white koi fish emerge from the shadows and turn curiously toward the camera as it passes, their scales shimmering faintly in the murky depths.',
      image_url:
        'https://raw.githubusercontent.com/aimlapi/api-docs/main/reference-files/landscape.jpg',
      tail_image_url: 'https://cdn.aimlapi.com/assets/content/white-fish.png',
    });
  } else if (
    requiredModelParams?.includes('video_url') &&
    requiredModelParams?.includes('image_url') &&
    lengthRequiredParams === 3
  ) {
    Object.assign(params, {
      video_url:
        'https://storage.googleapis.com/falserverless/example_inputs/wan_animate_input_video.mp4',
      image_url:
        'https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg',
    });
  } else if (
    requiredModelParams?.includes('video_url') &&
    requiredModelParams?.includes('image_url') &&
    lengthRequiredParams === 2
  ) {
    Object.assign(params, {
      video_url:
        'https://cdn.aimlapi.com/flamingo/files/b/0a8752bc/2xrNS217ngQ3wzXqA7LXr_output.mp4',
      image_url:
        'https://cdn.aimlapi.com/flamingo/files/b/0a875302/8NaxQrQxDNHppHtqcchMm.png',
    });
  } else if (
    requiredModelParams?.includes('video_url') &&
    Boolean(schema?.properties?.prompt)
  ) {
    Object.assign(params, {
      video_url:
        'https://zovi0.github.io/public_misc/kling-v2-master-t2v-racoon.mp4',
      prompt:
        'Add a small fairy as a rider on the raccoon’s back. She must have a black-and-golden face and a cloak in the colors of a dark emerald tropical butterfly with bright blue shimmering spots.',
    });
  } else if (
    requiredModelParams?.includes('video_urls') &&
    Boolean(schema?.properties?.prompt)
  ) {
    Object.assign(params, {
      video_urls: [
        'https://zovi0.github.io/public_misc/kling-v2-master-t2v-racoon.mp4'
      ],
      prompt:
        'Add a small fairy as a rider on the raccoon’s back. She must have a black-and-golden face and a cloak in the colors of a dark emerald tropical butterfly with bright blue shimmering spots.',
    });
  } else if (
    requiredModelParams?.includes('character') &&
    requiredModelParams?.includes('reference')
  ) {
    Object.assign(params, {
      character: {
        type: 'image',
        url: 'https://fs.tonkosti.ru/33/ol/33olc2eyzj6s4w8ksg8kkc0gg.jpg',
      },
      reference: {
        type: 'video',
        url: 'https://videos.pexels.com/video-files/3044160/3044160-uhd_2560_1440_24fps.mp4',
      },
    });
  } else if (
    requiredModelParams?.includes('effect_scene') &&
    requiredModelParams?.includes('image_url')
  ) {
    Object.assign(params, {
      image_url: [
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
        'https://storage.googleapis.com/falserverless/juggernaut_examples/QEW5VrzccxGva7mPfEXjf.png',
      ],
      effect_scene: 'heart_gesture',
    });
  } else if (
    requiredModelParams.includes('image_url') &&
    requiredModelParams.includes('audio_url') &&
    lengthRequiredParams === 3
  ) {
    Object.assign(params, {
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
    Object.assign(params, {
      prompt: options.codeSamples.includes('lipsync')
        ? "A woman looks into the camera, breathes in, then exclaims energetically, ’Hello world!’"
        : 'A woman looks into the camera and puts on a hat.',
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
    Object.assign(params, {
      prompt: options.codeSamples.includes('lipsync')
        ? "A woman looks into the camera, breathes in, then exclaims energetically, ’Hello world!’"
        : 'A woman looks into the camera and puts on a hat.',
      image_url:
        'https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-1.jpeg',
      tail_image_url:
        'https://storage.googleapis.com/falserverless/example_inputs/veo31-flf2v-input-2.jpeg',
    });
  } else if (
    requiredModelParams.includes('image_urls') &&
    requiredModelParams.includes('prompt')
  ) {
    Object.assign(params, {
      prompt:
        'A graceful ballerina dancing outside a circus tent on green grass, with colorful wildflowers swaying around her as she twirls and poses in the meadow.',
      image_urls: [
        'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-1.png',
        'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-2.png',
        'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-3.png',
      ],
    });
  } else if (
    requiredModelParams.includes('image_list') &&
    lengthRequiredParams === 2
  ) {
    Object.assign(params, {
      image_list: [
        'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-1.png',
        'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-2.png',
        'https://storage.googleapis.com/falserverless/example_inputs/veo31-r2v-input-3.png',
      ],
    });
  } else if (
    requiredModelParams.includes('image_url') &&
    Boolean(schema?.properties?.prompt)
  ) {
    Object.assign(params, {
      prompt: options.codeSamples.includes('lipsync')
        ? "A woman looks into the camera, breathes in, then exclaims energetically, ’Hello world!’"
        : 'Mona Lisa puts on glasses with her hands.',
      image_url:
        'https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/20240620/1.jpeg',
    });
  } else if (
    lengthRequiredParams === 2 &&
    requiredModelParams.includes('prompt')
  ) {
    Object.assign(params, {
      prompt: options.codeSamples.includes('lipsync')
        ? 'A racoon is happily eating an ice cream. Suddenly, he pauses, looks directly into the camera, and says with full confidence: ’Hello, two-legged!’ His lip movements perfectly match the speech. Then, in a strong Irish accent, he adds: ’Wanna some?’ — while extending the half-eaten ice cream toward the camera.'
        : "A menacing evil dragon appears in a distance above the tallest mountain, then rushes toward the camera with its jaws open, revealing massive fangs. We see it’s coming.",
    });
  } else {
    console.error(`UNABLE TO GENERATE CODE SAMPLE FOR MODEL ${options.name}`);
    return;
  }

  const jsonBody = JSON.stringify(params, null, 2);
  return [
    {
      lang: 'JavaScript',
      source: `async function main() {
  const response = await fetch('https://api.aimlapi.com/v2/video/generations', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer <YOUR_AIMLAPI_KEY>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(${jsonBody.replace(/\n/g, '\n    ')}),
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
    "https://api.aimlapi.com/v2/video/generations",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer <YOUR_AIMLAPI_KEY>",
    },
    json=${jsonBody.replace(/\n/g, '\n    ')}
)

data = response.json()
print(data)`,
    },
    {
      lang: 'cURL',
      source: `curl -L \\
  --request POST \\
  --url 'https://api.aimlapi.com/v2/video/generations' \\
  --header 'Authorization: Bearer <YOUR_AIMLAPI_KEY>' \\
  --header 'Content-Type: application/json' \\
  --data '${jsonBody.replace(/'/g, "\\'").replace(/\n/g, '\n    ')}'`,
    },
    {
      lang: 'HTTP',
      source: `POST /v2/video/generations HTTP/1.1
Host: api.aimlapi.com
Authorization: Bearer <YOUR_AIMLAPI_KEY>
Content-Type: application/json
Accept: */*

${jsonBody}`,
    },
  ];
};
