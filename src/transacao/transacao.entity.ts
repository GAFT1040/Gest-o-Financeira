import { Categoria } from 'src/categoria/categoria.entity';
import { Conta } from 'src/conta/conta.entity';
import { FormaPagemento } from 'src/forma-pagamento/forma-pagemnt.entity';
import {
  EtipoCartao,
  ETipoFormaPagamento,
  EtipoTransacao,
} from 'src/types/index.enum';
import { Usuario } from 'src/usuario/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'enum', enum: EtipoTransacao })
  tipo: ETipoFormaPagamento;

  @ManyToOne(() => FormaPagemento, (fr_pagamento) => fr_pagamento.id, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'forma_pagamento_id' })
  forma_pagamento: FormaPagemento;

  @ManyToOne(() => Categoria, (categoria) => categoria.id, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ length: 150 })
  titulo: string;

  @Column({ length: 300, nullable: true })
  descriacao: string;

  @Column({ type: 'int' })
  parcela: number;

  @Column({ type: 'int' })
  num_parcelas: number;

  @Column({ type: 'date' })
  data_emissao: Date;

  @Column({ type: 'date', nullable: true })
  data_vencimento: Date;

  @Column({ type: 'date', nullable: true })
  data_quitacao: Date;

  @Column({ default: false })
  is_quitado: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  criado_em: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  atualizado_em: Date;
}
