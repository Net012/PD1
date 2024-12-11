import { setEnv } from './config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsuarioModel } from 'src/core/infra/models/Usuario.model';
import { DataSource } from 'typeorm';

setEnv();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  entities: ['dist/src/core/infra/models/*.model{.ts,.js}', UsuarioModel],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  synchronize: true,
  logging: false,
};

export const AppDataSource = new DataSource({
  ...typeOrmConfig,
  type: 'postgres',
  logging: false,
  logger: 'advanced-console',
});

export default {
  ...typeOrmConfig,
  type: 'postgres',
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: false,
  logger: 'advanced-console',
};
