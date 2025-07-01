import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { EtipoConta } from 'src/types/index.enum';

export class CriarContaDTO {
  @IsEnum(EtipoConta, {
    message: 'O tipo de conta deve ser um valor válido de ETipoConta.',
  })
  @ApiProperty({ description: 'Tipo da Conta' })
  tipo: EtipoConta | null;

  @IsString({ message: 'O título deve ser uma string.' })
  @Length(3, 150, {
    message: 'O título deve ter entre 3 e 150 caracteres.',
  })
  @ApiProperty({ description: 'Titulo da Conta' })
  titulo: string;

  @Optional()
  @IsBoolean({
    message: 'O campo is_carteira deve ser verdadeiro ou falso (boolean).',
  })
  is_carteira?: boolean;

  @IsNumber({}, { message: 'O saldo inicial deve ser um número.' })
  @ApiProperty({ description: 'Saldo inicial' })
  saldo_inicial: number;
}
