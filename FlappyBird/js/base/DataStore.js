//变量缓存器，方便我们在不同的类中访问和修改变量

export class DataStore{

//单例模式
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

//存储变量的容器
  constructor() {
    this.map = new Map();
  }

//链式方式去操作
  put(key, value) {
    //传进来是一个function
    if (typeof value === 'function') {
      value = new value();
    }
    this.map.set(key, value);
    return this;
  }

  get(key){
    return this.map.get(key);
  }

  //当游戏结束的时候，将原有的东西销毁
  destroy() {
    for (let value of this.map.values()) {
      value = null;
    }
  }

}
