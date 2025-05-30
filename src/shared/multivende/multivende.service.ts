import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MultivendeCredential,
  MultivendeCredentialDocument,
} from './entities/multivende-credencial.entity';
import { MultivendeToken } from './entities/multivende-token.entity';
import { EndpointsMultivendeEnum } from './enums/endpoints.enum';
import {
  IRequestCredentialAuth,
  IResponseCredentialAuth,
} from './interfaces/credencial-auth.interface';
import { GrantTypeEnum } from './enums/grant-type.enum';

@Injectable()
export class MultivendeService {
  private readonly logger = new Logger(MultivendeService.name);
  constructor(
    @InjectModel(MultivendeCredential.name)
    private readonly credentialModel: Model<MultivendeCredential>,
    @InjectModel(MultivendeToken.name)
    private tokenModel: Model<MultivendeToken>,
  ) {}
  async createCredentials(
    data: MultivendeCredential,
  ): Promise<MultivendeCredentialDocument> {
    try {
      await this.credentialModel.deleteMany();
      return await this.credentialModel.create(data);
    } catch (error) {
      throw new ServiceUnavailableException(error.message);
    }
  }

  /**
   * Obtiene el token de acceso de la API de MultiVende.
   */
  async checkCredentials(): Promise<IResponseCredentialAuth> {
    const credential: MultivendeCredentialDocument =
      await this.credentialModel.findOne();
    if (!credential) throw new Error('Credenciales no configuradas');
    const {
      clientIdMultivende,
      clientSecretMultivende,
      urlApiMultivende,
      code,
    } = credential;
    const url = `${urlApiMultivende}${EndpointsMultivendeEnum.LOGIN}`;
    const body: IRequestCredentialAuth = {
      client_id: clientIdMultivende,
      client_secret: clientSecretMultivende,
      code,
      grant_type: GrantTypeEnum.AUTHORIZATION_CODE,
    };
    console.table(body);
    try {
      const { data } = await axios.post<IResponseCredentialAuth>(url, body);
      await this.saveToken({
        code,
        accessToken: data.token,
        refreshToken: data.refreshToken,
        refreshTokenExpiresAt: data.refreshTokenExpiresAt,
      });
      return data;
    } catch (error) {
      console.error(error);
      throw new ServiceUnavailableException(error.message);
    }
  }

  /**
   * Guardar el token de acceso en la base de datos.
   */
  async saveToken(token: MultivendeToken) {
    await this.tokenModel.deleteMany();
    await this.tokenModel.create(token);
  }

  async getCredentials(): Promise<MultivendeCredentialDocument> {
    const credentials = await this.credentialModel.findOne();
    if (!credentials) throw new Error('Credenciales no configuradas');
    return credentials;
  }

  async getToken(): Promise<MultivendeToken> {
    const token = await this.tokenModel.findOne();
    if (!token) throw new Error('Token no disponible');
    return token;
  }

  async refreshToken() {
    try {
      const { clientIdMultivende, clientSecretMultivende, urlApiMultivende } =
        await this.getCredentials();
      const { refreshToken } = await this.getToken();
      const url = `${urlApiMultivende}${EndpointsMultivendeEnum.LOGIN}`;
      const body = {
        refresh_token: refreshToken,
        client_id: clientIdMultivende,
        client_secret: clientSecretMultivende,
        grant_type: GrantTypeEnum.REFRESH_TOKEN,
      };
      const { data } = await axios.post<IResponseCredentialAuth>(url, body);
      if (!data?.token) throw new ServiceUnavailableException(data);
      await this.saveToken({
        code: data._id,
        accessToken: data.token,
        refreshToken: data.refreshToken,
        refreshTokenExpiresAt: data.refreshTokenExpiresAt,
      });
    } catch (error) {
      this.logger.error(`Error al refrescar el token: ${error.message}`);
      throw error;
    }
  }
}
