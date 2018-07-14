const { bpmToInterval } = require('./utils')

const $bpm = document.getElementsByClassName('bpm')[0]
let bpm = 60
let interval = bpmToInterval(bpm)

const updateInterval = (newInterval) => interval = newInterval
const getInterval = () => interval

module.exports = {
  $bpm,
  bpm,
  updateInterval,
  getInterval
}