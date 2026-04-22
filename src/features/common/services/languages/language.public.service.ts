import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LanguageListPublicDto } from '../../dtos/languages/public/language.list.public.dto';
import { LanguageRepository } from '../../repository/language.repository';
import { PaginationFilters } from '../../filters/pagination.filter';

@Injectable()
export class LanguagePublicService{
  constructor(private readonly repo: LanguageRepository) {}

  async getAll(filters: PaginationFilters){
    const language = await this.repo.getAll(filters)
    language.data = plainToInstance(LanguageListPublicDto, language.data, { excludeExtraneousValues: true });
    return language
  }

  async getOne(id : number){
    const language = await this.repo.getOneById(id);

    if (!language) {
      throw new NotFoundException('Language with given id not found');
    }

    return language;
  }
}
