import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { CriarUsuarioDTO } from 'src/usuario/dto/criar-usuario.dto';
import { LoginDTO } from './dto/login.dto';
import { Publico } from './auth.guard';

@Controller('auth')
@Publico()
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
  async login(@Body() data: LoginDTO) {
    const token = await this.authService.login(data);
    return {
      mesagem: 'Usuário logado com sucesso!',
      token,
    };
  }
}
