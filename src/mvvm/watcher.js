var Watcher = function (name, age) {
  this.name = name;
  this.age = age;
}
Watcher.prototype.sayName = function () {
  console.log(this.name)
}
export default Watcher;
