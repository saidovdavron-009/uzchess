import { Injectable, NotFoundException } from '@nestjs/common';
import { SouvenirImages } from '../entities/souvenirImages.entity';
import { Souvenir } from '../entities/souvenir.entity';

@Injectable()
export class SouvenirImagesAdminService {
  async addImages(souvenirId: number, files: Express.Multer.File[]) {
    const souvenir = await Souvenir.findOneBy({ id: souvenirId });
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }
    const images = files.map((file) =>
      SouvenirImages.create({ souvenirId, image: file.path } as SouvenirImages),
    );
    await SouvenirImages.save(images);
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
