import './rectangle.css';

export const rectBtn = document.getElementsByClassName('rectangle')[0];

export const rectMode = () => {
  const canvasClone = document.getElementsByClassName('canvas-clone')[0];
  canvasClone.style.visibility = 'visible';
  document.getElementsByClassName('selected')[0].classList.toggle('selected');
  rectBtn.classList.add('selected');
};
