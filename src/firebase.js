import firebase from 'firebase';
// import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};
const firebaseConfig = {
    apiKey: "AIzaSyC44NGvY-oJaoh2MTwZoYBcxFkaKrN20mA",
    authDomain: "nasha-challenge.firebaseapp.com",
    databaseURL: "https://nasha-challenge-default-rtdb.firebaseio.com",
    projectId: "nasha-challenge",
    storageBucket: "nasha-challenge.appspot.com",
    messagingSenderId: "121796207097",
    appId: "1:121796207097:web:63ad0242e6a877dc03dd28",
    measurementId: "G-QXEW6WS7Q8"
  };
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);

export default firebase;
// export const database = firebase.database();