# Zaheer Seed Corporation — Frontend

Modern Next.js frontend application for Zaheer Seed Corporation. Breeds, processes, and distributes quality agricultural seeds from Kasur, Pakistan.

This repository contains the standalone frontend designed to connect seamlessly with your separately deployed backend API.

## Features

- **Public Website Pages**:
  - **Home**: Responsive hero, About section, 4-step seed breeding and processing lifecycle, and Contact section.
  - **Product Catalogue**: Seed browsing with category filtering (`/seeds`).
  - **Product Detail**: In-depth seed variety specifications (`/seeds/[slug]`).
- **Admin Panel**:
  - **Admin Login**: Secure login interface (`/admin/login`).
  - **Admin Dashboard**: Real-time metrics overview (`/admin/dashboard`).
  - **Product Catalogue Management**: Create, edit, publish/unpublish, and delete seeds (`/admin/products`).
  - **Category Management**: Create, edit, and delete crop categories (`/admin/categories`).
  - **Inquiry Management**: Review customer inquiries with status tracking (`/admin/inquiries`).
- **Contact Forms**:
  - Validated inquiry submission with honeypot spam protection and rate limiting.
- **Components & Animations**:
  - Custom scroll reveals (`Reveal.tsx`), sticky navbar with mobile drawer (`Header.tsx`), semantic footer (`Footer.tsx`), and smooth typography.
- **Decoupled API Client**:
  - Unified API communication client (`src/lib/api.ts`) configured to connect with your separately deployed backend via `NEXT_PUBLIC_API_URL`.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18, Tailwind CSS
- **Validation**: Zod
- **Typography**: Fraunces & Source Sans 3

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and set your backend API URL:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
AUTH_SECRET=your-secure-random-secret
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 4. Build for Production

```bash
npm run build
npm run start
```
