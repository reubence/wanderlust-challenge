<img width="1136" alt="image" src="https://github.com/user-attachments/assets/3c7abab6-95a6-42de-89db-31f4f6d36e30" />

# Wanderlust Debug Challenge

Welcome to the Wanderlust Debug Challenge! This is a take-home assignment designed to test your debugging and problem-solving skills in a real-world scenario.

## Overview

This project is a Next.js 15 application with App Router, TypeScript, Prisma, PostgreSQL (with pgvector), and shadcn/ui components. The application is a travel destination search platform that allows users to search for destinations and transcribe voice to text.

Unfortunately, there's a bug (or several) preventing the application from running correctly. Your mission is to identify and fix these issues.

## Your Mission (≈15 hours)

1. **Reproduce** the failure locally by running `docker compose up`.
2. **Trace & fix** the root cause(s). The issue(s) could be in API route logic, environment variable configuration, database migration, or elsewhere.
3. **Ship a clean PR** that:
   * Makes all `npm test` cases pass
   * Ensures `/api/ping` returns the expected JSON response
   * Keeps `docker compose up` reproducible on Mac, Linux, and WSL
   * Adds **one new test** proving your fix works

## Rules

* Work solo, **no questions will be answered**—show high agency; document your assumptions in the PR.
* Time-box yourself to **≈15 hours**, submit within **3 days**.
* Do **not** swap the stack; patch it.
* Keep commits atomic with clear messages.
* Update this README.md (≤1 page) explaining your diagnosis + fix path.

## Getting Started

### Prerequisites

* Node.js 18+
* Docker and Docker Compose

### Setup

1. Clone this repository
2. Create a `.env` file based on `.env.example`
3. Get a free API key from [OpenRouter](https://openrouter.ai/) for the voice transcription functionality
4. Add your OpenRouter API key to the `.env` file
5. Start the application with Docker Compose:

```bash
docker compose up
```

4. The application should be running at http://localhost:3000 (if all issues are fixed)

## API Endpoints

- `GET /api/ping` - Check API and database status
- `POST /api/search` - Search destinations
- `POST /api/transcribe` - Transcribe voice to text

## Testing

Run the tests with:

```bash
npm test
```

## Deliverables

* GitHub PR against `main`
* All tests green in CI
* Short Loom/GIF (<60 seconds) showing the app running

## Evaluation (100 points)

* Bug Fix & Tests (45 points)
* Code Clarity & Commit Hygiene (20 points)
* Docker Reproducibility (15 points)
* Problem-solving narrative (README) (10 points)
* UX check (app loads & basic flow) (10 points)

**Bonus**: If you spot *other* latent issues (performance, security) and patch them with notes.

Good luck! 🚀
