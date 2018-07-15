/*
 todo:
 tap tempo
 emphasis chooser
 sound pick
 type or drag
 metronome.com/50
 inc/dec
*/

require('./swiper')
require('./inc-dec')

const { updateBpm, tick } = require('./globals')

updateBpm(60)

tick()