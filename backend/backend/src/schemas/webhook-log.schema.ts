import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WebhookLog extends Document {
  @Prop({ required: true })
  collection_id: string;

  @Prop({ required: true, type: Object })
  payload: Record<string, any>;
}

export const WebhookLogSchema = SchemaFactory.createForClass(WebhookLog); 