import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produto: ProdutoEntity) {
    await this.produtoRepository.save(produto);
  }

  async listaProdutos() {
    return await this.produtoRepository.find();
  }

  async atualizaProduto(id: string, produto: AtualizaProdutoDTO) {
    await this.produtoRepository.update(id, produto);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }
}
