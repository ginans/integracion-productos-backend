import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MultivendeToken } from './entities/multivende-token.entity';
import axios from 'axios';
import { IProduct } from '../jumpseller/interface/retrieve-all-products.interface';
import { CreateProductInterface } from './interfaces/create-product.interface';

@Injectable()
export class MultivendeService {
  private readonly logger = new Logger(MultivendeService.name);
  constructor(
    @InjectModel(MultivendeToken.name)
    private tokenModel: Model<MultivendeToken>,
  ) {}

  async getToken(): Promise<MultivendeToken> {
    const token = await this.tokenModel.findOne();
    if (!token) throw new Error('Token no disponible');
    return token;
  }

  async createProducts(product: IProduct): Promise<CreateProductInterface> {
    const token = await this.getToken();
    const { data } = await axios.post(
      `${token.urlMultivende}/m/${token.merchantId}/products`,
      product,
      {
        headers: { Authorization: `Bearer ${token.accessToken}` },
      },
    );
    return data;
  }
}
