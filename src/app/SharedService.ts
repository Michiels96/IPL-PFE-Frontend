import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    dataChoix1;
    dataChoix2;

    constructor(){
      this.dataChoix1= {};
      this.dataChoix2= {};
    }

    setDataChoix1(val: object){
        this.dataChoix1= val;
    }

    getDataChoix1(){
        return this.dataChoix1;
    }

    setDataChoix2(val: object){
        this.dataChoix2= val;
    }

    getDataChoix2(){
        return this.dataChoix2;
    }
}