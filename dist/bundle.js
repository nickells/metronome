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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html>\n<head>\n  <title>Metronome</title>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"styles.css\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n<body>\n  <script defer type=\"text/javascript\" src=\"dist/bundle.js\"></script>\n  <div class=\"bpm\">60\n  </div>\n  <script>\n  // analytics\n  </script>\n\n</body>\n</html>"

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
 todo:
 touch capable
 tap tempo
 emphasis chooser
 sound pick
 type or drag
 metronome.com/50
 inc/dec
*/

__webpack_require__(4)
const { $bpm, bpm, getInterval } = __webpack_require__(2)

// require index.html so livereload will watch it
const index = __webpack_require__(0) // eslint-disable-line no-unused-vars

const $sound = new Audio('perc-808.wav')

$bpm.innerHTML = bpm

function tick(){
  console.log(getInterval())
  $sound.play()
  setTimeout(tick, getInterval())
}
tick()

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const { bpmToInterval } = __webpack_require__(3)

const $bpm = document.getElementsByClassName('bpm')[0]
let bpm = 60
let interval = bpmToInterval(bpm)

const updateInterval = (newInterval) => interval = newInterval
const getInterval = () => interval

module.exports = {
  $bpm,
  bpm,
  updateInterval,
  getInterval
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const bpmToInterval = (bpm) => {
 const seconds = 60 / bpm
 return seconds * 1000 
}
/* harmony export (immutable) */ __webpack_exports__["bpmToInterval"] = bpmToInterval;




/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

let {$bpm, bpm, updateInterval} = __webpack_require__(2)
const { bpmToInterval } = __webpack_require__(3)
// keep track of values for "wheel" functionality
let isMouseDown = false
let originalPosition = [0, 0]
let newPosition = [0, 0]
let lastTick = 0
let startBpm = bpm

const getEventFromTouchOrMouse = (event) => event.touches ? event.touches[event.touches.length - 1] : event

const normalizeEventListener = (func) => {
  return function eventHandler(event) {
    return func(getEventFromTouchOrMouse(event))
  }
}

const downListener = normalizeEventListener((event) => {
  isMouseDown = true
  originalPosition = [event.clientX, event.clientY]
})

const upListener = normalizeEventListener((event) => {
  isMouseDown = false
  startBpm = bpm
})

const moveListener = normalizeEventListener((event) => {
  if (!isMouseDown) return
  const [originalX, originalY] = originalPosition
  const diff = event.clientX - originalX
  // Only perform an operation if you have moved 10 pixels
  const ticks = Math.floor(diff / 10)
  if (ticks !== lastTick) {
    bpm = startBpm + (ticks * 2)
    updateInterval(bpmToInterval(bpm))
    $bpm.innerHTML = bpm
    lastTick = ticks
  }
})

document.body.addEventListener('touchstart', downListener)
document.body.addEventListener('mousedown', downListener)
document.body.addEventListener('touchend', upListener)
document.body.addEventListener('mouseup', upListener)
document.body.addEventListener('touchmove', moveListener)
document.body.addEventListener('mousemove', moveListener)

/***/ })
/******/ ]);