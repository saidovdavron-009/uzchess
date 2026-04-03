import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ReportCreatePublicDto } from '../../dto/report/admin/report.list.public.dto';
import { User } from '../../../auth/entities/users.entity';
import { ReportCategory } from '../../entity/reportCategories.entity';
import { BookReview } from '../../../library/entities/bookReviews.entity';
import { CourseReview } from '../../../courses/entities/courseReviews.entity';
import { ReportType } from '../../../../core/enum/enum';
import { Report } from '../../entity/report.entity';

@Injectable()
export class ReportPublicService {
  async create(userId: number, payload: ReportCreatePublicDto) {
    const user = await User.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User does not exist anymore');
    }

    const category = await ReportCategory.findOneBy({ id: payload.categoryId });
    if (!category) {
      throw new NotFoundException('ReportCategory with given id not found');
    }

    let review: BookReview | CourseReview | null;
    if (payload.target === ReportType.BOOK) {
      review = await BookReview.findOneBy({ id: payload.targetId });
    } else {
      review = await CourseReview.findOneBy({ id: payload.targetId });
    }

    if (!review) {
      throw new NotFoundException('Review with given id not found');
    }

    const alreadyExists = await Report.findOneBy({
      userId: userId,
      targetId: payload.targetId,
      categoryId: payload.categoryId,
    });

    if (alreadyExists) {
      throw new ConflictException('Report already exists');
    }

    const newReport = Report.create({ ...payload, userId });
    await Report.save(newReport);
    return newReport;
  }
}
