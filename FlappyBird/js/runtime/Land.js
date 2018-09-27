//不断移动的陆地
import { Sprite } from "../base/Sprite.js";
import { Director } from "../Director.js";
import { DataStore } from "../base/DataStore.js";

export class Land extends Sprite{
    constructor(){
      //land剪裁
      const image=Sprite.getImage('land');
      super(image,0,0,
            image.width,image.height,
        0, DataStore.getInstance().canvas.height-image.height,
            image.width,image.height);
      //land要移动的 话，就要水平坐标的偏移量和偏移速度
      //地板的水平变化坐标
      this.landX=0;
      //地板的移动速度
      this.landSpeed = Director.getInstance().moveSpeed;
    }

    draw(){
      this.landX = this.landX + this.landSpeed; 
      if (this.landX > (this.img.width - DataStore.getInstance().canvas.width)){
        this.landX=0;
      }
      super.draw(this.img,
        this.srcX,
        this.srcY,
        this.srcW,
        this.srcH,
        -this.landX,
        this.y,
        this.width,
        this.height)
    }


}