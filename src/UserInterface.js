import enemy from './assets/sprites/enemy.png'
import ammoIMG from './assets/sprites/Ammobox.png'
import quadIMG from './assets/sprites/quadDMG.png'

export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.color = 'white'

    const idleImage = new Image()
    idleImage.src = enemy
    this.image = idleImage


    const ammoImage = new Image()
    ammoImage.src = ammoIMG
    this.ammoBox = ammoImage

    const quadImage = new Image()
    quadImage.src = quadIMG
    this.quadBox = quadImage
  }

  ammoPickup(message) {
    context.fillStyle = "#00ff00"
    context.fillText(message, this.game.width / 2 - 120, this.game.height / 3 - 20)
    context.fillStyle = this.color
  }

  draw(context) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'

    context.textAlign = 'left'
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillText(`Lives: ${this.game.player.lives}`, 20, 30)
    context.fillText(`Ammo: ${this.game.player.displayAmmo}`, 20, 60)
    context.fillText(`Round: ${this.game.round}`, 20, 90)
    context.fillText(`Time: ${(this.game.gameTime * 0.001).toFixed(1)}`, 20, 120)
    if (this.game.quadTimer > this.game.gameTime) {
      context.fillStyle = "#ff00ff"
      context.fillText(`QUAD DMG: ${((this.game.quadTimer - this.game.gameTime) * 0.001).toFixed(0)}`, this.game.width / 2 - 120, this.game.height / 3)
      context.fillStyle = this.color
    }

    if (this.game.ammoMsgTimer > this.game.gameTime) {
      context.fillStyle = "#00ff00"
      context.fillText(this.game.popupMsg, this.game.width / 2 - 120, this.game.height / 3 - 20)
      context.fillStyle = this.color
    }

    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Game over',
        this.game.width / 2,
        this.game.height / 2 - 20
      )
    }

    if (!this.game.start) {
      context.fillStyle = "#555"
      context.fillRect(this.game.width / 5 - 50, this.game.height / 8 - 60, 1200, 700)
      context.fillStyle = "#fff"
      context.textAlign = 'left'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Hello, welcome to quake but 2d and shit :з',
        this.game.width / 5,
        this.game.height / 3 - 150
      ),
        context.fillText(
          'Use WASD to move',
          this.game.width / 5,
          this.game.height / 3 - 100
        ),
        //   context.fillStyle = "green"
        // context.fillRect(this.game.width / 2 - 30, this.game.height / 8 + 85, 32, 32)
        context.fillStyle = "#fff"
      context.fillText(
        'This is an enemy ➜',
        this.game.width / 5,
        this.game.height / 3 + -50
      ),
        context.drawImage(
          this.image,
          this.game.width / 2 - 30,
          this.game.height / 8 + 85,
          32,
          32,
        ),
        context.fillText(
          'Shoot enemies with left mouse button',
          this.game.width / 5,
          this.game.height / 3
        ),
        context.fillText(
          'Change weapon with [1]-[5]',
          this.game.width / 5,
          this.game.height / 3 + 50
        ),
        context.fillStyle = "#f00"
      // context.fillRect(this.game.width / 2 - 20, this.game.height / 3 + 2 + 115, 32, 32)
      context.fillStyle = "#fff"
      context.fillText(
        'This lil fella is you ➜',
        this.game.width / 5,
        this.game.height / 3 + 150
      ),
        //   context.fillStyle = "#f0f"
        // context.fillRect(this.game.width / 2 + 50, this.game.height / 3 + 2 + 165, 32, 32)
        context.drawImage(
          this.quadBox,
          this.game.width / 2 + 50,
          this.game.height / 3 + 167,
          32,
          32,
        ),
        context.fillStyle = "#fff"
      context.fillText(
        'This is quad damage ➜    walk over it to pick it up',
        this.game.width / 5,
        this.game.height / 3 + 200
      ),
        //   context.fillStyle = "#0f0"
        // context.fillRect(this.game.width / 2 + 50, this.game.height / 3 + 67, 32, 32)
        context.drawImage(
          this.ammoBox,
          this.game.width / 2 + 50,
          this.game.height / 3 + 67,
          32,
          32,
        ),
        context.fillStyle = "#fff"
      context.fillText(
        'This is an ammo box ➜    walk over it to pick it up',
        this.game.width / 5,
        this.game.height / 3 + 100
      ),
        context.fillText(
          'Press p to start',
          this.game.width / 5,
          this.game.height / 3 + 400
        ),
        context.fillText(
          'PS. watch out for the snail c:',
          this.game.width / 5,
          this.game.height / 3 + 250
        )
    }

    // debug
    if (this.game.debug) {
      context.font = `15px Arial`
      context.textAlign = 'right'
      context.fillText(`x: ${this.game.player.x}`, this.game.width - 20, 25)
      context.fillText(`y: ${this.game.player.y}`, this.game.width - 20, 50)
      context.fillText(
        `mouseX: ${this.game.input.mouseX}`,
        this.game.width - 20,
        75
      )
      context.fillText(
        `mouseY: ${this.game.input.mouseY}`,
        this.game.width - 20,
        100
      )
      context.fillText(
        `maxSpeed: ${this.game.player.maxSpeed}`,
        this.game.width - 20,
        125
      )
      context.fillText(`keys: ${this.game.keys}`, this.game.width - 20, 150)
    }

    context.restore()
  }
}
