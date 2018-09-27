//下半部分铅笔
import { Pencil } from "./Pencil.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class DownPencil extends Pencil {
  constructor(top) {
    const image = Sprite.getImage('pencilDown');
    super(image, top);
  }
      //两只铅笔有间隙的方法
      draw(){
        let gap = DataStore.getInstance().canvas.height/5;//使间隙为一个定值
        this.y=this.top+gap;
        super.draw();

      }
}