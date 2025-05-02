# School Payments Dashboard

A modern, responsive dashboard for managing school payment transactions with real-time updates, advanced analytics, and comprehensive features.

## Features

- 📊 Advanced Transaction Management
  - Real-time transaction monitoring
  - Multi-column sorting and filtering
  - Customizable data views
  - Bulk actions and operations
  - Transaction history tracking
  - Automated reconciliation
  - Smart search with filters
  - Custom report generation

- 📈 Comprehensive Analytics
  - Interactive dashboards
  - Real-time data visualization
  - Custom chart creation
  - Performance metrics
  - Trend analysis
  - Export capabilities

## API Documentation

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Authorization: Bearer <token>
```

### Payment Endpoints

#### Create Payment
```http
POST /api/payment/create
Content-Type: application/json
Authorization: Bearer <token>

{
  "amount": "string",
  "callbackUrl": "string"
}
```

#### Get Transactions
```http
GET /api/payment/transactions
Authorization: Bearer <token>
```

#### Get School Transactions
```http
GET /api/payment/transactions/school/{schoolId}
Authorization: Bearer <token>
```

#### Get Transaction Status
```http
GET /api/payment/transaction-status/{customOrderId}
Authorization: Bearer <token>
```

#### Check Payment Status
```http
GET /api/payment/status/{collectRequestId}
Authorization: Bearer <token>
```

### WebSocket Events

Connect to `wss://your-backend-url` for real-time updates:

- `transaction.created`: New transaction created
- `transaction.updated`: Transaction status updated
- `payment.completed`: Payment completed
- `payment.failed`: Payment failed

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://your-mongodb-uri
PG_KEY=your-pg-key
API_KEY=your-api-key
SCHOOL_ID=your-school-id
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url/api
VITE_WS_URL=wss://your-backend-url
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nikita2003329/school-payments-frontend.git
cd school-payments-frontend
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
- Copy `.env.example` to `.env` in both frontend and backend directories
- Update the values with your configuration

4. Start the development servers:
```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd frontend
npm run dev
```

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the provided `render.yaml` configuration
4. Set environment variables in Render dashboard

### Frontend (Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

## Error Handling

All API endpoints follow standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses include:
```json
{
  "statusCode": number,
  "message": string,
  "error": string
}
```

## Security

- JWT-based authentication
- CORS enabled for specific origins
- Rate limiting
- Input validation
- Secure headers
- HTTPS/SSL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 