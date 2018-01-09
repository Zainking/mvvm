var Observer = function (name, age) {
  this.name = name;
  this.age = age;
}
Observer.prototype.sayName = function () {
  console.log(this.name)
}
export default Observer;
