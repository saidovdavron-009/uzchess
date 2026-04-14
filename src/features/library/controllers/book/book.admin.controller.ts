import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookAdminService } from '../../services/book/book.admin.service';
import { BookCreateAdminDto } from '../../dtos/book/admin/book.create.admin.dto';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { BookListAdminDto } from '../../dtos/book/admin/book.list.admin.dto';
import { BookUpdateAdminDto } from '../../dtos/book/admin/book.update.admin.dto';
import { BookDetailAdminDto } from '../../dtos/book/admin/book.detail.admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../../config/multer.config';
import type {Request} from 'express';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enum/enum';
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';

@Controller('admin/book')
@UseGuards(AuthenticationGuard)
@ApiBearerAuth()
@Roles(Role.ADMIN,Role.SUPER_ADMIN)
export class BookAdminController{

  constructor(private service : BookAdminService) {
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image',{
    storage : storageOptions,limits : {
      fileSize : 1024 * 256
    }
  }))
  async create(@Body() payload : BookCreateAdminDto,@UploadedFile() image : Express.Multer.File){
    return await this.service.create(payload,image)
  }

  @Get()
  @ApiOkResponse({type : () => BookListAdminDto,isArray:true})
  async getAll(@Req() request : Request){
    let userId = undefined

    // @ts-ignore
    if(request.user){
      // @ts-ignore
      userId = request.user.id
    }
    return await this.service.getAll(userId)
  }

  @Get(':id')
  @ApiOkResponse({type : () => BookDetailAdminDto})
  async getOne(@Param('id',ParseIntPipe) id : number){
    return await this.service.getOne(id)
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image',{storage : storageOptions}))
  async update(@Param('id',ParseIntPipe)id : number,@Body() payload : BookUpdateAdminDto,@UploadedFile() image : Express.Multer.File){
    return await this.service.update(id,payload,image)
  }

  @Delete(':id')
  async delete(@Param('id',ParseIntPipe)id : number){
    return await this.service.delete(id)
  }
}