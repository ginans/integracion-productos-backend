import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { MultivendeService } from '../multivende.service';

@Injectable()
export class SettingsService {
  constructor(private readonly multivendeService: MultivendeService) {}
  findAll() {
    return `This action returns all settings`;
  }
  async createMVCredentials(body: CreateSettingDto) {
    try {
      const credential = await this.multivendeService.createCredentials({
        ...body,
        configIsValidMultivende: false,
      });
      await this.multivendeService.checkCredentials();
      credential.configIsValidMultivende = true;
      await credential.save();
      return {
        message: 'Credenciales creadas correctamente',
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Error creando credenciales',
        error: error.message,
      });
    }
  }
}
