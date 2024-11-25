import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';

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

    return {
      usuario: new ListaUsuarioDTO(user.id, user.nome),
      message: 'Usuário criado com sucesso!',
    };
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return usuariosLista;
  }
}
