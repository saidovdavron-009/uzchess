import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { NewsAdminService } from '../../services/news/news.admin.service';
import { NewsListAdminDto } from '../../dtos/news/admin/news.list.admin.dto';
import { NewsDetailAdminDto } from '../../dtos/news/admin/news.detail.admin.dto';
import { NewsCreateAdminDto } from '../../dtos/news/admin/news.create.admin.dto';
import { NewsUpdateAdminDto } from '../../dtos/news/admin/news.update.admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../../config/multer.config';
import { GlobalFilters } from '../../../../core/filters/global.filters';
import { PaginationFilters } from '../../../common/filters/pagination.filter';

@Controller('admin/news')
@UseFilters(GlobalFilters)
export class NewsAdminController {

  constructor(private service : NewsAdminService) {
  }

  @Get()
  @ApiOkResponse({type : () => NewsListAdminDto, isArray : true})
  async getAll(@Query() filters : PaginationFilters)  {
    return await this.service.getAll()
  }

  @Get(':id')
  @ApiOkResponse({type : () => NewsDetailAdminDto})
  async getOne(@Param('id',ParseIntPipe) id: number){
    return await this.service.getOne(id)
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image',{
    storage : storageOptions,limits : {
      fileSize : 1024 * 256
    }
  }))
  async create(@Body() payload: NewsCreateAdminDto,@UploadedFile() image : Express.Multer.File){
    return await this.service.create(payload,image)
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image',{storage : storageOptions}))
  async update(@Param('id',ParseIntPipe) id: number, @Body() payload: NewsUpdateAdminDto,@UploadedFile() image : Express.Multer.File){
    return await this.service.update(id, payload, image)
  }

  @Delete(':id')
  async delete(@Param('id',ParseIntPipe) id: number){
    return await this.service.delete(id)
  }
}