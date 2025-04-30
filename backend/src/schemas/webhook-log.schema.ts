import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WebhookLog extends Document {
  @Prop({ required: true })
  payload: any;

  @Prop({ required: true })
  status: number;

  @Prop()
  error: string;
}

export const WebhookLogSchema = SchemaFactory.createForClass(WebhookLog); 