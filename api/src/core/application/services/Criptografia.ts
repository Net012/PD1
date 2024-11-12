import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export interface CriptografiaService {
  criptografarSenha(senha: string): Promise<
    | {
        senha: string;
      }
    | BadRequestException
    | InternalServerErrorException
  >;
  compararSenhas(senha: string, senhaCriptografada: string): Promise<boolean>;
}
