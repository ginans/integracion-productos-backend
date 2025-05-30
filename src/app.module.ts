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
import { SettingsModule } from './shared/multivende/settings/settings.module';
import { JobsModule } from './jobs/jobs.module';
import { ShopifyModule } from './shared/shopify/shopify.module';
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
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    LoggerModule,
    SettingsModule,
    JobsModule,
    ShopifyModule,
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
