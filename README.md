# School Payments System

A modern full-stack application for managing school payments and transactions, built with React, NestJS, and MongoDB.

## 🚀 Features

- **Transaction Management**
  - Real-time transaction monitoring
  - Multi-column sorting and filtering
  - Customizable data views
  - Export functionality

- **School-Specific Views**
  - School-wise transaction tracking
  - Performance analytics
  - Custom reporting

- **Security**
  - JWT authentication
  - Role-based access control
  - Secure payment processing
  - HTTPS/SSL encryption

## 🛠 Tech Stack

- **Frontend**
  - React + TypeScript
  - Tailwind CSS
  - React Query
  - Vite

- **Backend**
  - NestJS
  - MongoDB
  - JWT Authentication
  - WebSocket

- **Deployment**
  - Frontend: Vercel
  - Backend: Render

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance
- Payment gateway credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nikita2003329/school-payments.git
cd school-payments
```

2. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Set up environment variables:

Backend (`.env`):
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=your_mongodb_uri
PG_KEY=your_payment_gateway_key
API_KEY=your_api_key
SCHOOL_ID=your_school_id
JWT_SECRET=your_jwt_secret
```

Frontend (`.env`):
```env
VITE_API_URL=http://localhost:3000
```

4. Start development servers:
```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd frontend
npm run dev
```

## 📚 API Documentation

### Authentication

```http
POST /auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

```http
POST /auth/refresh
Authorization: Bearer <token>
```

### Transactions

```http
GET /transactions
Authorization: Bearer <token>
```

```http
GET /transactions/school/:schoolId
Authorization: Bearer <token>
```

```http
GET /transaction-status/:customOrderId
Authorization: Bearer <token>
```

## 🚀 Deployment

### Backend (Render)

1. Create a Web Service on Render
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy using the provided `render.yaml`

### Frontend (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

## 🔒 Security

- JWT-based authentication
- CORS enabled for specific origins
- Rate limiting
- Input validation
- Secure headers
- HTTPS/SSL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.
