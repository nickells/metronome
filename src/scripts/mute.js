const $toggle = document.getElementsByClassName('mute')[0]

let _isMuted = false

$toggle.addEventListener('click', () => {
  _isMuted = !_isMuted
})


module.exports = {
  getMutedStatus: () => _isMuted
}