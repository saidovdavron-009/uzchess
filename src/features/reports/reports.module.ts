import { Module } from '@nestjs/common';
import { ReportCategoriesAdminService } from './service/reportCategories/reportCategories.admin.service';
import { ReportCategoriesPublicService } from './service/reportCategories/reportCategories.public.service';
import { ReportCategoriesAdminController } from './controllers/reportCategories/reportCategories.admin.controller';
import { ReportCategoriesPublicController } from './controllers/reportCategories/reportCategories.public.controller';
import { ReportPublicService } from './service/report/report.public.service';
import { ReportPublicController } from './controllers/report/report.public.controller';

@Module({
  providers : [
    ReportCategoriesAdminService,
    ReportCategoriesPublicService,
    ReportPublicService
  ],

  controllers : [
    ReportCategoriesAdminController,
    ReportCategoriesPublicController,
    ReportPublicController
  ]
})

export class ReportsModule {}