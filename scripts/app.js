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
        cell.textContent = 'y:' + y + ', x:' + x
        cells[y][x] = cell
      }
    }

  }
  createCells(0)

  // making the frog

  const frog = {
    positionY: 0,
    positionX: 0,
    lives: 3,
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
    },
    numberOfLives() {
      console.log(this.lives)
      if (this.lives === 0) {
        clearInterval(gameTimer)
      }
    }
  }

  //making classes
  class Enemy {
    constructor(positionY, positionX, speed, temp) {
      this.positionY = positionY
      this.positionX = positionX
      this.speed = speed
      this.temp = temp
    }
    lastMovedAt = Date.now()
    move() {
      if (Date.now() - this.lastMovedAt > this.speed) {
        if (this.positionX >= 0) {
          cells[this.positionY][this.positionX].classList.remove(this.temp)
        }
        this.positionX = (this.positionX + 1) % width
        cells[this.positionY][this.positionX].classList.add(this.temp)
        this.lastMovedAt = Date.now()
      }
    }
    collision() {
      if (this.positionY === frog.positionY && this.positionX === frog.positionX) {
        console.log('you lose')
        frog.positionY = 0
        frog.positionX = 0
        frog.lives = frog.lives - 1
      }
    }
  }

  class Win {
    constructor(positionY, positionX) {
      this.positionX = positionX
      this.positionY = positionY
    }
    youWin() {
      if (this.positionY === frog.positionY && this.positionX === frog.positionX) {
        console.log('You win')
        clearInterval(gameTimer)
      }
    }
  }

  // making new objects

  const winOne = new Win(0, 5)
  const truck = new Enemy(8, -1, 500, 'truck')
  const car = new Enemy(6, -1, 500, 'car')
  const lorry = new Enemy(4, -1, 500, 'truck')


  // calling the game loop

  const gameTimer = setInterval(() => {
    frog.move()
    truck.move()
    truck.collision()
    car.move()
    car.collision()
    lorry.move()
    lorry.collision()
    frog.numberOfLives()
    winOne.youWin()
  }, 10)





  // event listeners


  document.addEventListener('keyup', frog.handlePlayerInput)

}

window.addEventListener('DOMContentLoaded', init)