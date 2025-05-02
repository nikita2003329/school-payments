import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { OrderService } from '../services/order.service';
import { OrderStatusService } from '../services/order-status.service';
import { WebhookLogService } from '../services/webhook-log.service';
import { Types } from 'mongoose';
import { Order } from '../schemas/order.schema';

interface WebhookData {
  collect_id: string;
  status: string;
  [key: string]: any;
}

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly orderService: OrderService,
    private readonly orderStatusService: OrderStatusService,
    private readonly webhookLogService: WebhookLogService,
  ) {}

  @Post('create')
  async createPayment(@Body() body: { amount: string; callbackUrl: string }) {
    const paymentResponse = await this.paymentService.createPaymentRequest(
      body.amount,
      body.callbackUrl,
    );

    // Create order record
    const order = await this.orderService.create({
      school_id: '65b0e6293e9f76a9694d84b4', // Using the provided school ID
      trustee_id: 'dummy-trustee-id', // This should come from the authenticated user
      student_info: {
        name: 'Test Student',
        id: 'test-student-id',
        email: 'test@example.com',
      },
      gateway_name: 'Edviron',
      order_amount: parseFloat(body.amount),
      transaction_amount: parseFloat(body.amount),
      status: 'pending',
      custom_order_id: paymentResponse.collect_request_id,
    });

    return {
      ...paymentResponse,
      order_id: order._id,
    };
  }

  @Get('status/:collectRequestId')
  async checkStatus(@Param('collectRequestId') collectRequestId: string) {
    const status = await this.paymentService.checkPaymentStatus(collectRequestId);
    return status;
  }

  @Post('webhook')
  async handleWebhook(@Body() webhookData: WebhookData) {
    const order = await this.orderService.findByCollectId(webhookData.collect_id);
    if (!order || !order._id) {
      throw new Error('Order not found');
    }

    const orderId = order._id.toString();

    await this.orderStatusService.create({
      collect_id: new Types.ObjectId(orderId),
      status: webhookData.status,
      // ... other fields
    });

    await this.webhookLogService.create({
      collection_id: orderId,
      payload: webhookData,
    });

    return { success: true };
  }
} 