import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { EnumState } from 'src/common/enums/enums';
import {
  Category,
  Image,
  IProduct,
  Variant,
} from 'src/shared/jumpseller/interface/retrieve-all-products.interface';

@Schema({ timestamps: true })
export class Product implements IProduct {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  page_title: string;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop()
  days_to_expire: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  discount: number;

  @Prop()
  weight: number;

  @Prop()
  stock: number;

  @Prop()
  stock_unlimited: boolean;

  @Prop({ default: 0 })
  stock_threshold: number;

  @Prop()
  stock_notification: boolean;

  @Prop()
  cost_per_item: number;

  compare_at_price: number;

  @Prop({ required: true, unique: true })
  sku: string;

  @Prop()
  brand: string;

  @Prop()
  barcode: string;

  @Prop()
  google_product_category: string;

  @Prop()
  featured: boolean;

  @Prop()
  reviews_enabled: boolean;

  @Prop()
  status: string;

  @Prop()
  created_at: string;

  @Prop()
  updated_at: string;

  @Prop()
  package_format: string;

  @Prop()
  length: number;

  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop()
  diameter: number;

  @Prop()
  permalink: string;

  @Prop()
  categories: Category[];

  @Prop({ type: [{ type: Object }] })
  images?: Image[];

  @Prop({ type: [{ type: Object }] })
  variants: Variant[];

  @Prop({ default: EnumState.PENDING })
  state: EnumState;

  @Prop({default: null})
  multivendeNumber: string;
}

export type productDocument = HydratedDocument<Product>;
export const productSchema = SchemaFactory.createForClass(Product);