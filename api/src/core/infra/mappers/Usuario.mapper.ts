import { BadRequestException, Injectable } from '@nestjs/common';
import { UsuarioModel } from '../models/Usuario.model';
import { Usuario } from 'src/core/domain/Usuario';

@Injectable()
export class UsuarioMapper {
  modelToDomain(model: UsuarioModel): Usuario | BadRequestException {
    return Usuario.criar(
      {
        nome: model.nome,
        email: model.email,
        senha: model.senha,
        tipo: model.tipo,
        celular: model.celular,
      },
      model.id,
    );
  }

  domainToModel(domain: Usuario): UsuarioModel {
    return new UsuarioModel().criar({
      id: domain.getId(),
      nome: domain.getNome(),
      email: domain.getEmail(),
      senha: domain.getSenha(),
      tipo: domain.getTipo(),
      celular: domain.getCelular(),
    });
  }
}
