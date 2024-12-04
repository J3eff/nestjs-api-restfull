import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requisicao = context.switchToHttp().getRequest();
    const token = this.extrairTokenDoCabecalho(requisicao);

    if (!token) throw new UnauthorizedException('Erro de autenticação');

    return true;
  }

  private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
    //formato do cabeçalho authorization: "Bearer <valor_do_jwt>" -> protocolo HTTP
    const [type, token] = requisicao.headers.authorization?.split(' ') ?? [];
    return type == 'Bearer' ? token : undefined;
  }
}
