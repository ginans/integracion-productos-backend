import { Injectable } from '@nestjs/common';

@Injectable()
export class JumpsellerSettingsService {

 async getBasicAuthToken(): Promise<string> {
    const login = process.env.JUMPSELLER_LOGIN;
    const authtoken = process.env.JUMPSELLER_AUTHTOKEN;
  
    if (!login || !authtoken) {
      throw new Error("Login o AuthToken no están definidos en el .env 😩");
    }
  
    const base64 = Buffer.from(`${login}:${authtoken}`).toString("base64");
    return `Basic ${base64}`;
  }
  
}
