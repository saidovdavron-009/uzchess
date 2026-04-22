import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bookCategoryAdminController } from './controllers/bookCategory/bookCategory.admin.controller';
import { bookCategoryPublicController } from './controllers/bookCategory/bookCategory.public.controller';
import { BookCategoryPublicService } from './services/bookCategory/bookCategory.public.service';
import { BookCategoryAdminService } from './services/bookCategory/bookCategory.admin.service';
import { BookAdminService } from './services/book/book.admin.service';
import { BookPublicService } from './services/book/book.public.service';
import { BookAdminController } from './controllers/book/book.admin.controller';
import { BookPublicController } from './controllers/book/book.public.controller';
import { BookLikesPublicService } from './services/bookLikes/bookLikes.public.service';
import { BookLikesPublicController } from './controllers/bookLikes/bookLikes.public.controller';
import { BookReviewsAdminService } from './services/bookReviews/bookReviews.admin.service';
import { BookReviewsPublicService } from './services/bookReviews/bookReviews.public.service';
import { BookReviewsAdminController } from './controllers/bookReviews/bookReviews.admin.controller';
import { BookReviewsPublicController } from './controllers/bookReviews/bookReviews.public.controller';
import { BookRepository } from './repository/book.repository';
import { BookCategoryRepository } from './repository/bookCategory.repository';
import { BookLikeRepository } from './repository/bookLike.repository';
import { BookReviewsRepository } from './repository/bookReviews.repository';
import { Book } from './entities/book.entity';
import { BookCategory } from './entities/bookCategory.entity';
import { BookLike } from './entities/bookLikes.entity';
import { BookReview } from './entities/bookReviews.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Book, BookCategory, BookLike, BookReview])
  ],
  providers : [
    BookCategoryAdminService,
    BookCategoryPublicService,
    BookCategoryRepository,
    BookAdminService,
    BookPublicService,
    BookRepository,
    BookLikesPublicService,
    BookLikeRepository,
    BookReviewsAdminService,
    BookReviewsPublicService,
    BookReviewsRepository,
  ],
  controllers : [
    bookCategoryAdminController,
    bookCategoryPublicController,
    BookAdminController,
    BookPublicController,
    BookLikesPublicController,
    BookReviewsAdminController,
    BookReviewsPublicController,
  ]
})

export class LibraryModule {}
