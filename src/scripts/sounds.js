const sounds = {
  woodblock: new Audio('perc-808.wav'),
  hihat: new Audio('hihat-acoustic01.wav')
}
  
const $sounds = document.querySelectorAll('.sound div')

let _currentSound = sounds.woodblock

$sounds.forEach($sound => {
  $sound.addEventListener('click', (e) => {
    _currentSound = sounds[e.target.innerHTML.toLowerCase()]
  })
})

module.exports = {
  getCurrentSound: () => _currentSound
}