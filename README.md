# Event Management API

A Node.js REST API for managing events and user registrations built with Express.js, Prisma, and PostgreSQL.

## Features

- User management (create, list users)
- Event management (create, list, view details)
- Event registration system
- PostgreSQL database with Prisma ORM

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL  (hosted on Supabase Cloud)
- **Validation**: Express middleware

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Kshitizjain11/Event-Management-Api.git
   
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   PORT=3000
   ```

   Replace the values with your actual PostgreSQL connection details.

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the server**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

## API Description

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Create a new user |
| GET | `/users` | List all users |

#### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/events` | Create a new event |
| GET | `/events` | List upcoming events |
| GET | `/events/:eventId` | Get event details |
| POST | `/events/:eventId/register` | Register for an event |
| POST | `/events/:eventId/cancel` | Cancel event registration |
| GET | `/events/:eventId/stats` | Get event statistics |

## Example Requests/Responses

### Create User
**Request:**
```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "id": "uuid-generated-id",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-01-16T14:30:00.000Z",
  "updatedAt": "2025-01-16T14:30:00.000Z"
}
```

### Create Event
**Request:**
```bash
POST /api/events
Content-Type: application/json

{
  "title": "Tech Conference 2025",
  "dateTime": "2025-06-15T10:00:00.000Z",
  "location": "San Francisco, CA",
  "capacity": 100
}
```

**Response:**
```json
{
  "id": "uuid-generated-id",
  "title": "Tech Conference 2025",
  "dateTime": "2025-06-15T10:00:00.000Z",
  "location": "San Francisco, CA",
  "capacity": 100,
  "createdAt": "2025-01-16T14:30:00.000Z",
  "updatedAt": "2025-01-16T14:30:00.000Z"
}
```

### List Upcoming Events
**Request:**
```bash
GET /api/events
```

**Response:**
```json
{
  "events": [
    {
      "id": "uuid-generated-id",
      "title": "Tech Conference 2025",
      "dateTime": "2025-06-15T10:00:00.000Z",
      "location": "San Francisco, CA",
      "capacity": 100,
      "registrations": [
        {
          "id": "uuid-generated-id",
          "userId": "user-uuid",
          "eventId": "event-uuid",
          "createdAt": "2025-01-16T14:30:00.000Z"
        }
      ]
    }
  ]
}
```

### Register for Event
**Request:**
```bash
POST /api/events/:eventId/register
Content-Type: application/json

{
  "userId": "user-uuid"
}
```

**Response:**
```json
{
  "message": "Successfully registered for the event",
  "registration": {
    "id": "uuid-generated-id",
    "userId": "user-uuid",
    "eventId": "event-uuid",
    "createdAt": "2025-01-16T14:30:00.000Z"
  }
}
```

### Get Event Details
**Request:**
```bash
GET /api/events/:eventId
```

**Response:**
```json
{
  "id": "uuid-generated-id",
  "title": "Tech Conference 2025",
  "dateTime": "2025-06-15T10:00:00.000Z",
  "location": "San Francisco, CA",
  "capacity": 100,
  "registrations": [
    {
      "id": "uuid-generated-id",
      "userId": "user-uuid",
      "eventId": "event-uuid",
      "createdAt": "2025-01-16T14:30:00.000Z",
      "user": {
        "id": "user-uuid",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

### Get Event Statistics
**Request:**
```bash
GET /api/events/:eventId/stats
```

**Response:**
```json
{
  "eventId": "uuid-generated-id",
  "title": "Tech Conference 2025",
  "totalRegistrations": 25,
  "remainingCapacity": 75
}
```

## Error Handling

The API includes comprehensive error handling. Error responses follow this format:

```json
{
  "error": "Error message describing what went wrong",
  "code": "ERROR_CODE",
  "details": "Additional error details if available"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict (e.g., user already registered)
- `500` - Internal Server Error

## Database Schema

The application uses three main models:

- **User**: Stores user information
- **Event**: Stores event details
- **Registration**: Manages user-event relationships

For detailed schema information, refer to `prisma/schema.prisma`.

## Development

### Project Structure
```
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Dependency lock file
├── README.md              # Project documentation
├── .git/                  # Git repository data
├── node_modules/          # Installed dependencies
├── prisma/
│   └── schema.prisma       # Database schema
└── src/
    ├── controller/         # Request handlers
    │   ├── event.controller.js
    │   └── user.controller.js
    ├── middleware/         # Custom middleware
    │   └── errorHandler.js
    ├── routes/             # API routes
    │   ├── events.js
    │   └── users.js
    ├── services/           # Business logic
    │   ├── eventService.js
    │   └── userService.js
    └── server.js           # Application entry point
```

### Adding New Features

1. Define new routes in `src/routes/`
2. Implement controllers in `src/controller/`
3. Add business logic in `src/services/`
4. Update the Prisma schema if new models are needed
5. Run `npx prisma generate` after schema changes
