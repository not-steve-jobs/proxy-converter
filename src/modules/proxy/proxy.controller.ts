import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProxyService } from './proxy.service';
import { Response } from 'express';
import * as process from 'node:process';

@Controller('/')
@ApiTags('/')
@ApiBearerAuth()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('*')
  async handleProxy(@Param() params, @Res() res: Response) {
    const fetchUrl = process.env.FETCH_URL;
    const url = `${fetchUrl}/${params[0]}`;
    const modifiedContent = await this.proxyService.fetchAndModify(url);
    res.send(modifiedContent);
  }
}
