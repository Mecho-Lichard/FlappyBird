//背景
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";
export class BackGround extends Sprite{
  constructor(){
    //在super之上不能访问类属性,所以变通用静态方法去访问类属性
    const image =Sprite.getImage('background');
    
      super(image,
      0,0,
      image.width,image.height,
      0,0,
      DataStore.getInstance().canvas.width,DataStore.getInstance().canvas.height);
    }
}