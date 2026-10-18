 HabitMind

Progress, Not Punishment.

HabitMind is a personal productivity and self-improvement application
designed to help users build positive habits, track unwanted habits,
organize tasks, and keep important thoughts in one place. It combines
habit tracking and personal organization in a calm, simple interface.

🚀 Features

📊 Overview Dashboard

🌱 Create and Track Good Habits

🚫 Track and Check In on Bad Habits

🔥 Monitor Habit Streaks

📝 Create and Manage Custom Lists

✅ Add, Complete, Edit & Delete List Items

📒 Create, Edit & Delete Notes

💾 Persistent Data Storage with PostgreSQL

⚡ FastAPI REST API

⚛️ React + TypeScript Frontend

🤖 AI Productivity Assistant (Planned)

🛠 Tech Stack

Frontend

React

TypeScript

Vite

Tailwind CSS

React Router

Lucide React

Backend

Python

FastAPI

SQLAlchemy

Pydantic

Database

PostgreSQL

Development Tools

Git & GitHub

Visual Studio Code

pgAdmin

Swagger UI

📊 Habit Tracking & Productivity

HabitMind currently supports:

Viewing habit information on the overview dashboard

Creating and managing good habits

Recording check-ins for unwanted habits

Tracking habit streak values

Organizing tasks into custom lists

Marking list items as completed

Saving notes and updating them later

Persisting lists, items, and notes in PostgreSQL

AI Assistant (Planned)

The AI Assistant is a planned extension of HabitMind. Potential
capabilities include:

Personalized productivity suggestions

Habit pattern analysis

Help organizing tasks and priorities

Summaries of notes and actionable ideas

These AI features are not implemented yet.

📂 Project Structure

HabitMind/
│
├── backend/
│   └── app/
│       ├── database/
│       ├── models/
│       ├── routers/
│       ├── schemas/
│       └── main.py
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.tsx
│
├── .gitignore
└── README.md

⚙ Installation

Prerequisites

Make sure you have installed:

Python

Node.js and npm

PostgreSQL

Git

Backend

From the project root, navigate to the backend directory:

cd backend

Activate your Python environment and install the dependencies listed in
your backend dependency file, if one is present.

Create a local .env file in the backend directory and configure your
PostgreSQL connection using the DATABASE_URL environment variable.
Make sure the habitmind database exists in PostgreSQL.

Start the backend from the backend directory:

python -m uvicorn app.main:app --reload

The API will be available at:

http://127.0.0.1:8000

Interactive API documentation:

http://127.0.0.1:8000/docs

Frontend

Open another terminal and navigate to the frontend directory from the
project root:

cd frontend

Install the frontend dependencies and start the development server:

npm install
npm run dev

Open the local URL shown in the terminal by Vite.

🗄️ Database

HabitMind uses PostgreSQL to persist application data. SQLAlchemy models
and FastAPI endpoints are used to work with the database.

The current database tables include:

good_habits

bad_habits

custom_lists

list_items

notes

Keep your local database credentials in backend/.env. Do not commit
.env files or database passwords to GitHub.

## 📸 Screenshots

### 🏠 Overview Dashboard

![Overview Dashboard](screenshots/overview.png)

### 🌱 Build Good Habits

![Good Habits](screenshots/good-habits.png)

### 🚫 Break Bad Habits

![Bad Habits](screenshots/bad-habits.png)

### 📝 Lists & Notes

![Lists & Notes](screenshots/lists-notes.png)

🔮 Future Improvements

AI-powered personal productivity assistant

Personalized habit recommendations

Habit and behaviour pattern analysis

More detailed progress analytics

Additional insights into productivity trends

Further improvements to validation and error handling

👨‍💻 Author

Naman Goyal

HabitMind --- Progress, not punishment.