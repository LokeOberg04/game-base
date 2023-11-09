import Pickup from './Pickup'
import quad from './assets/sprites/quadDMG.png'

export default class Quad extends Pickup {
  constructor(game, x, y) {
    super(game)
    this.width = 64
    this.height = 64
    this.x = x
    this.y = y
    this.speed = 0
    this.lives = 1
    this.color = '#ff00ff'
    this.type = 'quad'

    const idleImage = new Image()
    idleImage.src = quad
    this.image = idleImage
  }
}
