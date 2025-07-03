import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ContaService } from './const.service';
import { Auth } from 'src/global/decorator/auth.decorator';
import { Usuario } from 'src/usuario/usuario.entity';
import { CriarContaDTO } from './dtos/criar-conta.dto';
import { AtualziarContaDTO } from './dtos/atualizar-conta.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('conta')
@ApiBearerAuth()
export class ContaController {
  constructor(private readonly service: ContaService) {}

  @Post()
  async criar(@Auth() auth: Partial<Usuario>, @Body() data: CriarContaDTO) {
    const conta = await this.service.criar(data, false, auth);
    return {
      mensagem: `Conta '${conta.titulo}' criado com sucesso!`,
    };
  }

  @Get()
  async buscarTodos(@Auth() auth: Partial<Usuario>) {
    return await this.service.buscarTodos(auth);
  }

  @Get('/:id')
  async buscarUm(
    @Auth() auth: Partial<Usuario>,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.service.buscarUm(id, auth);
  }

  @Patch('/:id')
  async atualizar(
    @Auth() auth: Partial<Usuario>,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: AtualziarContaDTO,
  ) {
    const conta = await this.service.atualizar(id, data, auth);
    return {
      mensagem: 'Conta atualizada com sucesso!s',
      conta,
    };
  }

  @Delete('/:id')
  async deletar(
    @Auth() auth: Partial<Usuario>,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const conta = await this.service.deletar(id, auth);
    return {
      mensagem: `Conta '${conta}' deletada com sucesso!`,
    };
  }
}
