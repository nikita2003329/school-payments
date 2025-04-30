# School Payment System

A full-stack application for managing school payments and transactions.

## Project Structure

```
.
├── backend/           # NestJS backend
├── frontend/          # React frontend
└── README.md          # This file
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=1d
   PAYMENT_API_KEY=your_payment_api_key
   PG_KEY=your_pg_key
   SCHOOL_ID=your_school_id
   ```

4. Start the backend server:
   ```bash
   npm run start:dev
   ```

The backend API will be available at `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will be available at `http://localhost:5173`.

## Features

### Backend
- JWT Authentication
- Payment Gateway Integration
- Transaction Management
- Webhook Support
- Swagger Documentation

### Frontend
- View all transactions with filtering and sorting
- View transactions by school
- Check transaction status
- Responsive design with Tailwind CSS
- Real-time data updates

## API Documentation

Once the backend is running, you can access the Swagger documentation at:
```
http://localhost:3000/api
```

## Development

1. Start the backend server in one terminal:
   ```bash
   cd backend
   npm run start:dev
   ```

2. Start the frontend development server in another terminal:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Deployment

### Backend
1. Build the application:
   ```bash
   cd backend
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start:prod
   ```

### Frontend
1. Build the application:
   ```bash
   cd frontend
   npm run build
   ```

2. The build artifacts will be stored in the `dist/` directory.

## Testing

### Backend
```bash
cd backend
npm run test        # Unit tests
npm run test:e2e    # e2e tests
```

### Frontend
```bash
cd frontend
npm run test       # Unit tests
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 