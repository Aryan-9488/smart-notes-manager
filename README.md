# Smart Notes Manager

Smart Notes Manager is a full-stack notes application built with React, Spring Boot, and MongoDB. Users can create, edit, delete, search, filter, and mark notes as important.

## Features

- Create notes with title, description, and important status
- Edit existing notes
- Delete notes
- Mark and unmark notes as important
- Search notes by title or description
- Filter to show all notes or only important notes
- Responsive user interface
- REST API backed by MongoDB persistence

## Tech Stack

- Frontend: React, Vite, Axios, CSS
- Backend: Java 17, Spring Boot 3, Spring Web, Spring Data MongoDB
- Database: MongoDB or MongoDB Atlas
- Build tools: npm, Maven

## Project Structure

```text
Smart Notes Manager/
  frontend/        React + Vite client
  backend/notes/   Spring Boot REST API
```

## Prerequisites

- Node.js 18 or newer
- Java 17
- Maven 3.9 or newer
- MongoDB running locally, or a MongoDB Atlas connection string

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/smart-notes-manager.git
cd smart-notes-manager
```

If you already have the project folder, open a terminal inside the project root.

---

### 2. Backend Setup

Create `.env` file inside `backend/notes`:

```env
SMART_NOTES_MONGO_URI=your_mongodb_uri_here
CORS_ALLOWED_ORIGINS=http://localhost:5173
MONGODB_LOG_LEVEL=INFO
```

Example for local MongoDB:

```env
SMART_NOTES_MONGO_URI=mongodb://localhost:27017/smartnotesmanager?serverSelectionTimeoutMS=3000
```

Run backend:

```bash
cd backend/notes
mvn spring-boot:run
```

Backend will run on:

```text
http://localhost:8080
```

---

### 3. Frontend Setup

Create `.env` file inside `frontend`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Run frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

### 4. MongoDB Connection Check

After starting the backend, open this URL:

```text
http://localhost:8080/api/health/mongodb
```

Expected response:

```json
{
  "status": "UP",
  "database": "smartnotesmanager"
}
```

## API Endpoints

Base URL: `http://localhost:8080/api`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/notes` | Get all notes |
| POST | `/notes` | Create a note |
| PUT | `/notes/{id}` | Update a note |
| DELETE | `/notes/{id}` | Delete a note |
| GET | `/health/mongodb` | Check MongoDB connectivity |
