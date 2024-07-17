import { Test, TestingModule } from '@nestjs/testing';
import { ProxyService } from '../proxy/proxy.service';
import puppeteer, { Browser, Page } from 'puppeteer';
import { mock, instance, when, verify, reset, deepEqual } from 'ts-mockito';
import { PuppeteerToken } from '../proxy/module.tokens';

type Puppeteer = typeof puppeteer;

describe('ProxyService', () => {
  let service: ProxyService;
  let puppeteerMock: Puppeteer;
  let browserMock: Browser;
  let pageMoack: Page;

  beforeEach(async () => {
    const pupp = function () {
      this.launch = () => null;
      return this;
    };

    const pg = function () {
      this.goto = () => null;
      this.evaluate = () => null;
      this.content = () => null;

      return this;
    };

    const bro = function () {
      this.newPage = () => null;
      this.close = () => null;
      return this;
    };

    puppeteerMock = mock<Puppeteer>(pupp);
    browserMock = mock<Browser>(bro);
    pageMoack = mock<Page>(pg);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProxyService,
        {
          provide: PuppeteerToken,
          useValue: instance(puppeteerMock),
        },
      ],
    }).compile();

    service = module.get<ProxyService>(ProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('adds "™" to words longer than six characters', async () => {
    const url = 'https://example.com';

    when(
      puppeteerMock.launch(
        deepEqual({
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }),
      ),
    ).thenResolve(instance(browserMock));
    when(browserMock.newPage()).thenResolve(instance(pageMoack));
    when(pageMoack.content()).thenResolve('seven-letter™');

    const result = await service.fetchAndModify(url);
    expect(result).toContain('seven-letter™');
    expect(result).not.toContain('words™');
  });

  it('handles error during page fetching', async () => {
    when(puppeteerMock.launch()).thenResolve(instance(browserMock));
    when(browserMock.newPage()).thenReject(new Error('test'));

    try {
      const url = 'https://example.com';
      await service.fetchAndModify(url);
      fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toBeDefined();
    }

    verify(browserMock.close()).never();
  });

  afterEach(() => {
    reset(puppeteerMock);
    reset(browserMock);
    reset(pageMoack);
  });
});
