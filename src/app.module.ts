import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { NewsModule } from './features/news/news.module';
import { CommonModule } from './features/common/common.module';
import { AuthModule } from './features/auth/auth.module';
import { LibraryModule } from './features/library/library.module';
import { CoursesModule } from './features/courses/courses.module';
import { ReportsModule } from './features/reports/reports.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    NewsModule,
    LibraryModule,
    CommonModule,
    AuthModule,
    CoursesModule,
    ReportsModule
  ],
})

export class AppModule {}