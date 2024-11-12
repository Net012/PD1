import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CriptografiaService } from 'src/core/application/services/Criptografia';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CriptografiaServiceImpl implements CriptografiaService {
  async criptografarSenha(senha: string): Promise<
    | {
        senha: string;
      }
    | BadRequestException
    | InternalServerErrorException
  > {
    try {
      if (!senha) {
        throw new BadRequestException('Senha é obrigatória');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(senha, salt);
      return {
        senha: hashedPassword,
      };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criptografar senha');
    }
  }

  async compararSenhas(
    senha: string,
    senhaCriptografada: string,
  ): Promise<boolean> {
    return bcrypt.compare(senha, senhaCriptografada);
  }
}
