import { IsNumber, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  code: string;
  @IsString()
  urlApiMultivende: string;
  @IsNumber()
  clientIdMultivende: number;
  @IsString()
  clientSecretMultivende: string;
  @IsString()
  merchantId: string;
  @IsString()
  warehouseId: string;
}
