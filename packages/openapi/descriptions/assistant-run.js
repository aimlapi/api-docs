export default {
  assistant_id: {
    desc: `The ID of the assistant to use to execute this run.`,
  },
  additional_instructions: {
    desc: `Appends additional instructions at the end of the instructions for the run. This is useful for modifying the behavior on a per-run basis without overriding other instructions.`,
  },
  additional_messages: {
    desc: `Adds additional messages to the thread before creating the run.`,
    content: {
      text: {
        desc: `The text contents of the message.`,
      },
      array: {
        desc: `An array of content parts with a defined type, each can be of type text or images can be passed with image_url or image_file.`,
        image_file: {
          file_id: {
            desc: `The File ID of the image in the message content.`,
          },
          detail: {
            desc: `Specifies the detail level of the image if specified by the user. low uses fewer tokens, you can opt in to high resolution using high.`,
          },
        },
        image_url: {
          url: {
            desc: `The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.`,
          },
          detail: {
            desc: `Specifies the detail level of the image. low uses fewer tokens, you can opt in to high resolution using high. Default value is auto.`,
          },
        },
        text: {
          desc: `Text content to be sent to the model.`,
        },
      },
    },
    attachments: {
      desc: `A list of files attached to the message, and the tools they should be added to.`,
      file_id: {
        desc: `The ID of the file to attach to the message.`,
      },
      tools: {
        desc: `The tools to add this file to.`,
        type: {
          desc: `The type of tool being defined.`,
        },
      },
    },
  },
  instructions: {
    desc: `Overrides the instructions of the assistant. This is useful for modifying the behavior on a per-run basis.`,
  },
  max_completion_tokens: {
    desc: `The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens specified, the run will end with status incomplete`,
  },
  max_prompt_tokens: {
    desc: `The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified, the run will end with status incomplete.`,
  },
  model: {
    desc: `The ID of the Model to be used to execute this run. If a value is provided here, it will override the model associated with the assistant. If not, the model associated with the assistant will be used.`,
  },
  parallel_tool_calls: {
    desc: `Whether to enable parallel function calling during tool use.`,
  },
  reasoning_effort: {
    desc: `Constrains effort on reasoning for reasoning models.`,
  },
  response_format: {
    desc: `Specifies the format that the model must output.`,
    text: {
      desc: `Default response format. Used to generate text responses.`,
      type: {
        desc: `The type of response format being defined. Always text.`,
      },
    },
    json_schema: {
      desc: `JSON Schema response format. Used to generate structured JSON responses.`,
      type: {
        desc: `The type of response format being defined. Always json_schema.`,
      },
      json_schema: {
        desc: `Structured Outputs configuration options, including a JSON Schema.`,
        name: {
          desc: `The name of the response format. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.`,
        },
        description: {
          desc: `A description of what the response format is for, used by the model to determine how to respond in the format.`,
        },
        schema: {
          desc: `The schema for the response format, described as a JSON Schema object.`,
        },
        strict: {
          desc: `Whether to enable strict schema adherence when generating the output. If set to true, the model will always follow the exact schema defined in the schema field. Only a subset of JSON Schema is supported when strict is true.`,
        },
      },
    },
    json_object: {
      desc: `An older method of generating JSON responses. Using json_schema is recommended for models that support it. Note that the model will not generate JSON without a system or user message instructing it to do so.`,
      type: {
        desc: `The type of response format being defined. Always json_object.`,
      },
    },
  },
  stream: {
    desc: `If true, returns a stream of events that happen during the Run as server-sent events.`,
  },
  temperature: {
    desc: `What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.`,
  },
  tool_choice: {
    desc: `Controls which (if any) tool is called by the model. none means the model will not call any tools and instead generates a message. auto is the default value and means the model can pick between generating a message or calling one or more tools. required means the model must call one or more tools before responding to the user. Specifying a particular tool via {"type": "function", "function": {"name": "my_function"}} forces the model to call that tool.`,
    type: {
      desc: `The type of the tool. If type is function, the function name must be set.`,
    },
    function: {
      name: {
        desc: `The name of the function to call.`,
      },
    },
  },
  tools: {
    desc: `Override the tools the assistant can use for this run. This is useful for modifying the behavior on a per-run basis.`,
    type: {
      desc: `The type of tool being defined.`,
    },
    file_search: {
      desc: `Overrides for the file search tool.`,
      max_num_results: {
        desc: `The maximum number of results the file search tool should output.`,
      },
      ranking_options: {
        desc: `The ranking options for the file search. If not specified, the file search tool will use the auto ranker and a score_threshold of 0.`,
        score_threshold: {
          desc: `The score threshold for the file search. All values must be a floating point number between 0 and 1.`,
        },
        ranker: {
          desc: `The ranker to use for the file search. If not specified will use the auto ranker.`,
        },
      },
    },
    function: {
      name: {
        desc: `The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.`,
      },
      description: {
        desc: `A description of what the function does, used by the model to choose when and how to call the function.`,
      },
      parameters: {
        desc: `The parameters the functions accepts, described as a JSON Schema object.`,
      },
      strict: {
        desc: `Whether to enable strict schema adherence when generating the function call. If set to true, the model will follow the exact schema defined in the parameters field. Only a subset of JSON Schema is supported when strict is true.`,
      },
    },
  },
  top_p: {
    desc: `An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.`,
  },
  truncation_strategy: {
    desc: `Controls for how a thread will be truncated prior to the run. Use this to control the intial context window of the run.`,
  },
  tool_outputs: {
    desc: `A list of tools for which the outputs are being submitted.`,
    output: {
      desc: `The output of the tool call to be submitted to continue the run.`,
    },
    tool_call_id: {
      desc: `The ID of the tool call in the required_action object within the run object the output is being submitted for.`,
    },
  },
};
