import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/domain/services/Auth.service';
import { CriptografiaService } from 'src/core/application/services/Criptografia';
import { UsuarioRepository } from 'src/core/domain/repositories/Usuario.repository';
import { Usuario } from 'src/core/domain/Usuario';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject('UsuarioRepository')
    private readonly usuarioRepository: UsuarioRepository,
    private jwtService: JwtService,
    @Inject("CriptografiaService") private criptografiaService: CriptografiaService,
  ) {}
  async signIn(
    email: string,
    senha: string,
  ): Promise<
    | {
        usuario: {
          token: string;
          nome: string;
          email: string;
        };
      }
    | BadRequestException
    | UnauthorizedException
    | InternalServerErrorException
    | NotFoundException
  > {
    try {
      if (!email || !senha) {
        return new BadRequestException('Email e senha são obrigatórios');
      }

      const usuario = await this.usuarioRepository.findByEmail(email);

      if (usuario instanceof Usuario) {
        if (!(await this.criptografiaService.compararSenhas(senha, usuario.getSenha()))) {
          return new UnauthorizedException('Senha inválida');
        } else {
          return {
            usuario: {
              token: await this.jwtService.signAsync({
                id: usuario.getId(),
              }),
              nome: usuario.getNome(),
              email: usuario.getEmail(),
            },
          };
        }
      }

      return usuario;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async checkToken(
    token: string,
    nome: string,
    email: string,
  ): Promise<
    | {
        valid: boolean;
      }
    | UnauthorizedException
    | BadRequestException
    | InternalServerErrorException
    | NotFoundException
  > {
    try {
      const decoded = this.jwtService.verify(token);

      const usuario = await this.usuarioRepository.findById(decoded.id);

      if (usuario instanceof Usuario) {
        if (usuario.getNome() === nome && usuario.getEmail() === email) {
          return { valid: true };
        }

        return { valid: false };
      } else {
        return usuario;
      }
    } catch (error) {
      return new UnauthorizedException('Token inválido');
    }
  }
}
