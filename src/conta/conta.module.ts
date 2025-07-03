import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conta } from './conta.entity';
import { ContaService } from './const.service';
import { ContaController } from './conta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Conta])],
  providers: [ContaService],
  exports: [ContaService],
  controllers: [ContaController],
})
export class ContaModule {}
