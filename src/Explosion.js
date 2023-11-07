import explosion from './assets/sprites/explosion.png'

export default class Explosion {
  constructor(game, x, y, angle) {
    this.game = game
    this.width = 50
    this.height = 50
    this.x = x
    this.y = y
    this.angle = angle

    this.speed = 0
    this.damage = 10
    this.markedForDeletion = false
    this.type = 'explosion'
    this.maxLife = 100
    this.life = 0

    const idleImage = new Image()
    idleImage.src = explosion
    this.frameX = 0
    // sprite animation
    this.frameX = 0
    this.maxFrame = 0
    this.animationFps = 20
    this.animationTimer = 0
    this.animationInterval = 1000 / this.animationFps
    this.idle = {
      image: idleImage,
      frames: 11,
    }
    this.image = this.idle.image

  }

  update(deltaTime) {
    this.maxFrame = this.idle.frames
    this.image = this.idle.image
    if (this.animationTimer > this.animationInterval) {
      this.frameX++
      this.animationTimer = 0
    } else {
      this.animationTimer += deltaTime
    }

    // reset frameX when it reaches maxFrame
    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }
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
    context.drawImage(
      this.image,
      this.frameX * this.width + 20,
      20,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.fillStyle = '#f00'
    // context.fillRect(0, 0, this.width, this.height)
    context.restore()
  }
}
