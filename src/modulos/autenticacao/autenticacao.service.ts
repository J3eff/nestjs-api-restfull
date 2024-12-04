import { Injectable } from '@nestjs/common';

@Injectable()
export class AutenticacaoService {
  login(email: string, senha: string) {
    return 'This action adds a new autenticacao';
  }
}
