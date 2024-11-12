import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioRepository } from 'src/core/domain/repositories/Usuario.repository';
import { Usuario } from 'src/core/domain/Usuario';
import { UsuarioMapper } from '../mappers/Usuario.mapper';
import { UsuarioModel } from '../models/Usuario.model';

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(
    @Inject('UsuarioMapper') private readonly usuarioMapper: UsuarioMapper,
  ) {}

  async findByEmail(
    email: string,
  ): Promise<
    | Usuario
    | InternalServerErrorException
    | NotFoundException
    | BadRequestException
  > {
    try {
      const usuario = await UsuarioModel.findOne({
        where: { email },
      });

      if (!usuario) {
        return new NotFoundException('Usuário não encontrado');
      }

      return this.usuarioMapper.modelToDomain(usuario);
    } catch (error) {
      return new InternalServerErrorException(
        'Erro desconhecido ao buscar usuário',
      );
    }
  }

  async findById(
    id: string,
  ): Promise<
    | Usuario
    | InternalServerErrorException
    | NotFoundException
    | BadRequestException
  > {
    try {
      if (!id) {
        return new BadRequestException('Id é obrigatório');
      }

      const usuario = await UsuarioModel.findOne({
        where: { id },
      });

      if (!usuario) {
        return new NotFoundException('Usuário não encontrado');
      }

      return this.usuarioMapper.modelToDomain(usuario);
    } catch (error) {
      return new InternalServerErrorException(
        'Erro desconhecido ao buscar usuário',
      );
    }
  }

  async save(
    usuario: Usuario,
  ): Promise<
    { success: boolean } | InternalServerErrorException | BadRequestException
  > {
    try {
      const usuarioExistente = await UsuarioModel.findOne({
        where: { email: usuario.getEmail() },
      });

      if (usuarioExistente) {
        return new BadRequestException('Usuário já cadastrado');
      }

      const usuarioModel = this.usuarioMapper.domainToModel(usuario);

      await usuarioModel.save();
      return { success: true };
    } catch (error) {
      return new InternalServerErrorException(
        'Erro desconhecido ao salvar usuário',
      );
    }
  }
}
