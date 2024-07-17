import { HttpStatus } from '@nestjs/common';
import { DefaultHttpException } from '@common/exceptions/http.exception';
import { ResponseStatusCodes } from '@common/dto/response-status.dto';

export class BadRequestValidationException<
  T = unknown,
> extends DefaultHttpException {
  // eslint-disable-next-line max-params
  constructor(
    message: string,
    failureReasons = ResponseStatusCodes.BadRequest,
    title?: string,
    data: T = null,
  ) {
    super({
      message: message,
      statusCode: HttpStatus.BAD_REQUEST,
      code: failureReasons,
      title: title,
      data: data,
    });
  }
}
