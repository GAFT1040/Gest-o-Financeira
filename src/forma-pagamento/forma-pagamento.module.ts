import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormaPagemento } from './forma-pagemnt.entity';
import { ContaModule } from 'src/conta/conta.module';
import { FormaPagamentoService } from './forma-pagamento.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormaPagemento]), ContaModule],
  providers: [FormaPagamentoService],
  exports: [FormaPagamentoService],
})
export class FormaModule {}
