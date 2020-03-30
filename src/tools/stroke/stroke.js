import './stroke.css';

export const strokeBtn = document.getElementsByClassName('stroke')[0];

export const strokeMode = () => {
  const canvasClone = document.getElementsByClassName('canvas-clone')[0];
  canvasClone.style.visibility = 'visible';
  document.getElementsByClassName('selected')[0].classList.toggle('selected');
  strokeBtn.classList.add('selected');
};
