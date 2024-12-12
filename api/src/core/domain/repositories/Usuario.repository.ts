import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Usuario } from '../Usuario';

export interface UsuarioRepository {
  findByEmail(
    email: string,
  ): Promise<
    | Usuario
    | InternalServerErrorException
    | NotFoundException
    | BadRequestException
  >;
  findById(
    id: string,
  ): Promise<
    | Usuario
    | InternalServerErrorException
    | NotFoundException
    | BadRequestException
  >;
  save(usuario: Usuario): Promise<
    | {
        success: boolean;
      }
    | InternalServerErrorException
    | BadRequestException
  >;
  list(): Promise<
    Usuario[] | InternalServerErrorException | BadRequestException
  >;
}
