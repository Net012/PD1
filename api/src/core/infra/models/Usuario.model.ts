import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export interface UsuarioModelProps {
  id: string;
  nome: string;
  email: string;
  celular?: string;
  senha: string;
  tipo: 'palestrante';
}

@Entity('usuario')
export class UsuarioModel extends BaseEntity implements UsuarioModelProps {
  @PrimaryColumn({ type: 'uuid', unique: true })
  id: string;

  @Column({ name: 'nome', type: 'varchar', nullable: false })
  nome: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ name: 'celular', type: 'varchar', nullable: true })
  celular?: string;

  @Column({ name: 'senha', type: 'varchar', nullable: false })
  senha: string;

  @Column({ name: 'tipo', type: 'varchar', nullable: false })
  tipo: 'palestrante';

  criar(props: UsuarioModelProps): UsuarioModel {
    Object.assign(this, props);
    return this;
  }
}
