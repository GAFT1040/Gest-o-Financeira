import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { EtipoConta } from 'src/types/index.enum';

@Entity()
export class Conta {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => Usuario, (usuario) => usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'enum', enum: EtipoConta, nullable: true })
  tipo: EtipoConta | null;

  @Column({ length: 150 })
  titulo: string;

  @Column({ default: false })
  is_carteira: boolean;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  saldo_inicial: number;

  @Column({ type: 'decimal' })
  saldo: number;

  @CreateDateColumn({ type: 'timestamptz' })
  criado_em: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  atualizado_em: Date;
}
