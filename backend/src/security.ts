import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class RbacGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const role = req.headers['x-role'];
    if (!role) throw new UnauthorizedException('Missing role');
    return ['OWNER', 'HR_ADMIN', 'MANAGER', 'EMPLOYEE'].includes(role);
  }
}

export function encryptSensitive(value: string): string {
  const key = (process.env.DATA_ENCRYPTION_KEY || 'default_key_32_bytes_default_key_').slice(0, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(value, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}
