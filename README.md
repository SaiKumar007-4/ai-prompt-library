#AI Prompt Library Application

## Overview
  
This project is full-satck web application built to manage AI image generation prompts.
Users create, view, and manage prompts efficiently while tracking how many times each prompt is viewed.

The application uses:

- Angular (Frontend)
- Django (Backend)
- PostgreSQL (Database)
- Redis (Cache for view counts)
- Docker Compose (Containerization)

## Tech Stack

Frontend:
- Angular (Standalone Components)
- TypeScript
- HTML/CSS 

Backend:
- Python
- Django
- REST-style Django Views

Database:
- PostgreSQL

Cache:
- Redis

Devops:
- Docker
- Docker Compose 

## Project Structure

AI-PROMPT-LIBRARY/
│
├── backend/
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── prompts/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── migrations/
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── prompt-list/
│   │   │   │   ├── prompt-detail/
│   │   │   │   └── add-prompt/
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── prompt.service.ts
│   │   │   │
│   │   │   ├── app.routes.ts
│   │   │   └── app.component.ts
│   │   │
│   │   └── styles.css
│   │
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
├── .env
├── README.md
└── .venv/   (local development environment)

## API Endpoints

### GET /api/prompts/

Returns all prompts.

Response:
[
    {
        "id": "uuid",
        "title": "....",
        "complexity": 1-10
    }
]

### POST /api/prompts/

Creates a new prompt.

Request:
{
    "title": "....",
    "content": ".....",
    "complexity": 1-10
}

### GET /api/prompts/:id

Returns a single prompt and increments view count

Response:
{
    "id": "uuid",
    "title": "...",
    "content": "....",
    "complexity": 1-10,
    "view_count": 1
}

## How to Run Project
Clone respository:

```terminal
git clone <repo-link>
cd AI-PROMPT-LIBRARY
   --Run Docker:
       ```terminal
          docker-compose up --build
   --Run migrations:
       ```terminal
          docker-compose exec backend python manage.py migrate
### Features Implemented

### Backend

- Prompt Model with:
  - id (UUID)
  - title
  - content
  - complexity
  - created_at

- API Endpoints:

GET /prompts/
Returns all prompts

POST /prompts/
Creates a new prompt

GET /prompts/:id/
Returns single prompt and increments view count

- Redis View Counter
Each prompt view increases Redis counter.


### Frontend 

Prompt List View:
- Displays all prompts
- Shows title and complexity badge

Prompt Detail View:
- Shows prompt comtent 
- Displays live view count 

Add Prompt From:
- Reactive Form
- Input validation
- Redirect after submit

UI Enhancements:
- Button-based navigation
- Complexity color badges
- Card-based layout

## Running With Docker

Make sure Docker is installed.

Run:

```terminal
docker-compose up --build
