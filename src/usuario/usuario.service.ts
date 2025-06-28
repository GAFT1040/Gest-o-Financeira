import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly repository: Repository<Usuario>,
  ) {}

  private async hash(data: string) {
    const salt = await bcrypt.genSalt(13);
    return await bcrypt.hash(data, salt);
  }

  async criar(dto: CriarUsuarioDTO) {
    const qtd = await this.repository.count({ where: { email: dto.email } });

    if (qtd > 0)
      throw new ConflictException(
        'Já existe um usuário cadastrado com esse e-mail',
      );

    const hash = await this.hash(dto.senha);

    const usuario = this.repository.create({
      ...dto,
      senha: hash,
    });
    const { nome } = await this.repository.save(usuario);
    return nome;
  }
}
