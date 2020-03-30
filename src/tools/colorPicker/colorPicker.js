import './colorPicker.css';

export const pickBtn = document.getElementsByClassName('col-picker')[0];

export const colPickerMode = () => {
  document.getElementsByClassName('selected')[0].classList.toggle('selected');
  pickBtn.classList.add('selected');
};
