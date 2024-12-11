import { Inject, InternalServerErrorException } from '@nestjs/common';
import { UsuarioRepository } from 'src/core/domain/repositories/Usuario.repository';
import { Usuario, UsuarioTipo } from 'src/core/domain/Usuario';
import { CriptografiaService } from '../services/Criptografia';

export interface CadastrarUsuarioUseCaseProps {
  senha: string;
  email: string;
  nome: string;
  tipo: string;
}

export type CadastrarUsuarioExceptions = InternalServerErrorException;

export class CadastrarUsuarioUseCase {
  constructor(
    @Inject('UsuarioRepository') private usuarioRepository: UsuarioRepository,
    @Inject('CriptografiaService')
    private criptografiaService: CriptografiaService,
  ) {}

  public async execute(props: CadastrarUsuarioUseCaseProps): Promise<
    | {
        success: boolean;
      }
    | CadastrarUsuarioExceptions
  > {
    const senha = await this.criptografiaService.criptografarSenha(props.senha);

    if (!('senha' in senha)) {
      return senha;
    }

    const usuario = Usuario.criar({
      email: props.email,
      nome: props.nome,
      senha: senha.senha,
      tipo: props.tipo as UsuarioTipo,
    });

    if (!(usuario instanceof Usuario)) {
      return usuario;
    }

    const salvar = await this.usuarioRepository.save(usuario);

    if (!('success' in salvar)) {
      return salvar;
    }

    return { success: true };
  }
}
