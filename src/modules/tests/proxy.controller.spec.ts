import { Test, TestingModule } from '@nestjs/testing';
import puppeteer from 'puppeteer';
import { ProxyService } from '../proxy/proxy.service';
import { PuppeteerToken } from '../proxy/module.tokens';

describe('ProxyService', () => {
  let service: ProxyService;
  let browser;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProxyService,
        {
          provide: PuppeteerToken,
          useValue: puppeteer,
        },
      ],
    }).compile();

    service = module.get<ProxyService>(ProxyService);
  });

  afterEach(async () => {
    if (browser) {
      await browser.close();
    }
  });

  it('should fetch and modify the HTML content', async () => {
    const url = 'https://example.com';
    const content = await service.fetchAndModify(url);
    expect(content).toContain('™');
  });
});
