import { Module } from '@nestjs/common';
import { JumpsellerService } from './jumpseller.service';
import { JumpsellerSettingsService } from './jumpsellerSettings.service';


@Module({
  controllers: [],
  providers: [JumpsellerService, JumpsellerSettingsService],
  imports: [],
  exports: [JumpsellerService, JumpsellerSettingsService]
})
export class JumpsellerModule {}
