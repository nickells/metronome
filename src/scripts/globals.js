const { bpmToInterval, clamp } = require('./utils')

const $bpm = document.getElementsByClassName('bpm')[0]

let _bpm = 60
let _interval = bpmToInterval(_bpm)

const updateInterval = (newInterval) => _interval = newInterval

const getInterval = () => _interval

const getBpm = () => _bpm

const updateBpm = (newBpm) => {
  const adjustedBpm = clamp(8, 400, newBpm)
  $bpm.innerHTML = adjustedBpm
  _bpm = adjustedBpm
  updateInterval(bpmToInterval(adjustedBpm))
}

module.exports = {
  getBpm,
  updateBpm,
  getInterval
}