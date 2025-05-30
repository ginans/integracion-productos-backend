import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class MultivendeCredential {
  @Prop({ required: true })
  code: string;
  //refreshToken multivende
  @Prop({ required: true })
  urlApiMultivende: string;

  //refreshToken multivende
  @Prop({ required: true })
  clientIdMultivende: number;

  //refreshToken multivende
  @Prop({ required: true })
  clientSecretMultivende: string;

  //configIsValidMultivende multivende
  @Prop({ default: false })
  configIsValidMultivende: boolean;

  //merchantId multivende
  @Prop({ required: true })
  merchantId: string;

  @Prop({ required: true })
  warehouseId: string;
}
//ESTE VALOR TRAE LOS MÉTODOS DEL REGISTRO DE LA BD
export type MultivendeCredentialDocument =
  HydratedDocument<MultivendeCredential>;

export const MultivendeCredentialSchema =
  SchemaFactory.createForClass(MultivendeCredential);
