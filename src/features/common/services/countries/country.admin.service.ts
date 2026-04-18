import { Injectable, NotFoundException } from '@nestjs/common';
import { CountryCreateAdminDto } from '../../dtos/countries/admin/country.create.admin.dto';
import { Country } from '../../entities/country.entity';
import { plainToInstance } from 'class-transformer';
import { CountryListAdminDto } from '../../dtos/countries/admin/country.list.admin.dto';
import { CountryUpdateAdminDto } from '../../dtos/countries/admin/country.update.admin.dto';
import { CountryRepository } from '../../repository/country.repository';

@Injectable()
export class CountryAdminService{
  constructor(private readonly repo:CountryRepository) {
  }

  async create(payload : CountryCreateAdminDto,icon : Express.Multer.File){
    const country = Country.create(payload as Country);
    await Country.save(country);
    return country;
  }

  async getAll(){
    const country = await Country.find();
    return plainToInstance(CountryListAdminDto, country, { excludeExtraneousValues: true });
  }

  async getOne(id : number){
    const country = await this.repo.getOneById(id)

    if (!country) {
      throw new NotFoundException('Country with given id not found');
    }

    return country;
  }

  async update(id : number,payload : CountryUpdateAdminDto,icon? :Express.Multer.File){
    const country = await this.repo.getOneById(id)

    if (!country) {
      throw new NotFoundException('Country with given id not found');
    }
    Object.assign(
      country,
      Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => value)
      )
    )
    await this.repo.save(country)
    return country;
  }

  async delete(id : number){
    const country = await this.repo.getOneById(id)

    if (!country) {
      throw new NotFoundException('Country with given id not found');
    }

    await this.repo.delete(country)
  }
}