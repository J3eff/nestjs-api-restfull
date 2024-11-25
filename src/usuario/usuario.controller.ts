import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const user = new UsuarioEntity();
    user.email = dadosDoUsuario.email;
    user.senha = dadosDoUsuario.senha;
    user.nome = dadosDoUsuario.nome;
    user.id = uuid();

    this.usuarioRepository.salvar(user);

    return { id: user.id, message: 'Usuário criado com sucesso!' };
  }

  @Get()
  async listUsuarios() {
    return this.usuarioRepository.listar();
  }
}
