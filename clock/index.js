let CLOCK_RADIUS;

window.onload = () => {
  setupCanvas();
  setupCanvasForClock();
  setInterval(updateClock, 500);
};

const setupCanvasForClock = () => {
  CLOCK_RADIUS = (CANVAS_WIDTH / 2) - 50;
  
  ctx.translate(CANVAS_CENTER.x, CANVAS_CENTER.y);
  ctx.font = '30px Georgia';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
};

const drawClockFace = () => {
  circle(0, 0, CLOCK_RADIUS, 'black');

  for (let i = 1; i <= 60; i += 1) {
    const angle = getClockAngle(i);
    const fromRadius = CLOCK_RADIUS - 10;
    
    if (i % 5 === 0) {
      const { x: numberX, y: numberY } = polarToCartesian(angle, CLOCK_RADIUS - 55);
      text(numberX, numberY, i / 5);

      drawLine(fromRadius, angle, 25, 4);
    } else {
      drawLine(fromRadius, angle, 15, 2);
    }
  }
};

const drawLine = (fromRadius, angle, length, width, color = 'black') => {
  const { x: fromX, y: fromY } = polarToCartesian(angle, fromRadius);
  const { x: toX , y: toY } = polarToCartesian(angle, fromRadius - length);

  line(fromX, fromY, toX, toY, color, width, 'round');
};

const updateClock = () => {
  clearCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  drawClockFace();

  const now = new Date();
  const hour = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const HOUR_HAND_MINUTE_OFFSET = minutes * (Math.PI / 6) / 60;

  drawClockHand(hour * 5, 200, 8, 'green', HOUR_HAND_MINUTE_OFFSET);
  drawClockHand(minutes, 280, 5, 'black');
  drawClockHand(seconds, 260, 2, 'red');

  circle(0, 0, 5, 'black', 'black');
};

const drawClockHand = (value, length, width, color, offset = 0) => {
  const angle = getClockAngle(value) + offset;
  const { x, y } = polarToCartesian(angle, length);
  line(0, 0, x, y, color, width, 'round');
};

const getClockAngle = (value) => value * (Math.PI / 30) - (Math.PI /2);
