# ShasthoSheba WebApp (Dockerized)

This repo contains a Node.js/Express + EJS app backed by MongoDB, with TailwindCSS for styling. It’s now configured for Docker (single container) and Docker Compose (app + MongoDB).  

## What’s inside

- **server**: Express app (entrypoint: `server.js`) using sessions with MongoStore and routes under `/auth`, `/dashboard`, `/profile`, etc. It reads `SERVER_PORT`, `MONGO_URI`, and `NODE_ENV` from the environment.
- **scripts**: dev helpers for Tailwind and nodemon (`build:css`, `watch:css`, `dev`, `start:server`).
- **API examples**: see the Postman collection for `/auth`, `/dashboard`, `/dashboard/symptom/analyze`, `/dashboard/chat`, etc.

## Quick start (Docker)

1) Copy env template and fill values:
```bash
cp .env.example .env
# edit .env
```

2) Build and run a single container (expects external Mongo URI in `.env`):
```bash
docker build -t shasthosheba .
docker run --env-file .env -p 3000:3000 --name shastho-app shasthosheba
```

3) Or, use Docker Compose to run **app + local MongoDB**:
```bash
docker compose up --build
```

App will be available at `http://localhost:3000`.

## Environment variables

| Name | Required | Example |
|---|---|---|
| `SERVER_PORT` | yes | `3000` |
| `MONGO_URI` | yes | `mongodb://mongo:27017/ShasthoSheba` (Compose) or Atlas URI |
| `NODE_ENV` | yes | `development` / `production` |
| `SESSION_SECRET` | yes | change this in production |
| `OPENAI_API_KEY` | optional | for chat features |

## NPM scripts (local dev, outside Docker)

- `npm run build:css` – Tailwind build  
- `npm run watch:css` – Tailwind watch  
- `npm run dev` – CSS watch + nodemon  
- `npm run start:server` – run server with nodemon  

## API routes (examples)

- `/auth/signup`, `/auth/login`, `/auth/logout`  
- `/dashboard`  
- `/dashboard/symptom/analyze`  
- `/dashboard/chat`  
See **ShasthoSheba_Postman_Collection.json** in the repo for full request bodies.

## Security

- **Do not commit** `.env`. (It’s already in `.gitignore`.)  
- If secrets were exposed, **rotate them immediately** and replace the values in your private `.env`.
