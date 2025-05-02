import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = new this.orderModel(orderData);
    return order.save();
  }

  async findByCollectId(collectId: string): Promise<Order | null> {
    return this.orderModel.findOne({ custom_order_id: collectId }).exec();
  }

  async findById(id: string): Promise<Order | null> {
    return this.orderModel.findById(id).exec();
  }

  async updateStatus(orderId: string, status: string): Promise<Order | null> {
    return this.orderModel
      .findByIdAndUpdate(orderId, { status }, { new: true })
      .exec();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findBySchoolId(schoolId: string): Promise<Order[]> {
    return this.orderModel.find({ school_id: schoolId }).exec();
  }
} 