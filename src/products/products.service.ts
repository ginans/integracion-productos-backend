import { Injectable, Logger } from '@nestjs/common';
import { IProduct, IRetrieveAllProductsResponse } from 'src/shared/jumpseller/interface/retrieve-all-products.interface';
import { JumpsellerService } from 'src/shared/jumpseller/jumpseller.service';
import { Product, productDocument } from './entities/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly jumpsellerService: JumpsellerService,
    @InjectModel(Product.name) private readonly productModel: Model<productDocument>
  ) {}

  async fecthJumpsellerProducts(): Promise<IProduct[]> {
    const petition = await this.jumpsellerService.getRecentProducts()
    const response = petition.map((product: IRetrieveAllProductsResponse) => {
      return product.product
    })
    return response;
  }

  async saveProducts(product: IProduct): Promise<IProduct> {
    try{
      if (!product) {
        this.logger.error('No se recibió el producto');
        return
      }
      const existingProduct = await this.productModel.findOne({ sku: product.sku }).exec();
  
      if (existingProduct){
        this.logger.log(`El producto con SKU ${product.sku} ya existe en la base de datos`);
        return;
      }
        this.logger.log(`Guardando producto con SKU ${product.sku} en la base de datos`);
      const result =  await this.productModel.create(product)
  
      return result;
    }catch (error) {
      this.logger.error(`Error al guardar el producto: ${error.message}`);
      throw error
    }
  }

  // async saveMultivendeResponse(produ ) {

}


