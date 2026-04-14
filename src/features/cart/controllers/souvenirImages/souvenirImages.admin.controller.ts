import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SouvenirImagesAdminService } from '../../services/souvenirImages.admin.service';
import { storageOptions } from '../../../../config/multer.config';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enum/enum';

@ApiTags('SouvenirImages - Admin')
@ApiBearerAuth()
@Controller('admin/souvenir-images')
@UseGuards(AuthenticationGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@UseFilters(GlobalFilters)
export class SouvenirImagesAdminController {
  constructor(private readonly service: SouvenirImagesAdminService) {}

  @Post(':souvenirId')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: storageOptions,
      limits: { fileSize: 1024 * 512 },
    }),
  )
  async addImages(
    @Param('souvenirId', ParseIntPipe) souvenirId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return await this.service.addImages(souvenirId, files);
  }

  @Delete(':imageId')
  async deleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
    return await this.service.deleteImage(imageId);
  }
}
