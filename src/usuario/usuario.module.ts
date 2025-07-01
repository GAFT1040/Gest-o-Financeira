import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { ContaModule } from 'src/conta/conta.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), ContaModule],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
