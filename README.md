## Palar

An AI marketplace for discovering and running task-focused AIs.

### Getting Started

Install dependencies:

```bash
bun install
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Google OAuth

Create a Google OAuth web client and add this redirect URI:

```text
http://localhost:3000/api/auth/google/callback
```

Copy `.env.example` to `.env.local`, then set:

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=
```
