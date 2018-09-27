//小鸟类
//循坏渲染三只小鸟
//cavase渲染图片的三个部分，循环渲染，birds只会加载一张图片
import {Sprite} from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

export class Birds extends Sprite{
    constructor(){
      const image=Sprite.getImage('birds');
      super(image,0,0,image.width,image.height,
            0,0,image.width,image.height);

      //小鸟的三种状态需要一个数组去存储
      //小鸟的宽是34...上下边距是 10，小鸟左右边距是9,裁出3个部分
      this.clippingX=[9,
      9+34+18,
      9+34+18+34+18];
      //需要用到位置
      this.clippingY=[10,10,10];
      this.clippingWidth=[34,34,34];
      this.clippingHeight=[24,24,24];
      this.birdX = DataStore.getInstance().canvas.width / 4;
      this.birdsX=[this.birdX,this.birdX,this.birdX];
      //不需要对外公开的直接定义变量
      const birdY = DataStore.getInstance().canvas.height / 2;
      this.birdsY=[birdY,birdY,birdY];
      const birdWidth=34;
      this.birdsWidth = [birdWidth, birdWidth, birdWidth];
      const birdHeight=24;
      this.birdsHeight = [birdHeight, birdHeight, birdHeight];
      //三个y坐标存到里面来，因为动的是y坐标
      this.y = [birdY, birdY, birdY];
      //小鸟上下动要用到自由落体的数据
      this.index=0;
      this.count=0;
      this.time=0;

    
    }

    draw(){
        //怎么样周期性性的剪裁并且展示出来：不断的循环渲染，小鸟不断的0 1 2三幅图片动
    //切换三只小鸟的速度
    const speed=0.2;
    this.count=this.count+speed;
    //数组的角标 0 1 2，到2了就变为0
    if(this.index>=2){
      this.count=0;
    }
    //this.index=this.count;
    //数字有小数的话，那么会跳过这个，到下一个(减速器)
    this.index=Math.floor(this.count);

    //小鸟的自由落体运动h=1/2*gt^2,0.98在地球上太快了。。/2.3 看起来正常一点
    const g=0.98/2.3;
    //向上移动一点的偏移量,使得鸟能向上抬一点再往下掉。。
    const offsetUp=30;
    //小鸟的位移
    const offsetY = (g * this.time * (this.time - offsetUp))/2;
    for(let i=0;i<=2;i++){
      this.birdsY[i]=this.y[i]+offsetY;
    }

    this.time++;


    //渲染小鸟
    super.draw(
        this.img,
        this.clippingX[this.index],this.clippingY[this.index],
        this.clippingWidth[this.index],this.clippingHeight[this.index],
        this.birdsX[this.index],this.birdsY[this.index],
        this.birdsWidth[this.index],this.birdsHeight[this.index]

    );

    }
  
}