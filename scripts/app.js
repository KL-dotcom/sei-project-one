function init() {

  //* get the grid
  const grid = document.querySelector('.grid')
  const cells = []
  const width = 10
  const cellCount = width * width

  function createCells(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cell.textContent = i
      cells.push(cell)
    }
    cells[startingPosition].classList.add('frog')
  }
  createCells(0)




  //* some kind of thing that can move around the grid

  // game variables

  let frogPosition = 0


  // execution


  function handleKeyUp(event) {
    cells[frogPosition].classList.remove('frog')
    switch (event.keyCode) {
      case 39:
        frogPosition++
        console.log('move right')
        break
      case 37:
        frogPosition--
        console.log('move left')
        break
      case 38:
        frogPosition -= width
        console.log('move up')
        break
      case 40:
        frogPosition += width
        console.log('move down')
        break
      default:
        console.log('nope')
    }
    cells[frogPosition].classList.add('frog')
  }


  // event listerner


  document.addEventListener('keyup', handleKeyUp)




  //* some kind of thing that goes accross the screen on a loop I guess







  //* some kind of thing that checks for a condition where two classes are in the same div and plays some kind of collision thing

  // some kind of thing where it says the player has won once the player moves into a certain area on the game board


  // some kind of start button that activates the above, maybe something that could also come up as a 'play again' type of thing


  // maybe a timer or something that would finish it all, as well as being finished by winning










}

window.addEventListener('DOMContentLoaded', init)