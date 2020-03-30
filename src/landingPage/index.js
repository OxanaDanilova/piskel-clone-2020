import * as firebase from 'firebase/app';
import 'firebase/auth';

import app from '../canvas/app';
import './landingStyle.css';

const userData = document.getElementsByClassName('user-data')[0];
const userName = document.getElementsByClassName('user-name')[0];
const userAvatar = document.getElementsByClassName('user-avatar')[0];
const signInBtn = document.getElementsByClassName('sign-in')[0];
const signOutBtn = document.getElementsByClassName('sign-out')[0];

const firebaseConfig = {
  apiKey: 'AIzaSyDW2EYaAPCcjUEzZ4Pc26fLDW5PYbdI1NE',
  authDomain: 'test-f0081.firebaseapp.com',
  databaseURL: 'https://test-f0081.firebaseio.com',
  projectId: 'test-f0081',
  storageBucket: 'test-f0081.appspot.com',
  messagingSenderId: '745902925635',
  appId: '1:745902925635:web:f7287143591037de9bf1f6',
};

firebase.initializeApp(firebaseConfig);

const loginFunc = () => {
  const baseProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(baseProvider)
    .then((result) => {
      userName.innerHTML = result.additionalUserInfo.profile.name;
      userAvatar.style.backgroundImage = `url(${result.additionalUserInfo.profile.picture})`;
      userData.style.visibility = 'visible';
      signInBtn.style.display = 'none';
      signOutBtn.style.display = 'block';
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log(err));
};

const logOutFunc = () => {
  userData.style.visibility = 'hidden';
  signInBtn.style.display = 'block';
  signOutBtn.style.display = 'none';
};

signInBtn.addEventListener('click', loginFunc);
signOutBtn.addEventListener('click', logOutFunc);


app();
