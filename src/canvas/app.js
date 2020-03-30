/* eslint-disable global-require */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import './style.css';
import './app.html';

import { fillUnit, defineStartPointX, defineStartPointY } from '../utilites/fillUnit';
import { algBrez, algBrezCirc, strokeLineAlg } from '../utilites/algoritms';
import { penSizes, definePenSize } from '../tools/penSize/penSize';
import { penBtn, penMode } from '../tools/pen/pen';
import { erBtn, eraserMode } from '../tools/eraser/eraser';
import { rectBtn, rectMode } from '../tools/rectangle/rectangle';
import { circBtn, circleMode } from '../tools/circle/circle';
import { strokeBtn, strokeMode } from '../tools/stroke/stroke';
import { horizMirBtn, horizPenMode } from '../tools/horizMirrorPen/horizMirrorPen';
import { vertMirBtn, vertPenMode } from '../tools/vertMirrorPen/vertMirrorPen';
import { pickBtn, colPickerMode } from '../tools/colorPicker/colorPicker';
import { paintBtn, paintMode } from '../tools/paint/paint';
import * as constants from './constants';


export default function piskel() {
  let matrix = constants.matrixSizeBig;

  let drawing = false;
  let currentColor = 'red';
  let currentSecColor = 'black';
  let radius;
  const frames = []; // all frames
  let frame = []; // current frame
  let numb = 1;
  let x0;
  let y0;
  let x1;
  let y1;
  let count = 0;
  let mirrorX;
  let mirrorX0;
  let mirrorY;
  let mirrorY0;
  const fpsRange = document.querySelector('input[type="range"]');
  const fpsValue = document.querySelector('.value');
  let fps = fpsRange.value;


  // Define Canvas///
  const canvasMain = document.getElementsByClassName('canvas-main')[0];

  const canvas = document.getElementsByClassName('canvas-draw')[0];
  const ctx = canvas.getContext('2d');
  canvas.height = constants.canvasSizeBig;
  canvas.width = constants.canvasSizeBig;

  const canvasClone = document.getElementsByClassName('canvas-clone')[0];
  const ctxClone = canvasClone.getContext('2d');
  canvasClone.height = constants.canvasSizeBig;
  canvasClone.width = constants.canvasSizeBig;

  const canvasPrev = document.getElementById('canvas-preview');
  const cprev = canvasPrev.getContext('2d');
  canvasPrev.height = constants.canvasSizeBig;
  canvasPrev.width = constants.canvasSizeBig;

  const size = document.getElementsByClassName('wrap-sizes')[0];
  penSizes.addEventListener('click', definePenSize);

  // //////////////////
  const colorBtn = document.getElementsByClassName('prim-color')[0];
  const secColorBtn = document.getElementsByClassName('sec-color')[0];

  pickBtn.addEventListener('click', colPickerMode);

  erBtn.addEventListener('click', eraserMode);

  penBtn.addEventListener('click', penMode);

  vertMirBtn.addEventListener('click', vertPenMode);

  horizMirBtn.addEventListener('click', horizPenMode);

  rectBtn.addEventListener('click', rectMode);

  strokeBtn.addEventListener('click', strokeMode);

  circBtn.addEventListener('click', circleMode);

  paintBtn.addEventListener('click', paintMode);


  function getColor() {
    currentColor = this.value;
  }

  function getSecColor() {
    currentSecColor = this.value;
  }

  colorBtn.addEventListener('input', getColor);
  secColorBtn.addEventListener('input', getSecColor);

  // ///////////////

  const defineMode = () => {
    const toolArr = ['pen', 'eraser', 'rectangle', 'circle', 'stroke', 'vertMirrorPen', 'horizMirrorPen', 'colPicker', 'paint'];
    const toolPanel = document.getElementsByClassName('wrap-instr')[0];
    const selectedTool = document.getElementsByClassName('selected')[0];
    let mode;
    for (let i = 0; i < toolPanel.children.length - 2; i += 1) {
      if (toolPanel.children[i] === selectedTool) {
        mode = toolArr[i];
      }
    }
    return mode;
  };
  // /////////////

  const setMat = (mat) => {
    canvas.height = constants.realCanvasSize / mat;
    canvas.width = constants.realCanvasSize / mat;
    canvasClone.height = constants.realCanvasSize / mat;
    canvasClone.width = constants.realCanvasSize / mat;
    canvasPrev.width = constants.realCanvasSize / mat;
    canvasPrev.height = constants.realCanvasSize / mat;
    for (let i = 0; i < frames.length; i += 1) {
      document.getElementsByClassName('frame')[i].children[1].width = constants.realCanvasSize / mat;
      document.getElementsByClassName('frame')[i].children[1].height = constants.realCanvasSize / mat;
      document.getElementsByClassName('frame')[i].children[1].getContext('2d').putImageData(frames[i], 0, 0, 0, 0, canvasPrev.width, canvasPrev.height);
      frames[i] = document.getElementsByClassName('frame')[i].children[1].getContext('2d').getImageData(0, 0, constants.realCanvasSize / mat, constants.realCanvasSize / mat);
    }
  };


  // //////////////////////////////////////////////////////////////////////////////////

  const coord = document.getElementsByClassName('wrap-info')[0];


  function displayCoordinates(event) {
    const x = event.clientX - canvasMain.offsetLeft;
    const y = event.clientY - canvasMain.offsetTop;
    const userUnitX = Math.ceil(x / matrix);
    const userUnitY = Math.ceil(y / matrix);
    coord.children[1].innerHTML = `x ${userUnitX} user unit, ${x} px`;
    coord.children[2].innerHTML = `y ${userUnitY} user unit, ${y} px`;
  }

  canvas.addEventListener('mousemove', displayCoordinates);

  function cancelContextMenu(event) {
    event.preventDefault();
  }

  function pickColor(event) {
    const mode = defineMode();
    let definedColor;
    if (mode === 'colPicker') {
      x0 = defineStartPointX(event.pageX, matrix, canvasMain.offsetLeft);
      y0 = defineStartPointY(event.pageY, matrix, canvasMain.offsetTop);
      const imageData = ctx.getImageData(x0, y0, 1, 1);
      const pixel = imageData.data;
      let red = pixel[0].toString(16);
      if (red.length === 1) { red = `0${red}`; }
      let green = pixel[1].toString(16);
      if (green.length === 1) { green = `0${green}`; }
      let blue = pixel[2].toString(16);
      if (blue.length === 1) { blue = `0${blue}`; }
      const opacity = pixel[3].toString(16);
      if (opacity === 0) { // define pixel color from not-colored area
        definedColor = '#fff';
      } else {
        definedColor = `#${red}${green}${blue}`;
      }
      if (event.button === constants.leftMouseBtn) {
        currentColor = definedColor;
        colorBtn.value = currentColor;
      }
      if (event.button === constants.rightMouseBtn) {
        currentSecColor = definedColor;
        secColorBtn.value = currentSecColor;
      }
    }
  }

  // ////////////////start Drawing///////////////
  function startDrawing(event) {
    const mode = defineMode();
    const penSize = definePenSize();
    if (event.button === constants.leftMouseBtn) {
      ctx.fillStyle = currentColor;
      ctxClone.fillStyle = currentColor;
    }
    if (event.button === constants.rightMouseBtn) {
      ctx.fillStyle = currentSecColor;
      ctxClone.fillStyle = currentSecColor;
    }
    if (mode === 'pen' || mode === 'eraser') {
      drawing = true;
      x0 = undefined;
      y0 = undefined;
    }
    if (mode === 'vertMirrorPen') {
      drawing = true;
      x0 = undefined;
      y0 = undefined;
    }

    if (mode === 'horizMirrorPen') {
      drawing = true;
      x0 = undefined;
      y0 = undefined;
    }

    if (mode === 'stroke' || mode === 'rectangle' || mode === 'circle') {
      canvasClone.style.visibility = 'visible';
      x0 = defineStartPointX(event.pageX, matrix, canvasMain.offsetLeft);
      y0 = defineStartPointY(event.pageY, matrix, canvasMain.offsetTop);
      drawing = true;
      fillUnit(x0, y0, ctxClone, mode, penSize);
    }

    if (mode === 'paint') {
      drawing = true;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
  // ///////////////////////////////////
  function drawFrame() {
    const canvasFrame = document.getElementsByClassName('frame current')[0].children[1]; // define canvas in the current frame
    const ctf = canvasFrame.getContext('2d');
    ctf.clearRect(0, 0, canvasFrame.width, canvasFrame.height);
    ctf.drawImage(canvas, 0, 0, canvasFrame.width, canvasFrame.height);
    frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
  // /////////////////////////////

  function startCloneDrawing(event) {
    const mode = defineMode();
    const penSize = definePenSize();
    if (event.button === constants.leftMouseBtn) {
      ctx.fillStyle = currentColor;
      ctxClone.fillStyle = currentColor;
    }
    if (event.button === constants.rightMouseBtn) {
      ctx.fillStyle = currentSecColor;
      ctxClone.fillStyle = currentSecColor;
    }
    if (mode === 'stroke' || mode === 'rectangle' || mode === 'circle') {
      x0 = defineStartPointX(event.pageX, matrix, canvasMain.offsetLeft);
      y0 = defineStartPointY(event.pageY, matrix, canvasMain.offsetTop);
      drawing = true;
      fillUnit(x0, y0, ctxClone, mode, penSize);
    }
  }

  function stopDrawing() {
    const mode = defineMode();
    if (mode === 'pen' || mode === 'eraser') {
      drawing = false;
      x0 = undefined;
      x1 = undefined;
      y0 = undefined;
      y1 = undefined;
      drawFrame();
    }
    if (mode === 'vertMirrorPen' || mode === 'horizMirrorPen') {
      drawing = false;
      x0 = undefined;
      x1 = undefined;
      y0 = undefined;
      y1 = undefined;
      drawFrame();
    }
    if (mode === 'paint') {
      drawing = false;
      drawFrame();
    }
  }

  function stopCloneDrawing() {
    const mode = defineMode();
    const penSize = definePenSize();
    if (mode === 'circle') {
      drawing = false;
      x1 = undefined;
      y1 = undefined;
      canvasClone.style.visibility = 'hidden';
      algBrezCirc(x0, y0, radius, ctx, mode, penSize);
      ctxClone.clearRect(0, 0, constants.realCanvasSize, constants.realCanvasSize);
      x0 = undefined;
      y0 = undefined;
    }
    if (mode === 'stroke') {
      drawing = false;
      canvasClone.style.visibility = 'hidden';
      strokeLineAlg(x0, x1, y0, y1, ctx, mode, penSize);
      ctxClone.clearRect(0, 0, constants.realCanvasSize, constants.realCanvasSize);
      x0 = undefined;
      x1 = undefined;
      y0 = undefined;
      y1 = undefined;
    }
    if (mode === 'rectangle') {
      drawing = false;
      canvasClone.style.visibility = 'hidden';
      algBrez(x0, x0, y0, y1, ctx, mode, penSize);
      algBrez(x0, x1, y1, y1, ctx, mode, penSize);
      algBrez(x1, x1, y1, y0, ctx, mode, penSize);
      algBrez(x0, x1, y0, y0, ctx, mode, penSize);
      ctxClone.clearRect(0, 0, constants.realCanvasSize, constants.realCanvasSize);
      x0 = undefined;
      x1 = undefined;
      y0 = undefined;
      y1 = undefined;
    }
    drawFrame();
  }

  // /////////////////////////////////////////////////////////////////


  function rectDrawingProcess(event) {
    const mode = defineMode();
    const penSize = definePenSize();
    if (mode === 'rectangle' && drawing === true) {
      ctxClone.clearRect(0, 0, 780, 780);
      x1 = defineStartPointX(event.pageX, matrix, canvasMain.offsetLeft);
      y1 = defineStartPointY(event.pageY, matrix, canvasMain.offsetTop);
      algBrez(x0, x0, y0, y1, ctxClone, mode, penSize);
      algBrez(x0, x1, y1, y1, ctxClone, mode, penSize);
      algBrez(x1, x1, y1, y0, ctxClone, mode, penSize);
      algBrez(x0, x1, y0, y0, ctxClone, mode, penSize);
    }
  }

  function circleDrawingProcess(event) {
    const mode = defineMode();
    const penSize = definePenSize();
    if (mode === 'circle' && drawing === true) {
      ctxClone.clearRect(0, 0, 780, 780);
      x1 = defineStartPointX(event.pageX, matrix, canvasMain.offsetLeft);
      y1 = defineStartPointY(event.pageY, matrix, canvasMain.offsetTop);
      // eslint-disable-next-line no-restricted-properties
      radius = Math.ceil(Math.sqrt(Math.pow(Math.abs(x1 - x0), 2) + (Math.abs(y1 - y0), 2)));
      algBrezCirc(x0, y0, radius, ctxClone, mode, penSize);
    }
  }

  // /////////////////////
  function lineDrawingProcess(event) {
    const mode = defineMode();
    const penSize = definePenSize();
    if (mode === 'stroke' && drawing === true) {
      ctxClone.clearRect(0, 0, 780, 780);
      x1 = defineStartPointX(event.pageX, matrix, canvasMain.offsetLeft);
      y1 = defineStartPointY(event.pageY, matrix, canvasMain.offsetTop);
    }
    strokeLineAlg(x0, x1, y0, y1, ctxClone, mode, penSize);
  }

  // //////////////////////
  function drawingProcess(event) {
    const mode = defineMode();
    const penSize = definePenSize();
    if ((mode === 'pen' && drawing === true) || (mode === 'eraser' && drawing === true)) {
      x1 = defineStartPointX(event.pageX, matrix, canvasMain.offsetLeft);
      y1 = defineStartPointY(event.pageY, matrix, canvasMain.offsetTop);
      fillUnit(x1, y1, ctx, mode, penSize);
      if ((x0) && (y0)) { algBrez(x0, x1, y0, y1, ctx, mode, penSize); }
      x0 = x1;
      y0 = y1;
    }

    if (mode === 'vertMirrorPen' && drawing === true) {
      x1 = defineStartPointX(event.pageX, matrix, canvasMain.offsetLeft);
      y1 = defineStartPointY(event.pageY, matrix, canvasMain.offsetTop);
      mirrorX = canvas.width - x1 - 1;
      fillUnit(x1, y1, ctx, mode, penSize);
      fillUnit(mirrorX, y1, ctx, penSize);
      if ((x0) && (y0)) { algBrez(x0, x1, y0, y1, ctx, mode, penSize); }
      if ((mirrorX0) && (y0)) { algBrez(mirrorX0, mirrorX, y0, y1, ctx, mode, penSize); }
      x0 = x1;
      y0 = y1;
      mirrorX0 = mirrorX;
    }
    if (mode === 'horizMirrorPen' && drawing === true) {
      x1 = defineStartPointX(event.pageX, matrix, canvasMain.offsetLeft);
      y1 = defineStartPointY(event.pageY, matrix, canvasMain.offsetTop);
      mirrorY = canvas.height - y1 - 1;
      fillUnit(x1, y1, ctx, mode, penSize);
      fillUnit(x1, mirrorY, ctx, mode, penSize);
      if ((x0) && (y0)) { algBrez(x0, x1, y0, y1, ctx, mode, penSize); }
      if ((mirrorY0) && (x0)) { algBrez(x0, x1, mirrorY0, mirrorY, ctx, mode, penSize); }
      x0 = x1;
      y0 = y1;
      mirrorY0 = mirrorY;
    }
  }

  // drawing events
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousedown', pickColor);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mousemove', drawingProcess);
  canvas.addEventListener('contextmenu', cancelContextMenu);
  canvasClone.addEventListener('mousedown', startCloneDrawing);
  canvasClone.addEventListener('mouseup', stopCloneDrawing);
  canvasClone.addEventListener('mousemove', lineDrawingProcess);
  canvasClone.addEventListener('mousemove', rectDrawingProcess);
  canvasClone.addEventListener('mousemove', circleDrawingProcess);

  // Work with frames////////////////////////////////////////////////////

  function dragStart(event) {
    const draggableFrame = event.target.closest('.frame');
    const index = draggableFrame.children[0].textContent - 1;
    event.dataTransfer.setData('text/plain', index);
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function dragEnter(event) {
    if (event.target.closest('.frame')) {
      event.target.closest('.frame').style.opacity = 0.5;
    }
  }

  function dragLeave(event) {
    if (event.target.closest('.frame')) {
      event.target.closest('.frame').style.opacity = 1;
    }
  }

  function onDrop(event) {
    const framesArea = document.getElementsByClassName('frames')[0];
    const index = +event.dataTransfer.getData('text');
    const draggableElement = framesArea.children[index];
    const dropzone = event.target.closest('.frame');
    if (dropzone) {
      if (frame) {
        // eslint-disable-next-line no-use-before-define
        frames[curFrame.children[0].textContent - 1] = frame;
      }
      dropzone.style.opacity = 1;
      const newIndex = dropzone.children[0].textContent - 1;
      frames.splice(newIndex + 1, 0, frames[index]);
      if (index < newIndex) {
        frames.splice(index, 1);
      } else {
        frames.splice(index + 1, 1);
      }
      document.getElementById('frames').insertBefore(draggableElement, framesArea.children[newIndex + 1]);
      event.dataTransfer.clearData();

      for (let i = 0; i <= framesArea.children.length - 2; i += 1) {
        framesArea.children[i].children[0].textContent = i + 1;
      }
    }
  }

  const framesArea = document.getElementsByClassName('frames')[0];
  framesArea.addEventListener('dragover', dragOver);
  framesArea.addEventListener('drop', onDrop);
  framesArea.addEventListener('dragenter', dragEnter);
  framesArea.addEventListener('dragleave', dragLeave);

  function hoverFrame(event) {
    const delBtn = event.target.closest('.frame').children[2];
    delBtn.style.visibility = 'visible';
    const copyBtn = event.target.closest('.frame').children[3];
    copyBtn.style.visibility = 'visible';
  }

  function leaveFrame(event) {
    const delBtn = event.target.closest('.frame').children[2];
    delBtn.style.visibility = 'hidden';
    const copyBtn = event.target.closest('.frame').children[3];
    copyBtn.style.visibility = 'hidden';
  }

  const frameItem = document.querySelectorAll('.frame');
  for (let i = 0; i < frameItem.length; i += 1) {
    frameItem[i].addEventListener('mouseover', hoverFrame);
    frameItem[i].addEventListener('mouseleave', leaveFrame);
    frameItem[i].addEventListener('dragstart', dragStart);
  }

  let curFrame = document.getElementsByClassName('frame')[0];
  const addBtn = document.getElementById('add-frame');

  // Animation /////////////////////////////////////

  function animation() {
    if (!frames.length) { return; }
    setTimeout(() => {
      window.requestAnimationFrame(animation);
      cprev.clearRect(0, 0, canvasPrev.width, canvasPrev.height);
      if (!frames[count]) { count = 0; }
      cprev.putImageData(frames[count], 0, 0, 0, 0, canvasPrev.width, canvasPrev.height);

      if ((count < frames.length - 1) && (frames[count + 1])) {
        count += 1;
      } else { count = 0; }
    }, constants.timer / fps);
  }

  // ///////////////////////////////////////////////////////////////////////////
  function addFrameInColumn() {
    const div = document.createElement('div');
    curFrame.classList.toggle('current');
    div.className = 'frame current';
    div.setAttribute('draggable', 'true');
    document.getElementById('frames').insertBefore(div, addBtn);
    curFrame = div;

    const numDiv = document.createElement('div');
    numDiv.className = 'numb';
    curFrame.appendChild(numDiv);
    numb = curFrame.parentElement.children.length - 1;
    numDiv.textContent = numb;

    const canv = document.createElement('canvas');
    canv.setAttribute('id', 'frame-item');
    canv.setAttribute('width', '100');
    canv.setAttribute('height', '100');
    canv.className = 'frame-item';
    curFrame.appendChild(canv);

    const btn = document.createElement('div');
    btn.setAttribute('id', 'delete');
    btn.className = 'delete';
    curFrame.appendChild(btn);

    const btnCopy = document.createElement('div');
    btnCopy.className = 'copy';
    curFrame.appendChild(btnCopy);
  }

  function copyFrame(event) {
    const { target } = event;
    const btnCopy = target.closest('.copy');
    const copyFrame = target.closest('.frame');
    const parentFrame = copyFrame.parentElement;
    if (!btnCopy) { return; }
    if (frame) {
      frames[curFrame.children[0].textContent - 1] = frame;
    }
    event.stopPropagation();
    const index = copyFrame.children[0].textContent - 1;
    frames.splice(index, 0, frames[index]);
    const clone = copyFrame.cloneNode(true);
    if (clone.classList.contains('current')) { clone.classList.toggle('current'); }

    clone.children[2].style.visibility = 'hidden';
    clone.children[3].style.visibility = 'hidden';
    const ctf = clone.children[1].getContext('2d');
    ctf.drawImage(copyFrame.children[1], 0, 0, 100, 100);
    document.getElementById('frames').insertBefore(clone, parentFrame.children[index + 1]);
    for (let i = 0; i <= parentFrame.children.length - 2; i += 1) {
      parentFrame.children[i].children[0].textContent = i + 1;
      parentFrame.children[i].addEventListener('mouseover', hoverFrame);
      parentFrame.children[i].addEventListener('mouseleave', leaveFrame);
      parentFrame.children[i].addEventListener('dragstart', dragStart);
    }
    animation();
  }

  // Add new frame //
  function addFrame(event) {
    if (!frames) {
      event.stopPropagation();
      return;
    }
    ctx.clearRect(0, 0, constants.realCanvasSize, constants.realCanvasSize);
    event.stopPropagation();
    if (frame.length === 0) { frame = ctx.createImageData(canvas.width, canvas.height); }
    if (frame) {
      frames[curFrame.children[0].textContent - 1] = frame;
    }
    animation();
    addFrameInColumn();
    const frameItem = document.querySelectorAll('.frame');
    for (let i = 0; i < frameItem.length; i += 1) {
      frameItem[i].addEventListener('mouseover', hoverFrame);
      frameItem[i].addEventListener('mouseleave', leaveFrame);
      frameItem[i].addEventListener('dragstart', dragStart);
    }
    frame = ctx.createImageData(canvas.width, canvas.height);
  }

  function rangeValue() {
    const newValue = fpsRange.value;
    fpsValue.innerHTML = `${newValue} FPS`;
    fps = newValue;
  }

  fpsRange.addEventListener('input', rangeValue);

  addBtn.addEventListener('click', addFrame);

  // Draw main "canvas" in according to current Frame
  function drawMain() {
    if (frame) {
      ctx.clearRect(0, 0, constants.realCanvasSize, constants.realCanvasSize);
      ctx.putImageData(frame, 0, 0, 0, 0, constants.realCanvasSize, constants.realCanvasSize);
    }
  }

  function defineRadioButtonValue() {
    for (let i = 0; i < size.children.length; i += 1) {
      if (size.children[i].checked === true) {
        matrix = constants.realCanvasSize / +size.children[i].value;
        setMat(matrix);
      }
    }
    if (frame.length !== 0) {
      drawMain();
      if (frame) {
        const curFrame = document.getElementsByClassName('current')[0];
        frames[curFrame.children[0].textContent - 1] = frame;
        drawFrame();
      }
    }
  }

  size.addEventListener('click', defineRadioButtonValue);

  function searchFrame() {
    const pos = curFrame.children[0].textContent;
    frame = frames[pos - 1];
  }

  function makeCurrentFrame(event) {
    const { target } = event;
    const item = target.closest('.frame');
    if (item.classList.contains('current')) { return; }

    if (frame) {
      frames[curFrame.children[0].textContent - 1] = frame;
    }
    if (!item) { return; }
    if (curFrame.classList.contains('current')) { curFrame.classList.toggle('current'); }
    curFrame = item;
    frame = frames[curFrame.children[0].textContent - 1];
    if (!item.classList.contains('current')) { item.classList.toggle('current'); }

    searchFrame();
    drawMain();
  }

  // Delete frame ///////////

  function deleteFrame(event) {
    const { target } = event;
    const btnDel = target.closest('.delete');
    const delFrame = target.closest('.frame');
    const parentFrame = delFrame.parentElement;
    if (!btnDel) { return; }
    event.stopImmediatePropagation();
    if (parentFrame.children.length === 2) { return; }
    if (delFrame.classList.contains('current')) { delFrame.classList.toggle('current'); }
    parentFrame.removeChild(delFrame);
    frames.splice(delFrame.children[0].textContent - 1, 1);
    for (let i = 0; i <= parentFrame.children.length - 2; i += 1) {
      parentFrame.children[i].children[0].textContent = i + 1;
    }
    if (document.getElementsByClassName('current')[0]) {
      return;
    }
    curFrame = parentFrame.children[parentFrame.children.length - 2];

    if (!curFrame.classList.contains('current')) {
      curFrame.classList.add('current');
    }

    searchFrame();
    drawMain();
  }

  const containerFrames = document.getElementById('frames');
  containerFrames.addEventListener('click', deleteFrame);
  containerFrames.addEventListener('click', copyFrame);
  containerFrames.addEventListener('click', makeCurrentFrame);


  // Full screen//////////////
  function fullScreen() {
    canvasPrev.requestFullscreen();
  }

  const fullScr = document.getElementsByClassName('fullscr')[0];
  fullScr.addEventListener('click', fullScreen);

  // Export as .gif ////////
  function exportGif() {
    if (!frames.length) { return; }
    // eslint-disable-next-line no-undef
    const gif = new GIF({
      workers: 2,
      quality: 10,
      repeat: 0,
    });

    for (let i = 0; i < frames.length; i += 1) {
      gif.addFrame(frames[i], { copy: true }, { delay: 1000 / fps });
    }

    const a = document.getElementsByClassName('download-gif')[0];
    a.style.display = 'block';

    gif.on('finished', (blob) => {
      a.href = URL.createObjectURL(blob);
    });

    gif.render();
    a.download = 'piskel-clone';
  }

  const expGif = document.getElementsByClassName('exp-gif')[0];
  expGif.addEventListener('click', exportGif);

  // Export as .upng ////////
  function exportApng() {
    if (!frames.length) { return; }
    const UPNG = require('upng-js');
    const download = require('downloadjs');
    const arrFrames = [];
    for (let i = 0; i < frames.length; i += 1) {
      arrFrames.push(frames[i].data.buffer);
    }
    const result = UPNG.encode(arrFrames, canvas.width, canvas.height, 0, [constants.timer / fps]);
    download(result, 'Piskel.apng', 'apng');
  }

  const expApng = document.getElementsByClassName('exp-apng')[0];
  expApng.addEventListener('click', exportApng);
}
