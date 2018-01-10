import Compile from './mvvm/compile.js';

class mvvm {
  constructor(opts) {
    this.init(opts)
    new Compile(this)
  }
  init(opts){
    this.$el = document.querySelector(opts.el)
    this.$data = opts.data || {}
    this.$methods = opts.methods || {}

    //把$data 中的数据直接代理到当前 vm 对象
    for(let key in this.$data) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: ()=> {  //这里用了箭头函数，所有里面的 this 就指代外面的 this 也就是 vm
          return this.$data[key]
        },
        set: newVal=> {
          this.$data[key] = newVal
        }
      })
    }

    //让 this.$methods 里面的函数中的 this，都指向当前的 this，也就是 vm
    for(let key in this.$methods) {
      this.$methods[key] = this.$methods[key].bind(this)
    }
  }

}

if (window) {
  window.MVVM = mvvm;
}

export default mvvm;
