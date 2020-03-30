import './eraser.css';

export const erBtn = document.getElementsByClassName('eraser')[0];

export const eraserMode = () => {
  document.getElementsByClassName('selected')[0].classList.toggle('selected');
  erBtn.classList.add('selected');
};
