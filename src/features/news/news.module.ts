import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './data/entities/news.entity';
import { NewsView } from './data/entities/newsViews.entity';
import { NewsAdminService } from './application/services/news/news.admin.service';
import { NewsPublicService } from './application/services/news/news.public.service';
import { NewsRepository } from './data/repository/news.repository';
import { NewsViewsAdminService } from './application/services/newsViews/newsViews.admin.service';
import { NewsViewsPublicService } from './application/services/newsViews/newsViews.public.service';
import { NewsViewsRepository } from './data/repository/newsViews.repository';
import { NewsAdminController } from './presentation/controllers/news/news.admin.controller';
import { NewsPublicController } from './presentation/controllers/news/news.public.controller';
import { NewsViewsAdminController } from './presentation/controllers/newsViews/newsViews.admin.controller';
import { NewsViewsPublicController } from './presentation/controllers/newsViews/newsViews.public.controller';
import { INewsRepository } from './application/repository/news.repository.interface';

@Module({
  imports : [
    TypeOrmModule.forFeature([News, NewsView])
  ],
  providers : [
    {provide: INewsRepository, useClass: NewsRepository},
    NewsAdminService,
    NewsPublicService,
    NewsViewsAdminService,
    NewsViewsPublicService,
    NewsViewsRepository,
  ],
  controllers: [
    NewsAdminController,
    NewsPublicController,
    NewsViewsAdminController,
    NewsViewsPublicController
  ]
})

export class NewsModule {}
