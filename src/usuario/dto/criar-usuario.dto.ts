import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CriarUsuarioDTO {
  @IsString({ message: "O campo 'nome' deve ser uma string!" })
  @IsNotEmpty({ message: "O campo 'nome' ;e de preenchemento obrigatório!" })
  @Length(3, 150, {
    message: "O campo 'nome' deve ter entre 3 e 150 caractéres!",
  })
  @ApiProperty()
  nome: string;

  @IsEmail({}, { message: "O campo 'email' deve ser um e-mail válido!" })
  @IsNotEmpty({ message: "O campo 'e-mail' é de preenchimento obrigatório!" })
  @ApiProperty()
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
    },
    { message: 'Senha fraca, verifique os requisitos mínimos!' },
  )
  @IsNotEmpty({ message: "O campo 'senha' é de preenchimento obrigatório!" })
  @ApiProperty()
  senha: string;
}
