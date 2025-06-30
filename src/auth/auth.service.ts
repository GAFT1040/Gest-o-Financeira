import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CriarUsuarioDTO } from 'src/usuario/dto/criar-usuario.dto';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async criar(dto: CriarUsuarioDTO) {
    return await this.usuarioService.criar(dto);
  }

  async login(dto: LoginDTO) {
    try {
      const usuario = await this.usuarioService.buscarPorEmail(dto.email);
      const match = await bcrypt.compare(dto.senha, usuario.senha);

      if (!match) throw new UnauthorizedException('Senha incorreta!');

      const payload = {
        id: usuario.id,
      };

      const token = this.jwtService.sign(payload);

      return token;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      )
        throw new UnauthorizedException('Usuário ou senha inválidos!');

      throw error;
    }
  }
}
