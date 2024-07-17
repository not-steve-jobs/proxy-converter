import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { PuppeteerToken } from './module.tokens';
import puppeteer from 'puppeteer';

@Module({
  imports: [],
  providers: [
    ProxyService,
    {
      provide: PuppeteerToken,
      useValue: puppeteer,
    },
  ],
  controllers: [ProxyController],
})
export class ProxyModule {}
