import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

@Injectable()
export class RequestIdMiddleware implements NestMiddleware{
    
    use(_req: Request, res: Response, next: NextFunction): void{
        
        const requestId = randomUUID();
       res.setHeader('X-request-id', requestId);
       next();
    }
}