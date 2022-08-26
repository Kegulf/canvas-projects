
const EMPTY = 0;
const PLAYER_1 = 1, PLAYER_2 = -1;
const CROSS = 'cross', CIRCLE = 'circle';

let backgroundColor = 'white';
let boardWidth, boardHeight;
let cellWidth, cellHeight;
let boards = [], currentPlayer = 1;

let player1Piece = { shape: CROSS, color: 'blue' };
let player2Piece = { shape: CIRCLE, color: 'red' };

window.onload = () => {
  setupCanvas();
  setupTacCeptionGame();
  drawGameBoard();
};

const setupNormalGame = () => {
  boardWidth = CANVAS_WIDTH;
  boardHeight = CANVAS_HEIGHT;

  cellWidth = boardWidth / 3;
  cellHeight = boardHeight / 3;
  
  boards.push(new Gameboard(0, boardWidth, boardHeight));
  canvas.onclick = handleClickNormalGame;
};

const setupTacCeptionGame = () => {
  boardWidth = CANVAS_WIDTH / 3;
  boardHeight = CANVAS_HEIGHT / 3;

  cellWidth = boardWidth / 3;
  cellHeight = boardHeight / 3;
  
  for (let i = 0; i < 9; i += 1) {
    boards.push(new Gameboard(i, boardWidth, boardHeight));
  }
}


const handleClickTacCeptionGame = (e) => {
  const clickCoords = { x: e.clientX, y: e.clientY };
  let found = false;
  for (let i = 0; i < boards.length; i += 1) {
    const board = boards[i];
    found = checkSingleBoard(board, clickCoords);   

    if (board.hasWinner() && found) {
      board.setWinner(currentPlayer);
      const boardArea = getBoardArea(board.x, board.y);
      drawPiece(boardArea, true);
    }

    if (found) break;
  }

  if (found) currentPlayer = currentPlayer * -1; 
};

const handleClickNormalGame = (e) => {
  const clickCoords = { x: e.clientX, y: e.clientY };
  let found = false;
  for (let i = 0; i < boards.length; i += 1) {
    const board = boards[i];
    found = checkSingleBoard(board, clickCoords);   

    if (board.hasWinner() && found) {
      board.setWinner(currentPlayer);
      const boardArea = getBoardArea(board.x, board.y);
      drawPiece(boardArea, true);
    }

    if (found) break;
  }

  if (found) currentPlayer = currentPlayer * -1;
}

const checkSingleBoard = (board, clickCoords) => {
  if (board.hasWinner()) return false;

  const cells = board;
  for (let y = 0; y < cells.length; y += 1) {
    for (let x = 0; x < cells[y].length; x += 1) {
      const cell = cells[y][x];
      if (cell !== EMPTY) continue;

      const area = getCellArea(x, y, board.x, board.y);
      if (isCoordInArea(clickCoords, area)) {
        drawPiece(area);
        board.cells[y][x] = currentPlayer;
        return true;
      }
    }
  }

  return false;
};

// ** AREA ** //
const getBoardArea = (boardX, boardY) => ({
  startX: boardX,
  startY: boardY,
  endX: boardX + boardWidth,
  endY: boardY + boardHeight,
});

const getCellArea = (cellX, cellY, boardX, boardY) => ({
  startX: (cellX * cellWidth) + boardX,
  startY: (cellY * cellHeight) + boardY,
  endX: ((cellX + 1) * cellWidth) + boardX,
  endY: ((cellY + 1) * cellHeight) + boardY,
});

const isCoordInArea = (coord, area) => {
  const { x, y } = coord;
  const { startX, endX, startY, endY } = area;
  return x > startX && x < endX && y > startY && y < endY;
};

// ** DRAWING ** //
const drawGameBoard = () => {
  for (let i = 0; i < boards.length; i += 1) {
    const board = boards[i];
    const cells = board.cells;
    
    const boardArea = getBoardArea(board.x, board.y);
    strokeRect(boardArea.startX, boardArea.startY, boardWidth, boardHeight, 'black', 5);

    for (let y = 0; y < cells.length; y += 1) {
      for (let x = 0; x < cells[y].length; x += 1) {
        const area = getCellArea(x, y, board.x, board.y);
        strokeRect(area.startX, area.startY, cellWidth, cellHeight)
      }
    }}
};

const drawPiece = (area, isFullBoard = false) => {
  const { shape, color } = currentPlayer === 1 ? player1Piece : player2Piece;
  if (isFullBoard) {
    fillRect(area.startX, area.startY, boardWidth, boardHeight, color);
    strokeRect(area.startX, area.startY, boardWidth, boardHeight, 'black', 5);
    
  }

  if (shape === CROSS) drawCross(area, color, isFullBoard);
  if (shape === CIRCLE) drawCircle(area, color, isFullBoard);
};


const drawCircle = ({ startX, startY }, color, isFullBoard) => {
  const w = isFullBoard ? boardWidth : cellWidth;
  const r = (w / 2) - (w / 10);
  const h = isFullBoard ? boardHeight : cellHeight;
  const x = startX + (w / 2);
  const y = startY + (h / 2);

  const strokeColor = isFullBoard ? backgroundColor : color;
  const fillColor = isFullBoard ? color : backgroundColor;

  circle(x, y, r, strokeColor, fillColor, w / 20);
};

const drawCross = ({ startX, startY, endX, endY }, color, isFullBoard) => {
  const w = isFullBoard ? boardWidth : cellWidth;
  const strokeColor = isFullBoard ? backgroundColor : color;
  const distFromEdge = w / 10;

  line(startX + distFromEdge, startY + distFromEdge, endX - distFromEdge, endY - distFromEdge, strokeColor, w / 20, 'round');
  line(endX - distFromEdge, startY + distFromEdge, startX + distFromEdge, endY - distFromEdge, strokeColor, w / 20, 'round');
};


