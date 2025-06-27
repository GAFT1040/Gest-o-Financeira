import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conta } from './conta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conta])],
})
export class ContaModule {}
