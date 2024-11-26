import { Controller, Get, Post, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(@Query('usuarioId') usuarioId: string) {
    return await this.pedidoService.cadastraPedido(usuarioId);
  }

  @Get()
  async obtemPedidosDeUsuario(@Query('usuarioId') usuarioId: string) {
    return await this.pedidoService.obtemPedidosDeUsuario(usuarioId);
  }
}
