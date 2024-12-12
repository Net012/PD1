import { Module } from '@nestjs/common';
import { UseCases } from './application';
import { UsuarioMapper } from './infra/mappers/Usuario.mapper';
import { UsuarioRepositoryImpl } from './infra/repositories/Usuario.repository';
import { CriptografiaServiceImpl } from './infra/services/Criptografia';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [
    ...UseCases,
    {
      provide: 'UsuarioRepository',
      useClass: UsuarioRepositoryImpl,
    },
    {
      provide: 'UsuarioMapper',
      useClass: UsuarioMapper,
    },
    {
      provide: 'CriptografiaService',
      useClass: CriptografiaServiceImpl,
    },
  ],
  exports: ['UsuarioRepository', 'UsuarioMapper', 'CriptografiaService'],
})
export class CoreModule {}
