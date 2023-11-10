import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Wall from './Wall.js'
import creep from './creep.js'
import Quad from './Quad.js'
import Weapon from './Weapon.js'
import Static from './Static.js'
import quakeMap from './assets/sprites/quakeMap.jpg'
import Explosion from './Explosion.js'
export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.gameTime = 0
    this.enemies = []
    this.pickups = []
    this.enemyTimer = 0
    this.enemyInterval = 2000
    this.wallInterval = 2000
    this.wallTimer = 0
    this.staticInterval = 10000
    this.staticTimer = 0
    this.round = 1
    this.oldRound = 1
    this.quadTimer = 0
    this.ammoMsgTimer = 0
    this.mb1 = 0
    this.defaultFireRate = 10
    this.defaultTimer = 0
    this.popupMsg = "Hi"
    this.start = false

    const idleImage = new Image()
    idleImage.src = quakeMap
    this.background = idleImage

    this.enemies.push(new Pumpkin(this, 0, 0))
    this.player = new Player(this)
  }

  update(deltaTime) {
    if (this.gameOver || !this.start) {
      return
    }

    if (!this.gameOver) {
      this.gameTime += deltaTime
      this.round = 1 + Math.round((this.gameTime / 1000) / 10)
      if (this.oldRound != this.round) {
        this.staticInterval = 10000 / Math.pow(1.25, this.round)
        this.enemyInterval = 2000 / Math.pow(1.25, this.round)
        this.oldRound = this.round
      }
    }

    if (this.mb1 == 1) {
      if (this.player.currentWeapon !== '5') {
        if (this.defaultTimer > this.defaultFireRate) {
          this.player.shoot(this.input.mouseX, this.input.mouseY)
          this.defaultTimer = 0
        } else {
          this.defaultTimer++
        }
      }
    }

    if (this.quadTimer > this.gameTime) {
      this.player.damage = 4
    } else {
      this.player.damage = 1
    }

    if (this.enemyTimer > this.enemyInterval) {
      let direction = Math.random() * 4
      let x;
      let y;
      if (Math.ceil(direction) == 1) {
        x = 0
        y = Math.random() * this.height
      } else if (Math.ceil(direction) == 2) {
        x = Math.random() * this.width
        y = this.height
      } else if (Math.ceil(direction) == 3) {
        x = this.width
        y = Math.random() * this.height
      } else {
        x = Math.random() * this.width
        y = 0
      }

      this.enemies.push(new creep(this, x, y))
      x = Math.random() * this.width
      y = Math.random() * this.height
      if (Math.random() < 0.05) {
        this.pickups.push(new Quad(this, x, y))
      } else {
        //       this.enemies.push(new Pumpkin(this, x, y))
      }
      if (Math.random() < 0.1) {
        this.pickups.push(new Weapon(this, x, y))
      }
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }

    // if (this.staticTimer > this.staticInterval) {

    //   let x = Math.random() * (this.width - 64)
    //   let y = Math.random() * (this.height - 64)
    //   this.enemies.push(new Static(this, x, y))

    //   this.staticTimer = 0
    // } else {
    //   this.staticTimer += deltaTime
    // }

    // if (this.wallTimer > this.wallInterval) {
    //   let x = Math.random() * this.width;
    //   let y = 0
    //   let ySpeed = 2
    //   let xSpeed = 2
    //   if (Math.random() > .5) {
    //     y = this.height
    //     ySpeed = -ySpeed
    //   }
    //   this.enemies.push(new Wall(this, x, y, 0, ySpeed))
    //   x = 0;
    //   y = Math.random() * this.height;
    //   if (Math.random() > .5) {
    //     x = this.width
    //     xSpeed = -xSpeed
    //   }
    //   this.enemies.push(new Wall(this, x, y, xSpeed, 0))

    //   this.wallTimer = 0
    // } else {
    //   this.wallTimer += deltaTime
    // }



    this.player.update(deltaTime)

    this.pickups.forEach((pickup) => {
      if (this.checkCollision(this.player, pickup)) {
        if (pickup.type === 'quad') {
          this.quadTimer = this.gameTime + 30000
        } else if (pickup.type === 'weapon') {
          this.ammoMsgTimer = this.gameTime + 3000
          pickup.randomGun()
        }
        pickup.markedForDeletion = true
      }
    })

    this.enemies.forEach((enemy) => {
      if (enemy.type === 'static') {
        if (enemy.life > enemy.maxLife) {
          enemy.markedForDeletion = true
          this.player.lives--
        } else {
          enemy.life++
        }
      }
      enemy.update(this.player)
      if (this.checkCollision(this.player, enemy)) {

        if (enemy.type === 'pumpkin') {
          this.player.lives = 0
        } else {
          // } else if (enemy.type === 'quad') {
          //   this.quadTimer = this.gameTime + 30000

          //   // this.enemies.forEach((enemy) => {
          //   //   if (enemy.type !== 'pumpkin') {
          //   //     enemy.markedForDeletion = true;
          //   //   }
          //   // })
          // } else {
          this.player.lives--
        }
        if (enemy.type !== 'static') {
          enemy.markedForDeletion = true
        }
      }
      this.player.projectiles.forEach((projectile) => {
        if (projectile.type === 'lg') {
          projectile.x = this.player.x + this.player.width / 2
          projectile.y = this.player.y + this.player.height / 2
          const angle = Math.atan2(
            this.input.mouseY - (this.player.y + this.player.height / 2),
            this.input.mouseX - (this.player.x + this.player.width / 2)
          )
          projectile.angle = angle
          this.player.LGAmmo -= 1
          if (this.player.LGAmmo < 1) {
            this.mb1 = 0
          }
          if (this.mb1 === 0) {
            projectile.markedForDeletion = true
          }
        }
        this.player.projectiles.forEach((projectile2) => {
          if (this.checkCollision(projectile, projectile2)) {
            if (projectile.type === 'rocket' && projectile2.type === 'click') {
              projectile.markedForDeletion = true
              projectile2.markedForDeletion = true
              this.player.projectiles.push(
                new Explosion(
                  this,
                  projectile2.x - 32,
                  projectile2.y - 32,
                  0
                ))
            }
          }
        })
        if (projectile.type === 'railGun' || projectile.type === 'explosion') {
          if (projectile.life > projectile.maxLife) {
            projectile.markedForDeletion = true
          } else {
            projectile.life++
          }
        }
        if (this.checkCollision(projectile, enemy)) {
          if (projectile.type === 'rocket') {
            this.player.projectiles.push(
              new Explosion(
                this,
                projectile.x - 32,
                projectile.y - 32,
                0
              ))
          }
          if (enemy.type === 'pumpkin' && projectile.type !== 'lg') {
            projectile.markedForDeletion = true
          } else if (enemy.type === 'static' && projectile.type === 'click') {
            enemy.markedForDeletion = true
          } else if (enemy.type === 'creep' && projectile.type !== 'click') {
            if (enemy.lives > projectile.damage * this.player.damage) {
              enemy.lives -= projectile.damage * this.player.damage
            } else {
              enemy.markedForDeletion = true
            }
            if (projectile.type !== 'explosion' && projectile.type !== 'lg') {
              projectile.markedForDeletion = true
            }
          }
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
    this.pickups = this.pickups.filter((pickup) => !pickup.markedForDeletion)
  }

  draw(context) {
    context.drawImage(
      this.background,
      0,
      0,
      this.width,
      this.height
    )
    context.globalAlpha = 0.6
    context.fillStyle = "#000"
    context.fillRect(0, 0, this.width, this.height)
    context.globalAlpha = 1
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    this.pickups.forEach((enemy) => {
      enemy.draw(context)
    })
    this.ui.draw(context)
    this.player.draw(context)
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
}
