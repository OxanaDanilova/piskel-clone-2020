export const fillUnit = (x, y, ctx, mode, penSize) => {
  ctx.beginPath();
  if (mode === 'pen' || mode === 'vertMirrorPen' || mode === 'horizMirrorPen'
  || mode === 'stroke' || mode === 'rectangle' || mode === 'circle') {
    ctx.fillRect(x, y, penSize, penSize);
    ctx.fill();
  }
  if (mode === 'eraser') {
    ctx.clearRect(x, y, penSize, penSize);
  }
};

export const defineStartPointX = (x, matrix, offset) => {
  if (typeof x === 'number' && typeof matrix === 'number' && typeof offset === 'number') {
    return Math.ceil((x - offset) / matrix) - 1;
  }
  return 0;
};

export const defineStartPointY = (y, matrix, offset) => Math.ceil((y - offset) / matrix) - 1;
