//初始化整个游戏的精灵，作为游戏开始的入口
//0 import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { BackGround } from "./js/runtime/BackGround.js";
import { DataStore } from "./js/base/DataStore.js";
import { Director } from "./js/Director.js";
import { Land } from "./js/runtime/Land.js";
import { Birds } from "./js/player/Birds.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";

export class Main{
  constructor(){

    console.log("fuck you");
   //0 new ResourceLoader();



   //资源加载器resourceLoader怎么使用 用this方便后续调用，那么都能使用了
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance(); 
  const loader=ResourceLoader.create();//得益于 ResourceLoader的简单工厂模式能这样调用
  loader.onLoaded(map => this.onResourceFirstLoaded(map));//通过箭头函数将onResourceFirstLoadedf方法传进来



/*
  //canvas的drawImage 负责把位图资源进行剪裁缩放，然后放到画面上
  let image = wx.createImage();
  image.src='./res/background.png';//加载位图资源

  //图片的加载完成才能渲染
  image.onload=()=>{
    this.ctx.drawImage(//几个参数
      image,//渲染对象
      0,//X轴剪裁起始位置，赋值为0，会从左上角开始剪裁，一直往右移动
      0,//y轴剪裁起始位置，赋值为0，会从左上角开始剪裁，一直往下移动=====也就是说x,y都为一半的话，那么会得到右下角(1/4的原图片)
      image.width,//被剪裁的图片的宽度
      image.height,//...
      0,//放置在画面的位置.左上角为顶点，；两个为0，那就是图形的左上角和canvas左上角完全重合了
      0,//...
      image.width,//使用的图片的大小
      image.height//...
    );

  }*/
 



  /*Director.getInstance();
  Director.getInstance();
  Director.getInstance();//多执行几次还是输出一个的，这就是单例模式的用法*/



/*
    //最最开始的测试代码xxx
    let canvas = wx.createCanvas();
    let context = canvas.getContext('2d')
    context.fillStyle = 'red'
    context.fillRect(0, 0, 100, 100);
    console.log("该手机屏幕大小为："+canvas.height,canvas.width);*/
  }

  //创建背景音乐
  createBackgroundMusic(){
    const bgm=wx.createInnerAudioContext();
    bgm.autoplay=false;//是否自动播放
    bgm.loop=true;//是否循环
    bgm.src=url;//地址 'audios/bgm.mp3'

  }



  //资源重新开始之后，不需要加载资源，只需加载一次====重要
  onResourceFirstLoaded(map){
    console.log(map);

    //dataStore 背景的初始化工作
    //ctx，res需要长期保存，放在类变量中,需要定时销毁的放在map中
    this.dataStore.canvas = this.canvas;
    this.dataStore.ctx=this.ctx;
    this.dataStore.res = map;

    this.init();
  }

  init(){
    
    //首先重置游戏是没有结束的
    this.director.isGameOver=false;

    this.dataStore.put('pencils',[])
                  .put('background',BackGround)
                  .put('land', Land)
                  .put('birds',Birds)
                  .put('score',Score)
                  .put('startButton',StartButton);

    this.registerEvent();

    //创建铅笔要在游戏运行之前         
    this.director.createPencil();
    this.director.run();
   /* //背景的初始化工作和渲染工作
    let background = new BackGround(this.ctx, map.get('background'));
    background.draw();
    */
  }

  //注册事件
  registerEvent(){
     /*//在html中代码是这样写的，在微信里代码是调用底下的方法 
     this.canvas.addEventListener('touchstart',e=>{
        //屏蔽掉js的事件冒泡
        e.preventDefault();
        //console.log('触摸了');
        //console.log(this);
        if(this.director.isGameOver){
            console.log('游戏开始');
            this.init();
        }
        else{
          this.director.birdsEvent();
        }
      });*/
     wx.onTouchStart(() => {
       if (this.director.isGameOver) {
         console.log('游戏开始');
         this.init();
       } else {
         this.director.birdsEvent();
       }
     });
  }

}