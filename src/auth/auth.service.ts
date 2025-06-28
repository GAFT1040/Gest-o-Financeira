import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CriarUsuarioDTO } from 'src/usuario/dto/criar-usuario.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async criar(dto: CriarUsuarioDTO) {
    return await this.usuarioService.criar(dto);
  }
}
