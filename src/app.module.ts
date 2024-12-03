import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { ProdutoModule } from './modulos/produto/produto.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { APP_FILTER } from '@nestjs/core';
import { FiltroDeExecaoGlobal } from './recursos/filtros/filtro-de-execao-global';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    PedidoModule,
    //Time to live (ttl) -> Tempo que cache sera guardado em memoria.
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          ttl: 10 * 1000,
          socket: { host: '127.0.0.1', port: 6379 }, // Foi necessario deixar claro a conexão pois, não estava conectando localmente.
        }),
      }),
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExecaoGlobal,
    },
  ],
})
export class AppModule {}
