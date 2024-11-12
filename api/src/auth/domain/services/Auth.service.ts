import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export interface AuthService {
  signIn(
    email: string,
    password: string,
  ): Promise<
    | {
        usuario: {
          token: string;
          nome: string;
          email: string;
        };
      }
    | UnauthorizedException
    | BadRequestException
    | InternalServerErrorException
    | NotFoundException
  >;

  checkToken(
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
  >;
}
