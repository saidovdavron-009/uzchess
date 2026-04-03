import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportCategory } from '../../entity/reportCategories.entity';
import { plainToInstance } from 'class-transformer';
import { ReportCategoriesCreateAdminDto } from '../../dto/reportCategories/admin/reportCategories.create.admin.dto';
import { ReportCategoriesListAdminDto } from '../../dto/reportCategories/admin/reportCategories.list.admin.dto';
import { ReportCategoriesUpdateAdminDto } from '../../dto/reportCategories/admin/reportCategories.update.admin.dto';

@Injectable()
export class ReportCategoriesAdminService{
  async create(payload : ReportCategoriesCreateAdminDto){
    const reportCategory = ReportCategory.create(payload as ReportCategory)
    await ReportCategory.save(reportCategory)
    return reportCategory
  }
  
  async getAll(){
    const reportCategory = await ReportCategory.find()
    return plainToInstance(ReportCategoriesListAdminDto,reportCategory,{excludeExtraneousValues :true})
  }
  
  async getOne(id : number){
    const reportCategory = await ReportCategory.findOneBy({ id });
    if(!reportCategory) throw new NotFoundException(' reportCategory with given id not found')
    return reportCategory
  }

  async update(id : number,payload : ReportCategoriesUpdateAdminDto){
    const reportCategory = await ReportCategory.findOneBy({ id });
    if(!reportCategory) throw new NotFoundException(' reportCategory with given id not found')

    Object.assign(
      reportCategory,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )

    await ReportCategory.save(reportCategory)
    return reportCategory
  }

  async delete(id : number){
    const reportCategory = await ReportCategory.findOneBy({ id });
    if(!reportCategory) throw new NotFoundException(' reportCategory with given id not found')

    await ReportCategory.remove(reportCategory)
  }
}