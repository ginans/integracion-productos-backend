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
import { EnumState } from 'src/common/enums/enums';
import { Inject } from '@nestjs/common';
import { Product, productDocument } from 'src/products/entities/product.entity';

@Injectable()
export class MultivendeService {
  private readonly logger = new Logger(MultivendeService.name);
  constructor(
    @InjectModel(MultivendeToken.name)
    private tokenModel: Model<MultivendeToken>,
    @InjectModel(Product.name) private readonly productModel: Model<productDocument>,
  ) {}

  async getToken(): Promise<MultivendeToken> {
    const token = await this.tokenModel.findOne();
    if (!token) throw new Error('Token no disponible');
    return token;
  }

  async createProducts(product: IProduct): Promise<CreateProductInterface> {
    try{
      const token = await this.getToken();
      const { data } = await axios.post(
        `${token.urlMultivende}/m/${token.merchantId}/products`,
        product,
        {
          headers: { Authorization: `Bearer ${token.accessToken}` },
        },
      );
      return data;

    }catch (error) {
      this.logger.error(`Error al crear el producto ${product.sku}: ${error.message}`);
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  }
}
