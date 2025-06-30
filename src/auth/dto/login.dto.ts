import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail({}, { message: "O campo '' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'email' é de preenchimento obrigatório." })
  @ApiProperty({ description: 'E-mail do usuário.' })
  email: string;

  @IsString({ message: "O campo 'senha' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'senha' é de preenchimento obrigatório." })
  @ApiProperty({ description: 'Senha de acesso do usuário.' })
  senha: string;
}
