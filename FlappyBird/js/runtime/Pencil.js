//铅笔的基类，传入两个参数
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Pencil extends Sprite{
      //top就是铅笔与顶部的距离，向上的铅笔就是正值，向下的铅笔就是负值
      constructor(image,top){
        super(image,
               0,0,
               image.width,image.height,
               //刚好在右侧看不到的位置
               DataStore.getInstance().canvas.width,0,
               image.width,image.height);
        this.top=top;
        this.moveSpeed=2;
      }

      //定义一个速度，和land速度统一了
      draw(){
        this.x = this.x - this.moveSpeed;
        super.draw(this.img,
                  0,0,
                  this.width,this.height,
                  this.x,this.y,
                  this.width,this.height);
      }
}