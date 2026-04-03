import { Injectable, NotFoundException } from '@nestjs/common';
import { CoursesCreateAdminDto } from '../../dtos/courses/admin/course.create.admin.dto';
import { plainToInstance } from 'class-transformer';
import { Course } from '../../entities/course.entity';
import { CourseListAdminDto } from '../../dtos/courses/admin/course.list.admin.dto';
import { CourseUpdateAdminDto } from '../../dtos/courses/admin/course.update.admin.dto';

@Injectable()
export class CourseAdminService{
  async create(payload : CoursesCreateAdminDto,image : Express.Multer.File){
    const course = Course.create(payload)
    course.createdAt = new Date().toISOString()
    if(image){
      course.image = image.path
    }
    await Course.save(course)
    return course
  }

  async getAll(){
    const course = await Course.find()

    return plainToInstance(CourseListAdminDto,course,{excludeExtraneousValues : true})
  }
  
  async getOne(id : number){
    const course = await Course.findOneBy({ id });
    if(!course){
      throw new NotFoundException('course with given id not found')
    }

    return course
  }

  async update(id : number,payload : CourseUpdateAdminDto,image : Express.Multer.File){
    const course = await Course.findOneBy({ id });
    if(!course){
      throw new NotFoundException('course with given id not found')
    }
    Object.assign(
      course,
      Object.fromEntries(
        Object.entries(payload).filter(([key,value]) => value)
      )
    )

    if(image){
      course.image = image.path
    }

    await Course.save(course)
    return course
  }

  async delete(id : number){
    const course = await Course.findOneBy({ id });
    if(!course){
      throw new NotFoundException('course with given id not found')
    }

    await Course.remove(course)
  }
}