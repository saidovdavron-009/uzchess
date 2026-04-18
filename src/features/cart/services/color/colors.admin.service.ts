import { Injectable, NotFoundException } from '@nestjs/common';
import { Colors } from '../../entities/colors.entity';
import { plainToInstance } from 'class-transformer';
import { ColorsCreateAdminDto } from '../../dtos/colors/admin/colors.create.admin.dto';
import { ColorsUpdateAdminDto } from '../../dtos/colors/admin/colors.update.admin.dto';
import { ColorsListAdminDto } from '../../dtos/colors/admin/colors.list.admin.dto';
import { ColorsRepository } from '../../repository/colors.repository';
import { ColorFilter } from '../../filters/color.filter';

@Injectable()
export class ColorsAdminService {

  constructor(private readonly repo: ColorsRepository) {
  }
  async create(payload: ColorsCreateAdminDto) {
    const color = {...payload} as Colors
    return await this.repo.save(color)
  }

  async getAll(filters:ColorFilter) {
    const colors = await this.repo.getAll(filters)
    colors.data = plainToInstance(ColorsListAdminDto, colors.data, { excludeExtraneousValues: true });
    return colors
  }

  async getOne(id: number) {
    const color = await this.repo.getOneById(id)
    if (!color) {
      throw new NotFoundException('Color with given id not found');
    }
    return color;
  }

  async update(id: number, payload: ColorsUpdateAdminDto) {
    const color = await this.repo.getOneById(id)
    if (!color) {
      throw new NotFoundException('Color with given id not found');
    }
    Object.assign(
      color,
      Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined)),
    );
    await this.repo.save(color)
    return color;
  }

  async delete(id: number) {
    const color = await this.repo.getOneById(id)
    if (!color) {
      throw new NotFoundException('Color with given id not found');
    }
    await this.repo.delete(color)
  }
}
