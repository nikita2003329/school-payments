import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class OrderStatus extends Document {
  @Prop({ required: true, ref: 'Order' })
  collect_id: string;

  @Prop({ required: true })
  order_amount: number;

  @Prop({ required: true })
  transaction_amount: number;

  @Prop({ required: true })
  payment_mode: string;

  @Prop({ required: true })
  payment_details: string;

  @Prop({ required: true })
  bank_reference: string;

  @Prop({ required: true })
  payment_message: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  error_message: string;

  @Prop({ required: true })
  payment_time: Date;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus); 