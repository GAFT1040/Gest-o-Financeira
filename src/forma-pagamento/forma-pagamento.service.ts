import { Injectable } from '@nestjs/common';
import { ContaService } from 'src/conta/const.service';
import { Repository } from 'typeorm';
import { FormaPagemento } from './forma-pagemnt.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FormaPagamentoService {
  constructor(
    private readonly contaService: ContaService,
    @InjectRepository(FormaPagemento)
    private readonly repository: Repository<FormaPagemento>,
  ) {}

  async criar(dto: any, auth: Partial<Usuario>) {}
  async buscar(id: string, auth: Partial<Usuario>) {}
  async buscarTodos(id: string, auth: Partial<Usuario>) {}
  async atualizar(id: string, dto: any, auth: Partial<Usuario>) {}
  async deletar(id: string, auth: Partial<Usuario>) {}
}
