import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class MultivendeToken {
  //accesstoken multivende
  @Prop({ required: true })
  accessToken: string;

  @Prop({ required: true })
  urlMultivende: string;

  @Prop({ required: true })
  merchantId: string;
}

export type MultivendeTokenDocument = HydratedDocument<MultivendeToken>;

export const MultivendeTokenSchema =
  SchemaFactory.createForClass(MultivendeToken);
