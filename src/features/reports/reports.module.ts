import { Module } from '@nestjs/common';
import { ReportCategoriesAdminService } from './service/reportCategories/reportCategories.admin.service';
import { ReportCategoriesPublicService } from './service/reportCategories/reportCategories.public.service';
import { ReportCategoriesAdminController } from './controllers/reportCategories/reportCategories.admin.controller';
import { ReportCategoriesPublicController } from './controllers/reportCategories/reportCategories.public.controller';
import { ReportPublicService } from './service/report/report.public.service';
import { ReportPublicController } from './controllers/report/report.public.controller';
import { ReportRepository } from './repositories/report.repository';
import { ReportCategoryRepository } from './repositories/reportCategory.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entity/report.entity';
import { ReportCategory } from './entity/reportCategories.entity';

@Module({
  providers : [
    ReportRepository,
    ReportCategoryRepository,
    ReportCategoriesAdminService,
    ReportCategoriesPublicService,
    ReportPublicService
  ],
  imports : [
    TypeOrmModule.forFeature([Report,ReportCategory])
  ],
  controllers : [
    ReportCategoriesAdminController,
    ReportCategoriesPublicController,
    ReportPublicController
  ]
})

export class ReportsModule {}