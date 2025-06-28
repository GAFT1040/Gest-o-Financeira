import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { CriarUsuarioDTO } from 'src/usuario/dto/criar-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/criar')
  @ApiOperation({ summary: 'Criar um novo usuário' })
  async criar(@Body() data: CriarUsuarioDTO) {
    const usuario = await this.authService.criar(data);
    return {
      mensagem: `${usuario} criado(a) com secesso!`,
    };
  }

  @Post('/login')
  @ApiOperation({ summary: 'Realiza a autentificação' })
  async login() {}
}
