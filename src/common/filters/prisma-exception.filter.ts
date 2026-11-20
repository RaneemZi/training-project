import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '../../generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(
    exception:
      Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    if (exception instanceof Prisma.PrismaClientValidationError) {
      return super.catch(
        new BadRequestException('Invalid data supplied for this operation'),
        host,
      );
    }

    switch (exception.code) {
      case 'P2025':
        return super.catch(
          new NotFoundException('The Requested Record Was Not Found'),
          host,
        );

      case 'P2002':
        return super.catch(
          new ConflictException(
            'A Record With This Unique Value Already Exists',
          ),
          host,
        );
      case 'P2020':
        return super.catch(
          new BadRequestException(
            'The provided number is outside the allowed range',
          ),
          host,
        );

      default:
        return super.catch(exception, host);
    }
  }
}
