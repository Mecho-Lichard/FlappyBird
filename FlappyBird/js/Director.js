//导演类，控制游戏的逻辑 单例，一个剧场只需要一个导演
import { DataStore } from "./base/DataStore.js";
import { UpPencil } from "./runtime/UpPencil.js";
import { DownPencil } from "./runtime/DownPencil.js";

export class Director{

  static getInstance() {
    if (!Director.instance) {//直接判断变量本身
      Director.instance = new Director();
    }
    return Director.instance;
  }

  
  constructor(){
    console.log("构造器初始化");
    this.dataStore = DataStore.getInstance();
    //铅笔移动速度和land移动速度一样，不妨在Director里面初始化
    this.moveSpeed=2;
  }


  //不断重复的铅笔怎么做？
  createPencil() {
    //确定铅笔随机高度，屏幕高度的1/8和屏幕高度的1/2 分别作为铅笔的最低高度和最高高度
    const minTop = DataStore.getInstance().canvas.height/8;
    const maxTop = DataStore.getInstance().canvas.height/2;
    const top = minTop + Math.random() * (maxTop - minTop);

    this.dataStore.get('pencils').push(new UpPencil(top));
    this.dataStore.get('pencils').push(new DownPencil(top));
  }


  //小鸟的语法
  birdsEvent(){
    for(let i=0;i<=2;i++){
      this.dataStore.get('birds').y[i]=
          this.dataStore.get('birds').birdsY[i];
    }
    //时间置0.重新开始自由落体运动
    this.dataStore.get('birds').time=0;
  }

    //判断小鸟是否和铅笔撞击的方法
    static isStrike(bird,pencil){
      let s=false;
      //小鸟撞击等四种撞击
      if(bird.top>pencil.bottom||
          bird.bottom<pencil.top||
           bird.right<pencil.left||
             bird.left>pencil.right){
      s=true;
      }
      return !s;

    }


  //判断小鸟是否撞击地板和铅笔
  check(){
    const birds = this.dataStore.get('birds');
    const land = this.dataStore.get('land');
    const pencils=this.dataStore.get('pencils');
    const score=this.dataStore.get('score');

    //地板的撞击判断
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      console.log('撞击地板啦');
      this.isGameOver=true;
    }
    
    //小鸟的边框模型
    const birdsBorder={
        top:birds.y[0],
        bottom:birds.birdsY[0]+birds.birdsHeight[0],
        left:birds.birdsX[0],
        right: birds.birdsX[0] + birds.birdsWidth[0]
    };
    //铅笔的模型pencilBorder
    const length = pencils.length;
    for(let i=0;i<length;i++){
        const pencil=pencils[i];
        const pencilBorder={
          top:pencil.y,
          bottom:pencil.y+pencil.height,
          left:pencil.x,
          right:pencil.x+pencil.width
        };

        //判断小鸟与 铅笔是否碰撞
        if (Director.isStrike(birdsBorder, pencilBorder)){
            console.log('撞到铅笔了');
            this.isGameOver = true;
            return;
        }
    }
    
    //加分逻辑
      if(birds.birdsX[0]>pencils[0].x+pencils[0].width && score.isScore){
        wx.vibrateShort({
          success:function(){
            console.log('震动成功');
          }
        });
        score.isScore=false;
        score.scoreNumber++;
      }


  }


   run(){
    this.check();
    if(!this.isGameOver){

     this.dataStore.get('background').draw();

    //铅笔绘制之前将铅笔数组取出来,铅笔的宽度+铅笔的左侧x坐标<=0,代表铅笔刚出左边界；两组铅笔正好就是四只（=======销毁越界铅笔）
    //shift()是将数组的第一个元素推出数组，并将数组个数-1
    const pencils=this.dataStore.get('pencils');
    if(pencils[0].x+pencils[0].width<=0&&
    pencils.length==4){
      pencils.shift();
      pencils.shift();
      //重新加分
      this.dataStore.get('score').isScore=true;
    }
    
    //当屏幕只有两根铅笔的时候，（======增加两组铅笔）
    if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 &&
      pencils.length === 2) {
      this.createPencil();
    }

    //铅笔放在地板之上初始化
     this.dataStore.get('pencils').forEach(function (value) {
       value.draw();
     });

     this.dataStore.get('land').draw();
     this.dataStore.get('score').draw();
     this.dataStore.get('birds').draw();
     
    
     
     //使陆地land动起来的方法，箭头函数使this永远指向的是对外的run，而不是内部的run
     let timer=requestAnimationFrame(()=>this.run());
      //给requestAnimationFrame赋一个值，使得在游戏结束的时候能终止掉它
      this.dataStore.put('timer',timer);
      //游戏即将结束的时候调用这个方法，结束游戏
     // cancelAnimationFrame(this.dataStore.get('timer'));
    }else {
      console.log('游戏结束');
      //director在这里绘制button按钮
       this.dataStore.get('startButton').draw();
       cancelAnimationFrame(this.dataStore.get('timer'));
       this.dataStore.destroy();

       //触发微信小游戏垃圾回收
       wx.triggerGC();

    }
  }

  
}