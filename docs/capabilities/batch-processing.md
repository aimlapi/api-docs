# Batch Processing

Batch processing (batching) allows you to send multiple message requests in a single batch and retrieve the results later (within up to 1 hour). The main goals are to reduce costs by up to 50% and increase throughput for analytical or offline workloads.

To use batch processing, several endpoints are available:

<table data-full-width="true"><thead><tr><th width="295.01666259765625"></th><th></th></tr></thead><tbody><tr><td>Create a batch</td><td><img src="/broken/files/j1sGKuO2wS5fYyQZ5SGg" alt="" data-size="line"> <code>https://api.aimlapi.com/batches</code></td></tr><tr><td>Get status or results of a batch</td><td><img src="/broken/files/vAXd7V6xv3QmKrLeptB1" alt="" data-size="line"> <code>https://api.aimlapi.com/batches?batch_id={batch_id}</code></td></tr><tr><td>Cancel a batch</td><td><img src="/broken/files/j1sGKuO2wS5fYyQZ5SGg" alt="" data-size="line"> <code>https://api.aimlapi.com/batches/cancel/{batch_id}</code></td></tr></tbody></table>

{% hint style="success" %}
You can find the list of supported models in the first API schema below — see the allowed values under `requests` > `params` > `model`.
{% endhint %}

***

## Create a message batch

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests
import json  # for getting a structured output with indentation

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "YOUR_AIMLAPI_KEY"
BASE_URL = "https://api.aimlapi.com/v1"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

data = {
    "requests": [
        {
            "custom_id": "test-01",
            "params": {
                "model": "claude-sonnet-4-20250514",
                "max_tokens": 1024,
                "messages": [
                    {
                        "role": "user",
                        "content": "How to learn nestjs?"
                    }
                ]
            }
        },
        {
            "custom_id": "test-02",
            "params": {
                "model": "claude-sonnet-4-5-20250929",
                "max_tokens": 1024,
                "messages": [
                    {
                        "role": "user",
                        "content": "How to learn Reactjs?"
                    }
                ]
            }
        }
    ]
}

response = requests.post(f"{BASE_URL}/batches", headers=headers, data=json.dumps(data))
data = response.json()
print("Batch created:", json.dumps(data, indent=2, ensure_ascii=False))
```
{% endcode %}

</details>

<details>

<summary>Response</summary>

```json5
Batch created: {
  "id": "kgTRCVoAz4GwrHWIOFZjg",
  "type": "message_batch",
  "processing_status": "in_progress",
  "request_counts": {
    "processing": 2,
    "succeeded": 0,
    "errored": 0,
    "canceled": 0,
    "expired": 0
  },
  "ended_at": null,
  "created_at": "2026-05-04T17:27:37.468424+00:00",
  "expires_at": "2026-05-05T17:27:37.468424+00:00",
  "archived_at": null,
  "cancel_initiated_at": null,
  "results_url": null
}
```

</details>

## Get status or results of a specific message batch

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests
import json

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "YOUR_AIMLAPI_KEY"
BASE_URL = "https://api.aimlapi.com/v1"
batch_id = "kgTRCVoAz4GwrHWIOFZjg"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

response = requests.get(f"{BASE_URL}/batches?batch_id={batch_id}", headers=headers)

try:
    data = [json.loads(line) for line in response.text.splitlines() if line.strip()]
    print(json.dumps(data, indent=2))
except json.JSONDecodeError:
    try:
        data = response.json()
        print(json.dumps(data, indent=2))
    except Exception as e:
        print("\nCould not parse response:", e)
        print("Raw response:\n", response.text[:500])
```
{% endcode %}

</details>

<details>

<summary>Response #1 (status: generating)</summary>

{% code overflow="wrap" %}
```json5
Raw response:
[
  {
    "id": "msgbatch_01TDVirzmjyZ51WZGyU3uMeY",
    "status": "generating"
  }
]
```
{% endcode %}

</details>

<details>

<summary>Response #2 (status: if already cancelled)</summary>

