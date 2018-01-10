import { Observer, observe } from './observer.js';

class Compile {
  constructor(vm){
    
    observe(vm.$data)

    this.vm = vm
    this.node = vm.$el
    this.compile()
  }
  compile(){
    this.traverse(this.node)
  }
  traverse(node){
    if(node.nodeType === 1){
      this.compileNode(node)   //解析节点上的v-bind 属性
      node.childNodes.forEach(childNode=>{
        this.traverse(childNode)
      })
    }else if(node.nodeType === 3){ //处理文本
      this.compileText(node)
    }
  }
  compileText(node){
    let reg = /{{(.+?)}}/g
    let match
    console.log(node)
    while(match = reg.exec(node.nodeValue)){
      let raw = match[0]
      let key = match[1].trim()
      node.nodeValue = node.nodeValue.replace(raw, this.vm[key])
      new Observer(this.vm, key, function(val, oldVal){
        node.nodeValue = node.nodeValue.replace(oldVal, val)
      })
    }
  }

  //处理指令
  compileNode(node){
    let attrs = [...node.attributes] //类数组对象转换成数组，也可用其他方法
    attrs.forEach(attr=>{
      //attr 是个对象，attr.name 是属性的名字如 v-model， attr.value 是对应的值，如 name
      if(this.isModelDirective(attr.name)){
        this.bindModel(node, attr)
      }else if(this.isEventDirective(attr.name)){
        this.bindEventHander(node, attr)
      }
    })
  }
  bindModel(node, attr){
    let key = attr.value       //attr.value === 'name'
    node.value = this.vm[key]
    new Observer(this.vm, key, function(newVal){
      node.value = newVal
    })
    node.oninput = (e)=>{
      this.vm[key] = e.target.value  //因为是箭头函数，所以这里的 this 是 compile 对象
    }
  }
  bindEventHander(node, attr){       //attr.name === 'v-on:click', attr.value === 'sayHi'
    let eventType = attr.name.substr(5)       // click
    let methodName = attr.value
    node.addEventListener(eventType, this.vm.$methods[methodName])
  }

  //判断属性名是否是指令
  isModelDirective(attrName){
     return attrName === 'v-model'
  }

  isEventDirective(attrName){
    return attrName.indexOf('v-on') === 0
  }

}
export default Compile;
