import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../../auth/entities/users.entity';
import { Course } from '../../../courses/entities/course.entity';
import { CourseLike } from '../../../courses/entities/courseLikes.entity';
import { Book } from '../../entities/book.entity';
import { BookLike } from '../../entities/bookLikes.entity';

@Injectable()
export class BookLikesPublicService{
  async toggleLike(bookId : number,userId : number){

    const user = await User.findOneBy({id : userId})
    if(!user){
      throw new NotFoundException('user with given id not found')
    }
    const book = await Book.findOneBy({id : bookId})
    if(!book){
      throw new NotFoundException('course with given id not found')
    }

    const like = await BookLike.findOneBy({userId,bookId})
    if(like){
      await BookLike.remove(like)
      return {message : "Removed"}
    }else{
      const newLike = BookLike.create({ userId: user.id, bookId : bookId })
      await BookLike.save(newLike)
      return {message : "liked"}
    }
  }
}