import { Module } from '@nestjs/common';
import { ProxyModule } from './modules/proxy/proxy.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), ProxyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
