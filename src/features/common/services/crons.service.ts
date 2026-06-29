import { Injectable } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';

@Injectable()
export class CronsService {
  @Cron('45 * * * * *')
  async doSomething() {
    console.log('Something has been done');
  }

  @Timeout(7000)
  async DoSomethingElse(){
    console.log('Timeout!')
  }
}