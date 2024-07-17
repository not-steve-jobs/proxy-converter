import { Inject, Injectable } from '@nestjs/common';
import * as activityLogs from '@common/enums/active-logs';
import { handleError } from '@common/helpers/error-handling';
import puppeteer from 'puppeteer';
import { PuppeteerToken } from './module.tokens';

type Puppeteer = typeof puppeteer;

@Injectable()
export class ProxyService {
  constructor(
    @Inject(PuppeteerToken)
    private puppeteer: Puppeteer,
  ) {}
  async fetchAndModify(url: string): Promise<string> {
    try {
      const browser = await this.puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.evaluate(() => {
        // @ts-ignore
        const walk = (node: ChildNode) => {
          if (node) {
            // Function to recursively walk through all nodes
            if (node.nodeType === 3) {
              // Text node
              node.nodeValue = node.nodeValue.replace(/\b\w{7,}\b/g, '$&™');
            }
            node.childNodes.forEach(walk);
          }
        };

        // @ts-ignore
        walk(document.body);
      });
      const content = await page.content();
      await browser.close();
      return content;
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.ProxyServiceFunctions.FetchAndModify,
        eventName: activityLogs.ProxyServiceActions.FetchAndModify,
        data: {},
      });
    }
  }
}
