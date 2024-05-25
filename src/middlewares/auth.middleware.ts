import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/api')) {
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

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
