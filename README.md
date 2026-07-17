# AI Content Workspace

This project has two folders:
- `backend/` for the server
- `frontend/` for the web app

## Setup

1. Open the project folder in your code editor.
2. Install packages in both folders.

```bash
cd backend
npm install
cd ../frontend
npm install
```

## Backend

Create a `.env` file inside `backend/` with:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai-content-workspace
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_api_key
```

- `PORT`set 5000
- `MONGO_URI` is your database address.
- `JWT_SECRET` is a secret for login tokens.
- `GOOGLE_API_KEY` is optional if you want real AI text generation.

### Run backend

```bash
cd backend
npm run dev
```

### Seed data

Use this to create example users, drafts, and preferences:

```bash
cd backend
npm run seed
```

## Frontend

### Run frontend

```bash
cd frontend
npm run dev
```

Then open the app at `http://localhost:5173`.

## Notes

- Do not share `.env` or API keys.
- If `GOOGLE_API_KEY` is not set, the app will still work with simple sample text.
- Keep `backend/` and `frontend/` together in the same repository.
