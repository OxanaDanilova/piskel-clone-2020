import './circle.css';

export const circBtn = document.getElementsByClassName('circle')[0];

export const circleMode = () => {
  const canvasClone = document.getElementsByClassName('canvas-clone')[0];
  canvasClone.style.visibility = 'visible';
  document.getElementsByClassName('selected')[0].classList.toggle('selected');
  circBtn.classList.add('selected');
};
