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

const { updateBpm, getInterval } = require('./globals')

const $sound = new Audio('perc-808.wav')

updateBpm(60)

function tick(){
  $sound.play()
  setTimeout(tick, getInterval())
}

tick()