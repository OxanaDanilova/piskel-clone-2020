import { algBrez } from '../utilites/algoritms';
import 'jest-canvas-mock';

test('Check that  algBrez returns undefined, if startx is equal endx and starty is equal endy', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  expect(algBrez(20, 20, 15, 15, ctx, 'pen', 1)).toBeUndefined();
});

test('Check that  algBrez returns defined value, if startx is equal endx and starty is NOT equal endy', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  expect(algBrez(20, 20, 15, 35, ctx, 'pen', 1)).toBeDefined();
});

test('Check that  algBrez returns defined value, if startx is NOT equal endx and starty is equal endy', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  expect(algBrez(20, 40, 35, 35, ctx, 'pen', 1)).toBeDefined();
});

test('algBrez returns correct value, if startx < endx and starty < endy', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  expect(algBrez(20, 40, 15, 35, ctx, 'pen', 1)).toBe((40, 36));
});

test('algBrez returns correct value, if startx > endx and starty < endy', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  expect(algBrez(40, 20, 15, 35, ctx, 'pen', 1)).toBe((20, 36));
});

test('algBrez returns correct value, if startx < endx and starty > endy', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  expect(algBrez(20, 40, 35, 15, ctx, 'pen', 1)).toBe((40, 14));
});

test('algBrez returns correct value, if startx > endx and starty > endy', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  expect(algBrez(40, 20, 35, 15, ctx, 'pen', 1)).toBe((20, 14));
});

test('algBrez returns correct value, if |endx - startx| < |endy - starty|', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  expect(algBrez(40, 20, 15, 85, ctx, 'pen', 1)).toBe((20, 86));
});

test('Check that algBrez is function', () => {
  expect(algBrez).toBeInstanceOf(Function);
});
