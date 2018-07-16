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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const { bpmToInterval, clamp } = __webpack_require__(1)

const $bpm = document.getElementsByClassName('bpm')[0]
const $sound = new Audio('perc-808.wav')

let _bpm = 60
let _interval = bpmToInterval(_bpm)

const updateInterval = (newInterval) => _interval = newInterval

const getInterval = () => _interval

const getBpm = () => _bpm


const updateBpm = (newBpm) => {
  _bpm = clamp(30, 400, newBpm)
  $bpm.innerHTML = _bpm
  updateInterval(bpmToInterval(_bpm))
}


function tick(){
  $sound.play()
  setTimeout(tick, getInterval())
}

module.exports = {
  getBpm,
  updateBpm,
  getInterval,
  tick
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const bpmToInterval = (bpm) => {
 const seconds = 60 / bpm
 return seconds * 1000 
}
/* harmony export (immutable) */ __webpack_exports__["bpmToInterval"] = bpmToInterval;


const getEventFromTouchOrMouse = (event) => event.touches ? event.touches[event.touches.length - 1] : event

const normalizeEventListener = (func) => {
  return function eventHandler(event) {
    return func(getEventFromTouchOrMouse(event))
  }
}
/* harmony export (immutable) */ __webpack_exports__["normalizeEventListener"] = normalizeEventListener;


const clamp = (min, max, value) => Math.min(Math.max(min, value), max)
/* harmony export (immutable) */ __webpack_exports__["clamp"] = clamp;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const { getBpm, updateBpm } = __webpack_require__(0)
const { normalizeEventListener } = __webpack_require__(1)

const $bpm = document.getElementsByClassName('bpm')[0]


// keep track of values for "wheel" functionality
let isMouseDown = false
let originalPosition = [0, 0]
let newPosition = [0, 0]
let lastTick = 0
let startBpm = getBpm()

const downListener = normalizeEventListener((event) => {
  isMouseDown = true
  originalPosition = [event.clientX, event.clientY]
})

const upListener = normalizeEventListener((event) => {
  isMouseDown = false
  startBpm = getBpm()
})

const moveListener = normalizeEventListener((event) => {
  if (!isMouseDown) return
  const [originalX, originalY] = originalPosition
  const diff = event.clientX - originalX
  // Only perform an operation if you have moved 10 pixels
  const ticks = Math.floor(diff / 10)
  if (ticks !== lastTick) {
    updateBpm(startBpm + (ticks * 2))
    lastTick = ticks
  }
})

$bpm.addEventListener('touchstart', downListener)
$bpm.addEventListener('mousedown', downListener)

$bpm.addEventListener('touchend', upListener)
$bpm.addEventListener('mouseup', upListener)

$bpm.addEventListener('touchmove', moveListener)
$bpm.addEventListener('mousemove', moveListener)


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
 todo:
 tap tempo
 emphasis chooser
 sound pick
 type or drag
 metronome.com/50
 inc/dec
*/


__webpack_require__(2)
__webpack_require__(4)

const { updateBpm, tick } = __webpack_require__(0)


window.scrollTo(0,1);

document.body.addEventListener('click', function init(){
  // document.documentElement.requestFullscreen()
  // document.documentElement.webkitRequestFullscreen()
  tick()
  document.body.removeEventListener('click', init)
})

updateBpm(60)


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const { getBpm, updateBpm } = __webpack_require__(0)

const [ $minus, $plus ] = document.querySelectorAll('.inc-dec div')

const add = () => {
  updateBpm(getBpm() + 2)
}

const subtract = (e) => {
  updateBpm(getBpm() - 2)
}

$minus.addEventListener('click', subtract)
// $minus.addEventListener('touchend', subtract)

$plus.addEventListener('click', add)
// $plus.addEventListener('touchend', add)

console.log($minus, $plus)

/***/ })
/******/ ]);