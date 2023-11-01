import Pickup from './Pickup'

export default class Quad extends Pickup {
  constructor(game, x, y) {
    super(game)
    this.width = 16
    this.height = 16
    this.x = x
    this.y = y
    this.speed = 0
    this.lives = 1
    this.color = '#ff00ff'
    this.type = 'quad'
  }
}
