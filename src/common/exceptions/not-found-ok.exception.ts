import { HttpStatus } from '@nestjs/common';
import { DefaultHttpException } from '@common/exceptions/http.exception';
import { ResponseStatusCodes } from '@common/dto/response-status.dto';

export class NotFound200Exception extends DefaultHttpException {
  constructor(message: string) {
    super({
      message,
      statusCode: HttpStatus.OK,
      code: ResponseStatusCodes.NotFound,
    });
  }
}
