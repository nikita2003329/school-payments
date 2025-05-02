import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { OrderStatus } from '../schemas/order-status.schema';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderStatus.name) private orderStatusModel: Model<OrderStatus>,
    private configService: ConfigService,
  ) {}

  generateToken(payload: any): string {
    const apiKey = this.configService.get<string>('PAYMENT_API_KEY');
    if (!apiKey) {
      throw new Error('PAYMENT_API_KEY is not configured');
    }
    return jwt.sign(payload, apiKey);
  }

  async createPayment(createPaymentDto: any) {
    const order = new this.orderModel(createPaymentDto);
    await order.save();

    const payload = {
      pg_key: this.configService.get<string>('PG_KEY'),
      school_id: this.configService.get<string>('SCHOOL_ID'),
      collect_id: order._id,
      order_amount: createPaymentDto.order_amount,
    };

    const token = this.generateToken(payload);

    try {
      const response = await axios.post('https://api.payment-gateway.com/create-collect-request', {
        ...payload,
        token,
      });

      return {
        order,
        paymentUrl: response.data.payment_url,
      };
    } catch (error) {
      throw new Error('Failed to create payment request');
    }
  }

  async handleWebhook(webhookData: any) {
    const orderStatus = new this.orderStatusModel({
      collect_id: webhookData.order_info.order_id,
      order_amount: webhookData.order_info.order_amount,
      transaction_amount: webhookData.order_info.transaction_amount,
      payment_mode: webhookData.order_info.payment_mode,
      payment_details: webhookData.order_info.payemnt_details,
      bank_reference: webhookData.order_info.bank_reference,
      payment_message: webhookData.order_info.Payment_message,
      status: webhookData.order_info.status,
      error_message: webhookData.order_info.error_message,
      payment_time: new Date(webhookData.order_info.payment_time),
    });

    return orderStatus.save();
  }

  async getTransactions() {
    return this.orderStatusModel.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: 'collect_id',
          foreignField: '_id',
          as: 'order',
        },
      },
      {
        $unwind: '$order',
      },
      {
        $project: {
          collect_id: 1,
          school_id: '$order.school_id',
          gateway: '$order.gateway_name',
          order_amount: 1,
          transaction_amount: 1,
          status: 1,
          custom_order_id: '$order._id',
        },
      },
    ]);
  }

  async getTransactionsBySchool(schoolId: string) {
    return this.orderStatusModel.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: 'collect_id',
          foreignField: '_id',
          as: 'order',
        },
      },
      {
        $unwind: '$order',
      },
      {
        $match: {
          'order.school_id': schoolId,
        },
      },
      {
        $project: {
          collect_id: 1,
          school_id: '$order.school_id',
          gateway: '$order.gateway_name',
          order_amount: 1,
          transaction_amount: 1,
          status: 1,
          custom_order_id: '$order._id',
        },
      },
    ]);
  }

  async getTransactionStatus(customOrderId: string) {
    return this.orderStatusModel.findOne({ collect_id: customOrderId });
  }
} 