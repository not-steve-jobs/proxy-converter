/**
 * Generic response status
 */
export class ResponseStatus {
  code: ResponseStatusCodes | string;

  message: string;
}

/**
 * Default status codes
 */
export enum ResponseStatusCodes {
  Succeed = 'succeed',
  Failed = 'failed',
  Invalid = 'invalid',
  BadRequest = 'bad_request',
  InternalServerError = 'internal_server_error',
  Unauthorized = 'unauthorized',
  NotFound = 'not_found',
  UnknownError = 'unknown_error',
  UnprocessableEntity = 'unprocessable_entity',
}
