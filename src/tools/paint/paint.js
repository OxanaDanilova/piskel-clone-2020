import './paint.css';

export const paintBtn = document.getElementsByClassName('paint')[0];

export const paintMode = () => {
  document.getElementsByClassName('selected')[0].classList.toggle('selected');
  paintBtn.classList.add('selected');
};
