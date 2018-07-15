const { getBpm, updateBpm } = require('./globals')
const { normalizeEventListener } = require('./utils')

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
