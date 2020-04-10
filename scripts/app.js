function init() {

  //* get the grid
  const grid = document.querySelector('.grid')
  const cells = []
  const height = 10
  const width = 10

  // let frogPositionX = 0
  // let frogPositionY = 0

  function createCells() {
    for (let y = 0; y < height; y++) {
      cells[y] = []
      for (let x = 0; x < width; x++) {
        const cell = document.createElement('div')
        grid.appendChild(cell)
        cell.textContent = 'x:' + x + ', y:' + y
        cells[y][x] = cell
      }
    }

  }
  createCells(0)

  //* some kind of thing that can move around the grid
  // execution

  const frog = {
    lives: 3,
    positionY: 0,
    positionX: 0,
    keyPressed: null,
    handlePlayerInput(event) {
      frog.keyPressed = event.keyCode
    },
    move() {
      cells[frog.positionY][frog.positionX].classList.remove('frog')
      const lastKeyPressed = this.keyPressed
      this.keyPressed = null
      switch (lastKeyPressed) {
        case 39:
          if (this.positionX < width - 1) this.positionX++
          console.log('move right')
          break
        case 37:
          if (this.positionX > 0) this.positionX--
          console.log('move left')
          break
        case 38:
          if (this.positionY > 0) this.positionY--
          console.log('move up')
          break
        case 40:
          if (this.positionY < width - 1) this.positionY++
          console.log('move down')
          break
        default:
          console.log('no player input')
      }
      cells[frog.positionY][frog.positionX].classList.add('frog')
    }

  }

  const truck = {
    positionY: 8,
    positionX: -1,
    lastMovedAt: Date.now(),
    move() {
      if (Date.now() - this.lastMovedAt > 500) {
        if (this.positionX >= 0) {
          cells[this.positionY][this.positionX].classList.remove('truck')
        }
        this.positionX = (this.positionX + 1) % width
        cells[this.positionY][this.positionX].classList.add('truck')
        this.lastMovedAt = Date.now()
      }
    },
    collision() {
      if (this.positionY === frog.positionY && this.positionX === frog.positionX) {
        cells[truck.positionY][truck.positionX].classList.add('boom')
        frog.positionY = 0
        frog.positionX = 0
      }



    }
  }

  const num = 0

  const gameTimer = setInterval(() => {
    frog.move()
    truck.move()
    truck.collision()
  }, 10)









  // event listeners


  document.addEventListener('keyup', frog.handlePlayerInput)

}

window.addEventListener('DOMContentLoaded', init)