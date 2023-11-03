import Pickup from './Pickup'

export default class Weapon extends Pickup {
  constructor(game, x, y) {
    super(game)
    this.width = 16
    this.height = 16
    this.x = x
    this.y = y
    this.speed = 0
    this.lives = 1
    this.color = '#00ff00'
    this.type = 'weapon'
  }

  randomGun() {
    let gun = Math.ceil(Math.random() * 3)
    if (gun == 1) {
      this.game.player.shotgunAmmo += 20
      this.game.popupMsg = "+20 shotgun ammo"
    } else if (gun == 2) {
      this.game.player.railGunAmmo += 20
      this.game.popupMsg = "+20 railgun ammo"
    } else {
      this.game.player.rocketLauncherAmmo += 20
      this.game.popupMsg = "+20 rockets"
    }
  }

}
