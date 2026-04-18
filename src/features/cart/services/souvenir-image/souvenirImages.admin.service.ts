import { Injectable, NotFoundException } from '@nestjs/common';
import { SouvenirImages } from '../../entities/souvenirImages.entity';
import { Souvenir } from '../../entities/souvenir.entity';
import { SouvenirImageRepository } from '../../repository/souvenir-image.repository';

@Injectable()
export class SouvenirImagesAdminService {

  constructor(private readonly repo:SouvenirImageRepository) {
  }
  async addImages(souvenirId: number, files: Express.Multer.File[]) {
    const souvenir = await this.repo.getOneById(souvenirId)
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }
    const images = files.map((file) =>
      SouvenirImages.create({ souvenirId, image: file.path } as SouvenirImages),
    );
    await this.repo.save(souvenir)
    return images;
  }

  async deleteImage(imageId: number) {
    const image = await SouvenirImages.findOneBy({ id: imageId });
    if (!image) {
      throw new NotFoundException('Image with given id not found');
    }
    await SouvenirImages.remove(image);
  }
}
