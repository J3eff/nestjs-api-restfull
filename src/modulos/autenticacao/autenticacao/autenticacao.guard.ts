import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return false;
  }
}
