import { createLogger, transports, format } from 'winston';
import {
  NotFound404Exception,
  InternalServerErrorException,
  BadRequestException,
  BadRequestValidationException,
  UnauthorizedException,
  UnprocessableEntityException,
  ValidationException,
  NotFound200Exception,
  BadRequest200Exception,
  InvalidOk200Exception,
} from '@common/exceptions';

export const Logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(format.colorize(), format.json()),
});

export const handleError = <T extends Record<string, unknown>>(
  error: Error,
  logError: { functionName: string; eventName: string; data?: T },
): void => {
  const warningSeverityExceptions = [
    BadRequestValidationException,
    BadRequest200Exception,
    InvalidOk200Exception,
    NotFound200Exception,
  ];

  const exceptions = [
    NotFound404Exception,
    ValidationException,
    InternalServerErrorException,
    UnprocessableEntityException,
    BadRequestException,
    UnauthorizedException,
    ...warningSeverityExceptions,
  ];

  if (
    warningSeverityExceptions.some((exception) => error instanceof exception)
  ) {
    Logger.warn(logError.functionName, logError.eventName, {
      ...parseError(error),
      ...logError.data,
    });
  } else {
    Logger.error(logError.functionName, logError.eventName, {
      ...parseError(error),
      ...logError.data,
    });
  }
  // handle instantiated errors for throwing the exceptions of the same type as the input error
  for (const exceptionType of exceptions) {
    if (error instanceof exceptionType) {
      throw error;
    }
  }

  throw new InternalServerErrorException();
};

export const parseError = (
  error: Error,
): { errorInfo: { message: string | Error; stack?: string } } => {
  return {
    errorInfo: { message: error?.message ?? error, stack: error?.stack },
  };
};
