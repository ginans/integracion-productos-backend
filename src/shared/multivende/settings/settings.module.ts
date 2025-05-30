import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { MultivendeService } from '../multivende.service';
import { MultivendeModule } from '../multivende.module';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService, MultivendeService],
  imports: [MultivendeModule],
})
export class SettingsModule {}
