# Batch Processing

Batch processing (batching) allows you to send multiple message requests in a single batch and retrieve the results later (within up to 1 hour). The main goals are to reduce costs by up to 50% and increase throughput for analytical or offline workloads.

To use batch processing, several endpoints are available:

<table data-full-width="true"><thead><tr><th width="295.01666259765625"></th><th></th></tr></thead><tbody><tr><td>Create a message batch</td><td><img src="../.gitbook/assets/POST.png" alt="" data-size="line"> <code>https://api.aimlapi.com/batches</code></td></tr><tr><td>Get status or results of a specific message batch</td><td><img src="../.gitbook/assets/GET.png" alt="" data-size="line"> <code>https://api.aimlapi.com/batches?batch_id={batch_id}</code></td></tr><tr><td>Cancel a specific message batch</td><td><img src="../.gitbook/assets/POST.png" alt="" data-size="line"> <code>https://api.aimlapi.com/batches/cancel/{batch_id}</code></td></tr></tbody></table>

{% hint style="success" %}
You can find the list of supported models in the first API schema below — see the allowed values under `requests` > `params` > `model`.
{% endhint %}

***

## Create a message batch

{% openapi-operation spec="batch" path="/v1/batches" method="post" %}
[OpenAPI batch](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests
import json

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY
API_KEY = "<YOUR_AIMLAPI_KEY>"
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
                "model": "claude-3-5-haiku-20241022",
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
                "model": "claude-3-5-haiku-20241022",
                "max_tokens": 1024,
                "messages": [
                    {
                        "role": "user",
                        "content": "How to learn Reactjs?"
                    }
                ]
            }
        },        {
            "custom_id": "test-03",
            "params": {
                "model": "claude-3-5-haiku-20241022",
                "max_tokens": 1024,
                "messages": [
                    {
                        "role": "user",
                        "content": "How to learn Nextjs?"
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
  "id": "msgbatch_01AbYVLPKqi8HuSe6sFJV7ZP",
  "type": "message_batch",
  "processing_status": "in_progress",
  "request_counts": {
    "processing": 3,
    "succeeded": 0,
    "errored": 0,
    "canceled": 0,
    "expired": 0
  },
  "ended_at": null,
  "created_at": "2025-10-24T13:16:06.070587+00:00",
  "expires_at": "2025-10-25T13:16:06.070587+00:00",
  "cancel_initiated_at": null,
  "results_url": null
}
```

</details>

## Get status or results of a specific message batch

{% openapi-operation spec="batch-get" path="/v1/batches" method="get" %}
[OpenAPI batch-get](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

<details>

<summary>Code Example (Python)</summary>

{% code overflow="wrap" %}
```python
import requests
import json

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

# Insert your batch_id here
batch_id = "msgbatch_01TDVirzmjyZ51WZGyU3uMeY"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

response = requests.get(f"{BASE_URL}/batches?batch_id={batch_id}", headers=headers)

print("Raw response:\n", response.text[:500])  

try:
    data = [json.loads(line) for line in response.text.splitlines() if line.strip()]
    print("\n✅ Parsed JSONL:")
    print(json.dumps(data, indent=2))
except json.JSONDecodeError:
    
    try:
        data = response.json()
        print("\n✅ Parsed JSON:")
        print(json.dumps(data, indent=2))
    except Exception as e:
        print("\n⚠️ Could not parse response:", e)
```
{% endcode %}

</details>

<details>

<summary>Response</summary>

````json5
Raw response:
 {"custom_id":"test-01","result":{"type":"succeeded","message":{"model":"claude-3-5-haiku-20241022","id":"msg_01XQUp3SKD1iGNcppVbxSUgE","type":"message","role":"assistant","content":[{"type":"text","text":"To learn NestJS effectively, follow these steps:\n\n1. Prerequisites\n```bash\n- Basic JavaScript/TypeScript knowledge\n- Node.js installed\n- npm (Node Package Manager)\n```\n\n2. Basic Setup\n```bash\n# Install NestJS CLI globally\nnpm i -g @nestjs/cli\n\n# Create a new project\nnest new proj

✅ Parsed JSONL:
[
  {
    "custom_id": "test-01",
    "result": {
      "type": "succeeded",
      "message": {
        "model": "claude-3-5-haiku-20241022",
        "id": "msg_01XQUp3SKD1iGNcppVbxSUgE",
        "type": "message",
        "role": "assistant",
        "content": [
          {
            "type": "text",
            "text": "To learn NestJS effectively, follow these steps:\n\n1. Prerequisites\n```bash\n- Basic JavaScript/TypeScript knowledge\n- Node.js installed\n- npm (Node Package Manager)\n```\n\n2. Basic Setup\n```bash\n# Install NestJS CLI globally\nnpm i -g @nestjs/cli\n\n# Create a new project\nnest new project-name\n\n# Navigate to project directory\ncd project-name\n\n# Run the application\nnpm run start\n```\n\n3. Core Concepts to Learn\n\na) Modules\n```typescript\n@Module({\n  controllers: [],\n  providers: [],\n  imports: []\n})\nexport class AppModule {}\n```\n\nb) Controllers\n```typescript\n@Controller('users')\nexport class UsersController {\n  @Get()\n  findAll() {\n    return 'List of users';\n  }\n\n  @Post()\n  create(@Body() createUserDto: CreateUserDto) {\n    return 'Create user';\n  }\n}\n```\n\nc) Services\n```typescript\n@Injectable()\nexport class UsersService {\n  findAll() {\n    return ['user1', 'user2'];\n  }\n\n  create(user) {\n    // Create user logic\n  }\n}\n```\n\nd) Dependency Injection\n```typescript\n@Controller('users')\nexport class UsersController {\n  constructor(private usersService: UsersService) {}\n}\n```\n\n4. Learn Key Decorators\n```typescript\n// Common decorators\n@Module()\n@Controller()\n@Injectable()\n@Get()\n@Post()\n@Put()\n@Delete()\n@Param()\n@Body()\n@Query()\n```\n\n5. Understanding Middleware\n```typescript\n@Injectable()\nexport class LoggerMiddleware implements NestMiddleware {\n  use(req: Request, res: Response, next: NextFunction) {\n    console.log('Request...');\n    next();\n  }\n}\n```\n\n6. Validation\n```bash\n# Install class-validator\nnpm i class-validator class-transformer\n```\n\n```typescript\nexport class CreateUserDto {\n  @IsNotEmpty()\n  @IsString()\n  name: string;\n\n  @IsEmail()\n  email: string;\n}\n```\n\n7. Database Integration\n```bash\n# For TypeORM\nnpm i @nestjs/typeorm typeorm postgres\n```\n\n8. Authentication\n```bash\n# Install passport\nnpm i @nestjs/passport passport passport-local\n```\n\n9. Learning Resources\n- Official NestJS Documentation\n- YouTube Tutorials\n- Udemy Courses\n- GitHub Example Projects\n\n10. Practice Projects\n- REST API\n- Authentication System\n- CRUD Application\n- Real-time Chat Application\n\n11. Advanced Topics\n- Microservices\n- GraphQL\n- WebSockets\n- Caching\n- Task Scheduling\n\n12. Best Practices\n- Use DTOs\n- Implement proper error handling\n- Use dependency injection\n- Follow SOLID principles\n- Write unit and integration tests\n\n13. Recommended Learning Path\na) Learn TypeScript fundamentals\nb) Understand NestJS core concepts\nc) Build simple REST API\nd) Add authentication\ne) Integrate database\nf) Implement more complex features\n\n14. Sample Project Structure\n```\nsrc/\n\u251c\u2500\u2500 users/\n\u2502   \u251c\u2500\u2500 dto/\n\u2502   \u251c\u2500\u2500 entities/\n\u2502   \u251c\u2500\u2500 users.controller.ts\n\u2502   \u251c\u2500\u2500 users.service.ts\n\u2502   \u2514\u2500\u2500 users.module.ts\n\u251c\u2500\u2500 app.module.ts\n\u2514\u2500\u2500 main.ts\n```\n\n15. Additional Tools\n- Swagger for API documentation\n- Jest for testing\n- Docker for containerization\n\nCode Example (Complete User Module):\n```typescript\n// user.dto.ts\nexport class CreateUserDto {\n  @IsNotEmpty()\n  username: string;\n\n  @IsEmail()\n  email: string;\n}\n\n// user.entity.ts\n@Entity()\nexport class User {\n  @PrimaryGeneratedColumn()\n  id: number;\n\n  @Column()\n  username: string;\n\n  @Column()\n  email: string;\n}\n\n// user.service.ts\n@Injectable()\nexport class UserService {\n  constructor(\n    @InjectRepository(User)\n    private userRepository: Repository<User>\n  ) {}\n\n  async create(createUserDto: CreateUserDto) {\n    const user = this.userRepository.create(createUser"
          }
        ],
        "stop_reason": "max_tokens",
        "stop_sequence": null,
        "usage": {
          "input_tokens": 13,
          "cache_creation_input_tokens": 0,
          "cache_read_input_tokens": 0,
          "cache_creation": {
            "ephemeral_5m_input_tokens": 0,
            "ephemeral_1h_input_tokens": 0
          },
          "output_tokens": 1024,
          "service_tier": "batch"
        }
      }
    }
  },
  {
    "custom_id": "test-02",
    "result": {
      "type": "succeeded",
      "message": {
        "model": "claude-3-5-haiku-20241022",
        "id": "msg_01SK4vLuzho25MPU3WKMy6B5",
        "type": "message",
        "role": "assistant",
        "content": [
          {
            "type": "text",
            "text": "Here's a comprehensive guide to learning React.js:\n\n1. Prerequisites\n- HTML, CSS, JavaScript fundamentals\n- ES6+ JavaScript features\n- Basic understanding of web development\n\n2. Learning Path\na) Official Documentation\n- React official docs (reactjs.org)\n- Very comprehensive and well-structured\n\nb) Online Learning Resources\n- freeCodeCamp\n- Codecademy\n- Udemy courses\n- YouTube tutorials\n- Coursera\n- Scrimba React course\n\nc) Key Learning Steps\n1. Basic React concepts\n- Components\n- JSX\n- Props\n- State\n- Hooks\n- Lifecycle methods\n\n2. State management\n- useState\n- useReducer\n- Context API\n- Redux\n\n3. Routing\n- React Router\n- Navigation between pages\n\n4. Advanced concepts\n- Custom hooks\n- Performance optimization\n- Code splitting\n- Server-side rendering\n\n5. Practical Projects\n- Todo list\n- Weather app\n- E-commerce platform\n- Social media clone\n\n3. Learning Strategies\n- Hands-on coding\n- Build real projects\n- Join developer communities\n- Practice consistently\n- Follow best practices\n- Read documentation\n\n4. Recommended Learning Resources\n- Official React Documentation\n- React.js GitHub repository\n- YouTube channels\n- Coding bootcamps\n- Stack Overflow\n- GitHub projects\n\n5. Tools & Libraries\n- Create React App\n- Next.js\n- TypeScript\n- Styled-components\n- Material-UI\n- Chakra UI\n\n6. Practice Platforms\n- CodePen\n- CodeSandbox\n- GitHub\n- Personal projects\n\n7. Learning Timeline\n- Basics: 2-4 weeks\n- Intermediate: 2-3 months\n- Advanced: 6-12 months\n\nPro Tips:\n- Start small\n- Be patient\n- Code regularly\n- Learn from mistakes\n- Experiment\n- Join developer communities\n\nSample Basic React Component:\n```javascript\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}\n\nexport default Counter;\n```\n\n8. Recommended Learning Path\nWeek 1-2: Basics\n- Components\n- JSX\n- Props\n- State basics\n\nWeek 3-4: Hooks\n- useState\n- useEffect\n- useContext\n- Custom hooks\n\nWeek 5-6: Advanced Concepts\n- Routing\n- State management\n- API integration\n\nWeek 7-8: Projects\n- Build multiple small projects\n- Practice implementations\n\n9. Additional Skills\n- TypeScript\n- GraphQL\n- Testing (Jest)\n- Next.js\n- Styling libraries\n\n10. Job Preparation\n- Build portfolio\n- Contribute to open-source\n- Practice interview questions\n- Learn related technologies\n\nRemember: Consistent practice and building projects are key to mastering React.js!"
          }
        ],
        "stop_reason": "end_turn",
        "stop_sequence": null,
        "usage": {
          "input_tokens": 14,
          "cache_creation_input_tokens": 0,
          "cache_read_input_tokens": 0,
          "cache_creation": {
            "ephemeral_5m_input_tokens": 0,
            "ephemeral_1h_input_tokens": 0
          },
          "output_tokens": 703,
          "service_tier": "batch"
        }
      }
    }
  },
  {
    "custom_id": "test-03",
    "result": {
      "type": "succeeded",
      "message": {
        "model": "claude-3-5-haiku-20241022",
        "id": "msg_014zDUfCJKqas9HT4Zg5REH6",
        "type": "message",
        "role": "assistant",
        "content": [
          {
            "type": "text",
            "text": "Learning Next.js can be done through various resources and approaches. Here's a comprehensive guide to help you learn Next.js:\n\n1. Prerequisites\n- Basic understanding of React\n- JavaScript/TypeScript knowledge\n- HTML and CSS fundamentals\n\n2. Official Documentation\n- Start with the official Next.js documentation\n- Website: https://nextjs.org/docs\n- Read through the comprehensive guide and tutorials\n\n3. Online Courses\n- Udemy courses\n- Coursera\n- Pluralsight\n- YouTube tutorials\n- Traversy Media\n- Net Ninja\n- Web Dev Simplified\n\n4. Free Learning Resources\n- Next.js official tutorial\n- YouTube tutorials\n- FreeCodeCamp\n- Vercel's learning platform\n\n5. Learning Path\na. Understand React basics\nb. Learn Next.js core concepts:\n- Routing\n- Pages\n- API routes\n- Server-side rendering\n- Static site generation\n- Dynamic routing\n- Image optimization\n- File-based routing\n\n6. Practical Projects\n- Build small projects\n- Personal portfolio\n- Blog website\n- E-commerce platform\n- Dashboard application\n\n7. Key Topics to Learn\n- React components\n- Pages and layouts\n- Routing\n- API routes\n- Server-side rendering\n- Static site generation\n- Dynamic imports\n- Authentication\n- State management\n- Styling (CSS modules, Tailwind)\n\n8. Practice Platforms\n- CodeSandbox\n- StackBlitz\n- GitHub repositories\n- Personal projects\n\n9. Advanced Concepts\n- TypeScript integration\n- Performance optimization\n- Middleware\n- Authentication strategies\n- State management\n- Testing\n\n10. Recommended Learning Resources\n- Official documentation\n- Next.js GitHub repository\n- Stack Overflow\n- Reddit communities\n- Discord channels\n\n11. Practice Projects Progression\na. Beginner level\n- Simple static website\n- Personal blog\n- Todo application\n\nb. Intermediate level\n- E-commerce platform\n- Social media clone\n- Dashboard application\n\nc. Advanced level\n- Full-stack application\n- Real-time collaborative tools\n- Complex web applications\n\n12. Tools and Libraries\n- TypeScript\n- Tailwind CSS\n- Redux/Zustand\n- Prisma\n- tRPC\n- Chakra UI\n- React Query\n\n13. Deployment Platforms\n- Vercel\n- Netlify\n- Heroku\n- DigitalOcean\n- AWS\n\n14. Learning Strategy\n- Consistent practice\n- Build projects\n- Read documentation\n- Follow tutorials\n- Engage in community\n- Solve coding challenges\n\n15. Additional Tips\n- Follow Next.js creators on Twitter\n- Join Discord communities\n- Attend webinars\n- Contribute to open-source projects\n- Read tech blogs\n\n16. Recommended Books\n- Next.js Quick Start Guide\n- Full-stack React with Next.js\n- Professional Next.js\n\n17. YouTube Channels\n- Vercel\n- Web Dev Simplified\n- Traversy Media\n- Net Ninja\n- Jack Herrington\n\nSample Learning Timeline:\n- Week 1-2: React fundamentals\n- Week 3-4: Next.js basics\n- Week 5-6: Advanced concepts\n- Week 7-8: Project implementation\n\nCode Example (Basic Next.js Page):\n```javascript\n// pages/index.js\nfunction HomePage() {\n  return <div>Welcome to Next.js!</div>\n}\n\nexport default HomePage\n```\n\nSample Routing:\n```javascript\n// pages/about.js\nfunction AboutPage() {\n  return <h1>About Us</h1>\n}\n\nexport default AboutPage\n```\n\nRecommended Learning Sequence:\n1. React fundamentals\n2. Next.js core concepts\n3. Routing\n4. Server-side rendering\n5. API routes\n6. State management\n7. Authentication\n8. Deployment\n\nRecommended GitHub Repositories:\n- https://github.com/vercel/next.js\n- https://github.com/alan2207/nextjs-boilerplate\n- https://github.com/panacloud/bootcamp-2020\n\nRemember:\n- Be consistent\n- Build projects\n- Practice regularly\n- Stay updated with latest features\n\nBy following this comprehensive guide and maintaining a structured learning approach, you can become proficient in Next.js development."
          }
        ],
        "stop_reason": "end_turn",
        "stop_sequence": null,
        "usage": {
          "input_tokens": 14,
          "cache_creation_input_tokens": 0,
          "cache_read_input_tokens": 0,
          "cache_creation": {
            "ephemeral_5m_input_tokens": 0,
            "ephemeral_1h_input_tokens": 0
          },
          "output_tokens": 975,
          "service_tier": "batch"
        }
      }
    }
  }
]
````

</details>

## Cancel a specific message batch

{% openapi-operation spec="batch-cancel-2" path="/v1/batches/cancel/{batch_id}" method="post" %}
[OpenAPI batch-cancel-2](https://api.aimlapi.com/docs-public-yaml)
{% endopenapi-operation %}

<details>

<summary>Code Example (Python)</summary>

```python
import requests
import json

# Insert your AIML API Key instead of <YOUR_AIMLAPI_KEY>
API_KEY = "<YOUR_AIMLAPI_KEY>"
BASE_URL = "https://api.aimlapi.com/v1"

# Insert your batch_id here
batch_id = "msgbatch_01McVJYhQd3Wiuqrac6y9PrX"


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
