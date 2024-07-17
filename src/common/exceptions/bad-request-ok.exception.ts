import { HttpStatus } from '@nestjs/common';
import { DefaultHttpException } from '@common/exceptions/http.exception';
import { ResponseStatusCodes } from '@common/dto/response-status.dto';

export class BadRequest200Exception extends DefaultHttpException {
  constructor(
    message: string,
    failureReasons = ResponseStatusCodes.BadRequest,
    title?: string,
  ) {
    super({
      message: message,
      statusCode: HttpStatus.OK,
      code: failureReasons,
      title: title,
    });
  }
}
