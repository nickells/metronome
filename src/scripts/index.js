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


window.scrollTo(0,1);

document.body.addEventListener('click', function init(){
  // document.documentElement.requestFullscreen()
  // document.documentElement.webkitRequestFullscreen()
  tick()
  document.body.removeEventListener('click', init)
})

updateBpm(60)
