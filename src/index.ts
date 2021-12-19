import Game from './Game'

import './css/style.scss'

const gameConfig = {
  resizeTo: window,
  backgroundColor: 0xF5842D
}

const gameApp: Game = new Game(gameConfig)