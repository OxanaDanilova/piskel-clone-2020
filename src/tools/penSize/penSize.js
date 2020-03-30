import './penSize.css';

export const penSizes = document.getElementsByClassName('pen-sizes')[0];

export const definePenSize = () => {
  let penSize = 1;
  for (let i = 0; i < penSizes.children.length; i += 1) {
    if (penSizes.children[i].checked === true) {
      penSize = penSizes.children[i].value;
    }
  }
  return penSize;
};
