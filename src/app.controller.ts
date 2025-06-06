import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor() {}

  @Get('health')
  status() {
    return 'ok';
  }
}
