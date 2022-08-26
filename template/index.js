let canvas, ctx;
let CANVAS_CENTER, CANVAS_WIDTH, CANVAS_HEIGHT, CLOCK_RADIUS;

window.onload = () => {
  setupCanvas();
};

const setupCanvas = () => {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
  CANVAS_WIDTH = canvas.width;
  CANVAS_HEIGHT = canvas.height;
  CANVAS_CENTER = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 };
  
  ctx.translate(CANVAS_CENTER.x, CANVAS_CENTER.y);
  ctx.font = '30px Georgia';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
};
