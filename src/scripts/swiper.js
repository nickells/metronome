let {$bpm, bpm, updateInterval} = require('./globals')
const { bpmToInterval } = require('./utils')
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