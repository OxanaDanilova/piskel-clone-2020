import { defineStartPointX } from '../utilites/fillUnit';

test('Check StartX, if matrix equal 24', () => {
  expect(defineStartPointX(500, 24, 100)).toBe(16);
});

test('Check that returned value is defined', () => {
  expect(defineStartPointX(500, 24, 100)).toBeDefined();
});

test('Check StartX, if matrix is undefined', () => {
  expect(defineStartPointX(500, undefined, 100)).toBe(0);
});

test('Check StartX, if x is undefined', () => {
  expect(defineStartPointX(undefined, 24, 100)).toBe(0);
});

test('Check StartX, if offset is undefined', () => {
  expect(defineStartPointX(500, 24, undefined)).toBe(0);
});

test('Check that defineStartPointX is function', () => {
  expect(defineStartPointX).toBeInstanceOf(Function);
});
