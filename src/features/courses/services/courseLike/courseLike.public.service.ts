import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../../auth/entities/users.entity';
import { Course } from '../../entities/course.entity';
import { CourseLike } from '../../entities/courseLikes.entity';
import { CourseLikeRepository } from '../../repository/courseLike.repository';

@Injectable()
export class CourseLikePublicService{
  constructor(private readonly repo: CourseLikeRepository) {}

  async toggleLike(courseId : number,userId : number){

    const user = await User.findOneBy({ id: userId})
    if(!user){
      throw new NotFoundException('user with given id not found')
    }
    const course = await Course.findOneBy({ id : courseId})
    if(!course){
      throw new NotFoundException('course with given id not found')
    }

    const like = await CourseLike.findOneBy({ userId,courseId})
    if(like){
      await this.repo.delete(like)
      return {message: "Removed"}
    }else{
      const newLike = CourseLike.create({ userId: user.id, courseId: courseId });
      await this.repo.save(newLike);
      return {message : "Liked"}
    }
  }
}