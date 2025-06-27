import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormaPagemento } from './forma-pagemnt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormaPagemento])],
})
export class FormaModule {}
