import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggerInterceptor } from './common/interceptor/request-logger.interceptor';
import { LoggerService } from './common/logger/logger.service';
import { LoggerModule } from './common/logger/logger.module';
import { JobsModule } from './jobs/jobs.module';
import { ProductsModule } from './products/products.module';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { ProcessModule } from './process/process.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot(EnvConfiguration().db_uri, {
      dbName: EnvConfiguration().db_name,
    }),
    BullModule.forRoot({
      connection: {
        url: EnvConfiguration().cache_url,
      },
    }),
    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter,
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    LoggerModule,
    JobsModule,
    ProductsModule,
    ProcessModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    LoggerService,
  ],
})
export class AppModule {}
