//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染
import {Resources} from "./Resources.js";

export class ResourceLoader{
  constructor(){
    //Map本质是键值对的集合，hash结构。将Resources结构直接塞到map中，
    this.map = new Map(Resources);
   //0 console.log(this.map);

   //var 是全局的变量声明，let是局部的===map的语法，如何遍历它
   //把map里面的value给替换掉，原来value里面存的是相对路径，现在存的是图片实例本身（已经加载图片资源的图片本身）
   for(let[key,value] of this.map)
   {
     //00 console.log(value);
     const image = wx.createImage();//wx.createImage 微信官方api 创建图片对象
    wx.createImage();
    image.src=value;
    this.map.set(key,image);
   }

  }


  //全部加载结束的方法
  onLoaded(callback){
    //确保加载完毕，做个变量
    let loadedCount=0;
    //000 let self=this;
    for(let value of this.map.values()){//去除map所有value的方法
     /*000 value.onload=function(){
       原先的函数写法
     }*/
      value.onload = () => {//ES6的箭头函数写法====关键
        loadedCount++;
        if(loadedCount>=this.map.size){ //000 如果是原先的函数写法，这里不能写this,this代表的东西不同
          callback(this.map);
        }
      }
    }
  }


  //用传统的简单工厂模式，创建一个静态工厂;static 不用new就可以访问，resource.create();直接访问
static create(){
  return new ResourceLoader();
}


}
