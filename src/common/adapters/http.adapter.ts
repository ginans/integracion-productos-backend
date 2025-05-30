import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class FetchAdapter implements HttpAdapter {
  constructor(private readonly loggerService: LoggerService) {}

  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data as T;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('This is an error - Check logs');
    }
  }

  async post<T>(url: string, body: any): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data as T;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('This is an error - Check logs');
    }
  }

  async put<T>(url: string, body: any): Promise<T> {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data as T;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('This is an error - Check logs');
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url, { method: 'DELETE' });
      const data = await response.json();
      return data as T;
    } catch (error) {
      this.loggerService.error(error);
      throw new Error('This is an error - Check logs');
    }
  }
}