/*
 todo:
 touch capable
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

const increase = () => {
  bpm++
  interval = bpmToInterval(bpm)
  $bpm.innerHTML = bpm
}
const decrease = () => {
  bpm--
  interval = bpmToInterval(bpm)
  $bpm.innerHTML = bpm
}

document.body.addEventListener('mousedown', (event) => {
  isMouseDown = true
  originalPosition = [event.clientX, event.clientY]
})

document.body.addEventListener('mouseup', (event) => {
  isMouseDown = false
})

document.body.addEventListener('mousemove', (event) => {
  if (!isMouseDown) return
  const [originalX, originalY] = originalPosition
  if (event.clientX > originalX) {
    increase()
  }
  else decrease()
})