var Compile = function (name, age) {
  this.name = name;
  this.age = age;
}
Compile.prototype.sayName = function () {
  console.log(this.name)
}
export default Compile;
