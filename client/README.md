# Task Management Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing tasks with user authentication.

## Features

- User Registration and Login with JWT Authentication
- Create, Read, Update, and Delete tasks
- Task categorization (Todo, In Progress, Completed)
- Due date tracking
- Responsive design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- Axios for API requests

## Setup and Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed locally or MongoDB Atlas account

### Backend Setup
1. Clone the repository
2. Navigate to the server directory: `cd server`
3. Install dependencies: `npm install`
4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
5. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start the client: `npm start`

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Task Routes (All Protected)
- `GET /api/tasks` - Get all tasks for logged-in user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a task by ID
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. Register a new user account or login with existing credentials
2. Once logged in, you can add, view, edit, and delete tasks
3. Tasks are categorized by status (Todo, In Progress, Completed)
4. Click on the edit button to modify a task
5. Click on the delete button to remove a task