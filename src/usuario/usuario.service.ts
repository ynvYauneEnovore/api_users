import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(
    CreateUsuarioDto: CreateUsuarioDto,
  ): Promise<UsuarioEntity> {
    const existe = await this.usuarioRepository.findOneBy({
      usuario: CreateUsuarioDto.usuario.trim(),
      clave: CreateUsuarioDto.clave,
      email: CreateUsuarioDto.email,
      rol: CreateUsuarioDto.rol,
      premium: CreateUsuarioDto.premium,
    });

    if (existe) {
      throw new ConflictException(
        `El Usuario ${CreateUsuarioDto.usuario} ya existe.`,
      );
    }

    return this.usuarioRepository.save({
      usuario: CreateUsuarioDto.usuario.trim(),
      clave: CreateUsuarioDto.clave,
      email: CreateUsuarioDto.email,
      rol: CreateUsuarioDto.rol,
      premium: CreateUsuarioDto.premium,
    });
  }

  async findAll(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<UsuarioEntity> {
    const interprete = await this.usuarioRepository.findOneBy({id});

    if (!interprete) {
      throw new NotFoundException(`El intérprete ${id} no existe.`);
    }

    return interprete;
  }

  async update(id: number, updateInterpreteDto: UpdateUsuarioDto) {
    const interprete = await this.usuarioRepository.findOneBy({id});

    if (!interprete) {
      throw new NotFoundException(`El intérprete ${id} no existe.`);
    }

    const interpreteUpdate = Object.assign(interprete, updateInterpreteDto);
    return this.usuarioRepository.save(interpreteUpdate);
  }

  async remove(id: number) {
    const existe = await this.usuarioRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El intérprete ${id} no existe.`);
    }

    return this.usuarioRepository.delete(id);
  }
}
