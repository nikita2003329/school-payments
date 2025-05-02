import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebhookLog } from '../schemas/webhook-log.schema';

@Injectable()
export class WebhookLogService {
  constructor(
    @InjectModel(WebhookLog.name)
    private readonly webhookLogModel: Model<WebhookLog>,
  ) {}

  async create(data: Partial<WebhookLog>): Promise<WebhookLog> {
    const webhookLog = new this.webhookLogModel(data);
    return webhookLog.save();
  }

  async findAll(): Promise<WebhookLog[]> {
    return this.webhookLogModel.find().exec();
  }

  async markAsProcessed(logId: string): Promise<WebhookLog> {
    return this.webhookLogModel
      .findByIdAndUpdate(logId, { processed: true }, { new: true })
      .exec();
  }

  async findByCollectId(collectId: string): Promise<WebhookLog | null> {
    return this.webhookLogModel
      .findOne({ collection_id: collectId })
      .exec();
  }
} 