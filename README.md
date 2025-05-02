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
<<<<<<< HEAD
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
=======
  - Export to multiple formats
  - Scheduled reports
  - Performance metrics
  - Trend analysis
  - Predictive analytics

- 🎨 Enhanced UI/UX
  - Modern, responsive design
  - Dark/Light mode with system preference
  - Customizable themes
  - Smooth animations
  - Loading states and skeletons
  - Error boundaries
  - Accessibility features
  - Keyboard navigation
  - Touch gestures support

- 🔒 Enterprise Security
  - JWT authentication
  - Role-based access control
  - Two-factor authentication
  - Session management
  - Audit logging
  - Data encryption
  - IP whitelisting
  - Rate limiting
  - CSRF protection

- 🌐 Internationalization
  - Multi-language support
  - RTL layout support
  - Currency formatting
  - Date/time localization
  - Number formatting
  - Cultural preferences

- 📱 Mobile Features
  - Responsive design
  - Touch-optimized interface
  - Offline support
  - Push notifications
  - QR code scanning
  - Mobile payments
  - Camera integration
  - Location services

- 🔄 Advanced Integration
  - REST API support
  - WebSocket real-time updates
  - Third-party integrations
  - Webhook support
  - OAuth authentication
  - SSO support
  - API documentation
  - SDK availability

## Tech Stack

- **Frontend**
  - React.js
  - TypeScript
  - Tailwind CSS
  - Vite
  - React Query
  - React Router

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Git
>>>>>>> 7dc5175088b4b01653fbb777c3fc9e575678154b

## Installation

1. Clone the repository:
<<<<<<< HEAD
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
=======
   ```bash
   git clone https://github.com/nikita2003329/school-payments-frontend.git
   cd school-payments-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── context/       # React context providers
│   ├── config/        # Configuration files
│   ├── types/         # TypeScript type definitions
│   └── App.tsx        # Main application component
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Pages & Features

### Transactions Page
- Displays all transactions in a sortable table
  - Sort by date, amount, status, or school
  - Pagination support with customizable page size
  - Real-time updates
  - Multi-column sorting
  - Export to CSV/PDF
- Advanced filtering capabilities
  - Filter by status (Success, Pending, Failed)
  - Filter by school (multi-select)
  - Date range selection
  - Search across all fields
  - URL-persisted filter states
- Data visualization
  - Transaction volume chart
  - Status distribution pie chart
  - Revenue trends
- Dark/Light mode support
- Responsive design for all devices
- Export functionality
  - CSV export with custom fields
  - PDF reports with charts
  - Scheduled report generation

### School Transactions Page
- School-specific transaction view
- Advanced filtering options
  - Date range selection with calendar
  - Status filters with multi-select
  - Amount range with slider
  - Custom date presets (Today, This Week, This Month)
- Data visualization
  - Transaction trends with interactive charts
  - Payment statistics with drill-down capability
  - School performance metrics
- Export functionality
  - CSV export with school-specific fields
  - PDF reports with school branding
  - Automated report scheduling

### Transaction Status Page
- Detailed transaction information
  - Transaction ID with copy button
  - Payment details with QR code
  - School information with logo
  - Timestamps with timezone support
- Status tracking
  - Real-time status updates with notifications
  - Status history with timeline view
  - Error tracking and resolution
- Receipt generation
  - Printable receipts with school branding
  - Email receipt option with templates
  - SMS notification option
- Error handling and retry options
  - Automatic retry for failed payments
  - Manual retry with reason tracking
  - Error resolution workflow

### Analytics Dashboard
- Overview metrics
  - Total transactions
  - Success rate
  - Average transaction value
  - Revenue trends
- Interactive charts
  - Transaction volume over time
  - Payment method distribution
  - School-wise performance
  - Status distribution
- Custom reports
  - Date range selection
  - School comparison
  - Performance metrics
  - Export options

### Authentication & Security
- JWT-based authentication
- Role-based access control
- Secure session management
- Password encryption
- Rate limiting
- CSRF protection
- Two-factor authentication
- Session timeout handling

### API Documentation

#### Authentication API
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - User logout

#### Transactions API
- `GET /transactions` - Get all transactions
  - Query parameters:
    - `page`: Page number
    - `limit`: Items per page
    - `status`: Filter by status
    - `school`: Filter by school
    - `search`: Search query
- `GET /transactions/school/:schoolId` - Get transactions by school
- `GET /transaction-status/:customOrderId` - Get transaction status
- `POST /transactions/export` - Export transactions

#### Error Responses
- `400 Bad Request` - Invalid parameters
- `401 Unauthorized` - Invalid or expired token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Development Guidelines

### Code Quality
- TypeScript best practices
- ESLint and Prettier
- Husky pre-commit hooks
- Conventional commits
- Code coverage
- Unit testing
- Integration testing
- E2E testing

### Performance Optimization
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Bundle analysis
- Performance monitoring
- Memory management
- Network optimization

### Security Best Practices
- Input validation
- XSS prevention
- CSRF protection
- Secure headers
- Dependency updates
- Security scanning
- Penetration testing
- Compliance checks

### Monitoring & Analytics
- Error tracking
- Performance monitoring
- User analytics
- Business metrics
- Custom dashboards
- Alert systems
- Log management
- Audit trails

## Troubleshooting

### Common Issues
1. **Authentication Issues**
   - Clear browser cache and cookies
   - Check token expiration
   - Verify credentials

2. **API Connection Problems**
   - Check network connectivity
   - Verify API URL configuration
   - Check CORS settings

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript version
   - Verify environment variables

### Support
- Create an issue on GitHub
- Check the documentation
- Contact the development team

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:3000 |

## Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```
   - Select your project
   - Choose the default settings
   - Set the following environment variables in Vercel dashboard:
     - `VITE_API_URL`: Your backend API URL

