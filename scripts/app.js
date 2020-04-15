function init() {

  //* get the grid
  const grid = document.querySelector('.grid')
  const cells = []
  const height = 10
  const width = 10

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



  // make the water
  const water = {
    cellsWater: [],
    placeWater() {
      for (let y = 1; y <= 4; y++) {
        for (let x = 0; x < width; x++) {
          const waterDiv = cells[y][x]
          waterDiv.classList.add('water')
          this.cellsWater.push(waterDiv)
        }
      }
    },
    collision() {
      this.cellsWater.forEach(waterDiv => {
        if (waterDiv.classList.contains('water') && waterDiv.classList.contains('frog') && waterDiv.classList.length === 2) {
          console.log('boom')
          cells[frog.positionY][frog.positionX].classList.remove('frog')
          frog.positionY = 9
          frog.positionX = 4
          console.log('new position')
          frog.lives = frog.lives - 1
          console.log('new lives count')
          update()
        }

      })
    }
  }


  water.placeWater()


  // making the frog

  const frog = {
    positionY: 9,
    positionX: 4,
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
          //console.log('move right')
          break
        case 37:
          if (this.positionX > 0) this.positionX--
          //console.log('move left')
          break
        case 38:
          if (this.positionY > 0) this.positionY--
          //console.log('move up')
          break
        case 40:
          if (this.positionY < width - 1) this.positionY++
          //console.log('move down')
          break
        default:
        //console.log('no player input')
      }
      cells[frog.positionY][frog.positionX].classList.add('frog')
    },
    numberOfLives() {

      if (this.lives === 0) {
        clearInterval(gameTimer)
      }
    }
  }

  //making classes
  class Entity {
    constructor(positionY, positionX, speed, name) {
      this.positionY = positionY
      this.positionX = positionX
      this.speed = speed
      this.name = name
    }
    lastMovedAt = Date.now()
    move() {
      if (Date.now() - this.lastMovedAt > this.speed) {
        if (this.positionX >= 0) {
          cells[this.positionY][this.positionX].classList.remove(this.name)
        }

        this.positionX = (this.positionX + 1) % width
        cells[this.positionY][this.positionX].classList.add(this.name)
        this.lastMovedAt = Date.now()
      }
    }
    moveBackwards() {
      if (Date.now() - this.lastMovedAt > this.speed) {
        if (this.positionX <= 0) {
          cells[this.positionY][this.positionX].classList.remove(this.name)
          this.positionX = width - 1
          cells[this.positionY][this.positionX].classList.add(this.name)
          this.lastMovedAt = Date.now()

          return
        }
        cells[this.positionY][this.positionX].classList.remove(this.name)
        this.positionX = this.positionX - 1
        cells[this.positionY][this.positionX].classList.add(this.name)
        this.lastMovedAt = Date.now()


      }
    }
    collision() {
      if (this.positionY === frog.positionY && this.positionX === frog.positionX) {
        console.log('you lose')
        cells[frog.positionY][frog.positionX].classList.remove('frog')
        frog.positionY = 9
        frog.positionX = 4
        frog.lives = frog.lives - 1
        update()
      }
    }
  }

  class WaterPlatform extends Entity {
    constructor(positionY, positionX, speed, name) {
      super(positionY, positionX, speed, name)
    }
    move() {
      const isFrogOnPlatform = this.positionY === frog.positionY && this.positionX === frog.positionX
      super.move()
      if (isFrogOnPlatform) {
        cells[frog.positionY][frog.positionX].classList.remove('frog')
        frog.positionY = this.positionY
        frog.positionX = this.positionX
        cells[frog.positionY][frog.positionX].classList.add('frog')
      }

    }
    moveBackwards() {
      const isFrogOnPlatform = this.positionY === frog.positionY && this.positionX === frog.positionX
      super.moveBackwards()
      if (isFrogOnPlatform) {
        cells[frog.positionY][frog.positionX].classList.remove('frog')
        frog.positionY = this.positionY
        frog.positionX = this.positionX
        cells[frog.positionY][frog.positionX].classList.add('frog')
      }
    }
    // frogMove() {
    //   if (this.positionY === frog.positionY && this.positionX === frog.positionX) {

    //     if (Date.now() - this.lastMovedAt > (this.speed)) {
    //       cells[frog.positionY][frog.positionX].classList.remove('frog', this.className)
    //       const newX = (frog.positionX + 1) % width
    //       frog.positionX = newX
    //       cells[frog.positionY][frog.positionX].classList.add('frog', this.className)
    //       this.lastMovedAt = Date.now()

    //     }
    //   } else {
    //     this.move()
    //   }
    // }
  }

  // also a level two maybe to final win

  const winArray = []

  class Win {
    constructor(positionY, positionX) {
      this.positionX = positionX
      this.positionY = positionY
    }
    winArray = []
    youWin() {
      if (this.positionY === frog.positionY && this.positionX === frog.positionX) {
        if (cells[this.positionY][this.positionX].classList.contains('win')) {
          frog.positionY = 9
          frog.positionX = 4
          frog.lives = frog.lives - 1
          update()
        } else {
          cells[frog.positionY][frog.positionX].classList.remove('frog')
          cells[frog.positionY][frog.positionX].classList.add('win')
          winArray.push('win' + this.positionX)
          console.log(winArray, winArray.length)
          frog.positionY = 9
          frog.positionX = 4
          update()
        }
      }
    }
    finalWin() {
      if (winArray.length === 2) {
        update()
        button.style.visibility = 'visible'
        button.innerHTML = 'restart game'
        clearInterval(gameTimer)
      }
    }
  }

  // the side bar with lives and the button

  // elements
  const score = document.querySelector('#score')
  const lives = document.querySelector('#lives')
  const button = document.querySelector('button')

  function update() {
    // adding info to the elements
    score.innerHTML = winArray.length
    lives.innerHTML = frog.lives
  }


  function hideBtn() {
    button.style.visibility = 'hidden'
    console.log('none')
  }


  // execution

  button.addEventListener('click', playGame)
  button.addEventListener('click', hideBtn)

  // making new objects

  const winOne = new Win(0, 5)
  const winTwo = new Win(0, 3)
  const truck = new Entity(8, 9, 300, 'spider')
  const truck2 = new Entity(8, 1, 300, 'spider')
  const truck3 = new Entity(8, 4, 300, 'spider')
  const car = new Entity(6, 0, 500, 'spider')
  const car2 = new Entity(6, 2, 500, 'spider')
  const car3 = new Entity(6, 4, 500, 'spider')
  const car4 = new Entity(6, 8, 500, 'spider')
  const log = new WaterPlatform(2, 4, 600, 'log')
  const log2 = new WaterPlatform(2, 3, 600, 'log')
  const log3 = new WaterPlatform(2, 2, 600, 'log')
  const log4 = new WaterPlatform(2, 1, 600, 'log')
  const log5 = new WaterPlatform(2, 0, 600, 'log')
  const turtle = new WaterPlatform(1, 0, 600, 'log')
  const turtle2 = new WaterPlatform(1, 3, 600, 'log')
  const turtle3 = new WaterPlatform(1, 5, 600, 'log')
  const bigLog = new WaterPlatform(3, 1, 600, 'log')
  const bigLog2 = new WaterPlatform(3, 2, 600, 'log')
  const bigLog3 = new WaterPlatform(3, 3, 600, 'log')
  const bigLog4 = new WaterPlatform(3, 4, 600, 'log')
  const bigLog5 = new WaterPlatform(3, 5, 600, 'log')
  const meanTurtle = new WaterPlatform(4, 1, 999, 'log')
  const meanTurtle2 = new WaterPlatform(4, 3, 999, 'log')
  const meanTurtle3 = new WaterPlatform(4, 6, 999, 'log')


  let gameTimer

  function playGame() {

    gameTimer = setInterval(() => {

      frog.move()
      truck.move()
      truck.collision()
      truck2.move()
      truck2.collision()
      truck3.move()
      truck3.collision()
      car.move()
      car.collision()
      car2.move()
      car2.collision()
      car3.move()
      car3.collision()
      car4.move()
      car4.collision()
      log.move()
      log2.move()
      log3.move()
      log4.move()
      log5.move()
      turtle.moveBackwards()
      turtle2.moveBackwards()
      turtle3.moveBackwards()
      bigLog.moveBackwards()
      bigLog2.moveBackwards()
      bigLog3.moveBackwards()
      bigLog4.moveBackwards()
      bigLog5.moveBackwards()
      meanTurtle.move()
      meanTurtle2.move()
      meanTurtle3.move()
      frog.numberOfLives()
      winOne.youWin()
      winTwo.youWin()
      winOne.finalWin()
      winTwo.finalWin()
      water.collision()
    }, 100)

  }


  // if I set all of the calls within another function, then I can reset interval timer - could work, maybe set another button as reset time instead of re-writing the innerHTML


  // event listeners


  document.addEventListener('keydown', frog.handlePlayerInput)


  //messing with the screen


  // making the button





}

window.addEventListener('DOMContentLoaded', init)