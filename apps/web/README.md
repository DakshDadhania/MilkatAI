## MilkatAI Web App

This app includes the marketing site, login/signup, Razorpay payments, and WhatsApp bot access.

## Setup

1) Install dependencies

```bash
npm install
```

2) Configure environment

```bash
cp .env.example .env.local
```

3) Initialize Prisma (SQLite for local dev)

```bash
npx prisma migrate dev --name init
```

4) Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Webhooks

- Razorpay: `POST /api/webhooks/razorpay`
- WhatsApp (Meta Cloud): `GET/POST /api/whatsapp/webhook`

Set the webhook URLs in the Razorpay dashboard and Meta WhatsApp Cloud API.

## Auth

- Login: `/login`
- Signup: `/signup`

## Dashboard

- `/dashboard` shows subscription status and WhatsApp access code generator.

## Document upload

- `/upload` lets you test OCR + LLM analysis.
- Optional: paste scraper JSON to compare OCR vs scraped hints.
