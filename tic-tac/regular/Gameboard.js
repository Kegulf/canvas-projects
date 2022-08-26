class Gameboard {
  cells = [];
  id;
  winner = null;

  x;
  y;

  constructor(id, boardWidth, boardHeight) {
    this.id = id;
    this.x = (id % 3) * boardWidth;
    this.y = Math.floor(id / 3) * boardHeight;

    this.generateCells();
  }

  generateCells() {
    for (let i = 0; i < 3; i += 1) {
      this.cells[i] = [];
      for (let j = 0; j < 3; j += 1) {
        this.cells[i][j] = 0;
      }
    }
  }

  setWinner(winner) {
    this.winner = winner;
  }

  hasWinner() {
    if (this.winner !== null) return true;

    return (
      // Horizontals
      this.isEqualToThree(this.cells[0][0], this.cells[0][1], this.cells[0][2])
      || this.isEqualToThree(this.cells[1][0], this.cells[1][1], this.cells[1][2])
      || this.isEqualToThree(this.cells[2][0], this.cells[2][1], this.cells[2][2])
  
      // Verticals
      || this.isEqualToThree(this.cells[0][0], this.cells[1][0], this.cells[2][0])
      || this.isEqualToThree(this.cells[0][1], this.cells[1][1], this.cells[2][1])
      || this.isEqualToThree(this.cells[0][2], this.cells[1][2], this.cells[2][2])

      // Diagonals
      || this.isEqualToThree(this.cells[0][0], this.cells[1][1], this.cells[2][2])
      || this.isEqualToThree(this.cells[0][2], this.cells[1][1], this.cells[2][0])
    )
  }

  isEqualToThree(...cells) {
    return Math.abs(cells[0] + cells[1] + cells[2]) === 3;
  }
}