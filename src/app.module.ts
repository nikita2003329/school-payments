import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { WebhookLogModule } from './webhook-log/webhook-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb+srv://nikita003:pinky@nikita.yiwiecm.mongodb.net/',
      }),
      inject: [ConfigService],
    }),
    PaymentModule,
    OrderModule,
    OrderStatusModule,
    WebhookLogModule,
  ],
})
export class AppModule {}
