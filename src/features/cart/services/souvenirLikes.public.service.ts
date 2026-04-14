import { Injectable, NotFoundException } from '@nestjs/common';
import { SouvenirLikes } from '../entities/souvenir.likes.entity';
import { Souvenir } from '../entities/souvenir.entity';

@Injectable()
export class SouvenirLikesPublicService {
  async toggleLike(souvenirId: number, userId: number) {
    const souvenir = await Souvenir.findOneBy({ id: souvenirId });
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }

    const like = await SouvenirLikes.findOneBy({ userId, souvenirId });
    if (like) {
      await SouvenirLikes.remove(like);
      return { message: 'Removed' };
    }

    const newLike = SouvenirLikes.create({ userId, souvenirId } as SouvenirLikes);
    await SouvenirLikes.save(newLike);
    return { message: 'Liked' };
  }
}
