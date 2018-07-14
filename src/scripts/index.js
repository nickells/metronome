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

require('./swiper')
const { $bpm, bpm, getInterval } = require('./globals')

// require index.html so livereload will watch it
const index = require('../../index.html') // eslint-disable-line no-unused-vars

const $sound = new Audio('perc-808.wav')

$bpm.innerHTML = bpm

function tick(){
  console.log(getInterval())
  $sound.play()
  setTimeout(tick, getInterval())
}
tick()