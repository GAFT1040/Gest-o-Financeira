import { Usuario } from 'src/usuario/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Categoria, (categoria) => categoria.id, {
    onDelete: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn({ name: 'master_id' })
  master?: Categoria;

  @Column({ length: 150 })
  titulo: string;

  @CreateDateColumn({ type: 'timestamptz' })
  atualizado_em: Date;

  @OneToMany(() => Categoria, (subCategoria) => subCategoria.master, {
    cascade: false,
  })
  subCategoria: Categoria[];
}
