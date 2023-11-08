import Projectile from './Projectile.js'
import RailGun from './RailGun.js'
import RocketLauncher from './RocketLauncher.js'
import LightningGun from './LightningGun.js'
import Shotgun from './Shotgun.js'
import Click from './Click.js'
import explosion from './assets/sprites/alexandro.png'


export default class Player {
  constructor(game) {
    this.game = game
    this.width = 32
    this.height = 32
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    this.projectiles = []

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6

    this.maxAmmo = 2000
    this.ammo = 10
    this.ammoTimer = 1
    this.ammoInterval = 500
    this.shotgunAmmo = 12
    this.railGunAmmo = 13
    this.rocketLauncherAmmo = 14
    this.LGAmmo = 400
    this.displayAmmo = 0

    this.currentWeapon = 1
    this.lives = 3
    this.damage = 1

    const idleImage = new Image()
    idleImage.src = explosion
    this.image = idleImage
  }

  update(deltaTime) {
    if (this.currentWeapon == 1) {
      this.displayAmmo = this.ammo
    } else if (this.currentWeapon == 2) {
      this.displayAmmo = this.shotgunAmmo
    } else if (this.currentWeapon == 3) {
      this.displayAmmo = this.railGunAmmo
    } else if (this.currentWeapon == 4) {
      this.displayAmmo = this.rocketLauncherAmmo
    } else if (this.currentWeapon == 5) {
      this.displayAmmo = this.LGAmmo
    }
    if (this.lives <= 0) {
      this.game.gameOver = true
    }

    if (this.game.keys.includes('mousedown')) {
      this.game.player.shoot(this.mouseX, this.mouseY)
    }

    if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a')) {
      this.speedX = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowRight') ||
      this.game.keys.includes('d')
    ) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('w')) {
      this.speedY = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowDown') ||
      this.game.keys.includes('s')
    ) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    if (this.y + this.speedY < this.game.height - 26 && this.y + this.speedY > -6) {
      this.y += this.speedY
    }
    if (this.x + this.speedX < this.game.width - 26 && this.x + this.speedX > -6) {
      this.x += this.speedX
    }

    if (this.ammoTimer > this.ammoInterval && this.ammo < this.maxAmmo) {
      this.ammoTimer = 0
      this.ammo++
    } else {
      this.ammoTimer += deltaTime
    }

    // projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime)
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )
  }

  draw(context) {
    context.fillStyle = '#f00'
    context.fillRect(this.x, this.y, this.width, this.height)
    context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    )

    if (this.game.debug) {
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const dx = this.game.input.mouseX - (this.x + this.width / 2)
      const dy = this.game.input.mouseY - (this.y + this.height / 2)
      const maxLength = 60
      const angle = Math.atan2(dy, dx)
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }

    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })
  }

  click(mouseX, mouseY) {
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    this.projectiles.push(
      new Click(
        this.game,
        mouseX,
        mouseY,
        0
      )
    )
  }


  shoot(mouseX, mouseY) {
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )
    if (this.currentWeapon == 1) {
      if (this.ammo > 0) {
        this.ammo--
        this.projectiles.push(
          new Projectile(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            angle
          )
        )
      } else {
        console.log('out of ammo')
      }
    } else if (this.currentWeapon == 2) {
      if (this.shotgunAmmo > 0) {
        this.shotgunAmmo--
        this.projectiles.push(
          new Shotgun(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            angle - .15
          ),
          new Shotgun(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            angle
          ),
          new Shotgun(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            angle + .15
          )
        )
      } else {
        console.log('out of ammo')
      }
    } else if (this.currentWeapon == 3) {
      if (this.railGunAmmo > 0) {
        this.railGunAmmo--
        this.projectiles.push(
          new RailGun(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            angle
          )
        )
      } else {
        console.log('out of ammo')
      }
    } else if (this.currentWeapon == 4) {
      if (this.rocketLauncherAmmo > 0) {
        this.rocketLauncherAmmo--
        this.projectiles.push(
          new RocketLauncher(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            angle
          ),
          new Click(
            this.game,
            mouseX,
            mouseY,
            0
          )
        )
      } else {
        console.log('out of ammo')
      }
    } else if (this.currentWeapon == 5) {
      if (this.LGAmmo > 0) {
        this.LGAmmo--
        this.projectiles.push(
          new LightningGun(
            this.game,
            this.x + this.width / 2,
            this.y + this.height / 2,
            angle
          ),
          new Click(
            this.game,
            mouseX,
            mouseY,
            0
          )
        )
      } else {
        console.log('out of ammo')
      }
    }
  }
}
