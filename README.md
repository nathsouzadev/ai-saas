# Genius AI

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Interface project to integrate with AI and payment tools

## Getting Started

Provide .env values

1 - Create a [Clerk](https://clerk.com/) account

2 - Create a [Stripe](https://stripe.com/) account and login

```bash
stripe login
```

3 - Get a stripe secret key and keep terminal running

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

4 - Provide the key to use [Gemini](https://ai.google.dev/) and [Replicate](https://replicate.com/) apis

5 - Install and run [Docker Desktop](https://www.docker.com/)

```bash
docker-compose up -d
```

6 - Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available resources

### [Conversation](http://localhost:3000/conversation)

- Provide input to application and have a natural conversation with AI

### [Music](http://localhost:3000/music)

- Provide a short input and receive music results from AI

### [Image](http://localhost:3000/image)

- Provide input and receive image results from AI

### [Video](http://localhost:3000/video)

- Provide input and receive video results from AI

### [Code](http://localhost:3000/code)

- Provide technical input and receive code results from AI

## Stay in touch

- Author - [Nathally Souza](https://linkedin.com/in/nathsouza)
