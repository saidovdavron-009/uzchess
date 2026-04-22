import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsAdminService } from './services/news/news.admin.service';
import { NewsPublicService } from './services/news/news.public.service';
import { NewsAdminController } from './controllers/news/news.admin.controller';
import { NewsPublicController } from './controllers/news/news.public.controller';
import { NewsViewsAdminService } from './services/newsViews/newsViews.admin.service';
import { NewsViewsPublicService } from './services/newsViews/newsViews.public.service';
import { NewsViewsAdminController } from './controllers/newsViews/newsViews.admin.controller';
import { NewsViewsPublicController } from './controllers/newsViews/newsViews.public.controller';
import { NewsRepository } from './repository/news/news.repository';
import { NewsViewsRepository } from './repository/newsViews/newsViews.repository';
import { News } from './entities/news.entity';
import { NewsView } from './entities/newsViews.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([News, NewsView])
  ],
  providers : [
    NewsAdminService,
    NewsPublicService,
    NewsRepository,
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
