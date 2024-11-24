import { Module } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { ProdutoController } from './produto.controller';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoRepository],
})
export class ProdutoModule {}
