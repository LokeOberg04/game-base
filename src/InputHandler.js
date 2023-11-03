export default class InputHandler {
  constructor(game) {
    this.game = game
    this.mouseX = 0
    this.mouseY = 0

    window.addEventListener('keydown', (event) => {
      if (
        (event.key === 'ArrowUp' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight' ||
          event.key === 'w' ||
          event.key === 'a' ||
          event.key === 's' ||
          event.key === 'd') &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        this.game.keys.push(event.key)
      }

      if (event.key === ' ') {
        this.game.player.shoot(this.mouseX, this.mouseY)
      }

      if (event.key === 'p') {
        this.game.debug = !this.game.debug
      }
      if (event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5') {
        this.game.player.currentWeapon = event.key
      }
    })

    window.addEventListener('keyup', (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
      }
    })

    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - this.game.canvasPosition.left
      this.mouseY = event.clientY - this.game.canvasPosition.top
    })

    window.addEventListener('mousedown', (event) => {
      this.game.mb1 = 1
      //this.game.player.shoot(this.mouseX, this.mouseY)
      // this.game.player.click(this.mouseX, this.mouseY)
    })

    window.addEventListener('mouseup', (event) => {
      this.game.mb1 = 0
      //this.game.player.shoot(this.mouseX, this.mouseY)
      // this.game.player.click(this.mouseX, this.mouseY)
    })


  }
}
