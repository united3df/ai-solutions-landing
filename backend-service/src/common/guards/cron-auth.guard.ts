import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class CronAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['x-cron-token'];
    const secret = this.config.get<string>('CRON_SECRET');

    if (!secret || token !== secret) {
      throw new UnauthorizedException('Invalid or missing cron token');
    }
    return true;
  }
}
