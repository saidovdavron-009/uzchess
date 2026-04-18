import { Injectable, NotFoundException } from '@nestjs/common';
import { Souvenir } from '../../entities/souvenir.entity';
import { plainToInstance } from 'class-transformer';
import { SouvenirCreateAdminDto } from '../../dtos/souvenirs/admin/souvenir.create.admin.dto';
import { SouvenirUpdateAdminDto } from '../../dtos/souvenirs/admin/souvenir.update.admin.dto';
import { SouvenirListAdminDto } from '../../dtos/souvenirs/admin/souvenir.list.admin.dto';
import { SouvenirDetailAdminDto } from '../../dtos/souvenirs/admin/souvenir.detail.admin.dto';
import { SouvenirRepository } from '../../repository/souvenir.repository';
import { SouvenirFilter } from '../../filters/souvenir.filter';

@Injectable()
export class SouvenirAdminService {

  constructor(private readonly repo:SouvenirRepository) {
  }

  async create(payload: SouvenirCreateAdminDto) {
    const souvenir = {...payload} as Souvenir
    return await this.repo.save(souvenir
    )
  }

  async getAll(filters:SouvenirFilter) {
    const souvenirs = await this.repo.getAll(filters)
    souvenirs.data = plainToInstance(SouvenirListAdminDto, souvenirs.data, { excludeExtraneousValues: true });
    return souvenirs
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
    const souvenir = await this.repo.getOneById(id)
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }
    Object.assign(
      souvenir,
      Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined)),
    );
    await this.repo.save(souvenir)
    return souvenir;
  }

  async delete(id: number) {
    const souvenir = await this.repo.getOneById(id)
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }
    await this.repo.delete(souvenir)
  }
}
