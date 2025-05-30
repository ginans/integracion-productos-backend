import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class MultivendeToken {
  //codigo multivende
  @Prop({ required: true })
  code: string;

  //accesstoken multivende
  @Prop({ required: true })
  accessToken: string;

  //refreshToken multivende
  @Prop({ required: true })
  refreshToken: string;

  //refreshToken multivende
  @Prop({ required: true })
  refreshTokenExpiresAt: Date;
}

export type MultivendeTokenDocument = HydratedDocument<MultivendeToken>;

export const MultivendeTokenSchema =
  SchemaFactory.createForClass(MultivendeToken);
