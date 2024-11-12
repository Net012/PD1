import { Module } from '@nestjs/common';
import { UsuarioRepositoryImpl } from './infra/repositories/Usuario.repository';
import { UsuarioMapper } from './infra/mappers/Usuario.mapper';
import { UsuarioController } from './usuario.controller';
import { UseCases } from './application/useCases';
import { CriptografiaServiceImpl } from './infra/services/Criptografia';

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
