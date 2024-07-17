import { HttpStatus } from '@nestjs/common';
import { DefaultHttpException } from '@common/exceptions/http.exception';
import { ResponseStatusCodes } from '@common/dto/response-status.dto';

export class UnprocessableEntityException extends DefaultHttpException {
  constructor(
    message: string,
    failureReasons = ResponseStatusCodes.UnprocessableEntity,
    title?: string,
  ) {
    super({
      message: message,
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      code: failureReasons,
      title: title,
    });
  }
}
