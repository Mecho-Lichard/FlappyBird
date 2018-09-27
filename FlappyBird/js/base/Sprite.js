//精灵的基类。负责初始化精灵加载的资源和大小以及位置
import { DataStore } from "./DataStore.js";
export class Sprite{

  constructor(
    img = null,//要绘制的图片对象
    srcX = 0,//要剪裁的x坐标
    srcY = 0,//要剪裁的y坐标
    srcW = 0,//要剪裁的宽度
    srcH = 0,//要剪裁的高度
    x = 0, y = 0,//图片资源在canvas的摆放位置，图片的左上角作为顶点坐标
    width = 0, height = 0//剪裁玩之后要使用的宽度和高度
    ){
    //将值放在原生变量上面
    this.dataStore=DataStore.getInstance();
    this.ctx = this.dataStore.ctx;
    this.img = img;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    }

    


    //方便BackGround类上面获取到image等参数
  static getImage(key) {
    return DataStore.getInstance().res.get(key);
  }

  //为什么要这样写？如果draw()不传参数的话，那么就用constructor里面的东西；如果传参数，也方便复用。es6没有重载。。
    draw(img = this.img,
      srcX = this.srcX,
      srcY = this.srcY,
      srcW = this.srcW,
      srcH = this.srcH,
      x = this.x,
      y = this.y,
      width = this.width,
      height = this.height) {
      this.ctx.drawImage(
        img,
        srcX,
        srcY,
        srcW,
        srcH,
        x,
        y,
        width,
        height
      );
    }

}

