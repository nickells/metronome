const { bpmToInterval, clamp } = require('./utils')
const { getMutedStatus } = require('./mute')
const { getCurrentSound } = require('./sounds')

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
  if (!getMutedStatus()) {
    getCurrentSound().play()
  }
  setTimeout(tick, getInterval())
}

module.exports = {
  getBpm,
  updateBpm,
  getInterval,
  tick
}