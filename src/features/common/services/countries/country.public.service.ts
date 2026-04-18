import { Injectable, NotFoundException } from '@nestjs/common';
import { Country } from '../../entities/country.entity';
import { plainToInstance } from 'class-transformer';
import { CountryListPublicDto } from '../../dtos/countries/public/country.list.public.dto';
import { PaginationFilters } from '../../filters/pagination.filter';
import { CountryRepository } from '../../repository/country.repository';

@Injectable()
export class CountryPublicService{

  constructor(private readonly repo : CountryRepository) {
  }
  async getAll(filters : PaginationFilters){
    const country = await this.repo.getAll(filters)
    country.data = plainToInstance(CountryListPublicDto, country.data, { excludeExtraneousValues: true });
  }

  async getOne(id : number){
    const country = await this.repo.getOneById(id)

    if (!country) {
      throw new NotFoundException('Country with given id not found');
    }

    return country;
  }
}