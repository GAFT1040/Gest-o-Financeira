import { Categoria } from 'src/categoria/categoria.entity';
import { Conta } from 'src/conta/conta.entity';
import { EtipoCartao, ETipoFormaPagamento } from 'src/types/index.enum';
import { Usuario } from 'src/usuario/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FormaPagemento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'enum', enum: ETipoFormaPagamento })
  tipo: ETipoFormaPagamento;

  @Column({ type: 'enum', enum: EtipoCartao, nullable: true })
  tipo_cartap?: EtipoCartao;

  @Column({ type: 'int', nullable: true })
  cartao_fechamento?: number;

  @Column({ type: 'int', nullable: true })
  cartao_vencimento?: number;

  @ManyToOne(() => Conta, (conta) => conta.id, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'conta_id' })
  conta?: Conta;

  @Column({ length: 150 })
  titulo: string;

  @CreateDateColumn({ type: 'timestamptz' })
  criado_em: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  atualizado_em: Date;
}
