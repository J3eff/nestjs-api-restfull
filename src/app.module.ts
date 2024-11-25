import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostegresConfigService } from './config/postgres.config.service';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    TypeOrmModule.forRootAsync({
      useClass: PostegresConfigService,
      inject: [PostegresConfigService],
    }),
  ],
})
export class AppModule {}