{% code overflow="wrap" %}
```json5
Raw response:
[
  {
    "id": "fe91QH0tkQwaJSXo0q77O",
    "type": "message_batch",
    "processing_status": "canceling",
    "request_counts": {
      "processing": 2,
      "succeeded": 0,
      "errored": 0,
      "canceled": 0,
      "expired": 0
    },
    "ended_at": null,
    "created_at": "2026-05-04T14:26:56.800735+00:00",
    "expires_at": "2026-05-05T14:26:56.800735+00:00",
    "archived_at": null,
    "cancel_initiated_at": "2026-05-04T14:27:52.008416+00:00",
    "results_url": null,
    "status": "cancelled"
  }
]
```
{% endcode %}

</details>

<details>

<summary>Response #3 (if already finished)</summary>

{% code overflow="wrap" %}
````json5
[
  {
    "custom_id": "test-01",
    "result": {
      "type": "succeeded",
      "message": {
        "model": "claude-sonnet-4-20250514",
        "id": "msg_01NGpcFgpg4CoupjDTDYD68i",
        "type": "message",
        "role": "assistant",
        "content": [
          {
            "type": "text",
            "text": "Here's a structured approach to learning NestJS:\n\n## Prerequisites\n- **JavaScript/TypeScript**: Strong foundation in modern JS and TypeScript\n- **Node.js basics**: Understanding of Node.js runtime and npm\n- **Express.js**: Basic knowledge helpful (NestJS builds on Express concepts)\n- **Decorators**: Understanding TypeScript decorators\n\n## Learning Path\n\n### 1. **Start with Fundamentals**\n```bash\n# Install NestJS CLI\nnpm i -g @nestjs/cli\n\n# Create your first project\nnest new my-first-project\n```\n\n**Core Concepts to Master:**\n- Controllers and routing\n- Services and dependency injection\n- Modules and application structure\n- Decorators (`@Controller`, `@Injectable`, `@Module`)\n\n### 2. **Essential Topics** (in order)\n- **Controllers**: Handle HTTP requests\n- **Providers/Services**: Business logic and data access\n- **Modules**: Organize application structure\n- **Middleware**: Request/response processing\n- **Exception Filters**: Error handling\n- **Pipes**: Data validation and transformation\n- **Guards**: Authentication and authorization\n- **Interceptors**: AOP-style request/response manipulation\n\n### 3. **Intermediate Concepts**\n- **Database Integration**: TypeORM, Prisma, or Mongoose\n- **Authentication**: JWT, Passport strategies\n- **Configuration**: Environment variables, config modules\n- **Validation**: Class-validator and class-transformer\n- **Testing**: Unit and integration testing\n- **GraphQL**: If relevant to your projects\n\n### 4. **Advanced Topics**\n- **Microservices**: Inter-service communication\n- **WebSockets**: Real-time applications\n- **Task Scheduling**: Cron jobs and queues\n- **Custom Decorators**: Creating reusable decorators\n- **Performance**: Caching, optimization techniques\n\n## Learning Resources\n\n### **Official Documentation**\n- [NestJS Official Docs](https://docs.nestjs.com/) - Best starting point\n- [NestJS GitHub Examples](https://github.com/nestjs/nest/tree/master/sample)\n\n### **Courses**\n- **Udemy**: \"NestJS: The Complete Developer's Guide\"\n- **Pluralsight**: NestJS courses\n- **YouTube**: Free tutorials (Marius Espejo, Traversy Media)\n\n### **Books**\n- \"NestJS: A Progressive Node.js Framework\" by various authors\n\n## Practical Learning Steps\n\n### Week 1-2: Basics\n```typescript\n// Create a simple REST API\n@Controller('cats')\nexport class CatsController {\n  @Get()\n  findAll(): string {\n    return 'This action returns all cats';\n  }\n  \n  @Post()\n  create(@Body() createCatDto: CreateCatDto) {\n    return 'This action adds a new cat';\n  }\n}\n```\n\n### Week 3-4: Database Integration\n```typescript\n// Add database operations\n@Injectable()\nexport class CatsService {\n  constructor(\n    @InjectRepository(Cat)\n    private catsRepository: Repository<Cat>,\n  ) {}\n\n  async findAll(): Promise<Cat[]> {\n    return this.catsRepository.find();\n  }\n}\n```\n\n### Week 5-6: Authentication & Validation\n```typescript\n// Add guards and validation\n@Controller('cats')\n@UseGuards(JwtAuthGuard)\nexport class CatsController {\n  @Post()\n  @UsePipes(ValidationPipe)\n  create(@Body() createCatDto: CreateCatDto) {\n    return this.catsService.create(createCatDto);\n  }\n}\n```\n\n## Hands-on Projects\n\n1. **Todo API** - Basic CRUD operations\n2. **Blog API** - Users, posts, comments with authentication\n3. **E-commerce API** - Products, orders, payments\n4. **Chat Application** - WebSockets integration\n5. **Microservices Project** - Multiple connected services\n\n## Best Practices\n\n- Follow NestJS architectural patterns\n- Use TypeScript features effectively\n- Implement proper error handling\n- Write tests from the beginning\n- Use DTOs for data validation\n- Follow SOLID principles\n\n## Tips for Effective Learning\n\n1. **Build Projects**: Don't just read, code along\n2. **Join Community**: NestJS Discord, Reddit communities\n3. **Read Source Code**: Examine well-"
          }
        ],
        "stop_reason": "max_tokens",
        "stop_sequence": null,
        "stop_details": null,
        "usage": {
          "input_tokens": 13,
          "cache_creation_input_tokens": 0,
          "cache_read_input_tokens": 0,
          "cache_creation": {
            "ephemeral_5m_input_tokens": 0,
            "ephemeral_1h_input_tokens": 0
          },
          "output_tokens": 1024,
          "service_tier": "batch",
          "inference_geo": "not_available"
        }
      }
    }
  },
  {
    "custom_id": "test-02",
    "result": {
      "type": "succeeded",
      "message": {
        "model": "claude-sonnet-4-5-20250929",
        "id": "msg_018DPteVhGrDVKYWiYUQbddN",
        "type": "message",
        "role": "assistant",
        "content": [
          {
            "type": "text",
            "text": "# How to Learn React.js\n\n## 1. **Prerequisites**\nBefore diving into React, make sure you're comfortable with:\n- **HTML & CSS** - Basic web structure and styling\n- **JavaScript (ES6+)** - Functions, arrays, objects, arrow functions, destructuring, modules\n- **DOM basics** - Understanding how the browser renders content\n\n## 2. **Learning Path**\n\n### **Phase 1: Fundamentals**\n- **JSX syntax** - HTML-like syntax in JavaScript\n- **Components** - Functional components (start here)\n- **Props** - Passing data between components\n- **State** - Managing component data with `useState`\n- **Event handling** - onClick, onChange, etc.\n- **Conditional rendering** - Showing/hiding elements\n- **Lists & keys** - Rendering arrays of data\n\n### **Phase 2: Intermediate Concepts**\n- **useEffect hook** - Side effects and lifecycle\n- **Forms & controlled components**\n- **Component composition** - Building reusable components\n- **Props drilling & lifting state up**\n- **Custom hooks** - Reusable logic\n- **useContext** - Avoiding prop drilling\n\n### **Phase 3: Advanced Topics**\n- **React Router** - Navigation between pages\n- **State management** - Redux, Zustand, or Context API\n- **API calls** - Fetching data with fetch/axios\n- **Performance optimization** - useMemo, useCallback, React.memo\n- **TypeScript with React** (optional but recommended)\n\n## 3. **Recommended Resources**\n\n### **Official Documentation**\n- [React.dev](https://react.dev) - Best starting point (new interactive tutorial)\n\n### **Free Courses**\n- freeCodeCamp React course (YouTube)\n- Scrimba's Learn React for free\n- Codecademy React course\n\n### **Paid Courses** (optional)\n- Udemy: Maximilian Schwarzm\u00fcller's React course\n- Frontend Masters\n- Epic React by Kent C. Dodds\n\n## 4. **Practical Steps**\n\n1. **Set up your environment**\n   ```bash\n   npx create-react-app my-app\n   # or use Vite (faster)\n   npm create vite@latest my-app -- --template react\n   ```\n\n2. **Build projects** (most important!)\n   - Todo list app\n   - Weather app (API integration)\n   - E-commerce product page\n   - Movie search app\n   - Personal portfolio\n\n3. **Practice daily** - Even 30 minutes consistently beats occasional long sessions\n\n4. **Read others' code** - Explore GitHub repositories\n\n5. **Join communities**\n   - Reddit: r/reactjs\n   - Discord: Reactiflux\n   - Stack Overflow\n\n## 5. **Common Beginner Mistakes to Avoid**\n- Don't mutate state directly\n- Don't skip learning JavaScript fundamentals\n- Don't jump to Redux too early\n- Don't copy-paste without understanding\n\n## 6. **Timeline**\n- **Basics**: 2-3 weeks\n- **Job-ready**: 3-6 months with consistent practice\n- **Proficiency**: 1+ year of building real projects\n\n**Start building projects as soon as possible - that's where real learning happens!**"
          }
        ],
        "stop_reason": "end_turn",
        "stop_sequence": null,
        "stop_details": null,
        "usage": {
          "input_tokens": 14,
          "cache_creation_input_tokens": 0,
          "cache_read_input_tokens": 0,
          "cache_creation": {
            "ephemeral_5m_input_tokens": 0,
            "ephemeral_1h_input_tokens": 0
          },
          "output_tokens": 761,
          "service_tier": "batch",
          "inference_geo": "not_available"
        }
      }
    }
  }
]
````
{% endcode %}

