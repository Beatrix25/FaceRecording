import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA6O5ea4Ru7WSBitgUBow7UcZD3BN_m9qc",
    authDomain: "react-firebase-facerecognition.firebaseapp.com",
    projectId: "react-firebase-facerecognition",
    storageBucket: "react-firebase-facerecognition.appspot.com",
    messagingSenderId: "207447687834",
    appId: "1:207447687834:web:0b96f5966ae0da8e839523"
  };

  const fire= firebase.initializeApp(firebaseConfig);

  export default fire;