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
    index: {
      desc: `The page index in a pdf document starting from 0`,
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
      image_basse_64: {
        desc: `Base64 string of the extracted image`,
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
    dimensions: {
      desc: `The dimensions of the PDF Page's screenshot image`,
    },
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
