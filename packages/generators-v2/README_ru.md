# Генератор JSON-схем OpenAPI

Это приложение генерирует JSON-схемы OpenAPI на основе конфигурационных данных из входного файла.

## 🚀 Чтобы запустить генератор:

```
npm run generate --prefix packages/generators-v2
```

Скрипт обработает данные из файла json_for-docs_generation.json и создаст соответствующие файлы схем.

## Input File Structure

Генератор считывает конфигурацию из файла json_for-docs_generation.json, который должен иметь следующую структуру:

```json
[
  {
    "name": "modelName",
    "url": "https://ai.aimlapi.com/docs-json?endpoint=openai/chat-completions&model=o1-pro&source=openai",
    "alias": "alias",
    "category": "text-models-llm",
    "vendor": "OpenAI",
    "codeSamples": "chat-completion",
    "customUrlApi": "https://api.aimlapi.com/v1/images/generations",
    "customParams": {
      "text_param": "text",
      "object_param": {
        "name": "object",
        "type": "string"
      },
      "array_param": ["param1", 212],
      "object_array_param": [
        {
          "name": "object1",
          "type": "string"
        },
        {
          "name": 21212,
          "type": "string"
        }
      ]
    },
    "hideTryItPanel": true
  }
]
```

### Описание полей

| Поле              | Тип      | Обязательное | Описание                                                                                                                                                                                                                                                   |
| ------------------ | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**           | `string`  | ✅       | Название модели (обязательно, если используется готовый пример кода (codeSamples)).                                                                                                                                                                                                      |
| **url**            | `string`  | ✅       | Ссылка на endpoint с JSON-документацией.                                                                                                                                                                                                                       |
| **alias**          | `string`  | ✅       | Имя выходного файла (используется при сохранении сгенерированной схемы).                                                                                                                                                                                                   |
| **category**       | `string`  | ✅       | Категория, к которой относится схема (например, `text-models-llm`).                                                                                                                                                                                      |
| **vendor**         | `string`  | ✅       | Название поставщика модели (например, `OpenAI`).                                                                                                                                                                                                                            |
| **codeSamples**    | `string`  | ❌       | Необязательное поле. Определяет, какие предустановленные примеры кода будут добавлены. Возможные значения: <br>• `chat-completion` <br>• `chat-completion-audio` <br>• `text-to-image` <br>• `image-to-image` <br>• `gpt-image-edit` <br>• `hide` (если нужно скрыть пример кода) <br>• `custom` (требует указания `customUrlApi` и `customParams`) |
| **customUrlApi**   | `string`  | ❌       | Используется, если codeSamples имеет значение `"custom"`. Указывает кастомный API endpoint.                                                                                                                                                                                |
| **customParams**   | `object`  | ❌       | Кастомные параметры для запроса к API. Поддерживаются простые значения, объекты, массивы и массивы объектов.                                                                                                                                                              |
| **hideTryItPanel** | `boolean` | ❌       | Если установлено в `true`, скрывает панель “Try It” в сгенерированной документации. Полезно для эндпоинтов, которые не предназначены для интерактивного использования.                                                                                                                           |
## Примеры использования
### Пример 1 — использование готового примера кода
```json
{
  "name": "gpt-4o",
  "url": "https://ai.aimlapi.com/docs-json?endpoint=openai/chat-completions&model=gpt-4o&source=openai",
  "alias": "gpt-4o",
  "category": "text-models-llm",
  "vendor": "OpenAI",
  "codeSamples": "chat-completion",
  "hideTryItPanel": true
}
```
### Пример 2 — использование кастомного API
```json
{
  "name": "flux/dev",
  "url": "https://ai.aimlapi.com/docs-json?endpoint=internal/image-generations&model=flux/dev&source=falai",
  "alias": "flux-dev",
  "category": "image-models",
  "vendor": "Black-Forest-Labs",
  "codeSamples": "custom",
  "customUrlApi": "https://api.aimlapi.com/v1/images/generations",
  "customParams": {
    "prompt": "text",
    "style": "string",
    "size": ["512x512", "1024x1024"]
  },
  "hideTryItPanel": false
}
```
### Пример 3 — автосгенерированные Гитбуком примеры с полным набором параметров модели
```json
{
  "name": "flux/dev",
  "url": "https://ai.aimlapi.com/docs-json?endpoint=internal/image-generations&model=flux/dev&source=falai",
  "alias": "flux-dev",
  "category": "image-models",
  "vendor": "Black-Forest-Labs",
  "hideTryItPanel": false
}
```
## Результат

Каждая схема генерируется и сохраняется под именем, основанным на её category, vendor и alias
(например, category/vendor/alias.json) в директории /docs/api-references