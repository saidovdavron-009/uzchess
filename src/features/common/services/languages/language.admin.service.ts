import { Injectable, NotFoundException } from '@nestjs/common';
import { LanguageCreateAdminDto } from '../../dtos/languages/admin/language.create.admin.dto';
import { Language } from '../../entities/language.entity';
import { plainToInstance } from 'class-transformer';
import { LanguageListAdminDto } from '../../dtos/languages/admin/language.list.admin.dto';
import { LanguageUpdateAdminDto } from '../../dtos/languages/admin/language.update.admin.dto';
import { LanguageRepository } from '../../repository/language.repository';
import { PaginationFilters } from '../../filters/pagination.filter';

@Injectable()
export class LanguageAdminService{
  constructor(private readonly repo: LanguageRepository) {}

  async create(payload : LanguageCreateAdminDto){
    const language = {...payload} as Language;
    return await this.repo.save(language);
  }

  async getAll(filters: PaginationFilters){
    const language = await this.repo.getAll(filters)
    language.data = plainToInstance(LanguageListAdminDto, language.data, { excludeExtraneousValues: true });
    return language
  }

  async getOne(id : number){
    const language = await this.repo.getOneById(id);

    if (!language) {
      throw new NotFoundException('Language with given id not found');
    }

    return language;
  }

  async update(id: number,payload : LanguageUpdateAdminDto){
    const language = await this.repo.getOneById(id);

    if (!language) {
      throw new NotFoundException('Languages with given id not found');
    }

    Object.assign(
      language,
      Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => value)
      )
    )

    await this.repo.save(language);
    return language;
  }

  async delete(id : number){
    const language = await this.repo.getOneById(id);

    if (!language) {
      throw new NotFoundException('Languages with given id not found');
    }

    await this.repo.delete(language);
  }
}
