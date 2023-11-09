import Pickup from './Pickup'
import ammo from './assets/sprites/Ammobox.png'

export default class Weapon extends Pickup {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 0
    this.lives = 1
    this.color = '#00ff00'
    this.type = 'weapon'

    const idleImage = new Image()
    idleImage.src = ammo
    this.image = idleImage
  }

  randomGun() {
    let gun = Math.ceil(Math.random() * 4)
    if (gun == 1) {
      this.game.player.shotgunAmmo += 20
      this.game.popupMsg = "+20 shotgun ammo"
    } else if (gun == 2) {
      this.game.player.railGunAmmo += 20
      this.game.popupMsg = "+20 railgun ammo"
    } else if (gun == 3) {
      this.game.player.rocketLauncherAmmo += 20
      this.game.popupMsg = "+20 rockets"
    } else {
      this.game.player.LGAmmo += 400
      this.game.popupMsg = "+20 LG ammo"
    }
  }

}
