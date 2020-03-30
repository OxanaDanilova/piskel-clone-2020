import './pen.css';

export const penBtn = document.getElementsByClassName('pen')[0];

export const penMode = () => {
  document.getElementsByClassName('selected')[0].classList.toggle('selected');
  penBtn.classList.add('selected');
};
