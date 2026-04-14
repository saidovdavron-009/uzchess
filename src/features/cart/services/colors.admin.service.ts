import { Injectable, NotFoundException } from '@nestjs/common';
import { Colors } from '../entities/colors.entity';
import { plainToInstance } from 'class-transformer';
import { ColorsCreateAdminDto } from '../dtos/colors/admin/colors.create.admin.dto';
import { ColorsUpdateAdminDto } from '../dtos/colors/admin/colors.update.admin.dto';
import { ColorsListAdminDto } from '../dtos/colors/admin/colors.list.admin.dto';

@Injectable()
export class ColorsAdminService {
  async create(payload: ColorsCreateAdminDto) {
    const color = Colors.create(payload as Colors);
    await Colors.save(color);
    return color;
  }

  async getAll() {
    const colors = await Colors.find();
    return plainToInstance(ColorsListAdminDto, colors, { excludeExtraneousValues: true });
  }

  async getOne(id: number) {
    const color = await Colors.findOneBy({ id });
    if (!color) {
      throw new NotFoundException('Color with given id not found');
    }
    return color;
  }

  async update(id: number, payload: ColorsUpdateAdminDto) {
    const color = await Colors.findOneBy({ id });
    if (!color) {
      throw new NotFoundException('Color with given id not found');
    }
    Object.assign(
      color,
      Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined)),
    );
    await Colors.save(color);
    return color;
  }

  async delete(id: number) {
    const color = await Colors.findOneBy({ id });
    if (!color) {
      throw new NotFoundException('Color with given id not found');
    }
    await Colors.remove(color);
  }
}
