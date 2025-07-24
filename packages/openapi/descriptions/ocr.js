export default {
  document: {
    desc: `The document file to be processed by the OCR model.`,
    type: {
      desc: `Type of document.`,
    },
    document_url: {
      desc: `Document URL.`,
    },
    image_url: {
      desc: `Image URL.`,
    },
  },
  mimeType: {
    desc: `The MIME type of the document.`,
  },
  pages: {
    desc: `Specific pages you wants to process`,
    index: {
      desc: `The page index in a PDF document starting from 0`,
    },
    markdown: {
      desc: `The markdown string response of the page`,
    },
    images: {
      desc: `List of all extracted images in the page`,
      id: {
        desc: `Image ID for extracted image in a page`,
      },
      top_left_x: {
        desc: `X coordinate of top-left corner of the extracted image`,
      },
      top_left_y: {
        desc: `Y coordinate of top-left corner of the extracted image`,
      },
      bottom_right_x: {
        desc: `X coordinate of bottom-right corner of the extracted image`,
      },
      bottom_right_y: {
        desc: `Y coordinate of bottom-right corner of the extracted image`,
      },
      image_base64: {
        desc: `Base64 string of the extracted image`,
      },
    },
    dimensions: {
      desc: `The dimensions of the PDF page's screenshot image`,
      dpi: {
        desc: `Dots per inch of the page-image.`,
      },
      height: {
        desc: `Height of the image in pixels.`,
      },
      width: {
        desc: `Width of the image in pixels.`,
      },
    },
  },
  include_image_base64: {
    desc: `Includes base64 encoding of images in response.`,
  },
  image_limit: {
    desc: `Max number of images to extract.`,
  },
  image_min_size: {
    desc: `Minimum height and width of image to extract.`,
  },
};
