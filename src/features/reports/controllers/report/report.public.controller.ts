import { Body, Controller, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ReportPublicService } from '../../service/report/report.public.service';
import { ReportCreatePublicDto } from '../../dto/report/admin/report.list.public.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enum/enum';
import { AuthenticationGuard } from '../../../../core/guard/authentication.guard';

@ApiTags('Report-Public')
@Controller('public/report')
@UseGuards(AuthenticationGuard)
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