</details>

## Cancel a specific message batch

<details>

<summary>Code Example (Python)</summary>

```python
import requests
import json

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

# Insert your batch_id here
batch_id = "fe91QH0tkQwaJSXo0q77O"


headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

url = f"{BASE_URL}/batches/cancel/{batch_id}"

response = requests.post(url, headers=headers)

if response.status_code == 200:
    print("Batch canceled successfully:")
    data = response.json()
    print(json.dumps(data, indent=2, ensure_ascii=False))
else:
    data = response.json()
    print(f"Failed to cancel batch ({response.status_code}):")
    print(json.dumps(data, indent=2, ensure_ascii=False))
```

</details>

<details>

<summary>Response #1 (successfully cancelled)</summary>

```json5
Batch canceled successfully:
{
  "id": "msgbatch_01McVJYhQd3Wiuqrac6y9PrX",
  "type": "message_batch",
  "processing_status": "canceling",
  "request_counts": {
    "processing": 3,
    "succeeded": 0,
    "errored": 0,
    "canceled": 0,
    "expired": 0
  },
  "ended_at": null,
  "created_at": "2025-10-24T13:49:11.902215+00:00",
  "expires_at": "2025-10-25T13:49:11.902215+00:00",
  "cancel_initiated_at": "2025-10-24T13:49:27.756971+00:00",
  "results_url": null
}
```

</details>

<details>

<summary>Response #2 (if already finished)</summary>

{% code overflow="wrap" %}
```json5
Failed to cancel batch (400):
{
  "requestId": "56277efa-58af-4db7-b45e-ebaa612b2af7",
  "statusCode": 400,
  "timestamp": "2025-10-24T13:51:23.801Z",
  "path": "/v1/batches/cancel/msgbatch_01McVJYhQd3Wiuqrac6y9PrX",
  "message": "400 {\"type\":\"error\",\"error\":{\"type\":\"invalid_request_error\",\"message\":\"Batch msgbatch_01McVJYhQd3Wiuqrac6y9PrX cannot be canceled because it has already finished processing.\"},\"request_id\":\"req_011CUS8e7LPi44CSuvwhSMsn\"}"
}
```
{% endcode %}

</details>
