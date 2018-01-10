/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _compile = __webpack_require__(1);

var _compile2 = _interopRequireDefault(_compile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mvvm = function () {
  function mvvm(opts) {
    _classCallCheck(this, mvvm);

    this.init(opts);
    new _compile2.default(this);
  }

  _createClass(mvvm, [{
    key: 'init',
    value: function init(opts) {
      var _this = this;

      this.$el = document.querySelector(opts.el);
      this.$data = opts.data || {};
      this.$methods = opts.methods || {};

      //把$data 中的数据直接代理到当前 vm 对象

      var _loop = function _loop(key) {
        Object.defineProperty(_this, key, {
          enumerable: true,
          configurable: true,
          get: function get() {
            //这里用了箭头函数，所有里面的 this 就指代外面的 this 也就是 vm
            return _this.$data[key];
          },
          set: function set(newVal) {
            _this.$data[key] = newVal;
          }
        });
      };

      for (var key in this.$data) {
        _loop(key);
      }

      //让 this.$methods 里面的函数中的 this，都指向当前的 this，也就是 vm
      for (var key in this.$methods) {
        this.$methods[key] = this.$methods[key].bind(this);
      }
    }
  }]);

  return mvvm;
}();

if (window) {
  window.MVVM = mvvm;
}

exports.default = mvvm;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _observer = __webpack_require__(2);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compile = function () {
  function Compile(vm) {
    _classCallCheck(this, Compile);

    (0, _observer.observe)(vm.$data);
    this.vm = vm;
    this.node = vm.$el;
    this.compile();
  }

  _createClass(Compile, [{
    key: 'compile',
    value: function compile() {
      this.traverse(this.node);
    }
  }, {
    key: 'traverse',
    value: function traverse(node) {
      var _this = this;

      if (node.nodeType === 1) {
        this.compileNode(node); //解析节点上的v-bind 属性
        node.childNodes.forEach(function (childNode) {
          _this.traverse(childNode);
        });
      } else if (node.nodeType === 3) {
        //处理文本
        this.compileText(node);
      }
    }
  }, {
    key: 'compileText',
    value: function compileText(node) {
      var reg = /{{(.+?)}}/g;
      var match = void 0;
      console.log(node);
      while (match = reg.exec(node.nodeValue)) {
        var raw = match[0];
        var key = match[1].trim();
        node.nodeValue = node.nodeValue.replace(raw, this.vm[key]);
        new _observer.Observer(this.vm, key, function (val, oldVal) {
          node.nodeValue = node.nodeValue.replace(oldVal, val);
        });
      }
    }

    //处理指令

  }, {
    key: 'compileNode',
    value: function compileNode(node) {
      var _this2 = this;

      var attrs = [].concat(_toConsumableArray(node.attributes)); //类数组对象转换成数组，也可用其他方法
      attrs.forEach(function (attr) {
        //attr 是个对象，attr.name 是属性的名字如 v-model， attr.value 是对应的值，如 name
        if (_this2.isModelDirective(attr.name)) {
          _this2.bindModel(node, attr);
        } else if (_this2.isEventDirective(attr.name)) {
          _this2.bindEventHander(node, attr);
        }
      });
    }
  }, {
    key: 'bindModel',
    value: function bindModel(node, attr) {
      var _this3 = this;

      var key = attr.value; //attr.value === 'name'
      node.value = this.vm[key];
      new _observer.Observer(this.vm, key, function (newVal) {
        node.value = newVal;
      });
      node.oninput = function (e) {
        _this3.vm[key] = e.target.value; //因为是箭头函数，所以这里的 this 是 compile 对象
      };
    }
  }, {
    key: 'bindEventHander',
    value: function bindEventHander(node, attr) {
      //attr.name === 'v-on:click', attr.value === 'sayHi'
      var eventType = attr.name.substr(5); // click
      var methodName = attr.value;
      node.addEventListener(eventType, this.vm.$methods[methodName]);
    }

    //判断属性名是否是指令

  }, {
    key: 'isModelDirective',
    value: function isModelDirective(attrName) {
      return attrName === 'v-model';
    }
  }, {
    key: 'isEventDirective',
    value: function isEventDirective(attrName) {
      return attrName.indexOf('v-on') === 0;
    }
  }]);

  return Compile;
}();

exports.default = Compile;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observe = exports.Observer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _subject = __webpack_require__(3);

var _subject2 = _interopRequireDefault(_subject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var currentObserver = null;

function observe(data) {
  if (!data || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') return;

  var _loop = function _loop() {
    var val = data[key];
    var subject = new _subject2.default();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        console.log('get ' + key + ': ' + val);
        if (currentObserver) {
          console.log('has currentObserver');
          currentObserver.subscribeTo(subject);
        }
        return val;
      },
      set: function set(newVal) {
        val = newVal;
        console.log('start notify...');
        subject.notify();
      }
    });
    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      observe(val);
    }
  };

  for (var key in data) {
    _loop();
  }
}

var Observer = function () {
  function Observer(vm, key, cb) {
    _classCallCheck(this, Observer);

    this.subjects = {};
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    this.value = this.getValue();
  }

  _createClass(Observer, [{
    key: 'update',
    value: function update() {
      var oldVal = this.value;
      var value = this.getValue();
      if (value !== oldVal) {
        this.value = value;
        this.cb.bind(this.vm)(value, oldVal);
      }
    }
  }, {
    key: 'subscribeTo',
    value: function subscribeTo(subject) {
      if (!this.subjects[subject.id]) {
        console.log('subscribeTo.. ', subject);
        subject.addObserver(this);
        this.subjects[subject.id] = subject;
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      currentObserver = this;
      var value = this.vm[this.key]; //等同于 this.vm.$data[this.key]
      currentObserver = null;
      return value;
    }
  }]);

  return Observer;
}();

exports.Observer = Observer;
exports.observe = observe;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var id = 0;

var Subject = function () {
  function Subject() {
    _classCallCheck(this, Subject);

    this.id = id++;
    this.observers = [];
  }

  _createClass(Subject, [{
    key: "addObserver",
    value: function addObserver(observer) {
      this.observers.push(observer);
    }
  }, {
    key: "removeObserver",
    value: function removeObserver(observer) {
      var index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    }
  }, {
    key: "notify",
    value: function notify() {
      this.observers.forEach(function (observer) {
        observer.update();
      });
    }
  }]);

  return Subject;
}();

exports.default = Subject;

/***/ })
/******/ ]);