import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './domain/services/Auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
  ) {}

  @Post('/signIn')
  public async signIn(
    @Body() body: { email: string; senha: string },
    @Res() res: Response,
  ) {
    const response = await this.authService.signIn(body.email, body.senha);

    if (!('usuario' in response)) {
      return res.status(response.getStatus()).send({ error: response.message });
    }

    return res.status(200).send(response);
  }

  @Post('/checkToken')
  public async checkToken(
    @Body() body: { token: string; nome: string; email: string },
    @Res() res: Response,
  ) {
    const response = await this.authService.checkToken(
      body.token,
      body.nome,
      body.email,
    );

    if (response instanceof Error) {
      return res.status(response.getStatus()).send({ error: response.message });
    }

    if (!response.valid) {
      return res.status(401).send({ error: 'Token inválido' });
    }

    return res.status(200).send();
  }
}
