# Backend

## Setup

1. Copy `.env.example` to `.env`.
2. Install dependencies:

```bash
npm install
```

3. Run seed data:

```bash
npm run seed
```

4. Start development server:

```bash
npm run dev
```

## API Endpoints

- `POST /api/auth/login`
- `GET /api/dashboard`
- `POST /api/ai/generate`
- `POST /api/ai/assistant`
- `GET /api/drafts`
- `POST /api/drafts`
- `PATCH /api/drafts/:id`
- `DELETE /api/drafts/:id`
- `GET /api/preferences`
- `PATCH /api/preferences`

All protected routes require `Authorization: Bearer <token>`.
