import Enemy from './Enemy.js'
import enemy from './assets/sprites/snigel.png'

export default class Pumpkin extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = .5
    this.lives = 1
    this.color = 'orange'
    this.type = 'pumpkin'
    const idleImage = new Image()
    idleImage.src = enemy
    this.image = idleImage
  }

  update(player) {
    const dx = player.x - this.x // calculate the x distance to the player
    const dy = player.y - this.y // calculate the y distance to the player
    const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
    const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
    const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
    this.x += speedX // move the enemy towards the player on the x axis
    this.y += speedY // move the enemy towards the player on the y axis
  }
}
