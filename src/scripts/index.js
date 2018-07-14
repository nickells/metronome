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

// require index.html so livereload will watch it
const index = require('../../index.html') // eslint-disable-line no-unused-vars

const $bpm = document.getElementsByClassName('bpm')[0]

const bpmToInterval = (bpm) => {
 const seconds = 60 / bpm
 return seconds * 1000 
}

const $sound = new Audio('perc-808.wav')


let isMouseDown = false
let originalPosition = [0, 0]
let newPosition = [0, 0]
let bpm = 60
let interval = bpmToInterval(bpm)

$bpm.innerHTML = bpm

function tick(){
  $sound.play()
  setTimeout(tick, interval)
}
tick()


// keep track of values for "wheel" functionality
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
    interval = bpmToInterval(bpm)
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