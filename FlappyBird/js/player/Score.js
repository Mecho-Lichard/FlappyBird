//几分器类，不用继承Sprite因为不需要渲染任何图形
import { DataStore } from "../base/DataStore.js";
export class Score{
        constructor(){
          this.ctx=DataStore.getInstance().ctx;
          this.scoreNumber=0;

          //因为canvas刷新的很快，所以要一个变量控制加分加一次
          this.isScore=true;
        }
      //用fillText来线束数字
        draw(){
          this.ctx.font='25px Arial';
          this.ctx.fillStyle="#000000";
          this.ctx.fillText(
            this.scoreNumber,
            DataStore.getInstance().canvas.width/2,
            DataStore.getInstance().canvas.height/20,
            1000
          );

        }
}