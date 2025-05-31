import { Injectable, Logger } from '@nestjs/common';
import { JumpsellerSettingsService } from './jumpsellerSettings.service';
import axios from 'axios';
import { IRetrieveAllProductsResponse } from './interface/retrieve-all-products.interface';

@Injectable()
export class JumpsellerService {
  private readonly logger = new Logger(JumpsellerService.name);
  
  constructor(
    private readonly jumpsellerSettingsService: JumpsellerSettingsService
  ) {}

    async getRecentProducts(): Promise<IRetrieveAllProductsResponse[]> {
      const authToken = await this.jumpsellerSettingsService.getBasicAuthToken()
      let productosRecientes = [];
      const ahora = new Date();
      const hace24Horas = new Date(ahora.getTime() - 24*60*60*1000);
      
      let page = 1;
      const limit = 100;
      let masProductos = true;

      while (masProductos) {
        const { data } = await axios.get(
          'https://api.jumpseller.com/v1/products.json',
          {
            headers: { Authorization: `Basic ${authToken}` },
            params: { page, limit },
          },
        );

        if (data.length === 0) {
          masProductos = false;
          break;
        }
        //filtro por productos creados en las últimas 24 horas y con stock disponible
        const recientes = data.filter(
          (p) =>
            new Date(p.product.created_at) >= hace24Horas &&
            p.product.stock > 0,
        );
        productosRecientes.push(...recientes);

        page++;
        this.logger.log(
          `Productos creados en las últimas 24 horas 🙂‍↕️: ${productosRecientes.length}`,
        );

        return productosRecientes;
      }
  }
}