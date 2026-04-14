import { Injectable, NotFoundException } from '@nestjs/common';
import { Souvenir } from '../entities/souvenir.entity';
import { plainToInstance } from 'class-transformer';
import { SouvenirCreateAdminDto } from '../dtos/souvenirs/admin/souvenir.create.admin.dto';
import { SouvenirUpdateAdminDto } from '../dtos/souvenirs/admin/souvenir.update.admin.dto';
import { SouvenirListAdminDto } from '../dtos/souvenirs/admin/souvenir.list.admin.dto';
import { SouvenirDetailAdminDto } from '../dtos/souvenirs/admin/souvenir.detail.admin.dto';

@Injectable()
export class SouvenirAdminService {
  async create(payload: SouvenirCreateAdminDto) {
    const souvenir = Souvenir.create(payload as Souvenir);
    await Souvenir.save(souvenir);
    return souvenir;
  }

  async getAll() {
    const souvenirs = await Souvenir.find({ relations: ['souvenirImage'] });
    return plainToInstance(SouvenirListAdminDto, souvenirs, { excludeExtraneousValues: true });
  }

  async getOne(id: number) {
    const souvenir = await Souvenir.findOne({
      where: { id },
      relations: ['souvenirImage', 'souvenirColor', 'souvenirColor.colors'],
    });
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }
    return plainToInstance(SouvenirDetailAdminDto, souvenir, { excludeExtraneousValues: true });
  }

  async update(id: number, payload: SouvenirUpdateAdminDto) {
    const souvenir = await Souvenir.findOneBy({ id });
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }
    Object.assign(
      souvenir,
      Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined)),
    );
    await Souvenir.save(souvenir);
    return souvenir;
  }

  async delete(id: number) {
    const souvenir = await Souvenir.findOneBy({ id });
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }
    await Souvenir.remove(souvenir);
  }
}
