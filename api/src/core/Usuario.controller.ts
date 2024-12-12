import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ListarUsuariosQuery } from './application/querys/ListarUsuarios.query';
import {
  CadastrarUsuarioUseCase,
  CadastrarUsuarioUseCaseProps,
} from './application/useCases/CadastrarUsuario';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly cadastrarUsuarioUseCase: CadastrarUsuarioUseCase,
    private readonly listarUsuariosQuery: ListarUsuariosQuery,
  ) {}

  @Post('/cadastrar')
  public async cadastrarUsuario(
    @Body() body: CadastrarUsuarioUseCaseProps,
    @Res() res: Response,
  ) {
    const response = await this.cadastrarUsuarioUseCase.execute(body);

    if (!('success' in response)) {
      return res.status(response.getStatus()).send({ error: response.message });
    }

    return res.status(200).send();
  }

  @Get()
  public async listarUsuarios(@Res() res: Response) {
    const response = await this.listarUsuariosQuery.execute();

    if (response instanceof Error) {
      return res.status(response.getStatus()).send({ error: response.message });
    }

    return res.status(200).send(response);
  }
}
