import { Body, Controller, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ReportPublicService } from '../../service/report/report.public.service';
import { ReportCreatePublicDto } from '../../dto/report/admin/report.list.public.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import authenticationGuard from '../../../../core/guard/authentication.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enum/enum';

@ApiTags('Report-Public')
@Controller('public/report')
@UseGuards(authenticationGuard)
@ApiBearerAuth()
@Roles(Role.USER)
export class ReportPublicController{

  constructor(private readonly service : ReportPublicService) {
  }

  @Post()
  async create(@Body()payload : ReportCreatePublicDto,@Req()request : any){
    const userId = request.user.id
    return await this.service.create(userId,payload)
  }
}