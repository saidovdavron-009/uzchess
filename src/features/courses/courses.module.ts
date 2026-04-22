import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCategoryAdminService } from './services/courseCategory/courseCategory.admin.service';
import { CourseCategoryPublicService } from './services/courseCategory/courseCategory.public.service';
import { CourseCategoryAdminController } from './controllers/courseCategory/courseCategory.admin.controller';
import { CourseCategoryPublicController } from './controllers/courseCategory/courseCategory.public.controller';
import { CoursePublicService } from './services/courses/course.public.service';
import CourseAdminService from './services/courses/course.admin.service';
import { CourseAdminController } from './controllers/courses/course.admin.controller';
import { CoursePublicController } from './controllers/courses/course.public.controller';
import { CourseSectionAdminService } from './services/courseSection/courseSection.admin.service';
import { CourseSectionAdminController } from './controllers/courseSection/courseSection.admin.controller';
import { CourseSectionPublicService } from './services/courseSection/courseSection.public.service';
import { CourseSectionPublicController } from './controllers/courseSection/courseSection.public.controller';
import { CourseLessonAdminController } from './controllers/courseLessons/courseLesson.admin.controller';
import { CourseLessonAdminService } from './services/courseLessons/courseLesson.admin.service';
import { CourseLessonPublicService } from './services/courseLessons/courseLesson.public.service';
import { CourseLessonPublicController } from './controllers/courseLessons/courseLesson.public.controller';
import { PurchasedCourseAdminService } from './services/purchasedCourse/purchasedCourse.admin.service';
import { PurchasedCoursePublicService } from './services/purchasedCourse/purchasedCourse.public.service';
import { PurchasedCourseAdminController } from './controllers/purchasedCourse/purchasedCourse.admin.controller';
import { PurchasedCoursePublicController } from './controllers/purchasedCourse/purchasedCourse.public.controller';
import { CourseReviewAdminService } from './services/courseReviews/courseReviews.admin.service';
import { CourseReviewPublicService } from './services/courseReviews/courseReviews.public.service';
import { CourseReviewAdminController } from './controllers/courseReviews/courseReviews.admin.controller';
import { CourseReviewPublicController } from './controllers/courseReviews/courseReviews.public.controller';
import { CourseLikePublicService } from './services/courseLike/courseLike.public.service';
import { CourseLikePublicController } from './controllers/courseLikes/courseLike.public.controller';
import { CourseCategoryRepository } from './repository/courseCategory.repository';
import { CourseRepository } from './repository/course.repository';
import { CourseSectionRepository } from './repository/courseSection.repository';
import { CourseLikeRepository as CourseLessonRepository } from './repository/courseLesson.repository';
import { CourseLikeRepository } from './repository/courseLike.repository';
import { CourseReviewsRepository } from './repository/courseReviews.repository';
import { PurchasedCourseRepository } from './repository/purchasedCourse.repository';
import { CourseCategory } from './entities/courseCategory.entity';
import { Course } from './entities/course.entity';
import { CourseSection } from './entities/courseSection.entity';
import { CourseLesson } from './entities/courseLesson.entity';
import { CourseLike } from './entities/courseLikes.entity';
import { CourseReview } from './entities/courseReviews.entity';
import { PurchasedCourse } from './entities/purchasedCourse.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([CourseCategory, Course, CourseSection, CourseLesson, CourseLike, CourseReview, PurchasedCourse])
  ],
  providers : [
    CourseCategoryAdminService,
    CourseCategoryPublicService,
    CourseCategoryRepository,
    CourseAdminService,
    CoursePublicService,
    CourseRepository,
    CourseSectionAdminService,
    CourseSectionPublicService,
    CourseSectionRepository,
    CourseLessonAdminService,
    CourseLessonPublicService,
    CourseLessonRepository,
    PurchasedCourseAdminService,
    PurchasedCoursePublicService,
    PurchasedCourseRepository,
    CourseReviewAdminService,
    CourseReviewPublicService,
    CourseReviewsRepository,
    CourseLikePublicService,
    CourseLikeRepository,
  ],
  controllers : [
    CourseCategoryAdminController,
    CourseCategoryPublicController,
    CourseAdminController,
    CoursePublicController,
    CourseSectionAdminController,
    CourseSectionPublicController,
    CourseLessonAdminController,
    CourseLessonPublicController,
    PurchasedCourseAdminController,
    PurchasedCoursePublicController,
    CourseReviewAdminController,
    CourseReviewPublicController,
    CourseLikePublicController
  ]
})

export class CoursesModule {}
