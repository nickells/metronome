const { getBpm, updateBpm } = require('./globals')

const [ $minus, $plus ] = document.querySelectorAll('.inc-dec div')

const add = () => {
  updateBpm(getBpm() + 2)
}

const subtract = (e) => {
  updateBpm(getBpm() - 2)
}

$minus.addEventListener('click', subtract)
// $minus.addEventListener('touchend', subtract)

$plus.addEventListener('click', add)
// $plus.addEventListener('touchend', add)

console.log($minus, $plus)