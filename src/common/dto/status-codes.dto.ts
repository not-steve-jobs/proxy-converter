import { ResponseStatusCodes } from '@common/dto/response-status.dto';

export enum UnauthorizedStatusCode {
  UnAuthorized = ResponseStatusCodes.Unauthorized,
}

export enum BadRequestStatusCode {
  BadRequest = ResponseStatusCodes.BadRequest,
}

export enum NotFoundStatusCode {
  NotFound = ResponseStatusCodes.NotFound,
}

export enum InvalidStatusCode {
  Invalid = ResponseStatusCodes.Invalid,
}

export class UnauthorizedResponse {
  data: unknown = null;
  status: {
    code: UnauthorizedStatusCode;
    message: string;
  };
}

export class BadRequestResponse {
  data: unknown = null;
  status: {
    code: BadRequestStatusCode;
    message: string;
  };
}

export class ValidationBadRequestResponse {
  data: number[];
  code: ResponseStatusCodes.BadRequest;
  message: string;
  title: string;
}

export class NotFoundResponse {
  data: unknown = null;
  status: {
    code: NotFoundStatusCode;
    message: string;
  };
}

export class InvalidResponse {
  data: unknown = null;
  status: {
    code: InvalidStatusCode;
    message: string;
  };
}

export class SucceedResponse {
  data: unknown = null;
  status: {
    code: InvalidStatusCode;
    message: string;
  };
}
