import { Injectable, NotFoundException } from '@nestjs/common';
import { SouvenirReviews } from '../../entities/souvenirReviews.entity';
import { Souvenir } from '../../entities/souvenir.entity';
import { plainToInstance } from 'class-transformer';
import { SouvenirReviewsCreatePublicDto } from '../../dtos/souvenirReviews/public/souvenirReviews.create.public.dto';
import { SouvenirReviewsListPublicDto } from '../../dtos/souvenirReviews/public/souvenirReviews.list.public.dto';
import { SouvenirReviewsRepository } from '../../repository/souvenir-reviews.repository';

@Injectable()
export class SouvenirReviewsPublicService {

   constructor(private readonly repo:SouvenirReviewsRepository) {
   }
  async create(payload: SouvenirReviewsCreatePublicDto, userId: number) {
    const souvenir = await this.repo.getOneById(payload.souvenirId)
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }

    const review = SouvenirReviews.create({
      ...payload,
      userId,
    } as SouvenirReviews);
    await this.repo.save(review)
    return review;
  }

  async getAllBySouvenir(souvenirId: number) {
    const souvenir = await this.repo.getOneById(souvenirId)
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }

    const reviews = await this.repo.getOneById(souvenirId)
    return plainToInstance(SouvenirReviewsListPublicDto, reviews, {
      excludeExtraneousValues: true,
    });
  }
}
