import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAWXmh6Zt4tluJ5F-5ssYdSea9eC2PR8GY",
    authDomain: "lmonix.firebaseapp.com",
    databaseURL: "https://lmonix.firebaseio.com",
    projectId: "lmonix",
    storageBucket: "lmonix.appspot.com",
    messagingSenderId: "200967991958"
  };
firebase.initializeApp(config);

// export const provider = new firebase.auth.GoogleAuthProvider();
// export const provider2 =  new firebase.auth.FacebookAuthProvider();
// export const auth = firebase.auth();
export default firebase;