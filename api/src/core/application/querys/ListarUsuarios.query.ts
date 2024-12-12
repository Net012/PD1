import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsuarioRepository } from 'src/core/domain/repositories/Usuario.repository';
import { Usuario } from 'src/core/domain/Usuario';

export type ListarUsuariosQueryExceptions =
  | InternalServerErrorException
  | BadRequestException;

export class ListarUsuariosQuery {
  constructor(
    @Inject('UsuarioRepository') private usuarioRepository: UsuarioRepository,
  ) {}

  public async execute(): Promise<Usuario[] | ListarUsuariosQueryExceptions> {
    const result = await this.usuarioRepository.list();

    if (result instanceof InternalServerErrorException) {
      return new InternalServerErrorException('Erro ao buscar usuários');
    }

    if (result instanceof BadRequestException) {
      return new BadRequestException('Erro ao buscar usuários');
    }

    return result;
  }
}
