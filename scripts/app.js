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
          const y = frog.positionY
          const x = frog.positionX
          cells[frog.positionY][frog.positionX].classList.remove('frog')
          cells[frog.positionY][frog.positionX].classList.add('splash')
          frog.positionY = 9
          frog.positionX = 4
          frog.lives = frog.lives - 1
          update()

          setTimeout(() => {
            cells[y][x].classList.remove('splash')
          }, 500)
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

  function cuteSound() {
    audio.src = './assets/cute.mp3'
    audio.play()
  }

  function gothSound() {
    audio.src = './assets/goth.mp3'
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
        audio.src = './assets/lose.mp3'
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
    lastMovedAt = null
    move(timestamp) {
      if (this.lastMovedAt === null || timestamp - this.lastMovedAt > this.speed) {
        if (this.positionX >= 0) {
          cells[this.positionY][this.positionX].classList.remove(this.name)
        }

        this.positionX = (this.positionX + 1) % width
        cells[this.positionY][this.positionX].classList.add(this.name)
        this.lastMovedAt = timestamp
      }
    }
    moveBackwards(timestamp) {
      if (this.lastMovedAt === null || timestamp - this.lastMovedAt > this.speed) {
        if (this.positionX <= 0) {
          cells[this.positionY][this.positionX].classList.remove(this.name)
          this.positionX = width - 1
          cells[this.positionY][this.positionX].classList.add(this.name)
          this.lastMovedAt = timestamp

          return
        }
        cells[this.positionY][this.positionX].classList.remove(this.name)
        this.positionX = this.positionX - 1
        cells[this.positionY][this.positionX].classList.add(this.name)
        this.lastMovedAt = timestamp


      }
    }
    collision() {
      if (this.positionY === frog.positionY && this.positionX === frog.positionX) {
        const x = frog.positionX
        const y = frog.positionY
        cells[frog.positionY][frog.positionX].classList.remove('frog')
        frog.positionY = 9
        frog.positionX = 4
        frog.lives = frog.lives - 1
        update()
        cells[this.positionY][this.positionX].classList.add('crash')
        setTimeout(() => {
          cells[y][x].classList.remove('crash')
        }, 300)
      }
    }
    // removeCrash(y, x) {
    //   cells[y][x].classList.remove('crash')
    // }
  }

  class WaterPlatform extends Entity {
    constructor(positionY, positionX, speed, name) {
      super(positionY, positionX, speed, name)
    }
    move(timestamp) {
      const isFrogOnPlatform = this.positionY === frog.positionY && this.positionX === frog.positionX
      super.move(timestamp)
      if (isFrogOnPlatform) {
        cells[frog.positionY][frog.positionX].classList.remove('frog')
        frog.positionY = this.positionY
        frog.positionX = this.positionX
        cells[frog.positionY][frog.positionX].classList.add('frog')
      }

    }
    moveBackwards(timestamp) {
      const isFrogOnPlatform = this.positionY === frog.positionY && this.positionX === frog.positionX
      super.moveBackwards(timestamp)
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
          frog.positionY = 9
          frog.positionX = 4
          frog.lives = frog.lives - 1
          update()
        } else {
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
        audio.src = './assets/winner.mp3'
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

  const blackCat = new Entity(8, 2, 500, 'black-cat')
  const blackCat2 = new Entity(8, 5, 500, 'black-cat')
  const whiteCat = new Entity(6, 1, 600, 'white-cat')
  const whiteCat2 = new Entity(6, 4, 600, 'white-cat')
  const whiteCat3 = new Entity(6, 9, 600, 'white-cat')
  const fastCat = new Entity(7, 5, 200, 'running-cat')


  const box = new WaterPlatform(2, 1, 600, 'box')
  const box2 = new WaterPlatform(2, 7, 600, 'box')


  const fish = new WaterPlatform(1, 1, 600, 'fish')
  const fish2 = new WaterPlatform(1, 2, 600, 'fish')
  const fish3 = new WaterPlatform(1, 8, 600, 'fish')
  const fish4 = new WaterPlatform(1, 9, 600, 'fish')

  const fish5 = new WaterPlatform(3, 1, 700, 'fish')
  const fish6 = new WaterPlatform(3, 2, 700, 'fish')
  const fish7 = new WaterPlatform(3, 3, 700, 'fish')
  const fish8 = new WaterPlatform(3, 4, 700, 'fish')


  const box3 = new WaterPlatform(4, 3, 400, 'box')
  const box4 = new WaterPlatform(4, 5, 400, 'box')
  const box5 = new WaterPlatform(4, 7, 400, 'box')

  winOne.toWin()
  winTwo.toWin()
  winThree.toWin()
  winFour.toWin()

  let gameTimer

  function playGame() {

    gameTimer = setInterval(() => {

      const timestamp = Date.now()

      frog.move()
      blackCat.moveBackwards(timestamp)
      blackCat.collision()
      blackCat2.moveBackwards(timestamp)
      blackCat2.collision()

      whiteCat.moveBackwards(timestamp)
      whiteCat.collision()
      whiteCat2.moveBackwards(timestamp)
      whiteCat2.collision()
      whiteCat3.moveBackwards(timestamp)
      whiteCat3.collision()
      fastCat.move(timestamp)
      fastCat.collision()
      fish.moveBackwards(timestamp)
      fish2.moveBackwards(timestamp)


      box.move(timestamp)
      box2.move(timestamp)
      box3.move(timestamp)
      box4.move(timestamp)
      box5.move(timestamp)

      fish3.moveBackwards(timestamp)
      fish4.moveBackwards(timestamp)
      fish5.moveBackwards(timestamp)
      fish6.moveBackwards(timestamp)
      fish7.moveBackwards(timestamp)
      fish8.moveBackwards(timestamp)


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

  const gothBlackCat = new Entity(8, 2, 400, 'black-cat')
  const gothBlackCat2 = new Entity(8, 5, 400, 'black-cat')
  const gothWhiteCat = new Entity(6, 1, 500, 'white-cat')
  const gothWhiteCat2 = new Entity(6, 4, 500, 'white-cat')
  const gothWhiteCat3 = new Entity(6, 9, 500, 'white-cat')

  const gothFastCat = new Entity(7, 5, 100, 'running-cat')
  const gothFastCat2 = new Entity(7, 0, 100, 'running-cat')

  const gothBox = new WaterPlatform(2, 1, 400, 'box')
  const gothBox2 = new WaterPlatform(2, 7, 400, 'box')


  const gothFish = new WaterPlatform(1, 1, 500, 'fish')
  const gothFish2 = new WaterPlatform(1, 2, 500, 'fish')


  const gothFish3 = new WaterPlatform(3, 1, 400, 'fish')
  const gothFish4 = new WaterPlatform(3, 2, 400, 'fish')
  const gothFish5 = new WaterPlatform(3, 3, 400, 'fish')



  const gothBox3 = new WaterPlatform(4, 3, 400, 'box')
  const gothBox4 = new WaterPlatform(4, 5, 400, 'box')
  const gothBox5 = new WaterPlatform(4, 7, 400, 'box')



  function playGame2() {
    makeGoth()
    winOne.resetWin()
    winTwo.resetWin()
    winThree.resetWin()
    winFour.resetWin()
    gothSound()
    gameTimer = setInterval(() => {
      const timestamp = Date.now()

      frog.move()
      gothBlackCat.moveBackwards(timestamp)
      gothBlackCat.collision()
      gothBlackCat2.moveBackwards(timestamp)
      gothBlackCat2.collision()

      gothWhiteCat.moveBackwards(timestamp)
      gothWhiteCat.collision()
      gothWhiteCat2.moveBackwards(timestamp)
      gothWhiteCat2.collision()
      gothWhiteCat3.moveBackwards(timestamp)
      gothWhiteCat3.collision()
      gothFastCat.move(timestamp)
      gothFastCat.collision()
      gothFastCat2.move(timestamp)
      gothFastCat2.collision()

      gothFish.moveBackwards(timestamp)
      gothFish2.moveBackwards(timestamp)
      gothFish3.moveBackwards(timestamp)
      gothFish4.moveBackwards(timestamp)
      gothFish5.moveBackwards(timestamp)
      gothBox.move(timestamp)
      gothBox2.move(timestamp)
      gothBox3.move(timestamp)
      gothBox4.move(timestamp)
      gothBox5.move(timestamp)

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