# Architecture Overview

This project is a full-stack app with two parts:

## Backend
- Built with Node.js and Express.
- Uses MongoDB to store users, drafts, and preferences.
- Uses JWT for login and authorization.
- Has routes for auth, dashboard, AI generation, drafts, and preferences.
- Uses `@google/genai` when a `GOOGLE_API_KEY` is provided.
- If no API key is set, it returns simple fallback text.

## Frontend
- Built with React and Vite.
- Uses React Router for pages and protected routes.
- Has pages for login, dashboard, generate, drafts, and preferences.
- Calls backend APIs through a shared service layer.
- Shows errors and loading states to the user.

## backend & frontend
- The app runs locally with `npm run dev` in both folders.
- Backend and frontend are in the same repo.
- `backend/.env` contains `MONGO_URI`, `JWT_SECRET`, and optionally `GOOGLE_API_KEY`.
- The frontend uses the backend API at `http://localhost:5000/api`.

## How it works together
1. User logs in on the frontend.
2. Frontend sends login request to backend.
3. Backend returns a JWT token.
4. Frontend stores the token and uses it for future API calls.
5. The AI page asks backend to generate content.
6. Backend uses Gemini API if keys are present, or returns fallback text.
