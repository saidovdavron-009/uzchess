import { Injectable, NotFoundException } from '@nestjs/common';
import { SouvenirLikes } from '../../entities/souvenir.likes.entity';
import { Souvenir } from '../../entities/souvenir.entity';
import { SouvenirLikesRepository } from '../../repository/souvenir-likes.repository';

@Injectable()
export class SouvenirLikesPublicService {

  constructor(private readonly repo : SouvenirLikesRepository) {
  }

  async toggleLike(souvenirId: number, userId: number) {
    const souvenir = await this.repo.getOneById(souvenirId)
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }

    const like = await SouvenirLikes.findOneBy({ userId, souvenirId });
    if (like) {
      await this.repo.delete(like)
      return { message: 'Removed' };
    }

    const newLike = SouvenirLikes.create({ userId, souvenirId } as SouvenirLikes);
    await this.repo.save(newLike)
    return { message: 'Liked' };
  }
}
