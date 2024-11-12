import { UsuarioTipo } from 'src/core/domain/Usuario';

export interface UsuarioDTOProps {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: UsuarioTipo;
  token: string;
}

export class UsuarioDTO implements UsuarioDTOProps {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: UsuarioTipo;
  token: string;

  constructor(props: UsuarioDTOProps) {
    this.id = props.id;
    this.nome = props.nome;
    this.email = props.email;
    this.senha = props.senha;
    this.tipo = props.tipo;
    this.token = props.token;
  }
}
