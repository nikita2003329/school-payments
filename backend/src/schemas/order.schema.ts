import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  school_id: string;

  @Prop({ required: true })
  trustee_id: string;

  @Prop({
    type: {
      name: String,
      id: String,
      email: String,
    },
    required: true,
  })
  student_info: {
    name: string;
    id: string;
    email: string;
  };

  @Prop({ required: true })
  gateway_name: string;

  @Prop({ required: true })
  order_amount: number;

  @Prop({ required: true })
  transaction_amount: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  custom_order_id: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order); 