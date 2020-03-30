/* eslint-disable prefer-const */
import { fillUnit } from './fillUnit';

export const algBrez = (startx, endx, starty, endy, canvas, mode, penSize) => {
  if (startx === endx && starty === endy) { return undefined; }
  const deltax = Math.abs(endx - startx);
  const deltay = Math.abs(endy - starty);
  let error = 0;
  let deltaerr = deltay;
  let missedY = starty;
  let missedX;
  let diry = endy - starty;
  if (diry > 0) { diry = 1; }
  if (diry < 0) { diry = -1; }
  if (deltax >= deltay) {
    if (startx < endx) {
      for (missedX = startx; missedX <= endx; missedX += 1) {
        fillUnit(missedX, missedY, canvas, mode, penSize);
        error += deltaerr;
        if (2 * error >= deltax) {
          missedY += diry;
          error -= deltax;
        }
      }
    } else if (startx > endx) {
      for (missedX = startx; missedX >= endx; missedX -= 1) {
        fillUnit(missedX, missedY, canvas, mode, penSize);
        error += deltaerr;
        if (2 * error >= deltax) {
          missedY += diry;
          error -= deltax;
        }
      }
    }
  }

  if (deltay > deltax) {
    deltaerr = deltax;
    missedX = startx;
    let dirx = endx - startx;
    if (dirx > 0) { dirx = 1; }
    if (dirx < 0) { dirx = -1; }
    if (starty < endy) {
      for (missedY = starty; missedY <= endy; missedY += 1) {
        fillUnit(missedX, missedY, canvas, mode, penSize);
        error += deltaerr;
        if (2 * error >= deltay) {
          missedX += dirx;
          error -= deltay;
        }
      }
    } else if (starty > endy) {
      deltaerr = deltax;
      for (missedY = starty; missedY >= endy; missedY -= 1) {
        fillUnit(missedX, missedY, canvas, mode, penSize);
        error += deltaerr;
        if (2 * error >= deltay) {
          missedX += dirx;
          error -= deltay;
        }
      }
    }
  }
  return (missedX, missedY);
};

export const algBrezCirc = (x0, y0, radius, ctxClone, mode, penSize) => {
  let x = 0;
  let y = radius;
  let delta = 1 - 2 * radius;
  let error = 0;
  while (y >= 0) {
    fillUnit(x0 + x, y0 + y, ctxClone, mode, penSize);
    fillUnit(x0 + x, y0 - y, ctxClone, mode, penSize);
    fillUnit(x0 - x, y0 + y, ctxClone, mode, penSize);
    fillUnit(x0 - x, y0 - y, ctxClone, mode, penSize);
    error = 2 * (delta + y) - 1;
    if (delta < 0 && error <= 0) {
      x += 1;
      // eslint-disable-next-line no-continue
      delta += 2 * x + 1; continue;
    }
    error = 2 * (delta - x) - 1;
    if (delta > 0 && error > 0) {
      y -= 1;
      // eslint-disable-next-line no-continue
      delta += 1 - 2 * y; continue;
    }
    x += 1;
    delta += 2 * (x - y);
    y -= 1;
  }
};

export const strokeLineAlg = (x0, x1, y0, y1, ctx, mode, penSize) => {
  let x; let y;
  let dx; let dy; let dx1;
  let dy1; let px; let py; let xe; let ye; let i;
  dx = x1 - x0; dy = y1 - y0;
  dx1 = Math.abs(dx); dy1 = Math.abs(dy);
  px = 2 * dy1 - dx1; py = 2 * dx1 - dy1;
  if (dy1 <= dx1) {
    if (dx >= 0) {
      x = x0; y = y0; xe = x1;
    } else {
      x = x1; y = y1; xe = x0;
    }
    fillUnit(x, y, ctx, mode, penSize);

    for (i = 0; x < xe; i += 1) {
      x += 1;
      if (px < 0) {
        px += 2 * dy1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          y += 1;
        } else {
          y -= 1;
        }
        px += 2 * (dy1 - dx1);
      }
      fillUnit(x, y, ctx, mode, penSize);
    }
  } else {
    if (dy >= 0) {
      x = x0; y = y0; ye = y1;
    } else {
      x = x1; y = y1; ye = y0;
    }
    fillUnit(x, y, ctx, mode, penSize);
    for (i = 0; y < ye; i += 1) {
      y += 1;
      if (py <= 0) {
        py += 2 * dx1;
      } else {
        if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
          x += 1;
        } else {
          x -= 1;
        }
        py += 2 * (dx1 - dy1);
      }
      fillUnit(x, y, ctx, mode, penSize);
    }
  }
};
