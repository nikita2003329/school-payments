import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.use(cors());
  
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

  // Get port from environment variable or use default
  const port = process.env.PORT || 3000;
  console.log(`Starting server on port ${port}`);
  
  // Bind to all network interfaces
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Application is running on: http://0.0.0.0:${port}`);
  });
}

// Always bootstrap in production
if (process.env.NODE_ENV === 'production') {
  bootstrap().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
} else {
  bootstrap().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}
