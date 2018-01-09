import Observer from './mvvm/observer.js';
import Watcher from './mvvm/watcher.js';
import Compile from './mvvm/compile.js';

let MVVM = 'hello';

if (window) {
  window.MVVM = MVVM;
}

export default MVVM;
