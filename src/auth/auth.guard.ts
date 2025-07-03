import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { UsuarioService } from 'src/usuario/usuario.service';

export const PUBLIC_KEY = 'isPublic';
export const Publico = () => SetMetadata(PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtSservice: JwtService,
    private reflactor: Reflector,
    private usuarioService: UsuarioService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const is_publico = this.reflactor.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (is_publico) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    try {
      if (!token) throw new UnauthorizedException();

      const payload = await this.jwtSservice.verifyAsync(token);

      const usuario = await this.usuarioService.buscarPorId(payload.id);

      request['user'] = usuario;
    } catch (error) {
      throw new UnauthorizedException('Acesso neagado!');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
