export default class RailGun {
  constructor(game, x, y, angle) {
    this.game = game
    this.width = 10000
    this.height = 4
    this.x = x
    this.y = y
    this.angle = angle

    this.speed = 0
    this.damage = 5
    this.markedForDeletion = false
    this.type = 'railGun'
    this.life = 0
    this.maxLife = 20
  }

  update(deltaTime) {
    const velocity = {
      x: this.speed * Math.cos(this.angle),
      y: this.speed * Math.sin(this.angle),
    }

    this.x += velocity.x * (deltaTime / 1000)
    this.y += velocity.y * (deltaTime / 1000)

    if (this.x > this.game.width) {
      this.markedForDeletion = true
    }
  }

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.fillStyle = '#0f0'
    context.fillRect(0, 0, this.width, this.height)
    context.restore()
  }
}
