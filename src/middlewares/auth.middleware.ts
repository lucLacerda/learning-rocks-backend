import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    switch (token) {
      case 'admin-token-123':
        req['user'] = { role: 'admin' };
        break;
      case 'student-token-456':
        req['user'] = { role: 'student' };
        break;
      default:
        throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}