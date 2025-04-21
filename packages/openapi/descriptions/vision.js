export default {
  image: {
    desc: `The image to be processed.`,
    imageUri: {
      desc: `The URI of the source image`,
    },
  },
  features: {
    desc: `Requested features.`,
    type: {
      desc: `The feature type.`,
    },
    maxResults: {
      desc: `Maximum number of results of this type.`,
    },
    model: {
      desc: `Model to use for the feature.`,
    },
  },
  imageContext: {
    desc: `Additional context that may accompany the image.`,
    latLongRect: {
      desc: `Rectangle determined by min and max LatLng pairs.`,
      minLatLng: {
        desc: `Min lat/long pair.`,
      },
      maxLatLng: {
        desc: `Max lat/long pair.`,
      },
      latitude: {
        desc: `The latitude in degrees. It must be in the range [-90.0, +90.0].`,
      },
      longitude: {
        desc: `The longitude in degrees. It must be in the range [-180.0, +180.0].`,
      },
    },
    languageHints: {
      desc: `List of languages to use for TEXT_DETECTION. In most cases, an empty value yields the best results since it enables automatic language detection. For languages based on the Latin alphabet, setting languageHints is not needed. In rare cases, when the language of the text in the image is known, setting a hint will help get better results (although it will be a significant hindrance if the hint is wrong).`,
    },
    cropHintsParams: {
      desc: `Parameters for crop hints annotation request.`,
      aspectRatios: {
        desc: `Aspect ratios in floats, representing the ratio of the width to the height of the image. For example, if the desired aspect ratio is 4/3, the corresponding float value should be 1.33333. If not specified, the best possible crop is returned. The number of provided aspect ratios is limited to a maximum of 16; any aspect ratios provided after the 16th are ignored.`,
      },
    },
    faceRecognitionParams: {
      desc: ``,
    },
    textDetectionParams: {
      desc: `Parameters for text detection and document text detection.`,
      enableTextDetectionConfidenceScore: {
        desc: `By default, Cloud Vision API only includes confidence score for DOCUMENT_TEXT_DETECTION result. Set the flag to true to include confidence score for TEXT_DETECTION as well.`,
      },
    },
  },
};
