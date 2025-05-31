import { Module } from '@nestjs/common';
import { MultivendeService } from './multivende.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MultivendeToken,
  MultivendeTokenSchema,
} from './entities/multivende-token.entity';

@Module({
  controllers: [],
  providers: [MultivendeService],
  imports: [
    MongooseModule.forFeature([
      { name: MultivendeToken.name, schema: MultivendeTokenSchema },
    ]),
  ],
  exports: [MultivendeService, MongooseModule],
})
export class MultivendeModule {}
