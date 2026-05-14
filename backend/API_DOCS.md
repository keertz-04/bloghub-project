# BLOGHUB Backend API Documentation

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment Variables**
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your MongoDB URL and JWT secret
```

3. **Start the Server**
```bash
# Development mode
npm start

# Production mode
NODE_ENV=production npm start
```

Server will run on `http://localhost:5000` (or your configured PORT)

---

## API Endpoints

### Admin Authentication

#### Register
```
POST /api/admin/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "message": "Admin registered successfully",
  "adminId": "507f1f77bcf86cd799439011"
}
```

#### Login
```
POST /api/admin/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Blog Management

#### Get All Blogs
```
GET /api/blog/all?page=1&limit=10

Response (200):
{
  "blogs": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "My First Blog",
      "content": "This is the blog content...",
      "author": "John Doe",
      "description": "Short description",
      "createdAt": "2024-05-14T10:30:00Z",
      "updatedAt": "2024-05-14T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "pages": 3,
    "currentPage": 1,
    "limit": 10
  }
}
```

#### Get Single Blog
```
GET /api/blog/:id

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My First Blog",
  "content": "This is the blog content...",
  "author": "John Doe",
  "description": "Short description",
  "createdAt": "2024-05-14T10:30:00Z",
  "updatedAt": "2024-05-14T10:30:00Z"
}
```

#### Create Blog (Protected)
```
POST /api/blog/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My First Blog",
  "content": "This is the blog content with at least 20 characters...",
  "author": "John Doe",
  "description": "Optional short description"
}

Response (201):
{
  "message": "Blog added successfully",
  "blog": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My First Blog",
    "content": "...",
    "author": "John Doe",
    "createdAt": "2024-05-14T10:30:00Z",
    "updatedAt": "2024-05-14T10:30:00Z"
  }
}
```

#### Edit Blog (Protected)
```
PUT /api/blog/edit/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "author": "John Doe"
}

Response (200):
{
  "message": "Blog updated successfully",
  "blog": { ... }
}
```

#### Delete Blog (Protected)
```
DELETE /api/blog/delete/:id
Authorization: Bearer {token}

Response (200):
{
  "message": "Blog deleted successfully",
  "blogId": "507f1f77bcf86cd799439011"
}
```

#### Health Check
```
GET /api/health

Response (200):
{
  "status": "ok",
  "timestamp": "2024-05-14T10:30:00Z",
  "environment": "development"
}
```

---

## Database Schema

### Admin Schema
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, hashed, min 6 chars),
  createdAt: Date (default: now)
}
```

### Blog Schema
```javascript
{
  title: String (required, 5-200 chars),
  content: String (required, min 20 chars),
  author: String (required),
  description: String (optional, max 500 chars),
  createdAt: Date (default: now),
  updatedAt: Date (auto-updated)
}
```

---

## Error Handling

All errors return appropriate HTTP status codes with error messages:

```json
{
  "error": "Error message description"
}
```

### Common Status Codes
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid token or credentials)
- `404` - Not Found (resource not found)
- `500` - Internal Server Error

---

## Security Features

✓ Password hashing with bcryptjs
✓ JWT authentication for protected routes
✓ Input validation and sanitization
✓ CORS protection
✓ Error handling middleware
✓ Rate limiting ready (implement if needed)
✓ Secure MongoDB schema validation
✓ SQL injection prevention via Mongoose
✓ XSS protection via input sanitization

---

## Environment Variables

- `MONGO_URL` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - JWT signing secret
- `CORS_ORIGIN` - CORS allowed origins (default: *)

---

## Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

**Get All Blogs:**
```bash
curl http://localhost:5000/api/blog/all
```

**Create Blog:**
```bash
curl -X POST http://localhost:5000/api/blog/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"My Blog","content":"Blog content here...","author":"John"}'
```
