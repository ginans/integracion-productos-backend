import { Controller, Get, Post, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  /**
   * Trae todas las configuraciones de la app
   */
  @Get()
  findAll() {
    return this.settingsService.findAll();
  }
  @Post('mv')
  createMVCredentials(@Body() body: CreateSettingDto) {
    return this.settingsService.createMVCredentials(body);
  }
}
