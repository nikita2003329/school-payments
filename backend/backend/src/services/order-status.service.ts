import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderStatus } from '../schemas/order-status.schema';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectModel(OrderStatus.name)
    private readonly orderStatusModel: Model<OrderStatus>,
  ) {}

  async create(statusData: Partial<OrderStatus>): Promise<OrderStatus> {
    const status = new this.orderStatusModel(statusData);
    return status.save();
  }

  async findByCollectId(collectId: string): Promise<OrderStatus | null> {
    return this.orderStatusModel.findOne({ collect_id: collectId }).exec();
  }

  async findAll(): Promise<OrderStatus[]> {
    return this.orderStatusModel.find().exec();
  }
} 