import './horizMirrorPen.css';

export const horizMirBtn = document.getElementsByClassName('mirrorPenY')[0];

export const horizPenMode = () => {
  document.getElementsByClassName('selected')[0].classList.toggle('selected');
  horizMirBtn.classList.add('selected');
};
