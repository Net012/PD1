import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type UsuarioTipo = 'palestrante';

export interface UsuarioProps {
  nome: string;
  email: string;
  senha: string;
  tipo: UsuarioTipo;
  celular?: string;
}

export class Usuario {
  private readonly _id: string;
  private _nome: string;
  private _email: string;
  private _senha: string;
  private _tipo: UsuarioTipo;
  private _celular?: string;

  private constructor(id?: string) {
    this._id = id || randomUUID();
  }

  public static criar(
    props: UsuarioProps,
    id?: string,
  ): Usuario | BadRequestException {
    const instancia = new Usuario(id);

    const nome = instancia.setNomeUsuario(props.nome);
    if (nome instanceof BadRequestException) {
      return nome;
    }

    const email = instancia.setEmailUsuario(props.email);
    if (email instanceof BadRequestException) {
      return email;
    }

    instancia.setCelularUsuario(props.celular);

    const senha = instancia.setSenhaUsuario(props.senha);
    if (senha instanceof BadRequestException) {
      return senha;
    }

    const tipo = instancia.setTipoUsuario(props.tipo);
    if (tipo instanceof BadRequestException) {
      return tipo;
    }

    return instancia;
  }

  public setNomeUsuario(nome: string): BadRequestException | void {
    if (!nome) {
      return new BadRequestException('Nome do usuário não pode ser vazio');
    }

    this._nome = nome;
  }

  public setEmailUsuario(email: string): BadRequestException | void {
    if (!email) {
      return new BadRequestException('Email do usuário não pode ser vazio');
    }

    this._email = email;
  }

  public setCelularUsuario(celular: string): void {
    this._celular = celular;
  }

  public setSenhaUsuario(senha: string): BadRequestException | void {
    if (!senha) {
      return new BadRequestException('Senha do usuário não pode ser vazia');
    }

    switch (true) {
      case senha.length < 8:
        return new BadRequestException(
          'Senha do usuário deve ter no mínimo 8 caracteres',
        );
      case !senha.match(/[a-z]/g):
        return new BadRequestException(
          'Senha do usuário deve ter no mínimo uma letra minúscula',
        );
      case !senha.match(/[A-Z]/g):
        return new BadRequestException(
          'Senha do usuário deve ter no mínimo uma letra maiúscula',
        );
      case !senha.match(/[0-9]/g):
        return new BadRequestException(
          'Senha do usuário deve ter no mínimo um número',
        );
      case !senha.match(/[^a-zA-Z\d]/g):
        return new BadRequestException(
          'Senha do usuário deve ter no mínimo um caractere especial',
        );
      default:
        this._senha = senha;
    }
  }

  public setTipoUsuario(tipo: UsuarioTipo): BadRequestException | void {
    if (!tipo) {
      return new BadRequestException('Tipo do usuário não pode ser vazio');
    }

    this._tipo = tipo;
  }

  public getId(): string {
    return this._id;
  }

  public getNome(): string {
    return this._nome;
  }

  public getEmail(): string {
    return this._email;
  }

  public getCelular(): string {
    return this._celular;
  }

  public getSenha(): string {
    return this._senha;
  }

  public getTipo(): UsuarioTipo {
    return this._tipo;
  }
}
