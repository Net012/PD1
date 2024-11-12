import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

export interface UsuarioModelProps {
  id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: 'palestrante' | 'prestador' | 'contratante';
}

@Entity('usuario')
export class UsuarioModel extends BaseEntity implements UsuarioModelProps {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ name: 'nome', type: 'varchar', nullable: false })
  nome: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ name: 'senha', type: 'varchar', nullable: false })
  senha: string;

  @Column({ name: 'tipo', type: 'varchar', nullable: false })
  tipo: 'palestrante' | 'prestador' | 'contratante';

  criar(props: UsuarioModelProps): UsuarioModel {
    Object.assign(this, props);
    return this;
  }
}
