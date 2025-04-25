export default {
  document: {
    desc: `Document to run OCR.`,
    type: {
      desc: `Type of document.`,
    },
    document_url: {
      desc: `Document url.`,
    },
    image_url: {
      desc: `Image url.`,
    },
  },
  mimeType: {
    desc: `The MIME type of the document.`,
  },
  pages: {
    desc: `Specific pages you wants to process`,
  },
  include_image_base64: {
    desc: `Include base64 images in response.`,
  },
  image_limit: {
    desc: `Max images to extract.`,
  },
  image_min_size: {
    desc: `Minimum height and width of image to extract.`,
  },
};
