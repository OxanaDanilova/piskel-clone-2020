import './vertMirrorPen.css';

export const vertMirBtn = document.getElementsByClassName('mirrorPenX')[0];

export const vertPenMode = () => {
  document.getElementsByClassName('selected')[0].classList.toggle('selected');
  vertMirBtn.classList.add('selected');
};
