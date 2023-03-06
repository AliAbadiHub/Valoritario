import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user as User;

    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    if (user.role === 'user') {
      // Restrict access to other users' profiles and shopping lists
      const path = req.originalUrl;
      const userId = req.params.id;

      if (
        (path.startsWith('/profile') && userId !== user.userId.toString()) ||
        (path.startsWith('/shopping-lists') &&
          userId !== user.userId.toString())
      ) {
        return res.status(403).send('Forbidden');
      }
    } else if (user.role === 'admin') {
      // Allow admin to access all resources
      next();
      return;
    }

    next();
  }
}
