# OpenAI API – Quickstart for ShasthoSheba

This doc shows how to use the OpenAI API with your project and the accompanying Postman collection.

## 1) Create and store your API key
- Create a key in the OpenAI dashboard, then keep it secret. (See *API key quickstart*.)  
- In development, export it as `OPENAI_API_KEY` or put it in `.env`. In Docker/Compose, pass it via `env_file`.

## 2) Core endpoints you’ll likely use
- **Chat Completions** (`POST /v1/chat/completions`): multi-turn chat, tool/function calling.
- **Embeddings** (`POST /v1/embeddings`): vectorize text for search/RAG.
- **Images** (`POST /v1/images/generations`): create images from prompts.
- **Moderations** (`POST /v1/moderations`): classify content for safety.

> For full references, see the official API docs and model pages.

## 3) Minimal examples

### cURL – chat completion
```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5-chat",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Say hello to the world."}
    ]
  }'
```

### Node.js (fetch) – embeddings
```js
const res = await fetch("https://api.openai.com/v1/embeddings", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "text-embedding-3-large",
    input: "Hello world"
  })
});
const data = await res.json();
console.log(data);
```

## 4) Postman setup
1. Import **OpenAI_Postman_Collection.json**.
2. In the collection variables, set `apiKey` to your secret key.
3. Optionally change `chat_model`, `embed_model`, and `image_model`.

## 5) Common gotchas
- **401 Unauthorized**: Missing/invalid `Authorization: Bearer` header or wrong key.
- **Model mismatch**: Ensure the `model` you pass is available to your account.
- **Rate limits**: Backoff/retry with `Retry-After` header when necessary.

## 6) References
- API Overview & Reference  
- Authentication guide  
- Libraries / SDKs  
- Models, compare & latest  

---
_Last updated: 2025-11-04_
