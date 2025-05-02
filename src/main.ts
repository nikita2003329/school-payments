import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS with specific origin
  const allowedOrigins = [
    'http://localhost:5173', // Vite dev server
    'https://job-kbx30ys34-nikitas-projects-b8e5934c.vercel.app', // Vercel frontend
    'https://job-7w6e02h6b-nikitas-projects-b8e5934c.vercel.app', // Vercel frontend
    'https://job-in5mpxuep-nikitas-projects-b8e5934c.vercel.app', // Latest Vercel frontend
    'https://job-backend.onrender.com', // Render backend
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  // Set global prefix
  app.setGlobalPrefix('api');

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('School Payment API')
    .setDescription('API for managing school payments and transactions')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// For Vercel serverless deployment
export default async function handler(req: any, res: any) {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for serverless function
  const allowedOrigins = [
    'http://localhost:5173', // Vite dev server
    'https://job-kbx30ys34-nikitas-projects-b8e5934c.vercel.app', // Vercel frontend
    'https://job-7w6e02h6b-nikitas-projects-b8e5934c.vercel.app', // Vercel frontend
    'https://job-in5mpxuep-nikitas-projects-b8e5934c.vercel.app', // Latest Vercel frontend
  ];

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  }));
  
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  
  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
}

// Start the application if not in serverless environment
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}
