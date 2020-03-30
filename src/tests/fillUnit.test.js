import { fillUnit } from '../utilites/fillUnit';
import 'jest-canvas-mock';

test('Check that ctx.fillRect was called, if mode is pen', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  fillUnit(100, 100, ctx, 'pen', 1);
  expect(ctx.fillRect).toHaveBeenCalled();
});

test('Check that ctx.fillRect was called, if mode is vertMirrorPen', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  fillUnit(100, 100, ctx, 'vertMirrorPen', 1);
  expect(ctx.fillRect).toHaveBeenCalled();
});

test('Check that ctx.fillRect was called, if mode is vhorizMirrorPen', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  fillUnit(100, 100, ctx, 'horizMirrorPen', 1);
  expect(ctx.fillRect).toHaveBeenCalled();
});

test('Check that ctx.fillRect was called, if mode is stroke', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  fillUnit(100, 100, ctx, 'stroke', 1);
  expect(ctx.fillRect).toHaveBeenCalled();
});

test('Check that ctx.fillRect was called, if mode is rectangle', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  fillUnit(100, 100, ctx, 'rectangle', 1);
  expect(ctx.fillRect).toHaveBeenCalled();
});

test('Check that ctx.fillRect was called, if mode is circle', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  fillUnit(100, 100, ctx, 'circle', 1);
  expect(ctx.fillRect).toHaveBeenCalled();
});

test('Check that ctx.fillRect was NOT called, if mode is eraser', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  fillUnit(100, 100, ctx, 'eraser', 1);
  expect(ctx.fillRect).not.toHaveBeenCalled();
});

test('Check that ctx.fillRect was NOT called, if mode is undefined', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  fillUnit(100, 100, ctx, undefined, 1);
  expect(ctx.fillRect).not.toHaveBeenCalled();
});

test('Check that ctx.clearRect was NOT called, if mode is undefined', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  fillUnit(100, 100, ctx, undefined, 1);
  expect(ctx.clearRect).not.toHaveBeenCalled();
});

test('Check that ctx.clearRect was called, if mode is eraser', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  fillUnit(100, 100, ctx, 'eraser', 1);
  expect(ctx.clearRect).toHaveBeenCalled();
});

test('Check that fillUnit is function', () => {
  expect(fillUnit).toBeInstanceOf(Function);
});

test('Check that ctx.fillRect was called with appropriate arguments, if mode is pen', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  fillUnit(100, 100, ctx, 'pen', 1);
  expect(ctx.fillRect).toHaveBeenCalledWith(100, 100, 1, 1);
});
