function init() {

  // get the grid
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
        //cell.textContent = 'y:' + y + ', x:' + x
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
        if (waterDiv.classList.contains('water') && waterDiv.classList.contains('frog') && waterDiv.classList.length === 2 || waterDiv.classList.contains('water') && waterDiv.classList.contains('frog') && waterDiv.classList.contains('water-ripples') && waterDiv.classList.length === 3) {
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
    },
    topWater(x) {
      const waterDiv = cells[0][x]
      waterDiv.classList.add('water')
      this.cellsWater.push(waterDiv)
    }
  }


  water.placeWater()
  water.topWater(0)
  water.topWater(9)
  water.topWater(8)
  water.topWater(2)
  water.topWater(4)
  water.topWater(6)



  // audio tag

  const audio = document.querySelector('audio')
  console.log(audio)

  function cuteSound() {
    audio.src = '/Users/krissy/development/PROJECTS/sei-project-one/assets/cute.mp3'
    audio.play()
    console.log('play music')
  }

  function gothSound() {
    audio.src = '/Users/krissy/development/PROJECTS/sei-project-one/assets/goth.mp3'
    audio.play()
  }



  // making the frog

  const frog = {
    positionY: 9,
    positionX: 4,
    lives: 9,
    level: 1,
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
        updateP.innerHTML = 'You Lose :('
        audio.src = '/Users/krissy/development/PROJECTS/sei-project-one/assets/lose.mp3'
        audio.play()
      }
    }
  }

  // * water effects 

  function addWaterEffect(pos1, pos2) {
    cells[pos1][pos2].classList.add('water-ripples')
  }

  addWaterEffect(1, 8)
  addWaterEffect(2, 5)
  addWaterEffect(3, 1)
  addWaterEffect(4, 6)
  addWaterEffect(0, 9)
  addWaterEffect(0, 2)

  // * grass effects

  function addGrassEffect(pos1, pos2) {
    cells[pos1][pos2].classList.add('grass')
  }

  addGrassEffect(8, 5)
  addGrassEffect(6, 9)
  addGrassEffect(9, 2)
  addGrassEffect(5, 4)
  addGrassEffect(7, 2)

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
        cells[frog.positionX][frog.positionY].classList.add('fight')
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
  }

  // also a level two maybe to final win

  const winArray = []

  class Win {
    constructor(positionY, positionX) {
      this.positionX = positionX
      this.positionY = positionY
    }

    winArray = []
    toWin() {
      cells[this.positionY][this.positionX].classList.add('win')
    }
    youWon() {
      if (this.positionY === frog.positionY && this.positionX === frog.positionX) {
        if (cells[this.positionY][this.positionX].classList.contains('won')) {
          console.log('already there')
          frog.positionY = 9
          frog.positionX = 4
          frog.lives = frog.lives - 1
          update()
        } else {
          console.log('adding the class')
          cells[this.positionY][this.positionX].classList.remove('frog')
          cells[frog.positionY][frog.positionX].classList.add('won')
          winArray.push('win' + this.positionX)
          console.log(winArray, winArray.length)
          frog.positionY = 9
          frog.positionX = 4
          update()
        }
      }
    }
    resetWin() {
      cells[this.positionY][this.positionX].classList.remove('won')
    }
    finalWin() {
      if (winArray.length === 4 && frog.level === 1) {
        update()
        clearInterval(gameTimer)
        setTimeout(playGame2, 1500)
        frog.level = frog.level + 1
        updateP.innerHTML = 'Level 2'

      } else if (winArray.length === 8) {
        update()
        clearInterval(gameTimer)
        updateP.innerHTML = 'You Won!'
        audio.src = '/Users/krissy/development/PROJECTS/sei-project-one/assets/winner.mp3'
        audio.play()
      }
    }
  }


  // the side bar with lives and the button

  // elements
  const score = document.querySelector('#score')
  const lives = document.querySelector('#lives')
  const button = document.querySelector('#startBtn')
  const button2 = document.querySelector('#restartBtn')
  const updateP = document.querySelector('.updatesBoard', 'p')

  function update() {
    // adding info to the elements
    score.innerHTML = winArray.length
    lives.innerHTML = frog.lives
  }


  function hideBtn() {
    button.style.visibility = 'hidden'
    updateP.innerHTML = 'Level 1'
  }

  // make a proper reset button 
  function resetPage() {
    window.location.reload()
    playGame()

  }

  // execution

  button.addEventListener('click', playGame)
  button.addEventListener('click', hideBtn)
  button.addEventListener('click', cuteSound)
  button2.addEventListener('click', resetPage)


  // making new objects

  const winOne = new Win(0, 5)
  const winTwo = new Win(0, 3)
  const winThree = new Win(0, 7)
  const winFour = new Win(0, 1)
  const truck = new Entity(8, 2, 500, 'black-cat')
  const truck2 = new Entity(8, 5, 500, 'black-cat')
  const car = new Entity(6, 1, 600, 'white-cat')
  const car2 = new Entity(6, 4, 600, 'white-cat')
  const car3 = new Entity(6, 9, 600, 'white-cat')
  const fastCat = new Entity(7, 5, 200, 'running-cat')


  const log = new WaterPlatform(2, 1, 500, 'box')
  const log2 = new WaterPlatform(2, 7, 500, 'box')


  const turtle = new WaterPlatform(1, 1, 600, 'log')
  const turtle2 = new WaterPlatform(1, 2, 600, 'log')


  const bigLog = new WaterPlatform(3, 1, 600, 'log')
  const bigLog2 = new WaterPlatform(3, 2, 600, 'log')
  const bigLog3 = new WaterPlatform(3, 3, 600, 'log')
  const bigLog4 = new WaterPlatform(3, 4, 600, 'log')


  const meanTurtle = new WaterPlatform(4, 3, 400, 'box')
  const meanTurtle2 = new WaterPlatform(4, 5, 400, 'box')
  const meanTurtle3 = new WaterPlatform(4, 7, 400, 'box')

  winOne.toWin()
  winTwo.toWin()
  winThree.toWin()
  winFour.toWin()

  let gameTimer

  function playGame() {

    gameTimer = setInterval(() => {

      frog.move()
      truck.moveBackwards()
      truck.collision()
      truck2.moveBackwards()
      truck2.collision()

      car.moveBackwards()
      car.collision()
      car2.moveBackwards()
      car2.collision()
      car3.moveBackwards()
      car3.collision()
      fastCat.move()
      fastCat.collision()
      log.move()
      log2.move()


      turtle.moveBackwards()
      turtle2.moveBackwards()

      bigLog.moveBackwards()
      bigLog2.moveBackwards()
      bigLog3.moveBackwards()
      bigLog4.moveBackwards()

      meanTurtle.move()
      meanTurtle2.move()
      meanTurtle3.move()
      frog.numberOfLives()
      winOne.youWon()
      winTwo.youWon()
      winThree.youWon()
      winFour.youWon()
      winOne.finalWin()
      winTwo.finalWin()
      winThree.finalWin()
      winFour.finalWin()
      water.collision()
    }, 100)

  }



  function playGame2() {
    makeGoth()
    winOne.resetWin()
    winTwo.resetWin()
    winThree.resetWin()
    winFour.resetWin()
    gothSound()
    gameTimer = setInterval(() => {

      frog.move()
      truck.moveBackwards()
      // truck.collision()
      truck2.moveBackwards()
      //truck2.collision()

      car.moveBackwards()
      //car.collision()
      car2.moveBackwards()
      //car2.collision()
      car3.moveBackwards()
      //car3.collision()
      fastCat.move()
      fastCat.collision()
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
      winOne.youWon()
      winTwo.youWon()
      winThree.youWon()
      winFour.youWon()
      winOne.finalWin()
      winTwo.finalWin()
      winThree.finalWin()
      winFour.finalWin()
      //water.collision()
    }, 100)

  }


  // if I set all of the calls within another function, then I can reset interval timer - could work, maybe set another button as reset time instead of re-writing the innerHTML


  // event listeners


  document.addEventListener('keydown', frog.handlePlayerInput)


  //messing with the screen


  // making the button





  // adding goth to the page

  const body = document.querySelector('body')

  function makeGoth() {
    body.classList.add('goth')
  }

  //makeGoth()


}

window.addEventListener('DOMContentLoaded', init)