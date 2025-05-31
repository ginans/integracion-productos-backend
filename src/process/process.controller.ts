import { Body, Controller, Param, Patch, Post, Query } from '@nestjs/common';
import { ProcessService } from './process.service';
import { RecalculatePricesByBaseDto } from './dto/recalculate-prices-by-base.dto';
import { RecalculatePricesByUsdDto } from './dto/recalculate-prices-by-usd.dto';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post('products')
  async createProducts(): Promise<void> {
    return this.processService.createProductsQueue();
  }
}
