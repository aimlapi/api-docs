export default {
  assistant_id: {
    desc: `The ID of the Assistant to use to execute this Run.`,
  },
  additional_instructions: {
    desc: `Appends additional instructions at the end of the instructions for the Run. This is useful for modifying the behavior on a per-Run basis without overriding other instructions.`,
  },
  additional_messages: {
    desc: `Adds additional Messages to the Thread before creating the Run.`,
    content: {
      text: {
        desc: `The text contents of the Message.`,
      },
      array: {
        desc: `An array of content parts with a defined type, each can be of type text or images can be passed with image_url or image_file.`,
        image_file: {
          file_id: {
            desc: `The File ID of the image in the Message content.`,
          },
          detail: {
            desc: `Specifies the detail level of the image if specified by the user. Low uses fewer tokens, you can opt in to high resolution using high.`,
          },
        },
        image_url: {
          url: {
            desc: `The external URL of the image, must be a supported image types: jpeg, jpg, png, gif, webp.`,
          },
          detail: {
            desc: `Specifies the detail level of the image. Low uses fewer tokens, you can opt in to high resolution using high. Default value is auto.`,
          },
        },
        text: {
          desc: `Text content to be sent to the model.`,
        },
      },
    },
    attachments: {
      desc: `A list of files attached to the Message, and the tools they should be added to.`,
      file_id: {
        desc: `The ID of the file to attach to the Message.`,
      },
      tools: {
        desc: `The tools to which this file should be added.`,
        type: {
          desc: `The type of tool being defined.`,
        },
      },
    },
  },
  instructions: {
    desc: `Overrides the instructions of the Assistant. This is useful for modifying the behavior on a per-Run basis.`,
  },
  max_completion_tokens: {
    desc: `The maximum number of completion tokens that may be used over the course of the Run. The Run will make a best effort to use only the number of completion tokens specified, across multiple turns of the Run. If the Run exceeds the number of completion tokens specified, the Run will end with status incomplete`,
  },
  max_prompt_tokens: {
    desc: `The maximum number of prompt tokens that may be used over the course of the Run. The Run will make a best effort to use only the number of prompt tokens specified, across multiple turns of the Run. If the Run exceeds the number of prompt tokens specified, the Run will end with status incomplete.`,
  },
  model: {
    desc: `The ID of the model to be used to execute this Run. If a value is provided here, it will override the model associated with the Assistant. If not, the model associated with the Assistant will be used.`,
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
          desc: `Whether to enable strict schema adherence when generating the output. If set to True, the model will always follow the exact schema defined in the schema field. Only a subset of JSON Schema is supported when strict is True.`,
        },
      },
    },
    json_object: {
      desc: `An older method of generating JSON responses. Using json_schema is recommended for models that support it. Note that the model will not generate JSON without a system or user Message instructing it to do so.`,
      type: {
        desc: `The type of response format being defined. Always json_object.`,
      },
    },
  },
  stream: {
    desc: `If True, returns a stream of events that happen during the Run as server-sent events.`,
  },
  temperature: {
    desc: `What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.`,
  },
  tool_choice: {
    desc: `Controls which (if any) tool is called by the model. 
- none means the model will not call any tools and instead generates a message. 
- auto is the default value and means the model can pick between generating a message or calling one or more tools. 
- required means the model must call one or more tools before responding to the user. 
Specifying a particular tool via {"type": "function", "function": {"name": "my_function"}} forces the model to call that tool.`,
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
    desc: `Override the tools the Assistant can use for this Run. This is useful for modifying the behavior on a per-Run basis.`,
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
        desc: `Whether to enable strict schema adherence when generating the function call. If set to True, the model will follow the exact schema defined in the parameters field. Only a subset of JSON Schema is supported when strict is True.`,
      },
    },
  },
  top_p: {
    desc: `An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.`,
  },
  truncation_strategy: {
    desc: `Controls for how a Thread will be truncated prior to the Run. Use this to control the intial context window of the Run.`,
    type: {
      desc: `The truncation strategy to use for the thread. The default is auto. If set to last_messages, the Thread will be truncated to the n most recent Messages in the Thread. When set to auto, Messages in the middle of the Thread will be dropped to fit the context length of the model, max_prompt_tokens.`,
    },
    last_messages: {
      desc: `The number of most recent Messages from the Thread when constructing the context for the Run.`,
    },
  },
  tool_outputs: {
    desc: `A list of tools for which the outputs are being submitted.`,
    output: {
      desc: `The output of the tool call to be submitted to continue the Run.`,
    },
    tool_call_id: {
      desc: `The ID of the tool call in the required_action object within the Run object the output is being submitted for.`,
    },
  },
  thread: {
    desc: `Options to create a new Thread. If no Thread is provided when running a request, an empty Thread will be created.`,
  },
};
