import { Injectable } from '@nestjs/common';
import type { CanActivate } from '@nestjs/common';

@Injectable()
export class BooksWriteGuard implements CanActivate {
  canActivate(): boolean {
    return process.env.BOOKS_READ_ONLY !== 'true';
  }
}