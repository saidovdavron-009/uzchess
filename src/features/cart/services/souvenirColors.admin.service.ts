import { Injectable, NotFoundException } from '@nestjs/common';
import { SouvenirColor } from '../entities/souvenirColor.entity';
import { Souvenir } from '../entities/souvenir.entity';
import { Colors } from '../entities/colors.entity';
import { SouvenirColorsCreateAdminDto } from '../dtos/souvenirColors/admin/souvenirColors.create.admin.dto';

@Injectable()
export class SouvenirColorsAdminService {
  async addColor(payload: SouvenirColorsCreateAdminDto) {
    const souvenir = await Souvenir.findOneBy({ id: payload.souvenirId });
    if (!souvenir) {
      throw new NotFoundException('Souvenir with given id not found');
    }
    const color = await Colors.findOneBy({ id: payload.colorId });
    if (!color) {
      throw new NotFoundException('Color with given id not found');
    }
    const existing = await SouvenirColor.findOneBy({
      souvenirId: payload.souvenirId,
      colorId: payload.colorId,
    });
    if (existing) {
      return existing;
    }
    const souvenirColor = SouvenirColor.create(payload as SouvenirColor);
    await SouvenirColor.save(souvenirColor);
    return souvenirColor;
  }

  async removeColor(id: number) {
    const souvenirColor = await SouvenirColor.findOneBy({ id });
    if (!souvenirColor) {
      throw new NotFoundException('SouvenirColor with given id not found');
    }
    await SouvenirColor.remove(souvenirColor);
  }
}
