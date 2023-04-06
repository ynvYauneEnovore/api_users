import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo repoducción no debe ser vacío' })
  @IsString({ message: 'El campo repoducción debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre_usuario no debe ser mayor a 100 caracteres',
  })
  readonly usuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo clave no debe ser vacío' })
  readonly clave: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo email no debe ser vacío' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo rol no debe ser vacío' })
  readonly rol: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo premiun no debe ser vacío' })
  readonly premium: boolean;
}
