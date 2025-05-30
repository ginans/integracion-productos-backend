import { Module } from '@nestjs/common';
import { MultivendeService } from './multivende.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MultivendeCredential,
  MultivendeCredentialSchema,
} from './entities/multivende-credencial.entity';
import {
  MultivendeToken,
  MultivendeTokenSchema,
} from './entities/multivende-token.entity';

@Module({
  controllers: [],
  providers: [MultivendeService],
  imports: [
    MongooseModule.forFeature([
      { name: MultivendeCredential.name, schema: MultivendeCredentialSchema },
      { name: MultivendeToken.name, schema: MultivendeTokenSchema },
    ]),
  ],
  exports: [MultivendeService, MongooseModule],
})
export class MultivendeModule {}
