import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoRepository } from './produto.repository';
import { ProdutoService } from './produto.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly produtoService: ProdutoService,
  ) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado = await this.produtoService.criaProduto(
      dadosProduto,
    );

    return {
      mensagem: 'Produto criado com sucesso.',
      produto: produtoCadastrado,
    };
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor) //Ele consegue executar código tanto antes do controlador, quanto depois.
  async listaUm(@Param('id') id: string) {
    return await this.produtoService.listaUmProduto(id);
  }

  @Get()
  @UseInterceptors(CacheInterceptor) //Ele consegue executar código tanto antes do controlador, quanto depois.
  async listaTodos() {
    return this.produtoService.listProdutos();
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoService.atualizaProduto(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.deletaProduto(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
