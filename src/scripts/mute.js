const $toggle = document.getElementsByClassName('mute')[0]

let _isMuted = false

$toggle.addEventListener('click', () => {
  _isMuted = !_isMuted
  $toggle.querySelector('span').innerHTML = _isMuted ? 'UNMUTE' : 'MUTE'
})


module.exports = {
  getMutedStatus: () => _isMuted
}