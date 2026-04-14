import { Injectable, NotFoundException } from '@nestjs/common';
import { SouvenirReviews } from '../entities/souvenirReviews.entity';
import { Souvenir } from '../entities/souvenir.entity';
import { plainToInstance } from 'class-transformer';
import { SouvenirReviewsCreatePublicDto } from '../dtos/souvenirReviews/public/souvenirReviews.create.public.dto';
import { SouvenirReviewsListPublicDto } from '../dtos/souvenirReviews/public/souvenirReviews.list.public.dto';

@Injectable()
export class SouvenirReviewsPublicService {
  async create(payload: SouvenirReviewsCreatePublicDto, userId: number) {
    const souvenir = await Souvenir.findOneBy({ id: payload.souvenirId });
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }

    const review = SouvenirReviews.create({
      ...payload,
      userId,
    } as SouvenirReviews);
    await SouvenirReviews.save(review);
    return review;
  }

  async getAllBySouvenir(souvenirId: number) {
    const souvenir = await Souvenir.findOneBy({ id: souvenirId });
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }

    const reviews = await SouvenirReviews.findBy({ souvenirId });
    return plainToInstance(SouvenirReviewsListPublicDto, reviews, {
      excludeExtraneousValues: true,
    });
  }
}
