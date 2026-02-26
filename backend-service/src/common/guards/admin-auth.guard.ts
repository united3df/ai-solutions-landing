import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['x-admin-token'];
    const secret = this.config.get<string>('ADMIN_TOKEN');

    if (!secret || token !== secret) {
      throw new UnauthorizedException('Invalid or missing admin token');
    }
    return true;
  }
}
