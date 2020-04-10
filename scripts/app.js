function init() {

  //* get the grid
  const grid = document.querySelector('.grid')
  const cells = []
  const height = 10
  const width = 10

  let frogPositionX = 0
  let frogPositionY = 0

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
    cells[frogPositionY][frogPositionX].classList.add('frog')
  }
  createCells(0)

  //* some kind of thing that can move around the grid
  // execution


  function handleKeyUp(event) {
    cells[frogPositionY][frogPositionX].classList.remove('frog')
    switch (event.keyCode) {
      case 39:
        if (frogPositionX < width - 1) frogPositionX++
        console.log('move right')
        break
      case 37:
        if (frogPositionX > 0) frogPositionX--
        console.log('move left')
        break
      case 38:
        if (frogPositionY > 0) frogPositionY--
        console.log('move up')
        break
      case 40:
        if (frogPositionY < width - 1) frogPositionY++
        console.log('move down')
        break
      default:
        console.log('nope')
    }
    cells[frogPositionY][frogPositionX].classList.add('frog')
  }


  // event listener


  document.addEventListener('keyup', handleKeyUp)




  //* some kind of thing that goes accross the screen on a loop I guess

  //define a loop
  let truckPositionX = 0
  const truckPositionY = 8

  let num = 0

  const truckTimer = setInterval(() => {
    num++
    console.log('I am a truck out to get you')
    cells[truckPositionY][truckPositionX].classList.add('truck')
    truckPositionX++

    if (num > 10) {
      clearInterval(truckTimer)
    }
    cells[truckPositionY][truckPositionX].classList.remove('truck')
  }, 500)


  // add a class







  //* some kind of thing that checks for a condition where two classes are in the same div and plays some kind of collision thing

  //* some kind of thing where it says the player has won once the player moves into a certain area on the game board


  //* some kind of start button that activates the above, maybe something that could also come up as a 'play again' type of thing


  //* maybe a timer or something that would finish it all, as well as being finished by winning










}

window.addEventListener('DOMContentLoaded', init)