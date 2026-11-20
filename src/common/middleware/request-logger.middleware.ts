// import { Injectable, NestMiddleware } from '@nestjs/common';
// import type { NextFunction, Request, Response } from 'express';

// @Injectable()
// export class RequestLoggerMiddleware implements NestMiddleware {
//   use(req: Request, _res: Response, next: NextFunction): void {
//     console.log(`${req.method} ${req.originalUrl}`);
//     next();
//   }
// }