4. After deployment, Vercel will provide you with:
   - Production URL
   - Preview URL for each pull request
   - Automatic HTTPS
   - Global CDN

### Netlify
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   netlify deploy
   ```
   - Select "Create & configure a new site"
   - Choose your team
   - Set the following environment variables in Netlify dashboard:
     - `VITE_API_URL`: Your backend API URL

4. For continuous deployment:
   ```bash
   netlify deploy --prod
   ```

### AWS Amplify
1. Install AWS Amplify CLI:
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. Configure Amplify:
   ```bash
   amplify configure
   ```

3. Initialize the project:
   ```bash
   amplify init
   ```

4. Add hosting:
   ```bash
   amplify add hosting
   ```

5. Deploy:
   ```bash
   amplify publish
   ```

6. Set environment variables in AWS Amplify console:
   - `VITE_API_URL`: Your backend API URL

### Deployment Best Practices
- Always set up environment variables in your hosting platform
- Enable automatic deployments from your main branch
- Set up preview deployments for pull requests
- Configure custom domains if needed
- Set up proper caching headers
- Enable HTTPS
- Monitor deployment logs and errors

### Post-Deployment Checklist
- [ ] Verify the application is accessible via the provided URL
- [ ] Test all features in the production environment
- [ ] Verify environment variables are correctly set
- [ ] Check console for any errors
- [ ] Test the application on different devices and browsers
- [ ] Set up monitoring and error tracking
>>>>>>> 7dc5175088b4b01653fbb777c3fc9e575678154b

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

<<<<<<< HEAD
This project is licensed under the MIT License. 
=======
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Screenshots

### Dashboard Overview
![Dashboard Overview](screenshots/dashboard.png)

### Transaction Analytics
![Transaction Analytics](screenshots/analytics.png)

### Mobile View
![Mobile View](screenshots/mobile.png)

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)

### Custom Reports
![Custom Reports](screenshots/reports.png)

### Settings & Configuration
![Settings](screenshots/settings.png)

*Note: The application is continuously being improved with new features and optimizations. Additional screenshots and documentation will be added as development progresses.*
>>>>>>> 7dc5175088b4b01653fbb777c3fc9e575678154b
