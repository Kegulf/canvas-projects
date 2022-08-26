let canvas, ctx;
let CANVAS_CENTER, CANVAS_WIDTH, CANVAS_HEIGHT;

const setupCanvas = (onCanvasClick) => {
  canvas = document.querySelector('#canvas');
  canvas.onclick = onCanvasClick;
  CANVAS_WIDTH = canvas.width;
  CANVAS_HEIGHT = canvas.height;
  CANVAS_CENTER = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 };

  ctx = canvas.getContext('2d');
  ctx.font = '30px Georgia';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
};

const circle = (centerX, centerY, radius, strokeStyle, fillStyle, lineWidth) => {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = strokeStyle || 'white';
  ctx.lineWidth = lineWidth || 5;
  ctx.fillStyle = fillStyle || 'white';
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

const line = (fromX, fromY, toX, toY, strokeStyle, lineWidth, lineCap) => {
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.lineWidth = lineWidth || 2;
  ctx.strokeStyle = strokeStyle || 'black';
  ctx.lineCap = lineCap || 'butt';
  ctx.stroke();
  ctx.closePath();
};

const strokeRect = (x, y, width, height, strokeStyle, lineWidth) => {
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle || 'black';
  ctx.lineWidth = lineWidth || 2;
  ctx.strokeRect(x, y, width, height);
};

const fillRect = (x, y, width, height, fillStyle) => {
  ctx.beginPath();
  ctx.fillStyle = fillStyle || 'white';
  ctx.fillRect(x, y, width, height);
};

const text = (x, y, value) => {
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillText(value, x, y);
  ctx.closePath();
};

const clearCanvas = (width, height, color = 'white') => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  ctx.closePath();
};

const polarToCartesian = (angle, radius) => ({
  x: radius * Math.cos(angle),
  y: radius * Math.sin(angle),
});
